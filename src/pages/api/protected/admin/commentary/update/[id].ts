// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../../lib/db/prisma";
import authMiddleware from "../../../../../../utils/middlewares/auth.middleware";
import roleMiddleware from "../../../../../../utils/middlewares/role.middleware";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const session = await authMiddleware(req);

  if (session) {
    const authorized = await roleMiddleware(session);

    if (authorized) {
      if (req.method === "PUT") {
        const data = req.body ? req.body : {};

        try {
          await prisma.commentary.update({
            where: {
              id: Number(req.query.id)
            },
            data
          });

          res.status(204).end();
        }
        catch (error) {
          res.status(400).json({ message: error.message });
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
  else {
    res.status(401).end("Not Authorized");
  }
}
