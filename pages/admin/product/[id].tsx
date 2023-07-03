import { Table } from "@/components/molecules/table";
import AdminLayout from "templates/adminLayout";
import Section from "@/components/atoms/section";
import { ReactElement } from "react";
import baseUrl from "helpers/baseUrl";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

const SingleProductView = ({ product }: any) => {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  //Storing image data from database
  const [image, setImage] = useState<any>();

  // Fetch single product details
  useEffect(() => {
    const fetchData = async (pid: any) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_GET_SINGLE_API}/${id}`
      );
      const { product } = await res.json();
      if (product) {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setColor(product.color);

        setImage(product.imageUrl.url);
      }
    };

    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <Section>
      {id !== "0" ? (
        <>
          <ul>
            <li>Name : {name}</li>
            <li>Description : {description}</li>
            <li>Color : {color}</li>
            <li>price : {price}</li>
          </ul>
          <div>
            <Image src={image} alt={name} height={200} width={200} />
          </div>
        </>
      ) : (
        <div>Sorry no data found</div>
      )}
    </Section>
  );
};

SingleProductView.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default SingleProductView;
