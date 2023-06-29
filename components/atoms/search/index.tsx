import Icon from "@/components/atoms/icon";
import { ChangeEvent } from "react";
export interface SearchInputTypes {
  onDataChange: (data: string) => void;
}
const Search = ({ onDataChange }: SearchInputTypes) => {
  const handlerChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    onDataChange(newValue); //calling function which is declared in parent component
  };

  return (
    <div className="a-search">
      <input
        className="a-search__input"
        name="search"
        placeholder="Search"
        type="text"
        onChange={handlerChange}
      />
      <div className="a-search__icon">
        <Icon iconName="search" />
      </div>
    </div>
  );
};

export default Search;
