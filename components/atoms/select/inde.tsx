import React from "react";
import Select from "react-select";

type CustomSelectOptions = { value: string | number; label: string | number };
export interface CustomSelectProps {
  options: CustomSelectOptions[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options }) => (
  <Select
    className="a-custom-select__container"
    classNamePrefix="a-custom-select"
    options={options}
  />
);

export default CustomSelect;
