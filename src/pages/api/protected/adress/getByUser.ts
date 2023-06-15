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
    if (req.method === "GET") {
      let adresses;

      try {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
        });

        adresses = await prisma.adress.findMany({
          where: {
            userId: user.id
          }
        });

        res.status(200).json({ adresses });
      }
      catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
    else {
      res.setHeader("Allow", "GET");
      res.status(405).end("Method Not Allowed");
    }
  }
  else {
    res.status(401).end("Not Authorized");
  }
}
