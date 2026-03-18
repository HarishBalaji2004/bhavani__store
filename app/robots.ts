import type { MetadataRoute } from "next";

/**
 * Generates robots.txt
 * Automatically served at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://bhavani-store.vercel.app/sitemap.xml",
host: "https://bhavani-store.vercel.app",
  };
}
