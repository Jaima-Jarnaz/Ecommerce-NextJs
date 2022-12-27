import Sidebar from "@/components/organisms/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="p-adminLayout">
      <Sidebar />
      <main className="p-adminLayout__content">{children}</main>
    </div>
  );
};

export default AdminLayout;
