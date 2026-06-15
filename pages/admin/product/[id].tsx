import { Table } from "@/components/molecules/table";
import AdminLayout from "templates/adminLayout";
import Section from "@/components/atoms/section";
import { ReactElement } from "react";
import apiRoutes from "helpers/apiRoutes";
import { fetchJson, getErrorMessage } from "helpers/apiClient";
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
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJson(apiRoutes.products.byId(id as string));
        const product = data.product as any;

        if (product) {
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setColor(product.color);
          setImage(product.imageUrl.url);
        }
      } catch (error) {
        setFetchError(getErrorMessage(error));
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <Section>
      {fetchError ? <div>{fetchError}</div> : ""}
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
