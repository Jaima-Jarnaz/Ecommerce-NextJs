import { IconType } from "./icon-list";
import { mapModifiers } from "helpers/libs/utils";
export type IconProps = {
  iconName: IconType;
};
const Icon: React.FC<IconProps> = ({ iconName, ...props }) => {
  const className = mapModifiers("a-icon", iconName);
  return <span className={className} {...props}></span>;
};

export default Icon;
