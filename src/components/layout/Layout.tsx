import { Outlet } from "react-router-dom";
import Header from "./Header";
import StyledContainer from "./StyledContainer";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="relative">
      <StyledContainer>
        <Header />
        <main className="pt-25 pb-60">
          <Outlet />
        </main>
      </StyledContainer>
      <Footer />
    </div>
  );
};

export default Layout;
