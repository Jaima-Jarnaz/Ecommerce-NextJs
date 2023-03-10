import type { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/Product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getSingleProduct(req, res);
      break;

    case "DELETE":
      await deleteProduct(req, res);
      break;

    case "PUT":
      await updateProduct(req, res);
      break;
  }
};

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

//delete product
const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { productId } = req.query;
    const product = await Product.findByIdAndDelete({ _id: productId });
    res.status(200).json({
      isSuccess: true,
      message: "Successfully Deleted product data",
      product,
    });
  } catch (err) {
    console.log(err);
  }
};

//Update product
const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { productId } = req.query;
    const productUpdate = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      isSuccess: true,
      message: "Product updated successfully..",
      productUpdate,
    });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
    console.log(err);
  }
};

export default handler;
