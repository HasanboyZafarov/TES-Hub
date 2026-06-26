import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../../components/ui/button";
import axiosInstance from "../../lib/api/apiClient";
import AuthShell from "./components/AuthShell";

interface LocationState {
  email: string;
  code: string;
}

const ResetSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type SchemaProps = z.infer<typeof ResetSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemaProps>({
    resolver: zodResolver(ResetSchema),
  });

  const onSubmit: SubmitHandler<SchemaProps> = async (data) => {
    setServerError("");
    try {
      await axiosInstance.post("/auth/reset-password", {
        email: state?.email,
        code: state?.code,
        password: data.password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/auth"), 2000);
    } catch (err: any) {
      setServerError(
        err.response?.data?.message || "Reset failed. Please try again.",
      );
    }
  };

  return (
    <AuthShell>
      <h2 className="text-[#012D1D] font-bold text-4xl">New Password</h2>
      <p className="text-[#414844] text-base mt-3">
        Choose a strong password for your account.
      </p>

      {success ? (
        <div className="mt-8 p-4 bg-[#E8F5E2] border border-[#1F6D1A] rounded-sm">
          <p className="text-[#1F6D1A] font-semibold">
            Password reset successful! Redirecting to login...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="flex flex-col">
            <label htmlFor="password" className="text-[#414844]">
              New Password
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
              Confirm New Password
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
            className="w-full mt-6"
            variant="filled"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
};

export default ResetPassword;
