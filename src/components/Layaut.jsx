import { useLocation } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Navbar />
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default Layout;