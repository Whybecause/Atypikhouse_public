// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../lib/db/prisma";
import authMiddleware from "../../../../../utils/middlewares/auth.middleware";
import roleMiddleware from "../../../../../utils/middlewares/role.middleware";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const session = await authMiddleware(req);

  if (session) {
    const authorized = await roleMiddleware(session);

    if (authorized) {
      if (req.method === "GET") {

        try {
          const users = await prisma.user.findMany({
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              role: true,
              customImage: true
            }
          });

          res.status(200).json({ users });
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
  else {
    res.status(401).end("Not Authorized");
  }
}
