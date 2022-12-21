export interface TextProps {
  children: React.ReactNode;
}
const Text: React.FC<TextProps> = ({ children }) => {
  return <p className="a-text">{children}</p>;
};

export default Text;
