import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { Container } from "../styles/pages/app";
import "../styles/pages/home-slider.css";
import { CartProvider } from "use-shopping-cart";
import { useState } from "react";
import Cart from "../components/cart";
import { HeaderWithCart } from "../components/header-with-cart";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
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
        <HeaderWithCart handleChangeCartVisible={handleChangeCartVisible} />

        <Component {...pageProps} />
        {cartIsVisible && (
          <Cart handleChangeCartVisible={handleChangeCartVisible} />
        )}
      </Container>
    </CartProvider>
  );
}
