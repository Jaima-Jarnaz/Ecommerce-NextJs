import { mapModifiers } from "helpers/libs/utils";
export interface TextProps {
  children: React.ReactNode;
  fontSize?: "18" | "16" | "14" | "12";
  fontWeight?: "bold";
  color?: "gray" | "deep-purple";
}
const Text: React.FC<TextProps> = ({ children, fontSize, fontWeight }) => {
  return (
    <p className={mapModifiers("a-text", fontSize, fontWeight)}>{children}</p>
  );
};

export default Text;
