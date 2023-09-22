import { useState, useContext } from "react";
import { CartContext } from "contexts/card/cardContext";
import CustomInput from "@/components/atoms/custom-input";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import Heading from "@/components/atoms/heading";
const Cart = ({ products }: any) => {
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
    <div className="p-cart">
      <table className="p-cart__table">
        <thead className="p-cart__heading">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts &&
            cartProducts.map((item: any, index: number) => {
              return (
                <tr key={index} className="p-cart__content">
                  <td>{++index}</td>
                  <td>
                    <img src={item.imageUrl.url} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      onClick={() => {
                        incrementHandler();
                      }}
                    >
                      +
                    </button>
                    {quantity}
                    <button onClick={decrementHandler}>-</button>
                  </td>
                  <td> {item.price}</td>

                  {/* <td>
                    <span
                      className="p-cart__action"
                      onClick={() => {
                        router.push(`/admin/${item._id}`);
                      }}
                    >
                      <Icon iconName="edit" />
                    </span>
                    <span
                      className="p-cart__action"
                      onClick={() => {
                        setOpenModal(!openModal);
                        confirmDeleteHandler(item._id);
                      }}
                    >
                      <Icon iconName="delete" />
                    </span>
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>

      <div>
        <h3>Delivery Address</h3>
        <form onSubmit={handleSubmit}>
          <Section>
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
                  type="text"
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
              <Grid type="grid1">
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
                  label="City"
                  name="city"
                  value={city}
                  handleChange={(e: any) => {
                    setCity(e.target.value);
                  }}
                />
              </Grid>
            </SplitField>

            <Button type="primary">Update</Button>
          </Section>
        </form>
      </div>
    </div>
  );
};

export default Cart;

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
