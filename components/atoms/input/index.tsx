import React, { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder?: string;
  children?: React.ReactNode;
  name?: string;
  label?: string;
  id?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = forwardRef(
  ({ type, placeholder, children, name, label, id, ...props }, ref) => {
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
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
