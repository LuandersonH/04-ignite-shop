import { styled } from "..";

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  div: {
    position: "relative",
    width: "3rem",
    height: "3rem",
    padding: 12,
    borderRadius: 6,
    backgroundColor: "$gray800",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",

    span: {
      position: "absolute",
      right: 0,
      top: 0,
      transform: "translate(50%, -50%)",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      width: "1.5rem",
      height: "1.5rem",
      padding: "0.5rem",
      borderRadius: "100%",

      color: "$white",
      backgroundColor: "$green500",
      boxShadow: "0 0 0 3px $colors$gray900",

      "&:hover": {
        backgroundColor: "$green300",
      },
    },
  },
});
