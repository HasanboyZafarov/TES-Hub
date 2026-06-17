import type { ReactNode } from "react";

interface Props {
  variant?: "default" | "outline";
  children: ReactNode;
  className?: string;
}

const Button = ({ children, variant = "default", className }: Props) => {
  const base_styles = "font-semibold";
  const styles = variant == "outline" ? "" : "";
  return (
    <button className={`${base_styles} ${className} ${styles} cursor-pointer`}>
      {" "}
      {children}{" "}
    </button>
  );
};

export default Button;
