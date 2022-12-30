import { mapModifiers } from "helpers/libs/utils";
export type NoteProps = {
  children: React.ReactNode;
  color?: "green" | "danger";
};

export const Note: React.FC<NoteProps> = ({ children, color }) => {
  return <div className={mapModifiers("a-note", color)}>{children}</div>;
};
