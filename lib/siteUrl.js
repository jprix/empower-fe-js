const FALLBACK_SITE_URL = "http://localhost:3000";

export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  if (!envUrl) return FALLBACK_SITE_URL;

  return envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;
}
