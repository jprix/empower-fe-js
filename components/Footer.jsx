import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="o3-footer">
      <div className="o3-footer-top">
        <div className="o3-footer-brand">
          <div className="brand-title">Empower</div>
          <div className="brand-sub">Financial Network</div>
          <p>
            Helping individuals and families break free from debt and build a
            stronger financial future — one step at a time.
          </p>
          <p style={{ marginTop: "16px", fontSize: "13px" }}>
            P.O. Box 24 · Eastport, NY 11941
          </p>
        </div>

        <div className="o3-footer-col">
          <h4>Navigate</h4>
          <Link href="/">Home</Link>
          <Link href="/#benefits">Benefits</Link>
          <Link href="/#mission">About Us</Link>
          <Link href="/#faq">FAQ</Link>
        </div>

        <div className="o3-footer-col">
          <h4>Legal</h4>
          <Link href="/terms">Terms &amp; Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>

        <div className="o3-footer-col">
          <h4>Contact</h4>
          <a href="tel:8664901617">(866) 490-1617</a>
          <a href="mailto:Marketing@EmpowerFN.com">Marketing@EmpowerFN.com</a>
          <Link
            href="/apply-now"
            style={{ marginTop: "20px" }}
            className="o3-btn-primary"
          >
            Free Consultation →
          </Link>
        </div>
      </div>

      <div className="o3-footer-bottom">
        <span className="copy">
          © 2026 Empower Financial Network. All rights reserved.
        </span>
        <span style={{ fontSize: "12px", opacity: 0.4 }}>Eastport, NY</span>
      </div>

      <p className="o3-footer-disclaimer">
        Empower Financial Network connects consumers with debt relief service
        providers. We are not a lender or debt settlement company. Results may
        vary. Completing an application does not guarantee approval or specific
        outcomes. Debt relief programs may have tax implications and may affect
        your credit score.
      </p>
    </footer>
  );
};

export default Footer;
