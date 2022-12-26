import Carousel from "@/components/organisms/Carousel";
import Cards from "@/components/organisms/cards";
import Container from "@/components/atoms/container";
import Image from "next/image";
import Heading from "@/components/atoms/heading";
import banner1 from "@/assets/banner-1.jpg";

const Home = ({ products }: any) => {
  return (
    <div>
      <Carousel />
      <Container>
        <Heading tag="h4">Top Selling Products</Heading>
      </Container>

      <Container>
        <Cards productData={products} />
      </Container>

      <Container>
        <Image alt="product" src={banner1} className="o-carousel__image" />
      </Container>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();
  return {
    props: {
      message: "Successfully found data",
      products: data,
    },
  };
}
