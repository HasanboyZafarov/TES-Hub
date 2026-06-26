import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../../../components/ui/button";
import axiosInstance from "../../../lib/api/apiClient";

const SignupSchema = z
  .object({
    fullname: z.string().nonempty("Full name is required."),
    username: z.string().nonempty("Username is required."),
    email: z.string().email("Invalid email format."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type SchemaProps = z.infer<typeof SignupSchema>;

const SignupForm = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemaProps>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit: SubmitHandler<SchemaProps> = async (data) => {
    setServerError("");
    try {
      await axiosInstance.post("/auth/signup", {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: data.password,
      });
      navigate("/auth/verify-email", {
        state: { flow: "signup", email: data.email },
      });
    } catch (err: any) {
      setServerError(
        err.response?.data?.message || "Sign up failed. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mt-5">
        <label htmlFor="fullname" className="text-[#414844]">
          Full Name
        </label>
        <input
          id="fullname"
          type="text"
          placeholder="Ali Valiyev"
          {...register("fullname")}
          className={`placeholder:text-[#6B7280] p-3 py-2 outline-none border mt-1 bg-white ${
            errors.fullname ? "border-red-500" : "border-[#6B7280]"
          }`}
        />
        {errors.fullname && (
          <span className="mt-2 text-red-500 text-sm">
            {errors.fullname.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-5">
        <label htmlFor="username" className="text-[#414844]">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="AliValiyev"
          {...register("username")}
          className={`placeholder:text-[#6B7280] p-3 py-2 outline-none border mt-1 bg-white ${
            errors.username ? "border-red-500" : "border-[#6B7280]"
          }`}
        />
        {errors.username && (
          <span className="mt-2 text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-5">
        <label htmlFor="email" className="text-[#414844]">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="farmer@example.com"
          {...register("email")}
          className={`placeholder:text-[#6B7280] p-3 py-2 outline-none border mt-1 bg-white ${
            errors.email ? "border-red-500" : "border-[#6B7280]"
          }`}
        />
        {errors.email && (
          <span className="mt-2 text-red-500 text-sm">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-5">
        <label htmlFor="password" className="text-[#414844]">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className={`placeholder:text-[#6B7280] p-3 py-2 outline-none border mt-1 bg-white ${
            errors.password ? "border-red-500" : "border-[#6B7280]"
          }`}
        />
        {errors.password && (
          <span className="mt-2 text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-5">
        <label htmlFor="confirmPassword" className="text-[#414844]">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          className={`placeholder:text-[#6B7280] p-3 py-2 outline-none border mt-1 bg-white ${
            errors.confirmPassword ? "border-red-500" : "border-[#6B7280]"
          }`}
        />
        {errors.confirmPassword && (
          <span className="mt-2 text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {serverError && (
        <p className="mt-3 text-red-500 text-sm">{serverError}</p>
      )}

      <Button
        type="submit"
        className="w-full mt-5"
        variant="filled"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  );
};

export default SignupForm;
