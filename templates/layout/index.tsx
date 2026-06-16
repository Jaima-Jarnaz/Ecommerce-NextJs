import Header from "../../components/organisms/header";
import Footer from "../../components/organisms/footer";
import Icon from "@/components/atoms/icon";
import { CartContext } from "../../contexts/card/cardContext";
import { useContext } from "react";
import Link from "next/link";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { itemsCount }: any = useContext(CartContext);

  return (
    <div className="t-layout">
      <Header />
      <Link href="/cart" className="t-layout__add-to-card-link">
        <div className="t-layout__add-to-card-icon">
          <div className="t-layout__add-to-card-content">{itemsCount}</div>
          <Icon iconName="add-to-card" />
        </div>
      </Link>
      <main className="t-layout__main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
