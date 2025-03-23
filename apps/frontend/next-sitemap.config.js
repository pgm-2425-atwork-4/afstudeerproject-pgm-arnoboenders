// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
};
