import { useState, useContext, useEffect } from "react";
import { CartContext } from "contexts/card/cardContext";
import CustomInput from "@/components/atoms/custom-input";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import Heading from "@/components/atoms/heading";
import { CustomSelect, CustomSelectOptions } from "@/components/atoms/select";
import Image from "next/image";
import { IMAGES_DATA } from "@settings/settings";
import Link from "next/link";
const Checkout = ({ products }: any) => {
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryStreet, setDeliveryStreet] = useState("");
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
  const { cartItems, totalProducts }: any = useContext(CartContext);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const checkoutData = {
      deliveryAddress,
      deliveryStreet,
      deliveryCity,
      deliveryDivisions,
    };

    console.log("done", checkoutData);
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

              <Grid type="grid1">
                <CustomInput
                  type="text"
                  label="street"
                  name="street"
                  value={deliveryStreet}
                  handleChange={(e: any) => {
                    setDeliveryStreet(e.target.value);
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
                totalProducts.products.map((product: any) => {
                  return (
                    <div className="p-checkout__product">
                      <div>{product.name}</div>
                      <div>
                        <span>{product.price}</span>×
                        <span>{product.quantity}</span>
                      </div>
                    </div>
                  );
                })}
              {console.log(totalProducts)}
              {totalProducts && (
                <div>
                  <span>Sub Total : {totalProducts.subTotal}</span>
                  <span>Total : {totalProducts.total}</span>
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
                <CustomInput type="text" label="Name" name="name" readOnly />
              </Grid>
              <Grid type="grid2">
                <CustomInput
                  type="number"
                  label="Phone Number"
                  name="phone"
                  readOnly
                />
              </Grid>
            </SplitField>

            <SplitField>
              <Grid type="grid2">
                <CustomInput
                  type="text"
                  label="Address"
                  name="address"
                  readOnly
                />
              </Grid>

              <Grid type="grid1">
                <CustomInput
                  type="text"
                  label="street"
                  name="street"
                  readOnly
                />
              </Grid>
            </SplitField>

            <SplitField>
              <Grid type="grid1">
                <Grid type="grid1">
                  <CustomSelect label="City" options={cities}></CustomSelect>
                </Grid>
              </Grid>

              <Grid type="grid1">
                <CustomSelect
                  label="Division"
                  options={divisions}
                ></CustomSelect>
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

export async function getServerSideProps() {
  //-----------Fecth all products---------------
  const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_GET_ALL_API}`);
  const data = await res.json();

  return {
    props: {
      isSuccess: true,
      products: data.products,
    },
  };
}
