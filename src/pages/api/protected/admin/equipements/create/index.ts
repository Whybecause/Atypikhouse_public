// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../../lib/db/prisma";
import authMiddleware from "../../../../../../utils/middlewares/auth.middleware";
import roleMiddleware from "../../../../../../utils/middlewares/role.middleware";
import { upload } from "../../../../../../utils/middlewares/cloudinary.middleware";

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
    const authorized = await roleMiddleware(session);

    if (authorized) {
      if (req.method === "POST") {
        const data = req.body.data ? req.body.data : {};
        let image = null;
        let result;

        try {
          image = await upload(req.body.image);

          if (image !== null) {
            result = await prisma.equipementType.create({
              data: {
                ...data,
                image: {
                  create: {
                    uri: image[0].url,
                    alt: `Avatar for ${data.label}`,
                    publicID: image[0].publicID
                  }
                }
              },
              include: {
                image: true
              }
            });
          }

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
  else {
    res.status(401).end("Not Authorized");
  }
}
