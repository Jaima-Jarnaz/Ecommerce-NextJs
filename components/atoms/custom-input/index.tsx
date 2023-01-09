export interface CustomInputProps {
  type: string;
  placeholder?: string;
  children?: React.ReactNode;
  name?: string;
  label?: string;
  id?: string;
  ref?: React.Ref<HTMLInputElement>;
  value?: any;
  handleChange: any;
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
  ...props
}) => {
  return (
    <div className="a-custom-input">
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
      />
    </div>
  );
};

export default CustomInput;
