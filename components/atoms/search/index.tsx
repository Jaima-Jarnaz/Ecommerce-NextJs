import Icon from "@/components/atoms/icon";
const Search = () => {
  return (
    <div className="a-search">
      <input
        className="a-search__input"
        name="search"
        placeholder="Search"
        type="text"
      />
      <div className="a-search__icon">
        <Icon iconName="search" />
      </div>
    </div>
  );
};

export default Search;
