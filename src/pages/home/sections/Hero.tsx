import Button from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import hero from "../../../../public/img/homepage/hero.png";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div
      className={`flex items-center h-120 w-full bg-no-repeat bg-cover bg-center`}
      style={{ backgroundImage: `url("${hero}")` }}
    >
      <div className="container mx-auto px-10 flex flex-col gap-7">
        <p className="text-base text-[#012D1D]">{t("home.hero.eyebrow")}</p>
        <p className="text-base text-[#414844]">{t("home.hero.description")}</p>
        <div className="flex gap-5">
          <Button onClick={() => navigate("/auth")}>
            {t("home.hero.signUp")}
          </Button>
          <Button variant="outline" onClick={() => navigate("/academy")}>
            {t("home.hero.browseAcademy")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
