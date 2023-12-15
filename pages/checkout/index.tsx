import { useState, useContext, useEffect } from "react";
import { CartContext } from "contexts/card/cardContext";
import CustomInput from "@/components/atoms/custom-input";
import Grid from "@/components/atoms/grid";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import { CustomSelect } from "@/components/atoms/select";
import Image from "next/image";
import { IMAGES_DATA } from "@settings/settings";
import Link from "next/link";
const Checkout = () => {
  const [message, setMessage] = useState("");
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
  const { totalProducts }: any = useContext(CartContext);

  // Initialize userData using useState hook
  const [userData, setUserData] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    // Retrieve user data from localStorage
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      // Set the userData state
      setUserData({ name: user.name, phone: user.phone, email: user.email });
    }
  }, []); // Empty dependency array ensures the effect runs only on

  useEffect(() => {
    const geoNamesGenerate = async () => {
      // Geonames API endpoint for searching cities in Bangladesh
      const geonamesApiUrl = "http://api.geonames.org/searchJSON";

      // Set your Geonames username and the country code for Bangladesh
      const geonamesUsername = `${process.env.NEXT_PUBLIC_GEO_NAMES_USERNAME}`;
      const countryCode = "BD"; // ISO 3166-1 country code for Bangladesh

      // Define your query parameters
      const queryParams = new URLSearchParams({
        q: "*", // Query string (empty to get all cities)
        country: countryCode,
        username: geonamesUsername,
      });

      // Construct the full URL with query parameters

      const fullUrl = `${geonamesApiUrl}?${queryParams.toString()}`;

      // Make the Geonames API request
      const geonamesResponse = await fetch(fullUrl);
      const geonamesData = await geonamesResponse.json();

      // Handle the response data, which contains information about cities in Bangladesh
      const responseData = geonamesData.geonames;

      return responseData;
    };
    geoNamesGenerate().then((data) => {
      const optionsCities: any = [];
      const optionsDivisions: any = [];

      const dublicateDivisions = new Set();
      const dublicateCities = new Set();

      data.forEach((item: any) => {
        //---------Removing dublicate division values----------
        if (!dublicateDivisions.has(item.adminName1)) {
          optionsDivisions.push({
            value: item.adminName1,
            label: item.adminName1,
          });
          dublicateDivisions.add(item.adminName1);
        }

        //---------Removing dublicate cities values---------
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

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();

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
      console.log("done", checkoutData);

      const jsonData = JSON.stringify(checkoutData);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      };
      const user = await fetch(
        `${process.env.NEXT_PUBLIC_ORDER_CREATE_API}`,
        options
      );
      const result = await user.json();
      setMessage(result.message);

      if (result.success === true) {
        //router.push("/auth/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-checkout">
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
