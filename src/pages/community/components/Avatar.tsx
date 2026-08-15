import { initialsOf } from "@/lib/utils/community";
import { useState } from "react";

interface Props {
  name?: string;
  src?: string;
  size?: number;
  rounded?: "full" | "lg";
  className?: string;
}

/**
 * Avatars across the community feed come from user uploads that may be missing,
 * so every one of them falls back to initials rather than a broken image.
 */
const Avatar = ({
  name,
  src,
  size = 40,
  rounded = "full",
  className = "",
}: Props) => {
  const [failed, setFailed] = useState(false);
  const shape = rounded === "full" ? "rounded-full" : "rounded-lg";
  const style = { width: size, height: size, fontSize: Math.max(11, size / 2.8) };

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name ?? "Avatar"}
        style={style}
        onError={() => setFailed(true)}
        className={`shrink-0 object-cover bg-[#ECEEEC] ${shape} ${className}`}
      />
    );
  }

  return (
    <div
      style={style}
      aria-hidden
      className={`shrink-0 flex items-center justify-center bg-[#DCE7DD] text-[#012D1D] font-semibold ${shape} ${className}`}
    >
      {initialsOf(name)}
    </div>
  );
};

export default Avatar;
