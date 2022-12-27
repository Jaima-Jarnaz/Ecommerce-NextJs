import { mapModifiers } from "helpers/libs/utils";
export type SplitFieldProps = {
  children: React.ReactNode;
};
const SplitField: React.FC<SplitFieldProps> = ({ children }) => {
  const classes = mapModifiers("a-splitField");

  return <div className={classes}>{children}</div>;
};

export default SplitField;
