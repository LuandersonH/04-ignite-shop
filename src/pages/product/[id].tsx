import { stripe } from "@/src/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/src/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price_id: string;
    price: number;
    formattedPrice: string;
    description: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { addItem } = useShoppingCart();

  async function handleAddToCart() {
    try {
      addItem({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        price_id: product.price_id,
        currency: "BRL",
        image: product.imageUrl,
      });
    } catch {
      alert("Falha ao adicionar item ao carrinho");
    }
  }

  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <>
        <Head>
          <title> produto | Ignite Shop</title>
        </Head>
        <ProductContainer>
          <ImageContainer>
            <Image src="" alt="Imagem da camiseta" width={520} height={480} />
          </ImageContainer>
          <ProductDetails>
            <h1>...</h1>
            <span>R$ ...</span>

            <p>...</p>

            <button disabled>Adicionar ao carrinho</button>
          </ProductDetails>
        </ProductContainer>
      </>
    );
  }

  return (
    <>
      <Head>
        <title> {product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            alt="Imagem da camiseta"
            width={520}
            height={480}
          />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>

          <p>
            {product.description} O ID É: {product.price_id}
          </p>

          <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_SAS02569qn4BSH" } }],
    fallback: true,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        formattedPrice: new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        description: product.description,
        price_id: price.id,
      },
    },
    revalidate: 60 * 60 * 1, //1 hour
  };
};
