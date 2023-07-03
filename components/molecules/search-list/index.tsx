import Text from "@/components/atoms/text";
import Image, { StaticImageData } from "next/image";
import Heading from "@/components/atoms/heading";
import Link from "next/link";

type SearchItem = {
  _id: string;
  name: string;
  description: string;
  alt: string;
  imageUrl: any;
};

export interface SearchListProps {
  searchResult: SearchItem[];
}

export const SearchList: React.FC<SearchListProps> = ({ searchResult }) => {
  return (
    <ul className="m-search-list">
      {searchResult.length > 0 ? (
        searchResult.map((item, index) => {
          return (
            <Link href={`products/${item._id}`} key={index}>
              <li className="m-search-list__contents">
                <Heading tag="h5" fontSize="16" alignment="left">
                  {item.name}
                </Heading>
                <Text fontSize="16">{item.description}</Text>
                <Image
                  src={item.imageUrl.url}
                  alt={item.name}
                  width={40}
                  height={40}
                />
              </li>
            </Link>
          );
        })
      ) : (
        <>
          <p>no data</p>
        </>
      )}
    </ul>
  );
};
