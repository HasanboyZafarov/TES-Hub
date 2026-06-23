import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-25 pb-60 container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
