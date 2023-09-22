import { useState, useContext } from "react";
import { CartContext } from "contexts/card/cardContext";
const Cart = ({ products }: any) => {
  const [quantity, setQuantity] = useState(0);

  const { cartItems }: any = useContext(CartContext);

  const cartProducts = products.filter((product: any) => {
    console.log("all products", product);
    console.log("cartItems", cartItems);

    return cartItems.some((cartItem: any) => cartItem === product._id);
  });

  const incrementHandler = () => {
    setQuantity(quantity + 1);
  };

  const decrementHandler = () => {
    setQuantity(quantity - 1);
  };
  return (
    <div className="p-cart">
      <table className="p-cart__table">
        <thead className="p-cart__heading">
          <tr>
            <th className="p-cart__content">#</th>
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
                  <td className="p-cart__content">{++index}</td>
                  <td className="p-cart__content">
                    <img src={item.imageUrl.url} />
                  </td>
                  <td className="p-cart__content">{item.name}</td>
                  <td className="p-cart__content">{item.price}</td>
                  <td>
                    <button onClick={incrementHandler}>+</button>
                    {quantity}
                    <button onClick={decrementHandler}>-</button>
                  </td>
                  <td> {item.price * quantity}</td>

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
