export interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className="a-button">{children}</button>;
};

export default Button;
