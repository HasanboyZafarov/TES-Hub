import { Bell, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../lib/hooks/useAuth";
import Button from "../ui/button";
import StyledContainer from "./StyledContainer";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const user = useAuth();
  const { clearAuth } = useAuthStore();

  const [isOpen, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const navigation_list = [
    { id: 1, label: "Academy", url: "/academy" },
    { id: 2, label: "Community", url: "/community" },
    { id: 3, label: "Sessions", url: "/sessions" },
    { id: 4, label: "Resources", url: "/resources" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width >= 1024) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { pathname } = useLocation();

  const baseStyles = "text-[#414844] font-semibold text-sm cursor-pointer";

  const sidebarStyles =
    "fixed top-[90px] right-0 flex flex-col w-[60%] md:w-[50%] pt-8 h-screen gap-5 bg-[#F8FAF8] pl-10 transition-transform duration-300 z-999 border";

  return (
    <div className="fixed top-0 left-0 w-screen border-b bg-[#F8FAF8] z-999">
      <StyledContainer>
        <div className="flex justify-between items-center h-22.5">
          <Link to={"/"} className="text-2xl font-bold text-[#012D1D]">
            TES Hub
          </Link>

          <nav className="hidden gap-10 lg:flex">
            {navigation_list.map(({ id, label, url }) => (
              <Link
                key={id}
                to={url}
                className={
                  pathname.includes(label.toLowerCase())
                    ? baseStyles + " opacity-80"
                    : baseStyles
                }
              >
                {label}
              </Link>
            ))}
          </nav>

          {windowWidth < 1024 && (
            <nav
              className={`${sidebarStyles} ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              {navigation_list.map(({ id, label, url }) => (
                <Link
                  key={id}
                  to={url}
                  className={
                    pathname.includes(label.toLowerCase())
                      ? baseStyles + " opacity-80"
                      : baseStyles
                  }
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
              {user && (
                <li
                  onClick={() => {
                    clearAuth();
                    setOpen(false);
                  }}
                  className={`${baseStyles}`}
                >
                  Log out
                </li>
              )}
            </nav>
          )}

          <div className="flex items-center justify-center gap-3 z-999">
            <Link to={"/notifications"}>
              <Bell />
            </Link>

            <Search />

            {user ? (
              <div>
                <img
                  src={user.avatar}
                  alt=""
                  className="w-9 rounded-full shadow-2xl shadow-black outline-2 cursor-pointer object-fill"
                  onClick={() => navigate(`/profile/me`)}
                />
              </div>
            ) : (
              <Button className="p-2" onClick={() => navigate("/auth")}>
                Sign up
              </Button>
            )}

            {isOpen ? (
              <X
                size={30}
                className="cursor-pointer block lg:hidden"
                onClick={() => setOpen(!isOpen)}
              />
            ) : (
              <Menu
                size={30}
                className="cursor-pointer block lg:hidden"
                onClick={() => setOpen(!isOpen)}
              />
            )}
          </div>
        </div>
      </StyledContainer>
    </div>
  );
};

export default Header;
