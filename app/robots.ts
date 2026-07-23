import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Yeti", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
    ],
    sitemap: "https://cakesalon.kr/sitemap.xml",
    host: "https://cakesalon.kr",
  };
}
