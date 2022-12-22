import { mapModifiers } from "../../../helpers/libs/utils";
export interface ContainerProps {
  padding?: "30" | "40";
  width?: "300" | "400";
  alignment?: "center" | "left";
  display?: "flex";
  children: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({
  children,
  padding,
  width,
  alignment,
  display,
}) => {
  return (
    <section
      className={mapModifiers(
        "a-container",
        padding,
        width,
        alignment,
        display
      )}
    >
      {children}
    </section>
  );
};

export default Container;
