import { mapModifiers } from "../../../helpers/libs/utils";
export type ContainerProps = {
  children: React.ReactNode;
};
const Section: React.FC<ContainerProps> = ({ children }) => {
  return <section className={mapModifiers("a-section")}>{children}</section>;
};

export default Section;
