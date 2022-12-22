import type { NextApiRequest, NextApiResponse } from "next";
import database from "../../helpers/db/database";
import Product from "../../models/Product";

database();

// type Data = {
//   name: string;
// };

// export default function handler(
//   req: NextApiRequest,
//   //res: NextApiResponse<Data>
//   res: NextApiResponse
// ) {
//   Product.find()
//     .then((products: any) => {
//       res.status(200).json({ message: "Data loaded", products });
//     })
//     .catch((er) => {
//       console.log(er);
//     });
// }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getallProducts(req, res);
      break;
    case "POST":
      await saveProduct(req, res);
      break;
  }
};

const getallProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};

const saveProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, price, description, imageUrl } = req.body;
  try {
    if (!name || !price || !description || !imageUrl) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const product = await new Product({
      name,
      price,
      description,
      imageUrl,
    }).save();
    res.status(201).json({ message: "Product added successfully..", product });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
    console.log(err);
  }
};
