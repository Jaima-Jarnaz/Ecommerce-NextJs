import { mapModifiers } from "../../../helpers/libs/utils";
export interface ContainerProps {
  padding?: "30" | "40";
  width?: "300" | "400";
  alignment?: "center" | "left";
  display?: "flex";
  children: React.ReactNode;
  margin?: "auto" | "middle";
}
const Container: React.FC<ContainerProps> = ({
  children,
  padding,
  width,
  alignment,
  display,
  margin,
}) => {
  return (
    <section
      className={mapModifiers(
        "a-container",
        padding,
        width,
        alignment,
        display,
        margin
      )}
    >
      {children}
    </section>
  );
};

export default Container;
