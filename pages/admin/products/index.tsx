import { Table } from "@/components/molecules/table";
import AdminLayout from "templates/adminLayout";
import Section from "@/components/atoms/section";
import { ReactElement } from "react";
import apiRoutes from "helpers/apiRoutes";
import { GetServerSideProps } from "next";
import { fetchJson } from "helpers/apiClient";
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
  try {
    const data = await fetchJson(apiRoutes.products.all);

    return {
      props: {
        products: data.products ?? [],
      },
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
};
