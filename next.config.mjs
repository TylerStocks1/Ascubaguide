/** @type {import('next').NextConfig} */
const nextConfig = {
  // The A Scuba Guide PWA (Vite/React, lives in G:\Websites\Fish app) is
  // built separately and its dist/ output is copied into public/app-preview/.
  // Next's static file handler then serves it at /app-preview/...  Two
  // rewrites are needed:
  //
  //   1. /app-preview (no trailing slash) → the PWA entrypoint
  //   2. /app-preview/anything-not-a-file → same entrypoint, so that the
  //      PWA's client-side router can handle deep links on reload.
  //
  // We match anything under /app-preview/ that doesn't look like a static
  // asset (no dot in the path) and fall back to index.html.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/app-preview", destination: "/app-preview/index.html" },
      ],
      afterFiles: [
        {
          source: "/app-preview/:path((?!.*\\.).+)",
          destination: "/app-preview/index.html",
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
