import Carousel from "@/components/organisms/Carousel";
import Cards from "@/components/organisms/cards";
import Container from "@/components/atoms/container";
import Image from "next/image";
import Heading from "@/components/atoms/heading";
import Brands from "@/components/molecules/brands";
import Categories from "@/components/molecules/categories";
import Button from "@/components/atoms/button";
import { useRouter } from "next/router";
import Section from "@/components/atoms/section";
import { BannerContainer } from "@/components/molecules/banner";

const Home = ({ products }: any) => {
  const router = useRouter();
  const browseMoreHandler = () => {
    router.push("/products/filters");
  };
  return (
    <div>
      <Carousel />
      <Section>
        <Container margin="only-top">
          <Heading textTransform="text-transform" tag="h4" fontSize="24">
            Top Brands
          </Heading>
        </Container>
        <Brands />
      </Section>
      <Container>
        <Heading textTransform="text-transform" tag="h4" fontSize="24">
          All Products
        </Heading>
      </Container>

      <Container>
        <Cards productData={products} />
      </Container>

      <Container alignment="center">
        <Button type="primary" onClick={browseMoreHandler}>
          Browse more
        </Button>
      </Container>

      <Section>
        <Container margin="only-bottom">
          <Heading textTransform="text-transform" tag="h4" fontSize="24">
            Categories
          </Heading>
        </Container>
        <Categories />
      </Section>

      <Container>
        <BannerContainer />
      </Container>
    </div>
  );
};

export default Home;

// export async function getStaticProps() {
//   const res = await fetch(`${baseUrl}/api/products`);
//   const data = await res.json();
//   return {
//     props: {
//       message: "Successfully found data",
//       products: data,
//     },
//   };
// }

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_GET_ALL_API}`);
  const data = await res.json();
  return {
    props: {
      products: data.products,
    },
  };
}
