// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../../lib/db/prisma";
import authMiddleware from "../../../../../../utils/middlewares/auth.middleware";
import roleMiddleware from "../../../../../../utils/middlewares/role.middleware";
import { del, upload } from "../../../../../../utils/middlewares/cloudinary.middleware";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const session = await authMiddleware(req);

  if (session) {
    const authorized = await roleMiddleware(session);

    if (authorized) {
      if (req.method === "PUT") {
        const data = req.body.data ? req.body.data : {};
        let image = null;

        try {
          const equipement = await prisma.equipementType.findUnique({
            where: {
              id: Number(req.query.id)
            },
            include: {
              image: {
                select: {
                  publicID: true
                }
              }
            }
          });

          if (req.body.image) {
            await del([equipement.image[0].publicID]);
            await prisma.image.delete({
              where: {
                publicID: equipement.image[0].publicID
              }
            });

            image = await upload(req.body.image);

            if (image.length > 0) {
              await prisma.image.create({
                data: {
                  publicID: image[0].publicID,
                  uri: image[0].url,
                  alt: `Avatar for Equipement Type ${equipement.label}`,
                  equipementType: {
                    connect: { id: equipement.id }
                  }
                }
              });
            }
          }

          await prisma.equipementType.update({
            where: {
              id: Number(req.query.id)
            },
            data
          });

          res.status(204).end();
        }
        catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
      else {
        res.setHeader("Allow", "PUT");
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
