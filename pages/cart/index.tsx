import { useState, useContext, useEffect } from "react";
import { getCookie } from "cookies-next";
import { CartContext } from "contexts/card/cardContext";
import Button from "@/components/atoms/button";
import Link from "next/link";
import { PRODUCTS_URL, SIGNIN_URL, CHECKOUT_URL } from "helpers/constants";
import { EMPTY_CART_IMAGE } from "settings/settings";
import { useRouter } from "next/router";
import { ClearButtonState } from "helpers/libs/helpers";
import apiRoutes from "helpers/apiRoutes";
import { fetchJson } from "helpers/apiClient";

const getCartProductId = (productId: any) =>
  typeof productId === "string" ? productId : productId?._id;

const Cart = ({ products }: any) => {
  const router = useRouter();
  const DISCOUNT = 20;
  const SHIPPING = 0;

  const {
    cartItems,
    setCartItems,
    itemsCount,
    setItemsCount,
    setTotalProducts,
  }: any = useContext(CartContext);

  const [addToCartProducts, setAddToCartProducts] = useState<any[]>([]);

  useEffect(() => {
    const cartProducts = products.filter((product: any) =>
      cartItems.some(
        (item: any) => getCartProductId(item.productId) === product._id
      )
    );

    const filteredProducts = cartProducts.map((cartProduct: any) => {
      const cartItem = cartItems.find(
        (item: any) => getCartProductId(item.productId) === cartProduct._id
      );

      return {
        ...cartProduct,
        quantity: cartItem?.quantity ?? 1,
      };
    });

    setAddToCartProducts(filteredProducts);
  }, [cartItems, products]);

  const subTotal = addToCartProducts.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const total = subTotal - subTotal * (DISCOUNT / 100) + SHIPPING;

  const incrementHandler = (productId: string) => {
    setCartItems((prevProducts: any) =>
      prevProducts.map((item: any) => {
        if (getCartProductId(item.productId) === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
    setItemsCount((count: number) => count + 1);
  };

  const decrementHandler = (productId: string) => {
    setCartItems((prevProducts: any) =>
      prevProducts.map((item: any) => {
        if (getCartProductId(item.productId) === productId) {
          return {
            ...item,
            quantity: Math.max(item.quantity - 1, 1),
          };
        }
        return item;
      })
    );
  };

  const removeAllCartItems = () => {
    ClearButtonState();
    setCartItems([]);
    setItemsCount(0);
    setAddToCartProducts([]);
  };

  const removeSingleCartItem = (id: string) => {
    setCartItems((prevCartItems: any) =>
      prevCartItems.filter(
        (item: any) => getCartProductId(item.productId) !== id
      )
    );
    setItemsCount((count: number) => Math.max(count - 1, 0));
    localStorage.removeItem(`buttonState_${id}`);
  };

  const proceedToCheckout = () => {
    const token = getCookie("access_token");

    if (token) {
      setTotalProducts({
        products: addToCartProducts,
        subtotal: subTotal,
        total,
      });
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
          <thead>
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
            {addToCartProducts.map((item: any, index: number) => (
              <tr key={item._id} className="p-cart__content">
                <td>{index + 1}</td>
                <td>
                  <img
                    width={120}
                    height={120}
                    src={item.imageUrl?.url}
                    alt={item.name}
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    type="button"
                    className="p-cart__quantity-btn"
                    onClick={() => incrementHandler(item._id)}
                  >
                    +
                  </button>
                  {item.quantity}
                  <button
                    type="button"
                    className="p-cart__quantity-btn"
                    onClick={() => decrementHandler(item._id)}
                  >
                    -
                  </button>
                </td>
                <td className="p-cart__unit-price">
                  {item.quantity * item.price}
                  <span
                    role="button"
                    tabIndex={0}
                    className="p-cart__close-icon"
                    onClick={() => removeSingleCartItem(item._id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        removeSingleCartItem(item._id);
                      }
                    }}
                    aria-label="Remove item"
                  >
                    &times;
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-cart__empty-cart-container">
          <img src={EMPTY_CART_IMAGE.src} alt="empty-cart" width={70} height={70} />
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
                id="coupon"
              />
              <button type="button" className="p-cart__coupon-button">
                Submit
              </button>
            </li>
            <li className="p-cart__price-contents-item">
              <span className="p-cart__price-contents-item-title">Subtotal</span>
              <span>tk {subTotal}</span>
            </li>
            <li className="p-cart__price-contents-item">
              <span>Shipping Charge</span>
              <span>tk {SHIPPING}</span>
            </li>
            <li className="p-cart__price-contents-item">
              <span>Including Discount</span>
              <span>{DISCOUNT}%</span>
            </li>
          </ul>
          <ul>
            <li className="p-cart__price-contents-item">
              <span className="p-cart__total-cost-level">Total cost</span>
              <span className="p-cart__total-cost">{total.toFixed(2)}</span>
            </li>
          </ul>
        </div>
      )}

      <div className="p-cart__button-container">
        <div className="p-cart__double-buttons">
          <Link href={PRODUCTS_URL}>
            <Button type="primary">Continue shopping</Button>
          </Link>
          {addToCartProducts.length > 0 && (
            <Button onClick={removeAllCartItems} type="primary">
              Clear Cart
            </Button>
          )}
        </div>
        {addToCartProducts.length > 0 && (
          <Button type="primary" onClick={proceedToCheckout}>
            Proceed to checkout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Cart;

export async function getServerSideProps() {
  try {
    const data = await fetchJson(apiRoutes.products.all);

    return {
      props: {
        isSuccess: true,
        message: "Successfully found data",
        products: data.products ?? [],
      },
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      props: {
        isSuccess: false,
        message: "Failed to load products",
        products: [],
      },
    };
  }
}
