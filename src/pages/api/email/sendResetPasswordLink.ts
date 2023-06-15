// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import addDays from "date-fns/addDays";

// Import Internal Dependencies
import prisma from "../../../lib/db/prisma";
import transporter from "../../../utils/helpers/transporter.helper";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  if (req.method === "POST") {

    try {
      const email = req.body.email ? req.body.email : {};

      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      const account = await prisma.account.findMany({
        where: {
          userId: user.id
        }
      });

      if (account.length) {
        throw new Error("Passez par votre compte Google pour modifier votre mot de passe");
      }

      const verification = await prisma.verificationRequest.create({
        data: {
          identifier: email,
          token: crypto.randomBytes(16).toString("hex"),
          expires: addDays(new Date(), 1)
        }
      });

      const html = `
      <h1>
        Votre demande de réinitialisation de mot de passe.
      </h1>
      <div>Cliquez sur le lien ci-dessous pour changer votre mot de passe :
      <a href=${process.env.CLIENT_URL}resetPassword/${verification.identifier}?token=${verification.token}>Réinitialiser</a>
      </div>`;
      const subject = "Réinitialisation de votre mot de passe";
      const mailData = {
        from: process.env.ADMIN_EMAIL,
        to: verification.identifier,
        subject: subject,
        html: html
      };

      await transporter.sendMail(mailData);

      res.status(200).json({});
    }
    catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
