import { getSiteUrl } from "../lib/siteUrl";

const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/contact", priority: "0.9", changefreq: "monthly" },
  { path: "/apply-now", priority: "0.9", changefreq: "monthly" },
  { path: "/debt-101", priority: "0.9", changefreq: "monthly" },
  { path: "/products/product-a", priority: "0.7", changefreq: "monthly" },
  { path: "/products/product-b", priority: "0.7", changefreq: "monthly" },
  { path: "/products/product-c", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy", priority: "0.4", changefreq: "yearly" },
  { path: "/privacy-policy", priority: "0.4", changefreq: "yearly" },
  { path: "/terms", priority: "0.4", changefreq: "yearly" },
  { path: "/terms-and-conditions", priority: "0.4", changefreq: "yearly" },
];

function buildSiteMap(siteUrl) {
  const now = new Date().toISOString();
  const urls = staticPages
    .map(
      ({ path, priority, changefreq }) => `
  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const sitemap = buildSiteMap(getSiteUrl());

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  return null;
}
