import { mapModifiers } from "helpers/libs/utils";
export interface ButtonProps {
  children: React.ReactNode;
  type: "primary" | "secondary" | "ternary" | "small";
  onClick?: () => void;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  isDisabled,
  ...props
}) => {
  return (
    <button
      className={mapModifiers("a-button", type)}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
