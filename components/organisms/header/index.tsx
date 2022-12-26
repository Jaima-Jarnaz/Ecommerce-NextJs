import Link from "next/link";
import { mapModifiers } from "../../../helpers/libs/utils";

const Header = () => {
  return (
    <header className={mapModifiers("o-header")}>
      <nav className="o-header__navbar">
        <Link className="o-header__brand" href="/">
          Fashionava
        </Link>
        <div className="o-header__navbarCollapse">
          <ul className="o-header__navbarNav">
            <li className="o-header__navItem">
              <Link href="/" className="o-header__navLink">
                Home
              </Link>
            </li>
            <li className="o-header__navItem">
              <Link href="/products" className="o-header__navLink">
                Products
              </Link>
            </li>
            <li className="o-header__navItem">
              <Link href="/cart" className="o-header__navLink">
                Cart
              </Link>
            </li>
            <li className="o-header__navItem">
              <Link href="/auth/signin" className="o-header__navLink">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
