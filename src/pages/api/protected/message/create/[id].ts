// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../lib/db/prisma";
import authMiddleware from "../../../../../utils/middlewares/auth.middleware";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  let newMessage;
  let result;
  const session = await authMiddleware(req);
  if (session) {
    if (req.method === "POST") {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email
          },
          include: {
            customImage: {
              select: {
                uri: true
              }
            }
          }
        });

        const receiverName = await prisma.user.findUnique({
          where: {
            id: Number(req.query.id)
          }
        });

        newMessage = await prisma.message.create({
          data: {
            content: req.body.content,
            from: {
              create: { userId: user.id }
            },
            to: {
              create: { userId: Number(req.query.id) }
            }
          }
        });

        result = {
          id: newMessage.id,
          content: newMessage.content,
          createdAt: newMessage.createdAt.toISOString(),
          roomId: Number(req.query.id),
          senderId: user.id,
          senderName: user.name,
          senderImage: user.customImage ? user.customImage.uri : user.image,
          contactName: receiverName.name,
          asBeenRead: newMessage.asBeenRead,
          pending: false
        };

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
