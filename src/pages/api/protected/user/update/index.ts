// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../lib/db/prisma";
import authMiddleware from "../../../../../utils/middlewares/auth.middleware";
import { upload, del } from "../../../../../utils/middlewares/cloudinary.middleware";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    }
  }
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const session = await authMiddleware(req);

  if (session) {
    if (req.method === "PUT") {
      const data = req.body.data ? req.body.data : {};
      let image = null;

      try {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email
          },
          include: {
            customImage: {
              select: {
                publicID: true
              }
            }
          }
        });

        if (req.body.image) {
          image = await upload(req.body.image);

          if (image.length > 0) {
            await prisma.image.create({
              data: {
                publicID: image[0].publicID,
                uri: image[0].url,
                alt: `Avatar for ${session.user.name}`,
                user: {
                  connect: { id: user.id }
                }
              }
            });
          }

          if (user.customImage) {
            await del([user.customImage.publicID]);

            await prisma.image.delete({
              where: {
                publicID: user.customImage.publicID
              }
            });
          }
        }

        await prisma.user.update({
          where: {
            id: user.id
          },
          data
        });

        res.status(200).json({});
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
