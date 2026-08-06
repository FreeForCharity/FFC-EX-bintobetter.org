import Image from "next/image";

export function PhotoSlot({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={800}
        height={800}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center bg-paper ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-10 w-10 text-lime" fill="currentColor" aria-hidden>
        <path d="M12 2C7 6 4 10 4 14a8 8 0 0 0 16 0c0-4-3-8-8-12Z" />
      </svg>
    </div>
  );
}
