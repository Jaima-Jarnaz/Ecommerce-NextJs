import AdminLayout from "templates/adminLayout";
import { Input } from "@/components/atoms/input";
import { ReactElement, use } from "react";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import Container from "@/components/atoms/container";
import baseUrl from "helpers/baseUrl";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import AdminHeader from "@/components/organisms/adminHeader";

const Admin = () => {
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState();
  const onSubmit: any = async (data: Object, e: Event) => {
    e.preventDefault();

    const datas = data;
    console.log(datas);
    const jsonData = JSON.stringify(datas);
    console.log("json data", jsonData);

    const endpoint = "/api/products";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    const res = await fetch(endpoint, options);

    const result = await res.json();
    console.log(result);
    alert(`Is this your full name: ${result.name}`);
  };

  return (
    <>
      <AdminHeader />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <SplitField>
            <Grid type="grid2">
              <Input type="text" label="Product Name" {...register("name")} />
            </Grid>
            <Grid type="grid2">
              <Input
                type="text"
                label="Description"
                {...register("description")}
              />
            </Grid>
          </SplitField>
          <SplitField>
            <Grid type="grid2">
              <Input type="number" label="Price" {...register("price")} />
            </Grid>
            <Grid type="grid2">
              <Input type="file" label="Image" {...register("imageUrl")} />
            </Grid>
          </SplitField>
          <Button>SUBMIT</Button>
        </Section>
      </form>
    </>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
