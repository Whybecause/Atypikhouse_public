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

  let senderId;
  let receiverId;

  let senderMsgId;
  let receiverMsgId;

  let senderFromToId;
  let receiverMsgFromToId;

  if (session) {
    if (req.method === "DELETE") {

      try {
        const { id: userId } = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
        });

        senderId = await prisma.message.findMany({
          where: {
            from: {
              userId: Number(req.query.id)
            },
            to: {
              userId: userId
            }
          }
        });

        receiverId = await prisma.message.findMany({
          where: {
            from: {
              userId: userId
            },
            to: {
              userId: Number(req.query.id)
            }
          }
        });

        senderMsgId = senderId.map(c => c.id);
        receiverMsgId = receiverId.map(c => c.id);

        senderFromToId = senderId.map(c => c.toId); //toId === fromId donc peu importe
        receiverMsgFromToId = receiverId.map(c => c.fromId);
        await prisma.message.deleteMany({
          where: {
            id: {
              in:
                senderMsgId
            }
          }
        });

        await prisma.message.deleteMany({
          where: {
            id: {
              in: receiverMsgId
            }
          }
        });

        await prisma.messageTo.deleteMany({
          where: {
            id: {
              in: senderFromToId
            }
          }
        });

        await prisma.messageFrom.deleteMany({
          where: {
            id: {
              in: senderFromToId
            }
          }
        });

        await prisma.messageTo.deleteMany({
          where: {
            id: {
              in: receiverMsgFromToId
            }
          }
        });

        await prisma.messageFrom.deleteMany({
          where: {
            id: {
              in: receiverMsgFromToId
            }
          }
        });

        res.status(200).end();
      }
      catch (error) {
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
