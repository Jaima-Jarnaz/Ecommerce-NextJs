import AdminLayout from "templates/adminLayout";
import { Input } from "@/components/atoms/input";
import { ReactElement, use } from "react";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import Container from "@/components/atoms/container";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Admin = () => {
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState();
  const onSubmit = async (data: any) => {
    //e.preventDefault();

    const datas = data;
    console.log(datas);
    const jsonData = JSON.stringify(datas);
    console.log("json data", jsonData);

    const endpoint = "/api/products";

    const options = {
      method: "POST",
      headers: {
        "Content-type": "applications/json",
      },
      body: jsonData,
    };

    const res = await fetch(endpoint, options);

    const result = await res.json();
    console.log(result);
    alert(`Is this your full name: ${result}`);
  };

  return (
    <>
      <Section padding="30">
        <Grid type="grid2">
          <Input type="text" placeholder="Search" name="search" />
        </Grid>
      </Section>
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
