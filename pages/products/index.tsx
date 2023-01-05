import Cards from "@/components/organisms/cards";
import Container from "@/components/atoms/container";
import baseUrl from "helpers/baseUrl";
import { CardDataTypes } from "@/components/molecules/card";

const ProductsList = ({ products }: CardDataTypes) => {
  return (
    <Container>
      <Cards productData={products} />
    </Container>
  );
};

export default ProductsList;

export async function getStaticProps() {
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();

  return {
    props: {
      isSuccess: true,
      message: "Successfully found data",
      products: data,
    },
  };
}
