import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only, so the site is exported to ./out.
  // This rules out server features: no middleware, no route handlers, no
  // on-demand image optimization, no server redirects.
  output: "export",

  // Pages resolves /about to /about/index.html, so directory-style output is
  // the safe shape here.
  trailingSlash: true,

  // The optimizer is a server; without it next/image must serve files as-is.
  images: { unoptimized: true },

  // Empty for the apex domain. Set NEXT_PUBLIC_BASE_PATH to "/<repo>" when
  // deploying to a project page (https://<user>.github.io/<repo>).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // Pin the workspace root. Without it Turbopack walks up and finds the stray
  // lockfile in the parent Documents folder, then warns on every build.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
