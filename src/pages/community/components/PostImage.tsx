import { useState } from "react";

interface Props {
  src?: string;
  alt: string;
  caption?: string;
  className?: string;
  /** Rendered in place of the image when the file is missing. */
  fallback?: React.ReactNode;
}

/**
 * Cover images are author-supplied and often missing from the CDN. A broken
 * <img> renders its alt text over an empty frame, which reads as a bug — so the
 * whole figure is dropped instead.
 */
const PostImage = ({
  src,
  alt,
  caption,
  className = "",
  fallback = null,
}: Props) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{fallback}</>;

  return (
    <figure className={caption ? "mt-6" : ""}>
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className={`bg-[#ECEEEC] ${className}`}
      />
      {caption && (
        <figcaption className="text-[#717973] text-xs mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default PostImage;
