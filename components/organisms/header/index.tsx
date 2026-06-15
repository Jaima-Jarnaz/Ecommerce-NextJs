import Link from "next/link";
import { mapModifiers } from "../../../helpers/libs/utils";
import { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import Icon from "@/components/atoms/icon";

const Header = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    const itemsToRemove = [
      "user",
      "total_card_items",
      "total_products",
      "cartItems",
    ];

    itemsToRemove.forEach((item) => {
      localStorage.removeItem(item);
    });

    window.location.reload();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={mapModifiers("o-header", menuOpen && "menu-open")}>
      <nav className="o-header__navbar">
        <Link className="o-header__brand" href="/" onClick={closeMenu}>
          Fashionava
        </Link>
        <button
          type="button"
          className="o-header__menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="o-header__navbarCollapse">
          <ul className="o-header__navbarNav">
            <li className="o-header__navItem">
              <Link href="/" className="o-header__navLink" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="o-header__navItem">
              <Link
                href="/products"
                className="o-header__navLink"
                onClick={closeMenu}
              >
                Products
              </Link>
            </li>
            <li className="o-header__navItem">
              <Link
                href="/categories"
                className="o-header__navLink"
                onClick={closeMenu}
              >
                Categories
              </Link>
            </li>
            <li className="o-header__navItem">
              <Link href="/cart" className="o-header__navLink" onClick={closeMenu}>
                Cart
              </Link>
            </li>

            <li className="o-header__navItem">
              <Link href="/admin" className="o-header__navLink" onClick={closeMenu}>
                Admin
              </Link>
            </li>

            <li className="o-header__navItem">
              {!userLoggedIn ? (
                <Link
                  href="/auth/signup"
                  className="o-header__navLink"
                  onClick={closeMenu}
                >
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
