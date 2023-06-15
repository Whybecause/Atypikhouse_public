// Import Third-party dependencies
import Pusher from "pusher";
import { NextApiRequest, NextApiResponse } from "next";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const channel = req.body.channel;
  try {
    await pusher.trigger(channel, "chat-event", {
      ...req.body
    });
    res.status(200).json({});
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}
