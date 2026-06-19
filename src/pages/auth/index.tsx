import { LogIn, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/button";
import background_img from "/img/login/section-right-bg.png";
import { z } from "zod";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "./../../../node_modules/@hookform/resolvers/zod/src/zod";

const Auth = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("login");

  const RegisterSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
  });

  type SchemaProps = z.infer<typeof RegisterSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaProps>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<SchemaProps> = (data) => console.log(data);

  return (
    <div className="flex">
      <div className="w-[50%] p-10 bg-[#F8FAF8]">
        <h1 className="text-[#012D1D] font-bold text-2xl">TES Hub</h1>
        <div className="flex items-center justify-center h-full">
          <div>
            <h2 className="text-[#012D1D] font-bold text-5xl">Welcome Back</h2>
            <p className="text-[#414844] font-size text-lg mt-3">
              Access expert agricultural resources and join our community.
            </p>

            <div>
              <div className="text-[#012D1D] font-semibold w-full flex justify-between items-center mt-10 border-b">
                <span
                  className={`border-b-3 border-[#012D1D] ${tab == "login" ? " border-[#012D1D]" : "border-transparent text-[#717973]"} p-2 w-[50%] text-center cursor-pointer`}
                  onClick={() => setTab("login")}
                >
                  Log In
                </span>
                <span
                  className={`border-b-3 border-[#012D1D] ${tab == "signup" ? " border-[#012D1D]" : "border-transparent text-[#717973]"} p-2 w-[50%] text-center cursor-pointer`}
                  onClick={() => setTab("signup")}
                >
                  Sign Up
                </span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mt-5">
                  <label htmlFor="email" className="text-[#414844]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="text"
                    placeholder="farmer@example.com"
                    {...register("email", { required: true })}
                    className={`placeholder:text-[#6B7280] p-3 py-2 rounded-none outline-none border mt-1 border-[#6B7280] bg-white ${
                      errors.email ? "border-[red]" : " border-[#6B7280]"
                    }`}
                  />
                  {errors.email?.type == "invalid_format" ? (
                    <span className="mt-2 text-[red]">
                      Invalid email format, it must have "@".
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex flex-col mt-5">
                  <div className="flex justify-between">
                    <label htmlFor="password">Password</label>
                    <p
                      className="text-[#1F6D1A] text-sm"
                      onClick={() => navigate("/auth/forgot-password")}
                    >
                      Forgot password ?
                    </p>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="12345678"
                    {...register("password", { required: true })}
                    className={`placeholder:text-[#6B7280] p-3 py-2 rounded-none outline-none border mt-1 border-[#6B7280] bg-white ${
                      errors.password ? "border-[red]" : " border-[#6B7280]"
                    }`}
                  />
                  {errors.password?.type == "too_small" ? (
                    <span className="mt-2 text-[red]">
                     Password must be at least 8 characters.
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <Button className="w-full mt-5" variant="filled">
                  Log in
                </Button>
              </form>

              <div className="flex w-full justify-center items-center gap-3 my-7">
                <span className="w-[35%] h-0.5 bg-[#C1C8C2]"></span>
                <span className="text-[#414844] text-xs">OR CONTINUE WITH</span>
                <span className="w-[35%] h-0.5 bg-[#C1C8C2]"></span>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  Icon={LogIn}
                  iconStyles=""
                  className="w-[45%] gap-1"
                >
                  Google
                </Button>
                <Button
                  variant="outline"
                  Icon={SendHorizonal}
                  iconStyles="text-[#229ED9]"
                  className="w-[45%] gap-1"
                >
                  Telegram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url('${background_img}')`,
        }}
        className={`h-screen w-[50%] bg-no-repeat bg-top-right bg-cover`}
      ></div>
    </div>
  );
};

export default Auth;
