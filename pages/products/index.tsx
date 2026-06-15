import Cards from "@/components/organisms/cards";
import Container from "@/components/atoms/container";
import apiRoutes from "helpers/apiRoutes";
import { fetchJson } from "helpers/apiClient";

const ProductsList = ({ products }: any) => {
  return (
    <Container>
      <Cards productData={products} />
    </Container>
  );
};

export default ProductsList;

export async function getServerSideProps() {
  try {
    const data = await fetchJson(apiRoutes.products.all);

    return {
      props: {
        isSuccess: true,
        message: "Successfully found data",
        products: data.products ?? [],
      },
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      props: {
        isSuccess: false,
        message: "Failed to load products",
        products: [],
      },
    };
  }
}
