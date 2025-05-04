import { stripe } from "@/src/lib/stripe";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Price not found." });
  }

  const sucessURL = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelURL = `${process.env.NEXT_URL}`;

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelURL,
    success_url: sucessURL,
    //mode payment: usuário só vai realizar 1 pagamento, credenciais do cartão e finaliza
    mode: "payment",
    line_items: items.map((product) => ({
      price: product.price,
      quantity: product.quantity,
    })),
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
