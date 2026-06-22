import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline";
  children: ReactNode;
  className?: string;
  Icon?: LucideIcon | "";
  iconStyles?: string;
}

const Button = ({
  children,
  variant = "filled",
  className,
  Icon,
  iconStyles,
  ...rest
}: Props) => {
  const styles =
    variant === "filled"
      ? "bg-[#012D1D] text-white"
      : "text-[#191C1B] bg-white border-2 border-[#C1C8C2]";

  return (
    <button
      className={`font-semibold flex items-center justify-center py-3 px-7 rounded-sm text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${styles} ${className}`}
      {...rest}
    >
      {Icon ? <Icon className={iconStyles} /> : ""}
      {children}
    </button>
  );
};

export default Button;
