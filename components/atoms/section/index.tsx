import { mapModifiers } from "../../../helpers/libs/utils";
export type ContainerProps = {
  children: React.ReactNode;
  padding?: "10" | "30";
  margin?: "margin-8";
  width?: "width-40" | "width-50" | "width-60" | "width-70" | "width-80";
};
const Section: React.FC<ContainerProps> = ({
  children,
  padding,
  margin,
  width,
}) => {
  return (
    <section className={mapModifiers("a-section", padding, margin, width)}>
      {children}
    </section>
  );
};

export default Section;
