import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tedxaceec.vercel.app/";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Add more pages here as the site grows, e.g.:
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified,
    //   changeFrequency: "monthly",
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/speakers`,
    //   lastModified,
    //   changeFrequency: "weekly",
    //   priority: 0.9,
    // },
    // {
    //   url: `${baseUrl}/register`,
    //   lastModified,
    //   changeFrequency: "weekly",
    //   priority: 0.9,
    // },
  ];
}
