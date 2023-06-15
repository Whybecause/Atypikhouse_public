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

      try {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            mainAdressId: true,
            image: true,
            customImage: {
              select: {
                uri: true
              }
            }
          }
        });

        if (user) {
          res.status(200).json({ user });
        }
        else {
          res.status(404).json("Not found");
        }
      }
      catch (error) {
        res.status(500).json({ message: error.message });
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
