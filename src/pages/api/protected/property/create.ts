// Internal Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Internal Internal Dependencies
import prisma from "../../../../lib/db/prisma";
import authMiddleware from "../../../../utils/middlewares/auth.middleware";
import { upload } from "../../../../utils/middlewares/cloudinary.middleware";

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
    if (req.method === "POST") {
      let result;
      let images;

      if (req.body.images) {
        images = await upload(req.body.images);
      }

      try {
        const { id: userId } = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
        });

        const formatedImages = [];

        for (const image of images) {
          formatedImages.push({
            uri: image.url,
            alt: `Image from property of ${session.user.name}`,
            publicID: image.publicID
          });
        }

        const formatedId = [];

        for (const id of req.body.equipementTypeIds) {
          formatedId.push({ id });
        }

        result = await prisma.property.create({
          data: {
            name: req.body.name,
            description: req.body.description,
            equipments: req.body.equipments,
            price: req.body.price,
            rate: 0,
            user: {
              connect: {
                id: userId
              }
            },
            equipementType: {
              connect: formatedId
            },
            propertyType: {
              connect: {
                id: req.body.propertyTypeId
              }
            },
            images: {
              createMany: {
                data: formatedImages
              }
            },
            adress: {
              create: {
                street: req.body.street,
                city: req.body.city,
                country: req.body.country,
                ZIPCode: req.body.ZIPCode,
                userId: userId,
              },
            }
          },
          include: {
            images: true,
            propertyType: true,
            equipementType: true,
            commentary: true,
            adress: true
          }
        });

        res.status(200).json({ result });
      }
      catch (error) {
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
