import { Bell, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/button";

const Header = () => {
  const navigation_list = [
    { id: 1, label: "Academy", url: "/academy" },
    { id: 2, label: "Community", url: "/community" },
    { id: 3, label: "Sessions", url: "/sessions" },
    { id: 4, label: "Resources", url: "/resources" },
  ];

  const { pathname } = useLocation();

  return (
    <div className="flex justify-between items-center fixed top-0 left-0 w-screen bg-[#F8FAF8] p-5">
      <Link to={"/"} className="text-2xl font-bold text-[#012D1D]">
        TES Knowledge Hub
      </Link>
      <nav className="flex gap-10">
        {navigation_list.map(({ id, label, url }) => (
          <Link
            key={id}
            to={url}
            className={
              pathname.includes(label.toLowerCase())
                ? "text-[#414844] opacity-80 font-semibold text-sm "
                : "text-[#414844] font-semibold text-sm"
            }
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center justify-center gap-3">
        <Link to={"/notifications"}>
          <Bell />
        </Link>

        <Search />

        <Button>Sign up</Button>
      </div>
    </div>
  );
};

export default Header;
