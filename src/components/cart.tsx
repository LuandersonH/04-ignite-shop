import { X } from "@phosphor-icons/react/dist/ssr";
import {
  BuyButton,
  CartContainer,
  FooterElement,
  ListOfProducts,
  ProductInsideList,
} from "../styles/pages/cart";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { useState } from "react";
import axios from "axios";

interface CartProps {
  handleChangeCartVisible: () => void;
}

export default function Cart({ handleChangeCartVisible }: CartProps) {
  const { cartDetails, removeItem, cartCount, totalPrice } = useShoppingCart();

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleRedirectToCheckout() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        items: Object.values(cartDetails ?? {}).map((product) => ({
          price: product.price_id,
          quantity: product.quantity,
        })),
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
      setIsCreatingCheckoutSession(false);
    } catch {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <>
      <CartContainer>
        <header>
          <X
            size={24}
            onClick={handleChangeCartVisible}
            style={{ cursor: "pointer" }}
          />
        </header>
        <h2>Sacola de compras</h2>
        <ListOfProducts>
          {Object.values(cartDetails ?? {}).map((product) => (
            <ProductInsideList key={product.id}>
              <Image
                alt={product.name}
                src={product.image ?? ""}
                width={95}
                height={95}
              />
              <div>
                <p>{product.name}</p>
                <strong>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price / 100)}{" "}
                  x {product.price_id} x {product.quantity}
                </strong>
                <button onClick={() => removeItem(product.id)}>Remover</button>
              </div>
            </ProductInsideList>
          ))}
        </ListOfProducts>
        <FooterElement>
          <div>
            <span>Quantidade</span>
            <span>{cartCount}</span>
          </div>
          <div>
            <strong>Valor</strong>
            <strong>
              {totalPrice &&
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalPrice / 100)}
            </strong>
          </div>
          <BuyButton
            disabled={isCreatingCheckoutSession || cartCount === 0}
            onClick={handleRedirectToCheckout}
          >
            Finalizar compra
          </BuyButton>
        </FooterElement>
      </CartContainer>
    </>
  );
}
