import React from "react";
import "./background.css";
import defaultBg from "./images/anunay-rai-_a6zxdgt9Qs-unsplash.jpg";

function Background({ children, background }) {
  let style;
  if (background === "light" || background === null) {
    style = {
      background: "#f3f4f6", // light solid color
      minHeight: "100vh",
      width: "100%",
      transition: "background 0.3s",
    };
  } else {
    style = {
      backgroundImage: `url(${background ? background : defaultBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      width: "100%",
      transition: "background-image 0.3s",
    };
  }
  return <div style={style}>{children}</div>;
}

export default Background;