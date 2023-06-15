// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

// Import Internal Dependencies
import prisma from "../../../lib/db/prisma";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  if (req.method === "PUT") {

    try {
      const { identifier, token, password, passwordConfirm } = req.body;
      const verification = await prisma.verificationRequest.findUnique({
        where: {
          token: token
        }
      });

      if (!verification) {
        res.status(500).json({ message: "Ce lien a expiré." });
      }
      else if (verification.identifier !== identifier) {
        res.status(500).json({ message: "Vous n'êtes pas autorisé à effectuer cette action." });
      }
      else if (password !== passwordConfirm) {
        res.status(500).json({ message: "Les mots de passe ne sont pas identiques." });
      }
      else {
        await prisma.user.update({
          where: {
            email: identifier
          },
          data: {
            password: await bcrypt.hash(req.body.password, 10)
          }
        });

        await prisma.verificationRequest.delete({
          where: {
            token: token
          }
        });

        res.status(200).json({});
      }
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  else {
    res.setHeader("Allow", "PUT");
    res.status(405).end("Method Not Allowed");
  }
}
