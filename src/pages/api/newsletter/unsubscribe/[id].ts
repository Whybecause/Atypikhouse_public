// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../lib/db/prisma";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  if (req.method === "PUT") {
    const mail = req.query.id ? String(req.query.id) : "";

    try {
      await prisma.newsletter.updateMany({
        where: {
          mail: mail
        },
        data: {
          active: false
        }
      });

      res.status(200).json({});
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