import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import logoImg from "../assets/logo.svg";
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";
import { useRouter } from "next/router";
import { Handbag } from "@phosphor-icons/react";
import "../styles/pages/home-slider.css";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
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
        <div>
          <Handbag size={24} cursor="pointer" />
        </div>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
