import Container from "@/components/atoms/container";
import { CardDataTypes } from "@/components/organisms/cards";
import { GetStaticProps, GetStaticPaths } from "next";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import Image from "next/image";
import baseUrl from "helpers/baseUrl";
import Heading from "@/components/atoms/heading";
import SliderProduct from "@/components/organisms/sliderProduct";

const Product = ({ product }: any) => {
  return (
    <Container display="flex">
      <section className="p-productDetails">
        <Image
          src={product.imageUrl.url}
          alt={product}
          width={400}
          height={400}
        />
        <div className="p-productDetails__contents">
          <Heading tag="h4" fontSize="20" alignment="left">
            {product.title}
          </Heading>
          <Text fontSize="18" color="deep-purple">
            {product.price}
          </Text>
          <Text color="gray">{product.description}</Text>
          <Button>Add To Card</Button>
          <Button>Buy Now</Button>
        </div>
      </section>
      {/* <SliderProduct productData={product} /> */}
    </Container>
  );
};

export default Product;

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const res = await fetch(`${baseUrl}/api/product/${params?.id}`);
  const data = await res.json();
  return {
    props: {
      message: "Successfully found requested product data",
      product: data.product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${baseUrl}/api/products`);
  const products = await res.json();
  const paths = products.map((product: CardDataTypes) => ({
    params: { id: product._id },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};
