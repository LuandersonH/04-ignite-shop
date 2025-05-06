import Link from "next/link";
import {
  CircularImage,
  ImageContainer,
  SuccessContainer,
} from "../styles/pages/sucess";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
    id: string;
  }[];
  totalQuantity: number;
}

export default function Success({
  customerName,
  products,
  totalQuantity,
}: SuccessProps) {
  // Remover produtos duplicados por id, para que cada camiseta seja exibida uma única vez
  const uniqueProducts = products.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.id === product.id)
  );

  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>
        {/* bots não indexarão essa página, de acordo com o meta abaixo */}
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ImageContainer>
          {/* o slice faz com que no máximo 6 camisetas diferentes sejam exibidas, para a estilização se manter. */}
          {uniqueProducts.slice(0, 6).map((item) => {
            return (
              <CircularImage key={item.id}>
                <Image src={item.imageUrl} width={120} height={110} alt="" />
              </CircularImage>
            );
          })}
        </ImageContainer>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{" "}
          <strong>{totalQuantity}</strong>{" "}
          {totalQuantity === 1 ? "camiseta" : "camisetas"} já está a caminho da
          sua casa.
        </p>
        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name;
  const totalQuantity = session.line_items?.data.reduce(
    (acc, item) => acc + (item.quantity ?? 0),
    0
  );
  const products = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product;
    return {
      name: product.name,
      imageUrl: product.images[0],
      id: product.id,
    };
  });

  console.log(customerName);
  console.log(products);

  return {
    props: {
      customerName,
      products,
      totalQuantity,
    },
  };
};
