import Link from "next/link";
import { mapModifiers } from "../../../helpers/libs/utils";
import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import Icon from "@/components/atoms/icon";

const Header = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    const token = getCookie("access_token");

    if (token) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, []);

  const signOutHandler = async () => {
    deleteCookie("access_token");
    window.location.reload();
  };

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
              <Link href="/categories" className="o-header__navLink">
                Categories
              </Link>
            </li>
            <li className="o-header__navItem">
              <Link href="/cart" className="o-header__navLink">
                Cart
              </Link>
            </li>

            <li className="o-header__navItem">
              <Link href="/admin" className="o-header__navLink">
                Admin
              </Link>
            </li>

            <li className="o-header__navItem">
              {!userLoggedIn ? (
                <Link href="/auth/signup" className="o-header__navLink">
                  Sign Up
                </Link>
              ) : (
                <span className="o-header__navLink" onClick={signOutHandler}>
                  Sign Out
                </span>
              )}
            </li>

            <li className="o-header__navItem">
              <div className="o-header__profile-icon">
                <Icon iconName="profile"></Icon>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
