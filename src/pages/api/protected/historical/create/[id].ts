import { NextApiRequest, NextApiResponse } from "next";

// Require Internal Dependencies
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

        const historique = await prisma.historique.create({
          data: {
            propertyId: Number(req.query.id),
            userId: userId,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
            price: req.body.price
          },
          include: {
            property: {
              select: {
                userId: true
              }
            },
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        });

        res.status(200).json({ historique });
      }
      catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
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