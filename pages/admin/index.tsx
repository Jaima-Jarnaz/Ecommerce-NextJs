import AdminLayout from "templates/adminLayout";
import Input from "@/components/atoms/input";
import { ReactElement } from "react";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
const Admin = () => {
  return (
    <Section>
      <SplitField>
        <Grid type="grid2">
          <Input type="text" />
        </Grid>
        <Grid type="grid2">
          <Input type="text" />
        </Grid>
      </SplitField>
    </Section>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
