import type { ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

interface Props {
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
  Icon = undefined,
  iconStyles,
}: Props) => {
  const styles =
    variant == "filled"
      ? "bg-[#012D1D] text-[#fff]"
      : variant == "outline"
        ? '"text-[#191C1B] bg-[#fff] border-2 border-[#C1C8C2]"'
        : "";
  return (
    <button
      className={`font-semibold flex items-center justify-center py-3 rounded-sm text-base ${styles} ${className} cursor-pointer`}
    >
      {Icon ? <Icon className={iconStyles} /> : ""} {children}
    </button>
  );
};

export default Button;
