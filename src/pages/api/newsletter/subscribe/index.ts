// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import prisma from "../../../../lib/db/prisma";
import transporter from "../../../../utils/helpers/transporter.helper";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  if (req.method === "POST") {
    const mail = req.body.mail ? req.body.mail : {};

    try {
      const alreadySubscribed = await prisma.newsletter.findFirst({
        where: {
          mail: mail
        }
      });

      if (!alreadySubscribed) {
        await prisma.newsletter.create({
          data: { mail }
        });

        //Sending email
        const html = `
        <h1>Merci pour votre inscription à la newsletter !</h1>
        <p>A très vite sur <a href=${process.env.CLIENT_URL}>Atypikhouse</a> !</p>
        <a href=${process.env.CLIENT_URL}/newsletter/unsubscribe/${mail}>Se désinscrire</a>
        `;
        const subject = "Inscription à la newsletter";
        const mailData = {
          from: process.env.ADMINI_EMAIL,
          to: mail,
          subject: subject,
          html: html
        };

        await transporter.sendMail(mailData);
      } else {
        await prisma.newsletter.updateMany({
          where: {
            mail: mail
          },
          data: {
            active: true
          }
        });
      }

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