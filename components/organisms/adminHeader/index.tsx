import Search from "@/components/atoms/search";
import { useEffect, useState } from "react";
import { SearchList } from "@/components/molecules/search-list";
const AdminHeader = () => {
  const [productsAll, setProductsAll] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const product = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_GET_ALL_API}`,
        options
      );
      const result = await product.json();
      if (result.success === true) {
        setProductsAll(result.products);
      }
    };
    fetchData();
  }, []);

  const onDataChange = (searchTerm: string) => {
    const filteredData = productsAll.filter((product: any) => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(filteredData);
  };

  return (
    <header className="o-admin-header">
      <Search onDataChange={onDataChange} />
      {searchResults && <SearchList searchResult={searchResults} />}
      {/* {searchResults && (
        <ul className="o-admin-header__search-content">
          {searchResults.map((item: any, index) => {
            return <div key={index}>{item.name}</div>;
          })}
        </ul>
      )} */}
    </header>
  );
};

export default AdminHeader;
