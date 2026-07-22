import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://cake-salon-store.cakecnc.chatgpt.site", lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
