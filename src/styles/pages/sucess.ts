import { styled } from "..";

export const SuccessContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$lg",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: 1.4,
  },

  a: {
    display: "block",
    marginTop: "5rem",
    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",
    fontWeight: "bold",

    "&:hover": {
      color: "$green300",
    },
  },
});
export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 640,
  height: 145,
  background: "$gray900",
  borderRadius: 8,
  paddig: "0.25rem",
  marginTop: "4rem",
  // position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const CircularImage = styled("div", {
  width: "100%",
  maxWidth: 140,
  height: 140,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 99,
  // position: "absolute",
  // transform: "translate(50%, -50%)",
  // right: 0,
  // top: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 60px black",
  marginLeft: "-35px",

  "&:first-child": {
    marginLeft: "0",
  },

  img: {
    objectFit: "cover",
  },
});
