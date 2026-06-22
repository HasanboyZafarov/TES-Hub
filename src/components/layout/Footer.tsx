import { Link } from "react-router-dom";
import StyledContainer from "./StyledContainer";

const Footer = () => {
  const academy = [
    { id: 1, label: "Academy", url: "/academy" },
    { id: 2, label: "Articles", url: "/academy/articles" },
    { id: 3, label: "Courses", url: "/academy/courses" },
  ];

  const community = [
    { id: 1, label: "Community", url: "/community" },
    { id: 2, label: "Questions", url: "/community/questions" },
    { id: 3, label: "Topics", url: "/community/topics" },
    { id: 4, label: "Photos", url: "/community/photos" },
  ];

  const legal_support = [
    { id: 2, label: "Privacy Policy", url: "/privacy-policy" },
    { id: 3, label: "Terms of use", url: "/terms-of-use" },
  ];

  return (
    <div className="absolute left-0 bottom-0 w-full py-10 border-t border-b bg-[#F8FAF8] z-100">
      <StyledContainer>
        <div className="flex justify-between w-full mt-2">
          <div>
            <Link to={"/"} className="text-2xl font-bold text-[#012D1D]">
              TES Hub
            </Link>
            <p className="text-sm text-[#414844]">
              © 2024 TES Knowledge Hub. Empowering Kyrgyz agriculture through
              traditional wisdom and modern science.
            </p>
          </div>

          <div className="flex items-start justify-between gap-10">
            <ul className="flex flex-col gap-2">
              {academy.map(({ id, label, url }) => (
                <Link
                  key={id}
                  to={url}
                  className={`${id == 1 ? "text-[#012D1D] font-semibold text-sm" : "text-sm text-[#414844] hover:underline"}`}
                >
                  {label}
                </Link>
              ))}
            </ul>
            <ul className="flex flex-col gap-2">
              {community.map(({ id, label, url }) => (
                <Link
                  key={id}
                  to={url}
                  className={`${id == 1 ? "text-[#012D1D] font-semibold text-sm" : "text-sm text-[#414844] hover:underline"}`}
                >
                  {label}
                </Link>
              ))}
            </ul>
            <ul className="flex flex-col gap-2">
              {legal_support.map(({ id, label, url }) => (
                <Link
                  key={id}
                  to={url}
                  className={`${id == 1 ? "text-[#012D1D] font-semibold text-sm" : "text-sm text-[#414844] hover:underline"}`}
                >
                  {label}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </StyledContainer>
    </div>
  );
};

export default Footer;
