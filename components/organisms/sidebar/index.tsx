import Link from "next/link";
const Sidebar = () => {
  return (
    <div className="o-sidebar">
      <ul className="o-sidebar__content">
        <Link href="/">
          <li className="o-sidebar__navItem">Website</li>
        </Link>
        <Link href="/admin">
          <li className="o-sidebar__navItem">Dashboard</li>
        </Link>
        <Link href="/admin/products">
          <li className="o-sidebar__navItem">Product</li>
        </Link>
        <Link href="/admin/orders">
          <li className="o-sidebar__navItem">Orders</li>
        </Link>
        <Link href="#">
          <li className="o-sidebar__navItem">Banners</li>
        </Link>
        <Link href="#">
          <li className="o-sidebar__navItem">Users</li>
        </Link>
        <Link href="#">
          <li className="o-sidebar__navItem">Employee</li>
        </Link>
        <Link href="#">
          <li className="o-sidebar__navItem">Report</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
