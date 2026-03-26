import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="o3-nav">
        <Link href="/" className="o3-nav-logo">
          <div className="o3-nav-logo-mark">E</div>
          <div className="o3-nav-logo-text">
            <span className="logo-name">Empower</span>
            <span className="logo-sub">Financial Network</span>
          </div>
        </Link>

        <ul className="o3-nav-links">
          <li><Link href="/#benefits">Benefits</Link></li>
          <li><Link href="/#mission">Our Mission</Link></li>
          <li><Link href="/#faq">FAQ</Link></li>
          <li><Link href="/debt-101">Debt 101</Link></li>
          <li>
            <Link href="/apply-now" className="o3-nav-cta">
              Free Consultation
            </Link>
          </li>
        </ul>

        <button
          className={`o3-hamburger${menuOpen ? " open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`o3-mobile-menu${menuOpen ? " open" : ""}`}>
        <Link href="/#benefits" onClick={closeMenu}>Benefits</Link>
        <Link href="/#mission" onClick={closeMenu}>Our Mission</Link>
        <Link href="/#faq" onClick={closeMenu}>FAQ</Link>
        <Link href="/debt-101" onClick={closeMenu}>Debt 101</Link>
        <a href="tel:8664901617" onClick={closeMenu}>📞 (866) 490-1617</a>
        <Link href="/apply-now" className="mob-cta" onClick={closeMenu}>
          Get Free Consultation →
        </Link>
      </div>
    </>
  );
}
