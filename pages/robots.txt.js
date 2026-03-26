import { getSiteUrl } from "../lib/siteUrl";

function buildRobotsTxt(siteUrl) {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

export async function getServerSideProps({ res }) {
  const robotsTxt = buildRobotsTxt(getSiteUrl());

  res.setHeader("Content-Type", "text/plain");
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
}

export default function RobotsTxt() {
  return null;
}
