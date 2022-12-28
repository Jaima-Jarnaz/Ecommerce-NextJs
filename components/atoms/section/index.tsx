import { mapModifiers } from "../../../helpers/libs/utils";
export type ContainerProps = {
  children: React.ReactNode;
  padding?: "30";
};
const Section: React.FC<ContainerProps> = ({ children, padding }) => {
  return (
    <section className={mapModifiers("a-section", padding)}>{children}</section>
  );
};

export default Section;
