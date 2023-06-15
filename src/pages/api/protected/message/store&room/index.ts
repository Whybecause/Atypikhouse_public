// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../lib/db/prisma";
import authMiddleware from "../../../../../utils/middlewares/auth.middleware";
import { sortByNewestDate } from "../../../../../utils/helpers/dates-helper";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const session = await authMiddleware(req);

  if (session) {
    if (req.method === "GET") {
      let messagesToMe;
      let messagesFromMe;

      try {
        const { id: userId } = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
        });

        messagesToMe = await prisma.message.findMany({
          where: {
            to: {
              userId: userId
            }
          },
          include: {
            from: {
              select: {
                userId: true,
                user:
                {
                  select: {
                    name: true,
                    image: true,
                    customImage: true
                  }
                }
              }
            },
            to: {
              select: {
                userId: true,
              }
            }
          }
        });

        messagesFromMe = await prisma.message.findMany({
          where: {
            from: {
              userId: userId
            }
          },
          include: {
            to: {
              select: {
                userId: true,
                user:
                {
                  select: {
                    name: true
                  }
                }
              }
            },
            from: {
              select: {
                userId: true,
                user: {
                  select: {
                    name: true,
                    image: true,
                    customImage: true
                  }
                }
              }
            }
          }
        });

        const formatedFromMe = messagesFromMe.map(msg => {
          return {
            id: msg.id,
            content: msg.content,
            createdAt: msg.createdAt.toISOString(),
            roomId: msg.to.userId,
            senderId: msg.from.userId,
            senderName: msg.from.user.name,
            contactName: msg.to.user.name,
            senderImage: msg.from.user.customImage ? msg.from.user.customImage.uri : msg.from.user.image,
            asBeenRead: msg.asBeenRead
          };
        });

        const formatedToMe = messagesToMe.map(message => {
          return {
            id: message.id,
            content: message.content,
            createdAt: message.createdAt.toISOString(),
            roomId: message.from.userId,
            senderId: message.from.userId,
            senderName: message.from.user.name,
            contactName: message.from.user.name,
            senderImage: message.from.user.customImage ? message.from.user.customImage.uri : message.from.user.image,
            asBeenRead: message.asBeenRead
          };
        });

        const toMeFromMe = await formatedToMe.concat(formatedFromMe);
        sortByNewestDate(toMeFromMe);

        res.status(200).json({ toMeFromMe });
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

