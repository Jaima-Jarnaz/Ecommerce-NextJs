import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { CartContext } from "contexts/card/cardContext";
import CustomInput from "@/components/atoms/custom-input";
import Grid from "@/components/atoms/grid";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import { CustomSelect } from "@/components/atoms/select";
import Image from "next/image";
import { useRouter } from "next/router";
import { IMAGES_DATA } from "@settings/settings";
import Link from "next/link";
import { Note } from "@/components/atoms/note/index.";
import { ClearButtonState } from "helpers/libs/helpers";
import apiRoutes from "helpers/apiRoutes";
import { geonames } from "helpers/config";
import { fetchJson, getErrorMessage, getResponseMessage } from "helpers/apiClient";
const Checkout = () => {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [orderError, setOrderError] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [cities, setCities] = useState<any>([]);
  const [divisions, setDivisions] = useState([]);

  const [deliveryCity, setDeliveryCity] = useState({
    value: "",
    label: "",
  });
  const [deliveryDivisions, setDeliveryDivisions] = useState({
    value: "",
    label: "",
  });

  //Context data
  const { totalProducts, setTotalProducts, setItemsCount, setCartItems }: any =
    useContext(CartContext);

  // Initialize userData using useState hook
  const [userData, setUserData] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    // Retrieve user data from localStorage

    const data = localStorage.getItem("user");
    if (data) {
      try {
        const user = JSON.parse(data);
        setUserData({ name: user.name, phone: user.phone, email: user.email });
      } catch (error) {
        console.error("Failed to parse user data from local storage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []); // Empty dependency array ensures the effect runs only on

  useEffect(() => {
    const geoNamesGenerate = async () => {
      try {
        const geonamesApiUrl = "http://api.geonames.org/searchJSON";
        const geonamesUsername = geonames.username;
        const countryCode = "BD";

        const queryParams = new URLSearchParams({
          q: "*",
          country: countryCode,
          username: geonamesUsername,
        });

        const fullUrl = `${geonamesApiUrl}?${queryParams.toString()}`;
        const geonamesResponse = await fetch(fullUrl);

        if (!geonamesResponse.ok) {
          throw new Error("Failed to load cities and divisions.");
        }

        const geonamesData = await geonamesResponse.json();
        return geonamesData.geonames || [];
      } catch (error) {
        console.error("Failed to fetch geonames data:", error);
        return [];
      }
    };

    geoNamesGenerate().then((data) => {
      if (!data.length) {
        return;
      }

      const optionsCities: any = [];
      const optionsDivisions: any = [];

      const dublicateDivisions = new Set();
      const dublicateCities = new Set();

      data.forEach((item: any) => {
        if (!dublicateDivisions.has(item.adminName1)) {
          optionsDivisions.push({
            value: item.adminName1,
            label: item.adminName1,
          });
          dublicateDivisions.add(item.adminName1);
        }

        if (!dublicateCities.has(item.name)) {
          optionsCities.push({
            value: item.name,
            label: item.name,
          });
          dublicateCities.add(item.name);
        }
      });

      setCities(optionsCities);
      setDivisions(optionsDivisions);
    });
  }, []);

  const incrementHandler = () => {
    setQuantity((prevQ) => prevQ + 1);
  };

  const decrementHandler = () => {
    setQuantity(quantity - 1);
  };

  const showSweetAlert = () => {
    Swal.fire({
      title: "Your order placed sucessfully!",
      timer: 2000,
      icon: "success",
      showConfirmButton: false,
      padding: "3em",

      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
      willClose: () => {
        setDeliveryAddress("");
        setDeliveryCity({ value: "", label: "" });
        setDeliveryDivisions({ value: "", label: "" });
        setTotalProducts([]);
        setCartItems([]);
        setItemsCount(0);
      },

      // }).then((result) => {
      //   /* Read more about handling dismissals below */
      //   if (result.dismiss === Swal.DismissReason.timer) {
      //     console.log("I was closed by the timer");
      //   }
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const deliveryPlace = {
        address: deliveryAddress,
        city: deliveryCity.value,
        division: deliveryDivisions.value,
      };

      const checkoutData = {
        deliveryPlace,
        products: totalProducts,
        customer: userData,
      };

      const jsonData = JSON.stringify(checkoutData);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      };
      const result = await fetchJson(apiRoutes.orders.create, options);
      setMessage(getResponseMessage(result, "Failed to place order."));

      if (result.success === true) {
        setOrderError(false);
        showSweetAlert();
        ClearButtonState();
        router.push("/cart");
      } else {
        setOrderError(true);
      }
    } catch (error) {
      setOrderError(true);
      setMessage(getErrorMessage(error));
    }
  };
  return (
    <div className="p-checkout">
      {message ? (
        <Note color={orderError ? "danger" : "green"}>{message}</Note>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit}>
        <div className="p-checkout__wrapper">
          <div className="p-checkout__address">
            <h3 className="p-checkout__heading">Delivery Address</h3>
            <SplitField>
              <Grid type="grid2">
                <CustomInput
                  type="text"
                  label="Address"
                  name="deliveryaddress"
                  value={deliveryAddress}
                  handleChange={(e: any) => {
                    setDeliveryAddress(e.target.value);
                  }}
                />
              </Grid>
            </SplitField>

            <SplitField>
              <Grid type="grid1">
                <CustomSelect
                  label="City"
                  options={cities}
                  onchange={(selectedOption: any) =>
                    setDeliveryCity(selectedOption)
                  }
                ></CustomSelect>
              </Grid>

              <Grid type="grid1">
                <CustomSelect
                  label="Division"
                  options={divisions}
                  onchange={(selectedOption: any) => {
                    setDeliveryDivisions(selectedOption);
                  }}
                ></CustomSelect>
              </Grid>
            </SplitField>
          </div>
          <div className="p-checkout__orders">
            <h3 className="p-checkout__heading">Order Details</h3>
            <div className="p-checkout__products-content">
              {totalProducts.products &&
                totalProducts.products.map((product: any, index: number) => {
                  return (
                    <div className="p-checkout__product" key={index}>
                      <div>{product.name}</div>
                      <div>
                        <span>{product.price}</span>×
                        <span>{product.quantity}</span>
                      </div>
                    </div>
                  );
                })}
              {totalProducts && (
                <div>
                  <div>Sub Total : {totalProducts.subTotal}</div>
                  <div>Total : {totalProducts.total}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-checkout__wrapper">
          <div className="p-checkout__bottom-content">
            <h3 className="p-checkout__heading">Customer</h3>
            <SplitField>
              <Grid type="grid2">
                <CustomInput
                  type="text"
                  label="Name"
                  name="name"
                  readOnly
                  value={userData.name}
                />
              </Grid>
              <Grid type="grid2">
                <CustomInput
                  type="number"
                  label="Phone Number"
                  name="phone"
                  readOnly
                  value={userData.phone}
                />
              </Grid>
            </SplitField>

            <SplitField>
              <Grid type="grid2">
                <CustomInput
                  type="email"
                  label="Email"
                  name="email"
                  readOnly
                  value={userData.email}
                />
              </Grid>
              <Grid type="grid2">
                <CustomInput
                  type="text"
                  label="Address"
                  name="address"
                  readOnly
                />
              </Grid>
            </SplitField>

            <SplitField>
              <Grid type="grid2">
                <CustomInput type="text" label="City" name="city" readOnly />
              </Grid>

              <Grid type="grid2">
                <CustomInput
                  type="text"
                  label="Division"
                  name="division"
                  readOnly
                />
              </Grid>
            </SplitField>
          </div>

          <div className="p-checkout__bottom-content">
            <h3 className="p-checkout__heading">Payment methods</h3>
            <div className="p-checkout__payment-wrapper">
              <Link href="">
                <div className="p-checkout__content">
                  <Image
                    src={IMAGES_DATA.cod}
                    width={80}
                    height={80}
                    alt="cash on delivery"
                  />
                  Cash on Delivery
                </div>
              </Link>
              <Link href="">
                <div className="p-checkout__content">
                  <Image
                    src={IMAGES_DATA.bkash}
                    width={80}
                    height={80}
                    alt="bkash"
                  />
                  Bkash
                </div>
              </Link>
              <Link href="">
                <div className="p-checkout__content">
                  <Image
                    src={IMAGES_DATA.visaPayment}
                    width={80}
                    height={80}
                    alt="visa/card"
                  />
                  Card/Mobile banking/NetBanking
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-checkout__button">
          <Button type="primary">Place Order</Button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
