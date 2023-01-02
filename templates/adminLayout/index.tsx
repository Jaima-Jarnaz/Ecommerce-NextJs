import Sidebar from "@/components/organisms/sidebar";
import AdminHeader from "@/components/organisms/adminHeader";
interface AdminLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="p-adminLayout">
      <Sidebar />
      <main className="p-adminLayout__content">
        <AdminHeader />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
