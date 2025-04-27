// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from "@/src/lib/stripe";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const priceID = "price_1RG7624Ta9Tnroq9xKdubjrT";
  const sucessURL = `${process.env.NEXT_URL}/success`;
  const cancelURL = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: cancelURL,
    success_url: sucessURL,
    //mode payment: usuário só vai realizar 1 pagamento, credenciais do cartão e finaliza
    mode: "payment",
    line_items: [
      {
        price: priceID,
        quantity: 1,
      },
    ],
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
