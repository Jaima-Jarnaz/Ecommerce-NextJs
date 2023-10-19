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
const Checkout = ({ products, cities, divisions }: any) => {
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState<CustomSelectOptions>({
    value: "",
    label: "",
  });
  const [address, setAddress] = useState("");

  const { cartItems }: any = useContext(CartContext);

  const cartProducts = products.filter((product: any) => {
    console.log("all products", product);
    console.log("cartItems", cartItems);

    return cartItems.some((cartItem: any) => cartItem === product._id);
  });

  useEffect(() => {
    console.log(divisions, "divisions");
    console.log(cities, "cities");
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
      <form onSubmit={handleSubmit}>
        <div className="p-checkout__wrapper">
          <div className="p-checkout__address">
            <h3 className="p-checkout__heading">Delivery Address</h3>
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
                <CustomSelect
                  label="City"
                  options={cities}
                  onchange={(selectedOption: any) => setCity(selectedOption)}
                ></CustomSelect>
              </Grid>

              <Grid type="grid1">
                <CustomSelect
                  label="Division"
                  options={divisions}
                ></CustomSelect>
              </Grid>
            </SplitField>
          </div>
          <div className="p-checkout__address">
            <h3 className="p-checkout__heading">Order Details</h3>
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

  const optionsCities: any = [];
  const optionsDivisions: any = [];

  const dublicateDivisions = new Set();
  const dublicateCities = new Set();

  responseData.forEach((item: any) => {
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

  //-----------Fecth all products---------------
  const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_GET_ALL_API}`);
  const data = await res.json();

  return {
    props: {
      isSuccess: true,
      products: data.products,
      cities: optionsCities || null, // Ensure cities is not undefined
      divisions: optionsDivisions || null, // Ensure divisions is not undefined
    },
  };
}
