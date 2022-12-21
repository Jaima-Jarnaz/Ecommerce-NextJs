import Cards from "../../components/organisms/cards";
import Container from "../../components/atoms/container";
import { PRODUCT_DATA } from "../../settings/settings";

const ProductsList = () => {
  return (
    <Container>
      <Cards productData={PRODUCT_DATA} />
    </Container>
  );
};

export default ProductsList;
