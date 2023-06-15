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
          const property = await prisma.property.findUnique({
            where: {
              id: Number(req.query.id)
            },
            include: {
              images: {
                select: {
                  publicID: true
                }
              }
            }
          });
          console.log(property);

          const imagesPublicID = [];

          if (property.images !== null && property.images.length) {
            for (const image of property.images) {
              imagesPublicID.push(image.publicID);
              await prisma.image.deleteMany({
                where: {
                  publicID: image.publicID
                }
              });
            }

            await del(imagesPublicID);
          }

          await prisma.commentary.deleteMany({
            where: {
              propertyId: Number(req.query.id)
            }
          });
          await prisma.vote.deleteMany({
            where: {
              propertyId: Number(req.query.id)
            }
          });
          await prisma.historique.deleteMany({
            where: {
              propertyId: Number(req.query.id)
            }
          });
          await prisma.property.delete({
            where: {
              id: Number(req.query.id)
            }
          });

          res.status(204).end();
        }
        catch (error) {
          console.log(error);
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
