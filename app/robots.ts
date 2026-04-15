import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";

/**
 * robots.txt — open to every crawler that matters, with explicit rules
 * allowing AI search crawlers. Per the Stocks Local skill spec, GEO is the
 * differentiator: do NOT block GPTBot, ClaudeBot, PerplexityBot, etc.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default — allow everything.
      { userAgent: "*", allow: "/" },

      // AI assistant + AI search crawlers — explicitly allowed.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
