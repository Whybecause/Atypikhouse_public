import { NextApiRequest, NextApiResponse } from "next";

// Internal Dependencies
import prisma from "../../../lib/db/prisma";
import { CURRENCY } from "../../../config";
import { formatAmountForStripe } from "../../../utils/helpers/amount-helpers";
import authMiddleware from "../../../utils/middlewares/auth.middleware";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const session = await authMiddleware(req);
  if (session) {
    if (req.method === "POST") {
      const amount: number = req.body.amount;
      try {
        const { id: userId } = await prisma.user.findUnique({
          where: {
            email: session.user.email
          }
        });

        // Create Checkout Sessions from body params.
        const params: Stripe.Checkout.SessionCreateParams = {
          submit_type: "pay",
          payment_method_types: ["card"],
          line_items: [
            {
              name: "Réservation",
              amount: formatAmountForStripe(amount, CURRENCY),
              currency: CURRENCY,
              quantity: 1,
            },
          ],
          client_reference_id: String(userId),
          metadata: {
            propertyId: req.body.propertyId,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd,
            price: req.body.price
          },
          success_url: `${req.headers.origin}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
        };
        const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
          params
        );

        res.status(200).json(checkoutSession);
      } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  }
}
