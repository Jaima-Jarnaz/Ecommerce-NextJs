import { useState, useContext, useEffect } from "react";
import { getCookie } from "cookies-next";
import { CartContext } from "contexts/card/cardContext";
import Button from "@/components/atoms/button";
import Link from "next/link";
import { PRODUCTS_URL, SIGNIN_URL, CHECKOUT_URL } from "helpers/constants";
import { EMPTY_CART_IMAGE, IMAGES_DATA } from "settings/settings";
import Image from "next/image";
import { useRouter } from "next/router";

const Cart = ({ products }: any) => {
  const router = useRouter();
  let subTotal = 0;
  let total = 0;
  let cartProductInfo: {
    products: any;
    subTotal: number;
    total: number;
  };
  let discountAmount = 20;
  let shippingCharge = 0;
  const {
    cartItems,
    updateCartItemQuantity,
    setCartItems,
    itemsCount,
    setItemsCount,
    setTotalProducts,
  }: any = useContext(CartContext);

  const [addToCartProducts, setAddToCartProducts] = useState([]);

  useEffect(() => {
    const cartProducts = products.filter((product: any) => {
      return cartItems.some((item: any) => item.productId === product._id);
    });

    let filteredProducts = cartProducts.map((cartProduct: any) => {
      // Find the corresponding item in cartItems
      const cartItem = cartItems.find(
        (item: any) => item.productId === cartProduct._id
      );

      // Return a new object with updated quantity
      return {
        ...cartProduct,
        quantity: cartItem.quantity,
      };
    });

    // Update state with the filtered products
    setAddToCartProducts(filteredProducts);
  }, [cartItems]);

  cartProductInfo = { products: addToCartProducts, subTotal, total };

  // Increment handler
  const incrementHandler = (productId: string) => {
    setCartItems((prevProducts: any) => {
      return prevProducts.map((item: any) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    });
  };

  const decrementHandler = (productId: string) => {
    setCartItems((prevProducts: any) => {
      return prevProducts.map((item: any) => {
        if (item.productId === productId) {
          // Prevent quantity from going below 1
          const newQuantity = Math.max(item.quantity - 1, 1);
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });
    });
  };

  const removeAllCartItems = () => {
    setCartItems([]);
    setItemsCount(0);
    setAddToCartProducts([]);
  };

  const removeSingleCartItem = (id: string) => {
    setCartItems((prevCartItems: any) =>
      prevCartItems
        .map((item: any) => {
          return item.productId !== id ? item : null;
        })
        .filter(Boolean)
    );
    setItemsCount(itemsCount - 1);
    let addedButtonState = localStorage.getItem(`buttonState_${id}`);
    if (addedButtonState) {
      localStorage.removeItem(`buttonState_${id}`);
    }
  };

  const proceedToCheckout = (subTotalProducts: number, total: number) => {
    const token = getCookie("access_token");
    cartProductInfo.subTotal = subTotalProducts;
    cartProductInfo.total = total;

    if (token) {
      setTotalProducts(cartProductInfo);
      router.push(CHECKOUT_URL);
    } else {
      router.push(SIGNIN_URL);
    }
  };
  return (
    <div className="p-cart">
      <h3 className="p-cart__heading">Cart Information</h3>
      {addToCartProducts.length > 0 ? (
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
            {addToCartProducts &&
              addToCartProducts.map((item: any, index: number) => {
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
                        className="p-cart__quantity-btn"
                        onClick={() => {
                          incrementHandler(item._id);
                        }}
                      >
                        +
                      </button>
                      {item.quantity}
                      <button
                        className="p-cart__quantity-btn"
                        onClick={() => decrementHandler(item._id)}
                      >
                        -
                      </button>
                    </td>
                    <td className="p-cart__unit-price">
                      {item.quantity * item.price}
                      <span
                        className="p-cart__close-icon"
                        onClick={() => removeSingleCartItem(item._id)}
                      >
                        &times;
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <div className="p-cart__empty-cart-container">
          <Image
            src={EMPTY_CART_IMAGE}
            alt="empty-cart"
            width={70}
            height={70}
          ></Image>
          <p className="p-cart__cart-empty-text">Your cart is empty</p>
        </div>
      )}

      {addToCartProducts.length > 0 && (
        <div className="p-cart__bottom-content">
          <ul className="p-cart__price-contents">
            <li>
              <label htmlFor="coupon" className="p-cart__promo-code">
                Any Promo Code?
              </label>
              <input
                className="p-cart__coupon-input"
                type="text"
                name="coupon"
              />
              <button className="p-cart__coupon-button">Submit</button>
            </li>
            <li className="p-cart__price-contents-item">
              <span className="p-cart__price-contents-item-title">
                Subtotal
              </span>
              <span className="p-cart__price-contents-item-price">
                tk {subTotal}
              </span>
            </li>
            <li className="p-cart__price-contents-item">
              <span>Shipping Charge</span>
              <span>tk {shippingCharge}</span>
            </li>
            <li className="p-cart__price-contents-item">
              <span>Including Discount</span>
              <span>{discountAmount}%</span>
            </li>
          </ul>

          <ul className="p-cart__content-total-price">
            <li className="p-cart__price-contents-item ">
              <span className="p-cart__total-cost-level">Total cost</span>
              <span className="p-cart__total-cost">
                {
                  (total =
                    subTotal -
                    subTotal * (discountAmount / 100) +
                    shippingCharge)
                }
              </span>
            </li>
          </ul>
        </div>
      )}

      <div className="p-cart__button-container">
        <div className="p-cart__double-buttons">
          <Link href={PRODUCTS_URL}>
            <Button type="primary">Continue shopping</Button>
          </Link>
          {addToCartProducts.length > 0 ? (
            <Button onClick={removeAllCartItems} type="primary">
              Clear Cart
            </Button>
          ) : (
            ""
          )}
        </div>
        {addToCartProducts.length > 0 ? (
          <Button
            type="primary"
            onClick={() => proceedToCheckout(subTotal, total)}
          >
            Proceed to checkout
          </Button>
        ) : (
          ""
        )}
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
