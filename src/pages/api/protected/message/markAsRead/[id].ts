// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../lib/db/prisma";
import authMiddleware from "../../../../../utils/middlewares/auth.middleware";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const session = await authMiddleware(req);

  if (session) {
    if (req.method === "PUT") {

      try {
        const { id: userId } = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
        });

        await prisma.message.updateMany({
          where: {
            from: {
              userId: Number(req.query.id)
            },
            to: {
              userId: userId
            }
          },
          data: req.body
        });

        res.status(204).end();
      }
      catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Impossible de marquer le message comme lu" });
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

