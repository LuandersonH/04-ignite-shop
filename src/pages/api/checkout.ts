// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from "@/src/lib/stripe";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { priceId } = req.body;

  if (req.method != "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!priceId) {
    return res.status(400).json({ error: "Price not found." });
  }

  const sucessURL = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelURL = `${process.env.NEXT_URL}`;

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelURL,
    success_url: sucessURL,
    //mode payment: usuário só vai realizar 1 pagamento, credenciais do cartão e finaliza
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
