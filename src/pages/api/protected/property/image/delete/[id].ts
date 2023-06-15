// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../../lib/db/prisma";
import authMiddleware from "../../../../../../utils/middlewares/auth.middleware";
import { del } from "../../../../../../utils/middlewares/cloudinary.middleware";
import { isArray } from "lodash";

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
      const { publicID } = req.body;
      let formatedPublicIDs;

      if (!isArray(publicID)) {
        formatedPublicIDs = [publicID];
      }
      else {
        formatedPublicIDs = publicID;
      }

      try {
        await del(formatedPublicIDs);

        await prisma.image.deleteMany({
          where: {
            publicID: formatedPublicIDs
          }
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
