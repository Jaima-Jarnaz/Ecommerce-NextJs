import { useState, useContext } from "react";
import { CartContext } from "contexts/card/cardContext";
import Button from "@/components/atoms/button";
import Link from "next/link";
import { CHECKOUT_URL } from "helpers/constants";

const Cart = ({ products }: any) => {
  let subTotal = 0;
  const { cartItems, updateCartItemQuantity }: any = useContext(CartContext);

  const cartProducts = products.filter((product: any) => {
    // console.log("all products", product);
    //console.log("cartItems", cartItems);
    return cartItems.some((item: any) => item.productId === product._id);
  });

  const incrementHandler = (productId: string, quantity: number) => {
    updateCartItemQuantity(productId, quantity);
  };

  const decrementHandler = () => {};

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
              {
                subTotal = subTotal + item.quantity * item.price;
              }

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
                        incrementHandler(item._id, item.quantity);
                      }}
                    >
                      +
                    </button>
                    {item.quantity}
                    <button onClick={decrementHandler}>-</button>
                  </td>
                  <td>{item.quantity * item.price}</td>

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
          <li>
            <input className="p-cart__coupon-input" type="text" name="coupon" />
            <button className="p-cart__coupon-button">Submit</button>
          </li>
          <li className="p-cart__price-contents-item">
            <span className="p-cart__price-contents-item-title">Subtotal</span>
            <span className="p-cart__price-contents-item-price">
              tk {subTotal}
            </span>
          </li>
          <li className="p-cart__price-contents-item">
            <span>Shipping Charge</span>
            <span>tk 50</span>
          </li>
          <li className="p-cart__price-contents-item">
            <span>Including Discount</span>
            <span>tk 0</span>
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
