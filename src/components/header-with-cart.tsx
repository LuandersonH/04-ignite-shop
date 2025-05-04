import { Handbag } from "@phosphor-icons/react";
import Image from "next/image";
import logoImg from "../assets/logo.svg";
import { Header } from "../styles/components/header-with-cart";
import { useRouter } from "next/router";
import { useShoppingCart } from "use-shopping-cart";

interface handleChangeCartVisibleProps {
  handleChangeCartVisible: () => void;
}

export function HeaderWithCart({
  handleChangeCartVisible,
}: handleChangeCartVisibleProps) {
  const router = useRouter();
  const { cartCount } = useShoppingCart();

  return (
    <Header>
      <Image
        src={logoImg}
        alt="Logo do Ignite"
        onClick={() => {
          router.push("/");
        }}
        style={{ cursor: "pointer" }}
      />
      <div onClick={handleChangeCartVisible}>
        <Handbag size={24} weight="bold" color="#8D8D99" />
        {cartCount! > 0 && <span>{cartCount}</span>}
      </div>
    </Header>
  );
}
