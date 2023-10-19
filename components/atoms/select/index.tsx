import React from "react";
import Select from "react-select";

export type CustomSelectOptions = {
  value: string | number | null;
  label: string | number | null;
};
export interface CustomSelectProps {
  options: CustomSelectOptions[];
  label?: string;
  onchange?: (selectedOption: CustomSelectOptions | null) => void; // Correct the prop type
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  label,
  onchange,
}) => (
  <div className="a-custom-select">
    {label ? (
      <label className="a-custom-select__label" htmlFor={label}>
        {label}
      </label>
    ) : (
      ""
    )}
    <Select
      className="a-custom-select__container"
      classNamePrefix="a-custom-select"
      options={options}
      onChange={onchange}
    />
  </div>
);

export default CustomSelect;
