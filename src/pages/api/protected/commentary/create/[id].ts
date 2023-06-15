// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../lib/db/prisma";
import authMiddleware from "../../../../../utils/middlewares/auth.middleware";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const session = await authMiddleware(req);

  if (session) {
    if (req.method === "POST") {

      try {
        const { id: userId } = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
        });

        const hasCommented = await prisma.commentary.findUnique({
          where: {
            historicalId: Number(req.body.historicalId)
          }
        });

        const hasVoted = await prisma.vote.findFirst({
          where: { historicalId: Number(req.body.historicalId) }
        });

        if (hasCommented && hasVoted) {
          throw new Error("Vous avez déjà évalué ce séjour.");
        }

        if (!hasCommented && req.body.content.length) {
          await prisma.commentary.create({
            data: {
              propertyId: Number(req.query.id),
              historicalId: Number(req.body.historicalId),
              userId: userId,
              content: req.body.content,
            },
          });
        }

        if (!hasVoted) {
          let newRate;
          const requestedRate = Number(req.body.rate);

          if (requestedRate != 0) { //On agit que dans le cas où une rate a été passée

            const { rate: currentRate } = await prisma.property.findUnique({
              where: { id: Number(req.query.id) }
            });

            if (currentRate == 0) { //Si la propriété n'a pas encore reçu de vote alors pas besoin de calculer la moyenne
              newRate = requestedRate;
            }
            else {
              const { length: numberOfVotes } = await prisma.vote.findMany({
                where: { propertyId: Number(req.query.id) }
              });

              //Calcul de la moyenne des votes pour déterminer la new rate a affecter à la propriété
              newRate = (Number(currentRate) * Number(numberOfVotes) + Number(req.body.rate)) / (Number(numberOfVotes) + 1);
              newRate = Math.round(Number(newRate));
            }

            await prisma.property.update({
              where: {
                id: Number(req.query.id)
              },
              data: {
                rate: Number(newRate)
              }
            });

            await prisma.vote.create({
              data: {
                propertyId: Number(req.query.id),
                historicalId: Number(req.body.historicalId),
                userId: userId,
                rate: Number(requestedRate)
              },
            });
          }
        }

        const updatedHistorical = await prisma.historique.findUnique({
          where: {
            id: Number(req.body.historicalId)
          },
          include: {
            property: {
              select: {
                id: true,
                name: true,
                images: true,
                userId: true,
                adress: true
              }
            },
            commentary: true,
            vote: true
          }
        });

        res.status(200).json({ updatedHistorical });
      }
      catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
    else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  }
  else {
    res.status(401).end("Not Authorized");
  }
}
