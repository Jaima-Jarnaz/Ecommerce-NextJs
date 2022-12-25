export interface InputProps {
  type: string;
  placeholder?: string;
  children?: React.ReactNode;
  name?: string;
  label?: string;
  id?: string;
}
const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  children,
  name,
  label,
  id,
}) => {
  return (
    <div className="a-input">
      {label ? (
        <label className="a-input__label" htmlFor={id}>
          {label}
        </label>
      ) : (
        ""
      )}
      <input
        className="a-input__input"
        type={type}
        placeholder={placeholder}
        name={name}
      >
        {children}
      </input>
    </div>
  );
};

export default Input;
