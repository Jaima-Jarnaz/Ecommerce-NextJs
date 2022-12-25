import Cards from "@/components/organisms/cards";
import Container from "@/components/atoms/container";
import { PRODUCT_DATA } from "@settings/settings";

const ProductsList = ({ products, isSuccess, message }: any) => {
  console.log(products);
  return (
    <Container>
      <Cards productData={products} />
    </Container>
  );
};

export default ProductsList;

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();
  return {
    props: {
      isSuccess: true,
      message: "Successfully found data",
      products: data,
    },
  };
}
