import AdminLayout from "templates/adminLayout";
import CustomInput from "@/components/atoms/custom-input";
import { ReactElement, useEffect } from "react";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import { useState } from "react";
import Heading from "@/components/atoms/heading";
import { Note } from "@/components/atoms/note/index.";
import { useRouter } from "next/router";
import apiRoutes from "helpers/apiRoutes";
import { fetchJson, getErrorMessage, getResponseMessage } from "helpers/apiClient";

const Admin = ({ order }: any) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("jaima");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  //Storing image data from database
  const [shipmentAdddres, setshipmentAdddres] = useState<string>(
    order.deliveryPlace && order.deliveryPlace.address,
  );
  const [division, setDivision] = useState<string>(
    order.deliveryPlace && order.deliveryPlace.division,
  );
  const [city, setCity] = useState<string>(
    order.deliveryPlace && order.deliveryPlace.city,
  );

  const router = useRouter();
  const { oid } = router.query;

  //Form submit handler for Update order details
  const handleSubmit: any = async (e: Event) => {
    e.preventDefault();

    //All updated form data
    const dataObj = {
      deliveryPlace: {
        address: shipmentAdddres,
        division: division,
        city: city,
      },
    };

    const jsonData = JSON.stringify(dataObj);
    console.log(jsonData);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    //API for update order details
    try {
      const result = await fetchJson(apiRoutes.orders.update(oid), options);
      setMessage(getResponseMessage(result, "Order updated successfully."));
      setIsError(result.success !== true);

      if (result.success === true) {
        router.push("/admin/orders");
      }
    } catch (error) {
      setIsError(true);
      setMessage(getErrorMessage(error));
    }
  };

  return (
    <div className="p-order">
      {message ? (
        <Note color={isError ? "danger" : "green"}>{message}</Note>
      ) : (
        ""
      )}
      <Heading tag="h5" fontSize="28" alignment="left">
        Update order details
      </Heading>
      <form onSubmit={handleSubmit}>
        <div className="p-order__top-content">
          <div>Order Date : {order.dateCreated}</div>
          <div>Order Id : {order._id}</div>
        </div>
        <div className="p-order__main-content">
          <Section margin="margin-8" padding="10" width="width-60">
            <h4>Shipment Information</h4>
            <SplitField>
              <CustomInput
                padding="padding-10"
                type="text"
                label="Shipment Address"
                name="shipment_address"
                value={shipmentAdddres}
                handleChange={(e: any) => {
                  setshipmentAdddres(e.target.value);
                }}
              />
            </SplitField>
            <SplitField>
              <CustomInput
                padding="padding-10"
                type="text"
                label="Division"
                name="division"
                value={division}
                handleChange={(e: any) => {
                  setDivision(e.target.value);
                }}
              />
              <CustomInput
                padding="padding-10"
                type="text"
                label="City"
                name="city"
                value={city}
                handleChange={(e: any) => {
                  setCity(e.target.value);
                }}
              />
            </SplitField>
          </Section>

          <Section margin="margin-8" padding="10">
            <h4>Customer Information</h4>
            <SplitField>
              <CustomInput
                padding="padding-10"
                type="text"
                label="Name"
                name="name"
                value={order.customer.name}
                readOnly
              />
            </SplitField>
            <SplitField>
              <CustomInput
                padding="padding-10"
                type="text"
                label="Address"
                name="address"
                // value={order.customer.address}
                readOnly
              />
            </SplitField>
            <SplitField>
              <CustomInput
                padding="padding-10"
                type="text"
                label="Phone"
                name="phone"
                value={order.customer.phone}
                readOnly
              />
              <CustomInput
                padding="padding-10"
                type="email"
                label="Email"
                name="email"
                value={order.customer.email}
                readOnly
              />
            </SplitField>
          </Section>
        </div>
        <Section margin="margin-8" padding="10">
          <h4>Product Information</h4>

          {order.products.products.map((item: any, index: number) => {
            return (
              <div key={index}>
                <SplitField>
                  <CustomInput
                    padding="padding-10"
                    type="text"
                    label="Name"
                    name="name"
                    value={name}
                    handleChange={(e: any) => {
                      setName(e.target.value);
                    }}
                  />
                  <CustomInput
                    padding="padding-10"
                    type="text"
                    label="Price"
                    name="price"
                    value={item.price}
                    handleChange={(e: any) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <CustomInput
                    padding="padding-10"
                    type="text"
                    label="Quantity"
                    name="quantity"
                    value={item.quantity}
                    handleChange={(e: any) => {
                      setQuantity(e.target.value);
                    }}
                  />
                  <CustomInput
                    padding="padding-10"
                    type="text"
                    label="Color"
                    name="color"
                    value={item.color}
                    handleChange={(e: any) => {
                      setColor(e.target.value);
                    }}
                  />
                </SplitField>
              </div>
            );
          })}
        </Section>
        <Button type="primary">Update</Button>
      </form>
    </div>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;

export async function getServerSideProps(context: any) {
  const { oid } = context.query;

  try {
    const orderData = await fetchJson(apiRoutes.orders.byId(oid));

    return {
      props: {
        order: orderData.orders,
      },
    };
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return {
      notFound: true,
    };
  }
}
