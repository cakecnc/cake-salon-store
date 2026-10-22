import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://www.edibleicingsheet.com";
  return [{
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    images: [
      `${siteUrl}/cake-renaissance.jpeg`,
      `${siteUrl}/cake-salon-a4-25.webp`,
      `${siteUrl}/cake-floral.jpeg`,
      `${siteUrl}/coffee-i-love-you.webp`,
      `${siteUrl}/coffee-congrats.webp`,
      `${siteUrl}/coffee-thank-you.webp`,
      `${siteUrl}/cocktail-cheers.webp`,
      `${siteUrl}/cocktail-celebrate.webp`,
      `${siteUrl}/cocktail-anniversary.webp`,
      `${siteUrl}/candy-love.webp`,
      `${siteUrl}/candy-celebrate.webp`,
      `${siteUrl}/candy-thank-you.webp`,
      `${siteUrl}/cotton-face-bunny.webp`,
      `${siteUrl}/cotton-face-bear.webp`,
      `${siteUrl}/cotton-face-cat.webp`,
      `${siteUrl}/cookie-love.webp`,
      `${siteUrl}/cookie-celebrate.webp`,
      `${siteUrl}/cookie-thank-you.webp`,
      `${siteUrl}/macaron-anniversary.webp`,
      `${siteUrl}/macaron-celebrate.webp`,
      `${siteUrl}/macaron-floral.webp`,
      `${siteUrl}/macaron-disc-anniversary.webp`,
      `${siteUrl}/macaron-disc-celebrate.webp`,
      `${siteUrl}/macaron-disc-floral.webp`,
      `${siteUrl}/macaron-thin-anniversary.webp`,
      `${siteUrl}/macaron-thin-celebrate.webp`,
      `${siteUrl}/macaron-thin-floral.webp`,
      `${siteUrl}/bungeoppang-cake.webp`,
      `${siteUrl}/bungeoppang-cake-rainbow.webp`,
      `${siteUrl}/fruit-cake.webp`,
    ],
  }, {
    url: `${siteUrl}/designer`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }, {
    url: `${siteUrl}/research`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }, {
    url: `${siteUrl}/hashcat`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }];
}
