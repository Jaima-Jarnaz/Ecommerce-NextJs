import React from "react";
import { mapModifiers } from "helpers/libs/utils";

export interface HeadingProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  fontSize?: "28" | "24" | "20" | "16";
  children: React.ReactNode;
  alignment?: "left" | "center";
  textTransform?: boolean | "text-transform";
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  tag: Tag = "h2",
  children,
  fontSize,
  alignment,
  textTransform,
  className,
}) => {
  const classes = `${mapModifiers(
    "a-heading",
    fontSize,
    alignment,
    textTransform === true || textTransform === "text-transform"
      ? "text-transform"
      : undefined
  )} ${className || ""}`.trim();

  return <Tag className={classes}>{children}</Tag>;
};

export default Heading;
