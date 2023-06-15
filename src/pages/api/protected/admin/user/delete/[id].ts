// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../../lib/db/prisma";
import authMiddleware from "../../../../../../utils/middlewares/auth.middleware";
import roleMiddleware from "../../../../../../utils/middlewares/role.middleware";
import { del } from "../../../../../../utils/middlewares/cloudinary.middleware";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const session = await authMiddleware(req);

  if (session) {
    const authorized = await roleMiddleware(session);

    if (authorized) {
      if (req.method === "DELETE") {
        try {
          const user = await prisma.user.findUnique({
            where: {
              id: Number(req.query.id)
            },
            include: {
              customImage: {
                select: {
                  publicID: true
                }
              }
            }
          });

          if (user.customImage) {
            await del([user.customImage.publicID]);
            await prisma.image.delete({
              where: {
                publicID: user.customImage.publicID
              }
            });
          }

          await prisma.vote.deleteMany({
            where: {
              userId: user.id
            }
          });
          await prisma.commentary.deleteMany({
            where: {
              userId: user.id
            }
          });
          await prisma.historique.deleteMany({
            where: {
              userId: user.id
            }
          });

          await prisma.property.deleteMany({
            where: {
              userId: user.id
            }
          });

          await prisma.adress.deleteMany({
            where: {
              userId: user.id
            }
          });

          await prisma.message.deleteMany({
            where: {
              from: {
                userId: user.id
              }
            }
          });
          await prisma.message.deleteMany({
            where: {
              to: {
                userId: user.id
              }
            }
          });
          await prisma.messageTo.deleteMany({
            where: {
              userId: user.id
            }
          });
          await prisma.messageFrom.deleteMany({
            where: {
              userId: user.id
            }
          });

          await prisma.user.delete({
            where: {
              id: Number(req.query.id)
            }
          });

          await prisma.account.deleteMany({
            where: {
              userId: Number(req.query.id)
            }
          });

          res.status(200).json({});
        }
        catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
      else {
        res.setHeader("Allow", "DELETE");
        res.status(405).end("Method Not Allowed");
      }
    }
    else {
      res.status(401).end("Not Authorized");
    }
  }
  else {
    res.status(401).end("Not Authorized");
  }
}

