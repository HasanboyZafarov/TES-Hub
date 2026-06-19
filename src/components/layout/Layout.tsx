import { Outlet } from "react-router-dom";
import Header from "./Header";
import StyledContainer from "./StyledContainer";

const Layout = () => {
  return (
    <StyledContainer>
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </StyledContainer>
  );
};

export default Layout;
