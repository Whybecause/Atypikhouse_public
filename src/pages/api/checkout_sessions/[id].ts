// Import Third-party Dependencies
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Import Internal Dependencies
import prisma from "../../../lib/db/prisma";

// CONSTS
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const id: string = req.query.id as string;

  try {
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession ID.");
    }

    const { client_reference_id: clientRefId, metadata } = await stripe.checkout.sessions.retrieve(
      id,
      { expand: ["payment_intent"] }
    );

    const historical = await prisma.historique.create({
      data: {
        propertyId: Number(metadata.propertyId),
        userId: Number(clientRefId),
        dateStart: metadata.dateStart,
        dateEnd: metadata.dateEnd,
        price: Number(metadata.price)
      },
      include: {
        property: {
          select: {
            userId: true
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    res.status(200).json({ historical });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}
