import Link from "next/link";
const Sidebar = () => {
  return (
    <div className="o-sidebar">
      <ul className="o-sidebar__content">
        <li className="o-sidebar__navItem">
          <Link href="/admin" className="o-sidebar__navLink">
            Dashboard
          </Link>
        </li>
        <li className="o-sidebar__navItem">
          <Link href="/admin/products" className="o-sidebar__navLink">
            Product
          </Link>
        </li>
        <li className="o-sidebar__navItem">
          <Link href="/admin/orders" className="o-sidebar__navLink">
            Orders
          </Link>
        </li>
        <li className="o-sidebar__navItem">
          <Link href="/report" className="o-sidebar__navLink">
            Report
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
