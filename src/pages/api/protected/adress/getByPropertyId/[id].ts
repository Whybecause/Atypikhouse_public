// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../../lib/db/prisma";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  if (req.method === "GET") {
    try {
      const adress = await prisma.adress.findFirst({
        where: {
          property: {
            id: Number(req.query.id)
          }
        }
      });

      res.status(200).json({ adress });
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
