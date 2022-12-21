export interface ContainerProps {
  children: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return <section className="a-container">{children}</section>;
};

export default Container;
