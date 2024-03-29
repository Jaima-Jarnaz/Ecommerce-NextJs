import { Table } from "@/components/molecules/table";
import AdminLayout from "templates/adminLayout";
import Section from "@/components/atoms/section";
import { ReactElement } from "react";
import baseUrl from "helpers/baseUrl";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const ViewProducts = ({ products }: any) => {
  const router = useRouter();

  return (
    <Section>
      <Table body={products} />
    </Section>
  );
};

ViewProducts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default ViewProducts;

export const getServerSideProps: GetServerSideProps = async () => {
  //get all products
  const res = await fetch(`${baseUrl}/products/all`);
  const data = await res.json();

  return {
    props: {
      products: data.products,
    },
  };
};
