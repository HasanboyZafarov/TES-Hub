import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "../../components/ui/button";
import axiosInstance from "../../lib/api/apiClient";
import AuthShell from "./components/AuthShell";

const ForgotSchema = z.object({
  email: z.email("Invalid email format."),
});

type SchemaProps = z.infer<typeof ForgotSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SchemaProps>({
    resolver: zodResolver(ForgotSchema),
  });

  const onSubmit: SubmitHandler<SchemaProps> = async (data) => {
    setServerError("");
    try {
      await axiosInstance.post("/auth/forgot-password", { email: data.email });
      navigate("/auth/verify-email", {
        state: { flow: "forgot", email: data.email },
      });
    } catch (err: any) {
      setServerError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <AuthShell>
      <h2 className="text-[#012D1D] font-bold text-4xl">Forgot Password</h2>
      <p className="text-[#414844] text-base mt-3">
        Enter your email and we'll send you a reset code.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="flex flex-col">
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

        {serverError && (
          <p className="mt-3 text-red-500 text-sm">{serverError}</p>
        )}

        <Button
          type="submit"
          className="w-full mt-6"
          variant="filled"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Reset Code"}
        </Button>

        <p className="text-center mt-4 text-[#414844] text-sm">
          Remember your password?{" "}
          <span
            className="text-[#1F6D1A] font-semibold cursor-pointer"
            onClick={() => navigate("/auth")}
          >
            Log in
          </span>
        </p>
      </form>
    </AuthShell>
  );
};

export default ForgotPassword;
