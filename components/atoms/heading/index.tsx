import React from "react";
import { mapModifiers } from "helpers/libs/utils";

export interface HeadingProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5";
  fontSize?: "28" | "24" | "20" | "16";
  children: React.ReactNode;
  alignment?: "left";
}

const Heading: React.FC<HeadingProps> = ({
  tag,
  children,
  fontSize,
  alignment,
}) => {
  const classes = mapModifiers("a-heading", fontSize, alignment);
  switch (tag) {
    case "h1":
      return <h1 className={classes}>{children}</h1>;
    case "h2":
      return <h2 className={classes}>{children}</h2>;
    case "h3":
      return <h3 className={classes}>{children}</h3>;
    case "h4":
      return <h4 className={classes}>{children}</h4>;
    case "h5":
      return <h5 className={classes}>{children}</h5>;
    default:
      return <div className={classes}>{children}</div>;
  }
};

export default Heading;
