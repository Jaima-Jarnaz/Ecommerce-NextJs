import Container from "@/components/atoms/container";
import { CardDataTypes } from "@/components/organisms/cards";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import Image from "next/image";
import baseUrl from "helpers/baseUrl";
import Heading from "@/components/atoms/heading";
import Sliders from "@/components/organisms/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "@/components/molecules/card";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import camera from "public/camera.jpg";

//let i: number = 1;

const Product = ({ product, products }: any) => {
  const router = useRouter();

  const [count, setCount] = useState<number>(1);

  const incrementHandler = () => {
    setCount((prev) => prev + 1);
    console.log(count);
  };

  const decrementHandler = () => {
    if (count === 1) {
      return setCount(1);
    }
    setCount((prev) => prev - 1);
  };

  return (
    <Container>
      <Container display="flex">
        <section className="p-productDetails">
          <Image
            src={product.imageUrl.url}
            alt={product}
            width={400}
            height={400}
            className="p-productDetails__image"
          />
          <div className="p-productDetails__contents">
            <Heading tag="h4" fontSize="20" alignment="left">
              {product.title}
            </Heading>
            <Text color="gray">{product.description}</Text>
            <Text fontSize="18" color="deep-purple">
              {product.price * count}
            </Text>
            <span>
              <Button type="primary" onClick={incrementHandler}>
                +
              </Button>
              <span className="p-productDetails__text">{count}</span>
              <Button type="primary" onClick={decrementHandler}>
                -
              </Button>
            </span>
            <Button>Add To Card</Button>
            <Button>Buy Now</Button>
          </div>
        </section>
      </Container>
      <Container>
        <Heading tag="h4">Related Products</Heading>
      </Container>
      <Container>
        <Sliders>
          {products &&
            products.map((item: any, index: number) => {
              const src = item.imageUrl ? item.imageUrl.url : camera;

              return (
                <Card
                  src={src}
                  title={item.title}
                  description={item.description}
                  key={index}
                  alt={item.alt ? item.alt : "Product image"}
                  price={item.price}
                  id={item._id}
                />
              );
            })}
        </Sliders>
      </Container>
    </Container>
  );
};

export default Product;

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { params } = context;

//   //Get single product details
//   const res = await fetch(`${baseUrl}/api/product/${params?.id}`);
//   const data = await res.json();

//   //Get all products
//   const response = await fetch(`${baseUrl}/api/products`);
//   const products = await response.json();

//   return {
//     props: {
//       message: "Successfully found requested product data",
//       product: data.product,
//       products,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch(`${baseUrl}/api/products`);
//   const products = await res.json();
//   const paths = products.map((product: CardDataTypes) => ({
//     params: { id: product._id },
//   }));
//   return {
//     paths: paths,
//     fallback: false,
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  //Get single product details
  const res = await fetch(`${baseUrl}/products/${params?.id}`);
  const data = await res.json();

  //Get all products
  const response = await fetch(`${baseUrl}/products/all`);
  const products = await response.json();

  return {
    props: {
      message: "Successfully found requested product data",
      product: data.product,
      products,
    },
  };
};
