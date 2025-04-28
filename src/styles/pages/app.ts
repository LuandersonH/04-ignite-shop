import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
  overflow: "hidden",
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  div: {
    width: 42,
    height: 42,
    backgroundColor: "$gray200",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
