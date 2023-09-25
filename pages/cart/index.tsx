import { useState, useContext } from "react";
import { CartContext } from "contexts/card/cardContext";
import Button from "@/components/atoms/button";
import Link from "next/link";
import { CHECKOUT_URL } from "helpers/constants";

const Cart = ({ products }: any) => {
  // let quantityCount = 1;
  const [quantity, setQuantity] = useState(0);
  const [quantityCount, setquantityCount] = useState(1);

  const { cartItems, updateCartItemQuantity }: any = useContext(CartContext);

  const cartProducts = products.filter((product: any) => {
    // console.log("all products", product);
    // console.log("cartItems", cartItems);

    return cartItems.some((cartItem: any) => cartItem === product._id);
  });

  const incrementHandler = (productId: string) => {
    updateCartItemQuantity(productId, (cartItems[productId] || 0) + 1);
  };

  const decrementHandler = () => {
    setQuantity(quantity - 1);
  };

  const handleSubmit = () => {
    console.log("done");
  };
  return (
    <div className="p-cart">
      <h3 className="p-cart__heading">Cart Information</h3>
      <table className="p-cart__table">
        <thead className="p-cart__heading">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Unit Price</th>
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
                        incrementHandler(item._id);
                      }}
                    >
                      +
                    </button>
                    {quantityCount}
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
      <div className="p-cart__bottom-content">
        <ul className="p-cart__price-contents">
          <li className="p-cart__price-contents-item">
            <span className="p-cart__price-contents-item-title">Subtotal</span>
            <span className="p-cart__price-contents-item-price">tk 100</span>
          </li>
          <li className="p-cart__price-contents-item">
            <span>Shipping Charge</span>
            <span>tk 200</span>
          </li>
          <li className="p-cart__price-contents-item">
            <span>Including Discount</span>
            <span>tk 10</span>
          </li>
        </ul>

        <ul className="p-cart__content-total-price">
          <li className="p-cart__price-contents-item ">
            <span className="p-cart__total-cost-level">Total cost</span>
            <span className="p-cart__total-cost">tk 1200</span>
          </li>
        </ul>
      </div>

      <div className="p-cart__button-container">
        <div className="p-cart__double-buttons">
          <Button type="primary">Continue shopping</Button>
          <Button type="primary">Clear Cart</Button>
        </div>
        <Link href={CHECKOUT_URL}>
          <Button type="primary">Procced to checkout</Button>
        </Link>
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
