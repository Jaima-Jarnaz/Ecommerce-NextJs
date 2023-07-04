import { ChangeEvent, useState } from "react";

export type Option = {
  value: string;
  label: string;
};

export interface BrandTypes {
  options: Option[];
  onOptionDataChange: (arg1: undefined, arg2: undefined, value: string) => void;
}
export const BrandFilter = ({ onOptionDataChange, options }: BrandTypes) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  // handler for change event
  const optionFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    onOptionDataChange(undefined, undefined, e.target.value); //calling function which is declared in parent component
  };

  return (
    <div className="m-brand-filter">
      <div className="m-brand-filter__content">
        <h5>Brand</h5>
      </div>
      {options.map((option, index) => {
        return (
          <label key={index}>
            <input
              className="m-brand-filter__input"
              name="brand"
              value={option.value}
              type="radio"
              onChange={optionFilterHandler}
              checked={selectedValue === option.value}
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
};
