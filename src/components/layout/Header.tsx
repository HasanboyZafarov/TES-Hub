import { Bell, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../lib/hooks/useAuth";
import { useAuthStore } from "../../store/authStore";
import Button from "../ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import StyledContainer from "./StyledContainer";

const NAVIGATION = [
  { id: 1, key: "academy", url: "/academy" },
  { id: 2, key: "community", url: "/community" },
  { id: 3, key: "sessions", url: "/sessions" },
  { id: 4, key: "resources", url: "/resources" },
];

const Header = () => {
  const user = useAuth();
  const { clearAuth } = useAuthStore();
  const { t } = useTranslation();

  const [isOpen, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

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

  const linkClass = (url: string) =>
    pathname.startsWith(url) ? `${baseStyles} opacity-80` : baseStyles;

  return (
    <div className="fixed top-0 left-0 w-screen border-b bg-[#F8FAF8] z-999">
      <StyledContainer>
        <div className="flex justify-between items-center h-22.5">
          <Link to={"/"} className="text-2xl font-bold text-[#012D1D]">
            TES Hub
          </Link>

          <nav className="hidden gap-10 lg:flex">
            {NAVIGATION.map(({ id, key, url }) => (
              <Link key={id} to={url} className={linkClass(url)}>
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>

          {windowWidth < 1024 && (
            <nav
              className={`${sidebarStyles} ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
              {NAVIGATION.map(({ id, key, url }) => (
                <Link
                  key={id}
                  to={url}
                  className={linkClass(url)}
                  onClick={() => setOpen(false)}
                >
                  {t(`nav.${key}`)}
                </Link>
              ))}
              {user && (
                <button
                  type="button"
                  onClick={() => {
                    clearAuth();
                    setOpen(false);
                  }}
                  className={`${baseStyles} text-left`}
                >
                  {t("common.logOut")}
                </button>
              )}
            </nav>
          )}

          <div className="flex items-center justify-center gap-3 z-999">
            <LanguageSwitcher />

            <Link to={"/notifications"} aria-label={t("nav.notifications")}>
              <Bell />
            </Link>

            {user ? (
              <img
                src={user.avatar}
                alt={t("nav.myProfile")}
                className="w-9 rounded-full shadow-2xl shadow-black outline-2 cursor-pointer object-fill"
                onClick={() => navigate(`/profile/me`)}
              />
            ) : (
              <Button className="p-2" onClick={() => navigate("/auth")}>
                {t("common.signUp")}
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
