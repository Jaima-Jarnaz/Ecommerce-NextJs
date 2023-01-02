export type BODY = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: { id: number; url: string };
}[];
