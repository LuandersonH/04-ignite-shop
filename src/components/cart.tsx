import { X } from "@phosphor-icons/react/dist/ssr";
import {
  CartContainer,
  ListOfProducts,
  ProductInList,
  ProductInsideList,
} from "../styles/pages/cart";
import Image from "next/image";

export default function Cart() {
  return (
    <>
      <CartContainer>
        <header>
          <X size={24} />
        </header>
        <h2>Sacola de compras</h2>
        <ListOfProducts>
          <ProductInsideList>
            <Image alt="" src="" width={95} height={95} />
            <div>
              <p>Camiseta Beyond The Limits</p>
              <strong>R$ 79,90</strong>
              <button>Remover</button>
            </div>
          </ProductInsideList>
          <ProductInsideList>
            <Image alt="" src="" width={95} height={95} />
            <div>
              <p>Camiseta Beyond The Limits</p>
              <strong>R$ 79,90</strong>
              <button>Remover</button>
            </div>
          </ProductInsideList>
          <ProductInsideList>
            <Image alt="" src="" width={95} height={95} />
            <div>
              <p>Camiseta Beyond The Limits</p>
              <strong>R$ 79,90</strong>
              <button>Remover</button>
            </div>
          </ProductInsideList>
        </ListOfProducts>
      </CartContainer>
    </>
  );
}
