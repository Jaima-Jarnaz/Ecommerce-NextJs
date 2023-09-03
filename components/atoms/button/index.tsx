import { mapModifiers } from "helpers/libs/utils";
export interface ButtonProps {
  children: React.ReactNode;
  type: "primary" | "secondary" | "ternary" | "small";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, type, onClick }) => {
  return (
    <button className={mapModifiers("a-button", type)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
