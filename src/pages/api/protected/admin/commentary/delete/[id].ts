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
      if (req.method === "DELETE") {

        try {
          const historical = await prisma.historique.findUnique({
            where: {
              id: Number(req.query.id)
            },
            include: {
              commentary: true,
              vote: true
            }
          });

          if (historical.commentary.length) {
            const commentaryId = historical?.commentary[0].id;
            if (commentaryId) {
              await prisma.commentary.delete({
                where: {
                  id: commentaryId
                }
              });
            }
          }

          if (historical.vote.length) {
            const voteId = historical?.vote[0].id;
            if (voteId) {
              await prisma.vote.delete({
                where: {
                  id: voteId
                }
              });
            }
          }

          res.status(204).end();
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
      else {
        res.setHeader("Allow", "DELETE");
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
