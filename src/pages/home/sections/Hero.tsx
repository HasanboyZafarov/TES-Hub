import Button from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import hero from "../../../../public/img/homepage/hero.png";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex items-center h-120 w-full bg-no-repeat bg-cover bg-center`}
      style={{ backgroundImage: `url("${hero}")` }}
    >
      <div className="container mx-auto px-10 flex flex-col gap-7">
        <p className="text-base text-[#012D1D]">
          Empowering Kyrgyz Agriculture Since 1999
        </p>
        <p className="text-base text-[#414844]">
          Join the premier platform connecting traditional farming wisdom with
          modern agricultural science. Learn, share, and grow with thousands of
          farmers across Kyrgyzstan.
        </p>
        <div className="flex gap-5">
          <Button onClick={() => navigate("/auth")}>Sign Up Free</Button>
          <Button variant="outline" onClick={() => navigate("/academy")}>
            Browser Academy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
