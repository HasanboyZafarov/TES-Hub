import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAF8] relative">
      <Header />
      <main className="flex-1 pt-22">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
