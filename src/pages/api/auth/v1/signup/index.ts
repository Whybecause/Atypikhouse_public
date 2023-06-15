// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

// Import Internal Dependencies
import prisma from "../../../../../lib/db/prisma";
import { DEFAULT_IMAGE_URL } from "../../../../../config";

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  if (req.method === "POST") {

    try {
      await prisma.user.create({
        data: {
          name: `${req.body.firstname} ${req.body.lastname}`,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
          image: DEFAULT_IMAGE_URL
        }
      });

      res.status(200).json({});
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
