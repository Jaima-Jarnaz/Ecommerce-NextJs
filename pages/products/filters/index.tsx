import Cards from "@/components/organisms/cards";
import Container from "@/components/atoms/container";
import baseUrl from "helpers/baseUrl";
import PriceRange from "@/components/molecules/price-range";
import { BrandFilter, Option } from "@/components/molecules/brand-filter";
import { useState } from "react";
const FilteredProductsList = ({ products }: any) => {
  //   const options: Option[] = [
  //     { label: "Apple", value: "1" },
  //     { label: "Samsung", value: "2" },
  //     { label: "Nokia", value: "3" },
  //     { label: "Sony", value: "4" },
  //     { label: "Poco", value: "5" },
  //     { label: "RedMi", value: "6" },
  //     { label: "iphone", value: "7" },
  //   ];

  const options: Option[] = [
    { label: "iPhone 13 pro", value: "iPhone 13 pro" },
    { label: "Poco", value: "Poco" },
    { label: "RedMi", value: "RedMi" },
  ];
  const [filterData, setFilterData] = useState([]);

  // Filter for price range , brand
  const filterHandler = (
    minNum: number | undefined = 0,
    maxNum: number | undefined = 0,
    brandValue: string | undefined = ""
  ) => {
    if (minNum && maxNum) {
      const filteredProducts = products.filter((product: any) => {
        return product.price >= minNum && product.price <= maxNum;
      });
      setFilterData(filteredProducts);
    } else if (brandValue) {
      const brandData = products.filter((product: any) => {
        return product.name.toLowerCase().includes(brandValue.toLowerCase());
      });
      setFilterData(brandData);
    }
  };

  return (
    <div className="p-filters">
      <div className="p-filters__filter-nav">
        <PriceRange onDataChange={filterHandler}></PriceRange>
        <BrandFilter
          options={options}
          onOptionDataChange={filterHandler}
        ></BrandFilter>
      </div>
      {filterData.length > 0 ? (
        <Cards productData={filterData} />
      ) : (
        <Cards productData={products} />
      )}
    </div>
  );
};

export default FilteredProductsList;

export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/products/all`);
  const data = await res.json();

  return {
    props: {
      isSuccess: true,
      message: "Successfully found data",
      products: data.products,
    },
  };
}
