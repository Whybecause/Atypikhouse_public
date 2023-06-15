// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../lib/db/prisma";
import authMiddleware from "../../../../utils/middlewares/auth.middleware";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const session = await authMiddleware(req);

  if (session) {
    if (req.method === "POST") {
      let adress;

      try {
        const { id: userId } = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
        });

        adress = await prisma.adress.create({
          data: {
            street: req.body.street,
            city: req.body.city,
            ZIPCode: req.body.ZIPCode,
            country: req.body.country,
            additional: req.body.additional ?? undefined,
            property: req.body.propertyId ?? undefined,
            userId: userId
          }
        });

        res.status(200).json({ adress });
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
