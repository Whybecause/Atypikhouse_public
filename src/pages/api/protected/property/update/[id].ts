// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../lib/db/prisma";
import authMiddleware from "../../../../../utils/middlewares/auth.middleware";
import { del, upload } from "../../../../../utils/middlewares/cloudinary.middleware";

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
      let images = null;
      let result;
      const data = req.body.data ? req.body.data : {};
      const {
        name,
        description,
        equipments,
        price,
        propertyTypeId: propertyType,
        equipementTypeIds: equipementType,
      } = data;

      const formatedData = {
        name, description, equipments, price,
        propertyType, equipementType
      };

      try {
        const { id: userId } = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
        });

        const { userId: propertyUserId } = await prisma.property.findUnique({
          where: {
            id: Number(req.query.id)
          }
        });

        if (userId !== propertyUserId) {
          throw new Error("Forbidden");
        }

        const formatedImages = [];

        if (req.body.images) {
          images = await upload(req.body.images);

          for (const image of images) {
            formatedImages.push({
              uri: image.url,
              alt: "Property Image",
              publicID: image.publicID
            });
          }
        }

        if (req.body.imagesToDel && Array.isArray(req.body.imagesToDel)) {
          await del(req.body.imagesToDel);

          for (const publicId of req.body.imagesToDel) {
            await prisma.image.delete({
              where: {
                publicID: publicId
              }
            });
          }
        }

        const formatedId = [];

        for (const id of equipementType) {
          formatedId.push({ id });
        }

        await prisma.property.update({
          where: {
            id: Number(req.query.id)
          },
          data: {
            ...formatedData,
            equipementType: {
              set: formatedId
            },
            propertyType: {
              connect: {
                id: propertyType
              }
            },
            images: {
              createMany: {
                data: formatedImages,
              },
            },
          }
        });

        result = await prisma.property.findUnique({
          where: {
            id: Number(req.query.id)
          },
          include: {
            images: true,
            propertyType: true,
            equipementType: true
          }
        });

        res.status(200).json({ result });
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
