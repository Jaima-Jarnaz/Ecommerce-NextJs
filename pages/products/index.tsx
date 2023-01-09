import Cards from "@/components/organisms/cards";
import Container from "@/components/atoms/container";
import baseUrl from "helpers/baseUrl";

const ProductsList = ({ products }: any) => {
  return (
    <Container>
      <Cards productData={products} />
    </Container>
  );
};

export default ProductsList;

export async function getServerSideProps() {
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
