import Search from "@/components/atoms/search";
import { useEffect, useState, useRef } from "react";
import { SearchList } from "@/components/molecules/search-list";
import { useRouter } from "next/router";

const AdminHeader = () => {
  const router = useRouter();
  const [productsAll, setProductsAll] = useState([]);

  //Get all products
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
    const filteredData: any = productsAll.filter((product: any) => {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if (filteredData[0]) {
      router.push(`/admin/product/${filteredData[0]._id}`);
    } else {
      router.push(`/admin/product/0`);
    }
  };

  //const ref = useRef<HTMLDivElement>(null);

  // Code for hiding open container div which is for search
  // useEffect(() => {
  //   const handlerClickOutside = (e: any) => {
  //     if (ref.current && !ref.current.contains(e.target as Node)) {
  //       // ref.current.style.display = "none";

  //       console.log("hello form ", e.target);
  //       console.log("focus value from useEffect ", isFocused);

  //       //setIsFocused(false);
  //     }
  //   };

  //   document.addEventListener("click", handlerClickOutside);

  //   return () => {
  //     document.removeEventListener("click", handlerClickOutside);
  //   };
  // }, [isFocused]);

  return (
    <header className="o-admin-header">
      <Search onDataChange={onDataChange} />
      {/* {searchResults && (
        <div
          className="o-admin-header__search-content"
          tabIndex={0}
          ref={ref}
          id="search-container"
        >
          <SearchList searchResult={searchResults} />
        </div>
      )} */}
    </header>
  );
};

export default AdminHeader;
