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
      {searchResult.map((item, index) => {
        return (
          <li key={index}>
            <Link href={`products/${item._id}`}>
              <Heading tag="h5" fontSize="16" alignment="left">
                {item.name}
              </Heading>
              <Text fontSize="14">{item.description}</Text>

              <Image
                src={item.imageUrl.url}
                alt={item.name}
                width={50}
                height={50}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
