// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";

// Import Internal Dependencies
import transporter from "../../../utils/helpers/transporter.helper";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  if (req.method === "POST") {

    try {
      const { emailTo, firstname } = req.body;
      const html = `
      <h1>Bienvenue ${firstname} !</h1>
      <h2>Merci de nous rejoindre sur Atypikhouse.</h2>

      <p>Rendez-vous sur <a href=${process.env.CLIENT_URL}>${process.env.CLIENT_URL}</a> pour commencer à louer ou à proposer vos logements insolites !</p>`;
      const subject = "Bienvenue chez Atypikhouse !";
      const mailData = {
        from: process.env.ADMIN_EMAIL,
        to: emailTo,
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
