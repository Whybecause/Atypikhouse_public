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
      const { emailFrom, emailTo, message, subject, dateStart, dateEnd, city } = req.body;
      const html = `<h2>Annulation de votre réservation du ${dateStart} au ${dateEnd} à ${city}, contact: ${emailFrom})</h2><h4>${message}</h4>`;
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
