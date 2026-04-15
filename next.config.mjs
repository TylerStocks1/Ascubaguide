/** @type {import('next').NextConfig} */
const nextConfig = {
  // Make /koh-tao (no trailing slash) resolve to the static PWA index.
  // The PWA itself lives in public/koh-tao/ and is served by Next's static
  // file handler. See public/koh-tao/README.md for the deploy pipeline.
  //
  // When the real Vite PWA bundle is copied in, this rewrite block will
  // need a catch-all entry as well so direct-loads of deep routes
  // (/koh-tao/dive-sites/chumphon-pinnacle) fall back to index.html for
  // the PWA's client router. That lands during PWA integration.
  async rewrites() {
    return [
      { source: "/koh-tao", destination: "/koh-tao/index.html" },
    ];
  },
};

export default nextConfig;
