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
      `${siteUrl}/cake-salon-a4-25.png`,
      `${siteUrl}/cake-floral.jpeg`,
      `${siteUrl}/coffee-i-love-you.png`,
      `${siteUrl}/coffee-congrats.png`,
      `${siteUrl}/coffee-thank-you.png`,
      `${siteUrl}/cocktail-cheers.png`,
      `${siteUrl}/cocktail-celebrate.png`,
      `${siteUrl}/cocktail-anniversary.png`,
      `${siteUrl}/candy-love.png`,
      `${siteUrl}/candy-celebrate.png`,
      `${siteUrl}/candy-thank-you.png`,
      `${siteUrl}/cotton-face-bunny.png`,
      `${siteUrl}/cotton-face-bear.png`,
      `${siteUrl}/cotton-face-cat.png`,
      `${siteUrl}/cookie-love.png`,
      `${siteUrl}/cookie-celebrate.png`,
      `${siteUrl}/cookie-thank-you.png`,
      `${siteUrl}/macaron-anniversary.png`,
      `${siteUrl}/macaron-celebrate.png`,
      `${siteUrl}/macaron-floral.png`,
      `${siteUrl}/macaron-disc-anniversary.png`,
      `${siteUrl}/macaron-disc-celebrate.png`,
      `${siteUrl}/macaron-disc-floral.png`,
      `${siteUrl}/macaron-thin-anniversary.png`,
      `${siteUrl}/macaron-thin-celebrate.png`,
      `${siteUrl}/macaron-thin-floral.png`,
      `${siteUrl}/bungeoppang-cake.png`,
      `${siteUrl}/bungeoppang-cake-rainbow.png`,
      `${siteUrl}/fruit-cake.png`,
    ],
  }, {
    url: `${siteUrl}/designer`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }];
}
