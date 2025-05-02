import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import logoImg from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";
import { useRouter } from "next/router";
import { Handbag } from "@phosphor-icons/react";
import "../styles/pages/home-slider.css";
import { CartProvider } from "use-shopping-cart";
import { useState } from "react";
import Cart from "../components/cart";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [cartIsVisible, setCartIsVisible] = useState(false);

  function handleChangeCartVisible() {
    setCartIsVisible(!cartIsVisible);
  }

  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.STRIPE_PUBLIC_KEY!}
      currency="BRL"
      loading={<p aria-live="polite">Loading redux-persist...</p>}
      shouldPersist={true}
    >
      <Container>
        <Header>
          <Image
            src={logoImg}
            alt=""
            onClick={() => {
              router.push("/");
            }}
            style={{ cursor: "pointer" }}
          />
          <div onClick={handleChangeCartVisible}>
            <Handbag size={24} weight="bold" color="#8D8D99" />
          </div>
        </Header>
        <Component {...pageProps} />
        {cartIsVisible && (
          <Cart handleChangeCartVisible={handleChangeCartVisible} />
        )}
      </Container>
    </CartProvider>
  );
}
