// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

// Import Internal Dependencies
import prisma from "../../../../../../lib/db/prisma";
import authMiddleware from "../../../../../../utils/middlewares/auth.middleware";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const session = await authMiddleware(req);

  if (session) {
    if (req.method === "PUT") {

      try {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
        });

        if (!user.password) {
          throw new Error("Passez par votre compte Google pour effectuer les modifications");
        }

        if (req.body.password) {
          const checkPassword = await bcrypt.compare(req.body.password, user.password);

          if (!checkPassword) {
            throw new Error("Mauvais mot de passe.");
          }

          const isEqual = req.body.newPassword === req.body.confirmNewPassword;
          if (!isEqual) {
            throw new Error("Votre nouveau mot de passe ne peut-être similaire à l'ancien.");
          }

          await prisma.user.update({
            where: {
              id: user.id
            },
            data: {
              password: await bcrypt.hash(req.body.newPassword, 10)
            }
          });
        }
        else {
          await prisma.user.update({
            where: {
              id: user.id
            },
            data: req.body
          });
        }

        res.status(204).end();
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
  else {
    res.status(401).end("Not Authorized");
  }
}
