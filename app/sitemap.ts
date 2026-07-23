import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: "https://cakesalon.kr",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    images: [
      "https://cakesalon.kr/cake-renaissance.jpeg",
      "https://cakesalon.kr/cake-salon-a4-25.png",
      "https://cakesalon.kr/cake-floral.jpeg",
    ],
  }];
}
