import Cards from "@/components/organisms/cards";
import Container from "@/components/atoms/container";
import baseUrl from "helpers/baseUrl";

const ProductsList = ({ products, isSuccess, message }: any) => {
  return (
    <Container>
      <Cards productData={products} />
    </Container>
  );
};

export default ProductsList;

export async function getBase64ImageUrl(
  imageId: string
): Promise<string | undefined> {
  const response = await fetch(
    `https://res.cloudinary.com/dgtz6af7c/image/upload/${imageId}`
  );
  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer).toString("base64");
  return `data:image/webp;base64,${data}`;
}

export async function getStaticProps() {
  let bluredImages: any = [];
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();

  data.forEach((element: any) => {
    const blurDataUrl = getBase64ImageUrl(element.imageUrl);
    console.log(blurDataUrl);
    //await bluredImages.push(blurDataUrl);
  });

  console.log("bluredImages", bluredImages);

  //const blurDataUrl = await getBase64ImageUrl("cgabqudzy4nl7ag7w3bx");

  return {
    props: {
      isSuccess: true,
      message: "Successfully found data",
      products: data,
    },
  };
}
