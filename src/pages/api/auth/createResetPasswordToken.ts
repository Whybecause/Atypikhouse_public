// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";
import addDays from "date-fns/addDays";
import Crypto from "crypto";

// Import Internal Dependencies
import prisma from "../../../lib/db/prisma";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  if (req.method === "POST") {

    try {
      const { email } = req.body;
      const { password: userPassword } = await prisma.user.findUnique({
        where: { email: email }
      });

      if (!userPassword) {
        throw new Error("Passez par votre compte Google pour modifier votre mot de passe");
      }

      const verification = await prisma.verificationRequest.create({
        data: {
          identifier: email,
          token: Crypto.randomBytes(16).toString("hex"),
          expires: addDays(new Date(), 1)
        }
      });

      res.status(200).json({ verification });
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
