import { styled } from "..";

export const CartContainer = styled("div", {
  width: 480,
  height: "100vh",
  position: "absolute",
  top: 0,
  right: 0,
  padding: "3rem",

  display: "flex",
  flexDirection: "column",
  backgroundColor: "$gray200",

  header: {
    display: "flex",
    justifyContent: "flex-end",
  },

  h2: {
    marginTop: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "$gray100",
    lineHeight: 1.6,
    fontWeight: "bold",
    fontSize: "$lg",
  },
});

export const ListOfProducts = styled("div", {
  marginTop: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const ProductInsideList = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.25rem",
  height: 95,

  div: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    fontSize: "$md",

    button: {
      all: "unset",
      cursor: "pointer",
      color: "$green500",
      fontWeight: "bold",
    },
  },
});

export const FooterElement = styled("footer", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  marginTop: "auto",
  div: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  "div span:last-child": {
    fontSize: "$lg",
  },

  "div strong": {
    fontSize: "$lg",
  },

  "div strong:last-child": {
    fontSize: "$xl",
  },
});

export const BuyButton = styled("button", {
  width: "100%",
  height: 70,
  marginTop: "3.5625rem",
  color: "$white",
  fontSize: "lg",
  fontWeight: "bold",
  backgroundColor: "$green300",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "$green500",
  },

  "&:disabled": {
    cursor: "not-allowed",
  },
});
