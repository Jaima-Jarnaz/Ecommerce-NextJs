import { mapModifiers } from "helpers/libs/utils";

export interface CustomInputProps {
  type: string;
  placeholder?: string;
  children?: React.ReactNode;
  name?: string;
  label?: string;
  id?: string;
  ref?: React.Ref<HTMLInputElement>;
  readOnly?: boolean;
  value?: any;
  handleChange?: any;
  padding?: "padding-10" | "padding-12";
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  children,
  name,
  label,
  id,
  value,
  ref,
  handleChange,
  readOnly,
  padding,
  ...props
}) => {
  return (
    <div className={mapModifiers("a-custom-input", padding)}>
      {label ? (
        <label className="a-custom-input__label" htmlFor={id}>
          {label}
        </label>
      ) : (
        ""
      )}
      <input
        className="a-custom-input__input"
        type={type}
        placeholder={placeholder}
        name={name}
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
      />
    </div>
  );
};

export default CustomInput;
