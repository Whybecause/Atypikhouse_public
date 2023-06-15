// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../lib/db/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {

  if (req.method === "GET") {
    let result;
    try {
      result = await prisma.equipementType.findMany({
        include: {
          image: true
        }
      });

      res.status(200).json({ result });
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
