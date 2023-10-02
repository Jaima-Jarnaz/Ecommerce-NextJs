import { useState, useContext } from "react";
import { CartContext } from "contexts/card/cardContext";
import CustomInput from "@/components/atoms/custom-input";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import Heading from "@/components/atoms/heading";
import CustomSelect from "@/components/atoms/select/inde";
const Checkout = ({ products }: any) => {
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const { cartItems }: any = useContext(CartContext);

  const cartProducts = products.filter((product: any) => {
    console.log("all products", product);
    console.log("cartItems", cartItems);

    return cartItems.some((cartItem: any) => cartItem === product._id);
  });

  const incrementHandler = () => {
    setQuantity((prevQ) => prevQ + 1);
  };

  const decrementHandler = () => {
    setQuantity(quantity - 1);
  };

  const handleSubmit = () => {
    console.log("done");
  };
  return (
    <div className="p-checkout">
      <div className="p-checkout__address">
        <h3 className="p-checkout__heading">Delivery Address</h3>
        <form onSubmit={handleSubmit}>
          <SplitField>
            <Grid type="grid2">
              <CustomInput
                type="text"
                label="Name"
                name="name"
                value={name}
                handleChange={(e: any) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid type="grid2">
              <CustomInput
                type="number"
                label="Phone Number"
                name="phone"
                value={phone}
                handleChange={(e: any) => {
                  setPhone(e.target.value);
                }}
              />
            </Grid>
          </SplitField>

          <SplitField>
            <Grid type="grid2">
              <CustomInput
                type="text"
                label="Address"
                name="priaddressce"
                value={address}
                handleChange={(e: any) => {
                  setAddress(e.target.value);
                }}
              />
            </Grid>

            <Grid type="grid1">
              <CustomInput
                type="text"
                label="street"
                name="street"
                value={address}
                handleChange={(e: any) => {
                  setAddress(e.target.value);
                }}
              />
            </Grid>
          </SplitField>

          <SplitField>
            <Grid type="grid1">
              <CustomInput
                type="text"
                label="City"
                name="city"
                value={city}
                handleChange={(e: any) => {
                  setCity(e.target.value);
                }}
              />
            </Grid>

            <Grid type="grid1">
              <CustomSelect></CustomSelect>
            </Grid>
          </SplitField>

          <Button type="primary">Update</Button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_GET_ALL_API}`);
  const data = await res.json();

  return {
    props: {
      isSuccess: true,
      message: "Successfully found data",
      products: data.products,
    },
  };
}
