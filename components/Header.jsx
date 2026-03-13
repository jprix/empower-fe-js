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
          <li><a href="#benefits">Benefits</a></li>
          <li><a href="#mission">Our Mission</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li>
            <Link href="/contact" className="o3-nav-cta">
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
        <a href="#benefits" onClick={closeMenu}>Benefits</a>
        <a href="#mission" onClick={closeMenu}>Our Mission</a>
        <a href="#faq" onClick={closeMenu}>FAQ</a>
        <a href="tel:8664901617" onClick={closeMenu}>📞 (866) 490-1617</a>
        <Link href="/contact" className="mob-cta" onClick={closeMenu}>
          Get Free Consultation →
        </Link>
      </div>
    </>
  );
}
