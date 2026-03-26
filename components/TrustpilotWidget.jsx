import { useEffect, useRef } from "react";
import Script from "next/script";

const REVIEW_URL = "https://www.trustpilot.com/review/empowerfn.com";

export default function TrustpilotWidget({
  businessUnitId = process.env.NEXT_PUBLIC_TRUSTPILOT_BUSINESS_UNIT_ID,
  templateId,
  height = "140px",
  theme = "light",
  locale = "en-US",
  reviewCount = "66 reviews",
  score = "4.8",
  title = "Trustpilot",
  className = "",
  fallbackClassName = "",
}) {
  const widgetRef = useRef(null);
  const canRenderWidget = Boolean(businessUnitId && templateId);

  useEffect(() => {
    if (!canRenderWidget || typeof window === "undefined") return;

    if (window.Trustpilot && widgetRef.current) {
      window.Trustpilot.loadFromElement(widgetRef.current, true);
    }
  }, [businessUnitId, canRenderWidget, templateId]);

  if (!canRenderWidget) {
    return (
      <a
        href={REVIEW_URL}
        target="_blank"
        rel="noreferrer noopener"
        className={fallbackClassName}
      >
        <span className="trustpilot-fallback-brand">{title}</span>
        <span className="trustpilot-fallback-stars">★★★★★</span>
        <strong className="trustpilot-fallback-score">{score}</strong>
        <span className="trustpilot-fallback-meta">{reviewCount}</span>
      </a>
    );
  }

  return (
    <>
      <Script
        id="trustpilot-widget-script"
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.Trustpilot && widgetRef.current) {
            window.Trustpilot.loadFromElement(widgetRef.current, true);
          }
        }}
      />
      <div
        ref={widgetRef}
        className={`trustpilot-widget ${className}`.trim()}
        data-locale={locale}
        data-template-id={templateId}
        data-businessunit-id={businessUnitId}
        data-style-height={height}
        data-style-width="100%"
        data-theme={theme}
      >
        <a href={REVIEW_URL} target="_blank" rel="noreferrer noopener">
          Trustpilot
        </a>
      </div>
    </>
  );
}
