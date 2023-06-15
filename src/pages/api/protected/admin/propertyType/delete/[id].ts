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
        let imagePublicID = null;

        try {
          const propertyType = await prisma.propertyType.findUnique({
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

          const deleted = await prisma.propertyType.delete({
            where: {
              id: Number(req.query.id)
            }
          });

          if (deleted) {
            if (propertyType.image.length) {
              imagePublicID = propertyType.image[0].publicID;
              await del([imagePublicID]);

              await prisma.image.delete({
                where: {
                  publicID: imagePublicID
                }
              });
            }
          }

          res.status(204).end();
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
