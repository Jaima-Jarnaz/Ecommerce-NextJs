import Header from "../../components/organisms/header";
import Footer from "../../components/organisms/footer";

export interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>
        <h3>{children}</h3>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
