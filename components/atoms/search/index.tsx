import Icon from "@/components/atoms/icon";
import { ChangeEvent, useState } from "react";
export interface SearchInputTypes {
  onDataChange: (data: string) => void;
}
const Search = ({ onDataChange }: SearchInputTypes) => {
  const [searchData, setSearchData] = useState("");
  //handler for input change
  const handlerChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setSearchData(newValue);
  };

  // handler for onFocus event
  const clickHandler = () => {
    onDataChange(searchData); //calling function which is declared in parent component
  };

  return (
    <div className="a-search">
      <div className="a-search__content">
        <input
          className="a-search__input"
          name="search"
          placeholder="Search"
          type="text"
          onChange={handlerChange}
        />
        <div className="a-search__icon" onClick={clickHandler}>
          <Icon iconName="search" />
        </div>
      </div>
    </div>
  );
};

export default Search;
