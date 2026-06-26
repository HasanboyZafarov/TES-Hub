import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import Button from "../../../components/ui/button";
import axiosInstance from "../../../lib/api/apiClient";
import { useAuthStore } from "../../../store/authStore";
import type User from "../../../types/user";

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type SchemaProps = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemaProps>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<SchemaProps> = async (data) => {
    setServerError("");
    try {
      const res = await axiosInstance.post<{ token: string; user: User }>(
        "/auth/login",
        data,
      );
      setAuth(res.data.token, res.data.user);
      navigate("/");
    } catch (err: any) {
      setServerError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mt-5">
        <label htmlFor="email" className="text-[#414844]">
          Email Address
        </label>
        <input
          id="email"
          type="text"
          placeholder="farmer@example.com"
          {...register("email")}
          className={`placeholder:text-[#6B7280] p-3 py-2 rounded-none outline-none border mt-1 bg-white ${
            errors.email ? "border-red-500" : "border-[#6B7280]"
          }`}
        />
        {errors.email && (
          <span className="mt-2 text-red-500 text-sm">
            {errors.email.message || "Invalid email format, it must have \"@\"."}
          </span>
        )}
      </div>

      <div className="flex flex-col mt-5">
        <div className="flex justify-between">
          <label htmlFor="password" className="text-[#414844]">
            Password
          </label>
          <span
            className="text-[#1F6D1A] text-sm cursor-pointer"
            onClick={() => navigate("/auth/forgot-password")}
          >
            Forgot password?
          </span>
        </div>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className={`placeholder:text-[#6B7280] p-3 py-2 rounded-none outline-none border mt-1 bg-white ${
            errors.password ? "border-red-500" : "border-[#6B7280]"
          }`}
        />
        {errors.password && (
          <span className="mt-2 text-red-500 text-sm">
            {errors.password.message}
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
        {isSubmitting ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
};

export default LoginForm;
