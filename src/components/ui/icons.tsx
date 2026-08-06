import type { SVGProps } from "react";

/**
 * Inline vector icons (no runtime dependency). Sized via `className`
 * (e.g. `size-4`); color follows `currentColor`.
 */
export function ArrowRight({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M3 8h9M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
