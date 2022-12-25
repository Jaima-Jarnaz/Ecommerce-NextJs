import type { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/Product";

//get single product
const getSingleProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { productId } = req.query;
    const product = await Product.findOne({ _id: productId });
    res.status(200).json({
      isSuccess: true,
      message: "Successfully found product data",
      product,
    });
  } catch (err) {
    console.log(err);
  }
};

export default getSingleProduct;
