import { mapModifiers } from "helpers/libs/utils";
export type GridProps = {
  children?: React.ReactNode;
  type: "grid1" | "grid2" | "grid3";
};
const Grid: React.FC<GridProps> = ({ type, children }) => {
  const classes = mapModifiers("a-grid", type);
  return <div className={classes}>{children}</div>;
};

export default Grid;
