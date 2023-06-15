// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../../lib/db/prisma";
import authMiddleware from "../../../../../../utils/middlewares/auth.middleware";

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
  let property;
  let result;

  if (session) {
    if (req.method === "PUT") {
      try {
        property = await prisma.property.findUnique({
          where: {
            id: Number(req.query.id)
          },
          select: {
            images: true
          }
        });

        result = await prisma.property.update({
          where: {
            id: Number(req.query.id)
          },
          data: {
            images: {
              set: [...property.images, req.body]
            }
          }
        });

        res.status(200).json({ result });
      } catch (error) {
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
