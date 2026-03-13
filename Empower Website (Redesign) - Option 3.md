\<\!DOCTYPE html\>  
\<html lang="en"\>  
\<head\>  
\<meta charset="UTF-8"\>  
\<meta name="viewport" content="width=device-width, initial-scale=1.0"\>  
\<title\>Empower Financial Network — Financial Freedom Starts Here\</title\>  
\<link rel="preconnect" href="https://fonts.googleapis.com"\>  
\<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;900\&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400\&family=DM+Sans:wght@300;400;500\&display=swap" rel="stylesheet"\>  
\<style\>  
  \*, \*::before, \*::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {  
    \--navy: \#0d1f3c;  
    \--navy-mid: \#142850;  
    \--navy-light: \#1a3464;  
    \--gold: \#e8c14a;  
    \--gold-light: \#f0d070;  
    \--gold-dim: \#c9a83c;  
    \--cream: \#f9f4e8;  
    \--cream-dark: \#f0e8d4;  
    \--white: \#ffffff;  
    \--text-muted: \#8a9bb5;  
  }

  html { scroll-behavior: smooth; }

  body {  
    font-family: 'DM Sans', sans-serif;  
    background: var(--navy);  
    color: var(--cream);  
    overflow-x: hidden;  
  }

  /\* ─── NAV ─── \*/  
  nav {  
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;  
    display: flex; align-items: center; justify-content: space-between;  
    padding: 20px 60px;  
    background: linear-gradient(180deg, rgba(13,31,60,0.98) 0%, rgba(13,31,60,0) 100%);  
    backdrop-filter: blur(8px);  
    animation: fadeDown 0.8s ease both;  
  }

  .nav-logo {  
    display: flex; align-items: center; gap: 12px;  
  }

  .nav-logo-mark {  
    width: 44px; height: 44px;  
    background: var(--gold);  
    border-radius: 6px;  
    display: flex; align-items: center; justify-content: center;  
    font-family: 'Playfair Display', serif;  
    font-weight: 900;  
    font-size: 22px;  
    color: var(--navy);  
    letter-spacing: \-1px;  
  }

  .nav-logo-text {  
    display: flex; flex-direction: column;  
  }

  .nav-logo-text span:first-child {  
    font-family: 'Playfair Display', serif;  
    font-weight: 700;  
    font-size: 17px;  
    color: var(--gold);  
    letter-spacing: 1px;  
  }

  .nav-logo-text span:last-child {  
    font-size: 10px;  
    letter-spacing: 3px;  
    text-transform: uppercase;  
    color: var(--text-muted);  
  }

  .nav-links {  
    display: flex; align-items: center; gap: 40px;  
    list-style: none;  
  }

  .nav-links a {  
    text-decoration: none;  
    font-size: 13px;  
    letter-spacing: 1.5px;  
    text-transform: uppercase;  
    color: var(--cream);  
    opacity: 0.75;  
    transition: opacity 0.2s, color 0.2s;  
  }

  .nav-links a:hover { opacity: 1; color: var(--gold); }

  .nav-cta {  
    background: var(--gold);  
    color: var(--navy) \!important;  
    font-weight: 600;  
    padding: 10px 24px;  
    border-radius: 4px;  
    opacity: 1 \!important;  
    transition: background 0.2s \!important;  
  }

  .nav-cta:hover { background: var(--gold-light) \!important; }

  /\* ─── HERO ─── \*/  
  .hero {  
    min-height: 100vh;  
    position: relative;  
    display: flex; align-items: center;  
    padding: 80px 60px 140px;  
    overflow: hidden;  
  }

  .hero-bg {  
    position: absolute; inset: 0; z-index: 0;  
    background:  
      radial-gradient(ellipse 70% 80% at 70% 50%, rgba(26,52,100,0.6) 0%, transparent 70%),  
      radial-gradient(ellipse 40% 60% at 90% 20%, rgba(232,193,74,0.08) 0%, transparent 60%),  
      linear-gradient(135deg, \#0a1828 0%, \#0d1f3c 50%, \#142850 100%);  
  }

  /\* decorative grid lines \*/  
  .hero-grid {  
    position: absolute; inset: 0; z-index: 0;  
    background-image:  
      linear-gradient(rgba(232,193,74,0.04) 1px, transparent 1px),  
      linear-gradient(90deg, rgba(232,193,74,0.04) 1px, transparent 1px);  
    background-size: 80px 80px;  
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%);  
  }

  /\* decorative arc \*/  
  .hero-arc {  
    position: absolute; right: \-10%; top: 50%;  
    transform: translateY(-50%);  
    width: 700px; height: 700px;  
    border-radius: 50%;  
    border: 1px solid rgba(232,193,74,0.12);  
    z-index: 0;  
  }

  .hero-arc::before {  
    content: '';  
    position: absolute; inset: 60px;  
    border-radius: 50%;  
    border: 1px solid rgba(232,193,74,0.08);  
  }

  .hero-arc::after {  
    content: '';  
    position: absolute; inset: 130px;  
    border-radius: 50%;  
    border: 1px solid rgba(232,193,74,0.05);  
  }

  .hero-content {  
    position: relative; z-index: 1;  
    max-width: 680px;  
  }

  .hero-badge {  
    display: inline-flex; align-items: center; gap: 8px;  
    background: rgba(232,193,74,0.08);  
    border: 1px solid rgba(232,193,74,0.2);  
    border-radius: 100px;  
    padding: 8px 18px;  
    font-size: 12px;  
    letter-spacing: 1.5px;  
    text-transform: uppercase;  
    color: rgba(232,193,74,0.75);  
    margin-top: 18px;  
    display: inline-flex;  
    animation: fadeUp 0.8s 0.9s ease both;  
  }

  /\* Bold phone CTA button \*/  
  .btn-phone {  
    display: flex; align-items: center; gap: 12px;  
    background: rgba(232,193,74,0.1);  
    border: 1.5px solid rgba(232,193,74,0.5);  
    border-radius: 4px;  
    padding: 12px 22px;  
    text-decoration: none;  
    transition: background 0.25s, border-color 0.25s, transform 0.2s;  
  }  
  .btn-phone:hover {  
    background: rgba(232,193,74,0.18);  
    border-color: var(--gold);  
    transform: translateY(-2px);  
  }  
  .btn-phone .phone-icon {  
    width: 38px; height: 38px; flex-shrink: 0;  
    background: var(--gold);  
    border-radius: 50%;  
    display: flex; align-items: center; justify-content: center;  
    font-size: 18px;  
  }  
  .btn-phone .phone-text {  
    display: flex; flex-direction: column; gap: 2px;  
  }  
  .btn-phone .phone-label {  
    font-size: 11px;  
    letter-spacing: 1.5px;  
    text-transform: uppercase;  
    color: var(--gold);  
    font-weight: 600;  
  }  
  .btn-phone .phone-number {  
    font-family: 'Playfair Display', serif;  
    font-size: 18px;  
    font-weight: 700;  
    color: var(--cream);  
    letter-spacing: 0.5px;  
  }

  .hero-tagline {  
    font-family: 'Playfair Display', serif;  
    font-size: clamp(30px, 3.8vw, 50px);  
    font-style: italic;  
    font-weight: 700;  
    color: var(--cream);  
    line-height: 1.2;  
    max-width: 680px;  
    width: 100%;  
    margin-bottom: 36px;  
    padding-bottom: 36px;  
    border-bottom: 1px solid rgba(232,193,74,0.2);  
    animation: fadeUp 0.8s 0.1s ease both;  
  }

  .hero-tagline .ht-highlight {  
    color: var(--gold);  
  }

  .hero-badge::before {  
    content: '';  
    width: 6px; height: 6px;  
    background: var(--gold);  
    border-radius: 50%;  
    animation: pulse 2s infinite;  
  }

  @keyframes pulse {  
    0%, 100% { opacity: 1; transform: scale(1); }  
    50% { opacity: 0.5; transform: scale(1.3); }  
  }

  .hero h1 {  
    font-family: 'Playfair Display', serif;  
    font-size: clamp(46px, 6vw, 82px);  
    font-weight: 900;  
    line-height: 1.05;  
    color: var(--cream);  
    margin-bottom: 8px;  
    animation: fadeUp 0.8s 0.35s ease both;  
  }

  .hero h1 em {  
    font-style: italic;  
    color: var(--gold);  
  }

  .hero-sub {  
    font-family: 'Libre Baskerville', serif;  
    font-size: 20px;  
    font-weight: 400;  
    color: var(--text-muted);  
    margin-bottom: 40px;  
    line-height: 1.6;  
    animation: fadeUp 0.8s 0.5s ease both;  
  }

  .hero-pillars {  
    display: flex; flex-direction: column; gap: 12px;  
    margin-bottom: 28px;  
    animation: fadeUp 0.8s 0.65s ease both;  
  }

  .hero-pillar {  
    display: flex; align-items: center; gap: 14px;  
    font-size: 15px;  
    color: rgba(249,244,232,0.85);  
  }

  .pillar-dot {  
    width: 22px; height: 22px; flex-shrink: 0;  
    background: rgba(232,193,74,0.15);  
    border: 1px solid var(--gold-dim);  
    border-radius: 50%;  
    display: flex; align-items: center; justify-content: center;  
  }

  .pillar-dot::after {  
    content: '✓';  
    font-size: 11px;  
    color: var(--gold);  
    font-weight: 700;  
  }

  .hero-actions {  
    display: flex; align-items: center; gap: 20px;  
    animation: fadeUp 0.8s 0.8s ease both;  
  }

  .btn-primary {  
    background: var(--gold);  
    color: var(--navy);  
    font-family: 'DM Sans', sans-serif;  
    font-weight: 600;  
    font-size: 15px;  
    letter-spacing: 0.5px;  
    padding: 16px 36px;  
    border-radius: 4px;  
    text-decoration: none;  
    border: none; cursor: pointer;  
    display: inline-flex; align-items: center; gap: 10px;  
    transition: background 0.25s, transform 0.25s, box-shadow 0.25s;  
    box-shadow: 0 8px 30px rgba(232,193,74,0.3);  
  }

  .btn-primary:hover {  
    background: var(--gold-light);  
    transform: translateY(-2px);  
    box-shadow: 0 12px 40px rgba(232,193,74,0.4);  
  }

  .btn-primary .arrow { transition: transform 0.25s; }  
  .btn-primary:hover .arrow { transform: translateX(4px); }

  /\* Mobile overrides for phone button \*/  
  @media (max-width: 600px) {  
    .btn-phone { padding: 10px 16px; }  
    .btn-phone .phone-icon { width: 32px; height: 32px; font-size: 15px; }  
    .btn-phone .phone-number { font-size: 16px; }  
    .hero-badge { font-size: 11px; margin-top: 14px; }  
  }

  /\* Hero stats strip \*/  
  .hero-stats {  
    position: absolute; bottom: 36px; left: 60px; right: 60px; z-index: 1;  
    display: flex; gap: 60px;  
  }

  .stat-item { display: flex; flex-direction: column; gap: 4px; }

  .stat-number {  
    font-family: 'Playfair Display', serif;  
    font-size: 36px;  
    font-weight: 700;  
    color: var(--gold);  
    line-height: 1;  
  }

  .stat-label {  
    font-size: 12px;  
    letter-spacing: 1.5px;  
    text-transform: uppercase;  
    color: var(--text-muted);  
  }

  .stat-divider {  
    width: 1px;  
    background: rgba(232,193,74,0.2);  
    align-self: stretch;  
  }

  /\* ─── SECTION GENERIC ─── \*/  
  section { padding: 100px 60px; }

  .section-label {  
    font-size: 11px;  
    letter-spacing: 3px;  
    text-transform: uppercase;  
    color: var(--gold);  
    margin-bottom: 20px;  
    display: flex; align-items: center; gap: 12px;  
  }

  .section-label::before {  
    content: '';  
    width: 30px; height: 1px;  
    background: var(--gold);  
  }

  .section-title {  
    font-family: 'Playfair Display', serif;  
    font-size: clamp(32px, 4vw, 52px);  
    font-weight: 700;  
    line-height: 1.1;  
    color: var(--cream);  
    margin-bottom: 20px;  
  }

  .section-title em {  
    font-style: italic;  
    color: var(--gold);  
  }

  /\* ─── BENEFITS SECTION ─── \*/  
  .benefits {  
    background: var(--cream);  
    color: var(--navy);  
    position: relative; overflow: hidden;  
  }

  .benefits::before {  
    content: '';  
    position: absolute; top: \-2px; left: 0; right: 0; height: 3px;  
    background: linear-gradient(90deg, transparent, var(--gold), transparent);  
  }

  .benefits .section-label { color: var(--gold-dim); }  
  .benefits .section-label::before { background: var(--gold-dim); }  
  .benefits .section-title { color: var(--navy); }  
  .benefits .section-title em { color: var(--gold-dim); }

  .benefits-header {  
    display: grid; grid-template-columns: 1fr 1fr; gap: 60px;  
    align-items: end; margin-bottom: 80px;  
  }

  .benefits-intro {  
    font-family: 'Libre Baskerville', serif;  
    font-size: 17px;  
    line-height: 1.8;  
    color: \#3a4a5e;  
    max-width: 480px;  
  }

  .benefits-grid {  
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;  
  }

  .benefit-card {  
    background: var(--navy);  
    padding: 48px 40px;  
    position: relative;  
    overflow: hidden;  
    transition: transform 0.3s;  
  }

  .benefit-card:hover { transform: translateY(-4px); z-index: 1; }

  .benefit-card::after {  
    content: '';  
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;  
    background: var(--gold);  
    transform: scaleX(0);  
    transition: transform 0.3s;  
    transform-origin: left;  
  }

  .benefit-card:hover::after { transform: scaleX(1); }

  .benefit-num {  
    font-family: 'Playfair Display', serif;  
    font-size: 72px;  
    font-weight: 900;  
    color: rgba(232,193,74,0.1);  
    line-height: 1;  
    margin-bottom: \-20px;  
  }

  .benefit-icon {  
    width: 52px; height: 52px;  
    background: rgba(232,193,74,0.12);  
    border-radius: 8px;  
    display: flex; align-items: center; justify-content: center;  
    font-size: 24px;  
    margin-bottom: 24px;  
  }

  .benefit-title {  
    font-family: 'Playfair Display', serif;  
    font-size: 22px;  
    font-weight: 700;  
    color: var(--cream);  
    margin-bottom: 14px;  
  }

  .benefit-desc {  
    font-size: 14px;  
    line-height: 1.8;  
    color: var(--text-muted);  
  }

  .benefit-link {  
    display: inline-flex; align-items: center; gap: 8px;  
    margin-top: 24px;  
    font-size: 13px;  
    letter-spacing: 1px;  
    text-transform: uppercase;  
    color: var(--gold);  
    text-decoration: none;  
    transition: gap 0.2s;  
  }

  .benefit-link:hover { gap: 14px; }

  /\* ─── MISSION SECTION ─── \*/  
  .mission {  
    background: var(--navy-mid);  
    display: grid; grid-template-columns: 1fr 1fr; gap: 100px;  
    align-items: center;  
  }

  .mission-visual {  
    position: relative;  
  }

  .mission-img-frame {  
    position: relative;  
    border-radius: 4px;  
    overflow: hidden;  
    background: var(--navy-light);  
    aspect-ratio: 4/5;  
    display: flex; align-items: center; justify-content: center;  
  }

  /\* abstract financial graphic \*/  
  .mission-graphic {  
    width: 100%; height: 100%;  
    position: relative;  
    overflow: hidden;  
  }

  .mission-graphic svg {  
    width: 100%; height: 100%;  
  }

  .mission-badge-float {  
    position: absolute; bottom: \-24px; right: \-24px;  
    background: var(--gold);  
    color: var(--navy);  
    padding: 24px 28px;  
    border-radius: 4px;  
    z-index: 2;  
  }

  .mission-badge-float .badge-num {  
    font-family: 'Playfair Display', serif;  
    font-size: 40px;  
    font-weight: 900;  
    line-height: 1;  
  }

  .mission-badge-float .badge-text {  
    font-size: 11px;  
    font-weight: 600;  
    letter-spacing: 1.5px;  
    text-transform: uppercase;  
    margin-top: 4px;  
  }

  .mission-content { padding-right: 20px; }

  .mission-body {  
    font-family: 'Libre Baskerville', serif;  
    font-size: 17px;  
    line-height: 1.85;  
    color: var(--text-muted);  
    margin-bottom: 40px;  
  }

  .mission-body strong { color: var(--cream); font-weight: 700; }

  .mission-features {  
    display: flex; flex-direction: column; gap: 20px;  
    margin-bottom: 48px;  
  }

  .mission-feature {  
    display: flex; gap: 16px; align-items: flex-start;  
  }

  .feature-icon-box {  
    width: 40px; height: 40px; flex-shrink: 0;  
    background: rgba(232,193,74,0.1);  
    border: 1px solid rgba(232,193,74,0.2);  
    border-radius: 6px;  
    display: flex; align-items: center; justify-content: center;  
    font-size: 18px;  
  }

  .feature-text h4 {  
    font-family: 'Playfair Display', serif;  
    font-size: 15px;  
    font-weight: 700;  
    color: var(--cream);  
    margin-bottom: 4px;  
  }

  .feature-text p {  
    font-size: 13px;  
    color: var(--text-muted);  
    line-height: 1.6;  
  }

  /\* ─── HOW IT WORKS ─── \*/  
  .how-it-works {  
    background: var(--navy);  
    padding: 96px 60px;  
    position: relative;  
    overflow: hidden;  
  }

  .how-it-works::before {  
    content: '';  
    position: absolute; inset: 0;  
    background-image: linear-gradient(rgba(232,193,74,0.025) 1px, transparent 1px),  
                      linear-gradient(90deg, rgba(232,193,74,0.025) 1px, transparent 1px);  
    background-size: 60px 60px;  
    pointer-events: none;  
  }

  .hiw-header {  
    text-align: center; max-width: 600px;  
    margin: 0 auto 72px; position: relative; z-index: 1;  
  }

  .hiw-steps {  
    display: grid; grid-template-columns: repeat(3, 1fr);  
    gap: 0; position: relative; z-index: 1;  
  }

  .hiw-step {  
    padding: 40px 40px;  
    position: relative;  
    text-align: center;  
  }

  .hiw-step:not(:last-child)::after {  
    content: '→';  
    position: absolute; right: \-14px; top: 52px;  
    font-size: 28px; color: rgba(232,193,74,0.25);  
    z-index: 2;  
  }

  .hiw-num {  
    width: 64px; height: 64px;  
    border-radius: 50%;  
    background: rgba(232,193,74,0.08);  
    border: 1px solid rgba(232,193,74,0.2);  
    display: flex; align-items: center; justify-content: center;  
    font-family: 'Playfair Display', serif;  
    font-size: 22px; font-weight: 700; color: var(--gold);  
    margin: 0 auto 24px;  
    position: relative;  
  }

  .hiw-num::before {  
    content: '';  
    position: absolute; inset: \-6px;  
    border-radius: 50%;  
    border: 1px dashed rgba(232,193,74,0.15);  
  }

  .hiw-icon {  
    font-size: 28px; margin-bottom: 16px;  
    display: block;  
  }

  .hiw-title {  
    font-family: 'Playfair Display', serif;  
    font-size: 20px; font-weight: 700;  
    color: var(--cream); margin-bottom: 12px;  
  }

  .hiw-desc {  
    font-size: 14px; line-height: 1.7;  
    color: var(--text-muted); max-width: 240px; margin: 0 auto;  
  }

  .hiw-cta {  
    text-align: center; margin-top: 60px;  
    position: relative; z-index: 1;  
  }

  /\* ─── SAVINGS CALCULATOR ─── \*/  
  .calculator {  
    background: var(--cream);  
    padding: 96px 60px;  
  }

  .calc-inner {  
    max-width: 820px; margin: 0 auto;  
  }

  .calc-header {  
    text-align: center; margin-bottom: 52px;  
  }

  .calc-body {  
    display: grid; grid-template-columns: 1fr 1fr;  
    gap: 48px; align-items: start;  
  }

  .calc-inputs { display: flex; flex-direction: column; gap: 28px; }

  .calc-field label {  
    display: flex; justify-content: space-between; align-items: center;  
    font-size: 13px; font-weight: 600; letter-spacing: 0.5px;  
    text-transform: uppercase; color: \#6a6050; margin-bottom: 10px;  
  }

  .calc-field label span {  
    font-family: 'Playfair Display', serif;  
    font-size: 20px; font-weight: 700; color: var(--navy);  
    text-transform: none; letter-spacing: 0;  
  }

  .calc-slider {  
    width: 100%; \-webkit-appearance: none; appearance: none;  
    height: 4px; background: \#d0c9b4; border-radius: 2px; outline: none;  
    cursor: pointer;  
  }

  .calc-slider::-webkit-slider-thumb {  
    \-webkit-appearance: none; appearance: none;  
    width: 22px; height: 22px; border-radius: 50%;  
    background: var(--navy); border: 3px solid var(--gold);  
    cursor: pointer; box-shadow: 0 2px 8px rgba(13,31,60,0.2);  
  }

  .calc-slider::-moz-range-thumb {  
    width: 22px; height: 22px; border-radius: 50%;  
    background: var(--navy); border: 3px solid var(--gold);  
    cursor: pointer;  
  }

  .calc-results {  
    background: var(--navy);  
    border-radius: 8px; padding: 36px 32px;  
    display: flex; flex-direction: column; gap: 24px;  
  }

  .calc-result-title {  
    font-size: 12px; letter-spacing: 2px; text-transform: uppercase;  
    color: rgba(249,244,232,0.4); margin-bottom: 4px;  
  }

  .calc-result-num {  
    font-family: 'Playfair Display', serif;  
    font-size: 42px; font-weight: 700; color: var(--gold);  
    line-height: 1;  
  }

  .calc-result-sub {  
    font-size: 13px; color: var(--text-muted); margin-top: 4px;  
  }

  .calc-divider {  
    height: 1px; background: rgba(232,193,74,0.1);  
  }

  .calc-result-row {  
    display: flex; justify-content: space-between; align-items: center;  
  }

  .calc-result-label { font-size: 13px; color: var(--text-muted); }  
  .calc-result-val {  
    font-family: 'Playfair Display', serif;  
    font-size: 18px; font-weight: 700; color: var(--cream);  
  }

  .calc-disclaimer {  
    font-size: 11px; color: \#9a9080; text-align: center;  
    margin-top: 20px; line-height: 1.6;  
  }

  /\* ─── FAQ SECTION ─── \*/  
  .faq {  
    background: var(--navy);  
    position: relative;  
  }

  .faq-layout {  
    display: grid; grid-template-columns: 1fr 2fr; gap: 100px;  
    align-items: start;  
  }

  .faq-sticky {  
    position: sticky; top: 120px;  
  }

  .faq-body {  
    font-family: 'Libre Baskerville', serif;  
    font-size: 16px;  
    line-height: 1.8;  
    color: var(--text-muted);  
    margin-bottom: 40px;  
  }

  .faq-items { display: flex; flex-direction: column; gap: 0; }

  .faq-item {  
    border-top: 1px solid rgba(232,193,74,0.12);  
    padding: 28px 0;  
  }

  .faq-item:last-child { border-bottom: 1px solid rgba(232,193,74,0.12); }

  .faq-q {  
    font-family: 'Playfair Display', serif;  
    font-size: 19px;  
    font-weight: 600;  
    color: var(--cream);  
    cursor: pointer;  
    display: flex; justify-content: space-between; align-items: center;  
    gap: 20px;  
    user-select: none;  
    transition: color 0.2s;  
  }

  .faq-q:hover { color: var(--gold); }

  .faq-toggle {  
    width: 30px; height: 30px; flex-shrink: 0;  
    border: 1px solid rgba(232,193,74,0.25);  
    border-radius: 50%;  
    display: flex; align-items: center; justify-content: center;  
    font-size: 18px;  
    color: var(--gold);  
    transition: transform 0.3s, background 0.3s;  
  }

  .faq-item.open .faq-toggle {  
    transform: rotate(45deg);  
    background: rgba(232,193,74,0.1);  
  }

  .faq-a {  
    font-size: 15px;  
    line-height: 1.8;  
    color: var(--text-muted);  
    max-height: 0;  
    overflow: hidden;  
    transition: max-height 0.4s ease, padding-top 0.3s;  
  }

  .faq-item.open .faq-a {  
    max-height: 200px;  
    padding-top: 16px;  
  }

  /\* ─── CTA SECTION ─── \*/  
  /\* ─── URGENCY CTA ─── \*/  
  .cta-section {  
    background: var(--navy);  
    padding: 90px 60px;  
    position: relative;  
    overflow: hidden;  
    text-align: center;  
  }

  .cta-section::before {  
    content: '';  
    position: absolute; inset: 0;  
    background-image: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,193,74,0.06) 0%, transparent 70%);  
    pointer-events: none;  
  }

  .cta-section::after {  
    content: '';  
    position: absolute; inset: 0;  
    background-image: linear-gradient(rgba(232,193,74,0.025) 1px, transparent 1px),  
                      linear-gradient(90deg, rgba(232,193,74,0.025) 1px, transparent 1px);  
    background-size: 60px 60px;  
    pointer-events: none;  
  }

  .cta-inner {  
    position: relative; z-index: 1;  
    max-width: 760px; margin: 0 auto;  
  }

  .cta-urgency-tag {  
    display: inline-flex; align-items: center; gap: 8px;  
    background: rgba(232,193,74,0.1);  
    border: 1px solid rgba(232,193,74,0.25);  
    border-radius: 100px; padding: 6px 18px;  
    font-size: 11px; letter-spacing: 2px; text-transform: uppercase;  
    color: var(--gold); margin-bottom: 28px;  
  }

  .cta-urgency-tag::before {  
    content: '';  
    width: 7px; height: 7px;  
    background: var(--gold); border-radius: 50%;  
    animation: pulse 2s infinite;  
  }

  .cta-section .cta-title {  
    font-family: 'Playfair Display', serif;  
    font-size: clamp(32px, 4.5vw, 58px);  
    font-weight: 900;  
    color: var(--cream);  
    line-height: 1.05;  
    margin-bottom: 20px;  
  }

  .cta-section .cta-title em {  
    font-style: italic;  
    color: var(--gold);  
  }

  .cta-section .cta-sub {  
    font-size: 18px;  
    color: rgba(249,244,232,0.65);  
    margin-bottom: 44px;  
    font-family: 'Libre Baskerville', serif;  
    font-style: italic;  
    max-width: 560px;  
    margin-left: auto; margin-right: auto;  
    line-height: 1.6;  
  }

  .cta-stats-row {  
    display: flex; justify-content: center; gap: 48px;  
    margin-bottom: 48px;  
    padding: 28px 0;  
    border-top: 1px solid rgba(232,193,74,0.1);  
    border-bottom: 1px solid rgba(232,193,74,0.1);  
  }

  .cta-stat .cta-stat-num {  
    font-family: 'Playfair Display', serif;  
    font-size: 36px; font-weight: 700;  
    color: var(--gold); display: block; line-height: 1;  
    margin-bottom: 4px;  
  }

  .cta-stat .cta-stat-label {  
    font-size: 12px; letter-spacing: 1px;  
    text-transform: uppercase;  
    color: rgba(249,244,232,0.45);  
  }

  .cta-actions {  
    display: flex; flex-direction: column; align-items: center; gap: 16px;  
  }

  .btn-cta-primary {  
    background: var(--gold);  
    color: var(--navy);  
    font-family: 'DM Sans', sans-serif;  
    font-weight: 700; font-size: 17px;  
    padding: 20px 52px;  
    border-radius: 4px;  
    text-decoration: none;  
    display: inline-flex; align-items: center; gap: 12px;  
    transition: background 0.25s, transform 0.2s;  
    box-shadow: 0 12px 40px rgba(232,193,74,0.3);  
    letter-spacing: 0.3px;  
  }

  .btn-cta-primary:hover {  
    background: var(--gold-light);  
    transform: translateY(-3px);  
    box-shadow: 0 18px 50px rgba(232,193,74,0.4);  
  }

  .cta-reassurance {  
    display: flex; align-items: center; justify-content: center; gap: 20px;  
    flex-wrap: wrap;  
  }

  .cta-reassurance span {  
    display: flex; align-items: center; gap: 6px;  
    font-size: 13px; color: rgba(249,244,232,0.45);  
  }

  .cta-phone {  
    display: flex; align-items: center; gap: 8px;  
    font-size: 14px; color: rgba(249,244,232,0.55);  
    text-decoration: none; transition: color 0.2s;  
  }

  .cta-phone:hover { color: var(--gold); }

  .btn-dark {  
    background: var(--navy);  
    color: var(--gold);  
    font-family: 'DM Sans', sans-serif;  
    font-weight: 600; font-size: 15px;  
    padding: 18px 40px; border-radius: 4px;  
    text-decoration: none; white-space: nowrap;  
    display: inline-flex; align-items: center; gap: 10px;  
    transition: background 0.25s, transform 0.25s;  
    box-shadow: 0 8px 30px rgba(13,31,60,0.3);  
  }

  .btn-dark:hover { background: var(--navy-light); transform: translateY(-2px); }

  /\* ─── FOOTER ─── \*/  
  footer {  
    background: \#070e1c;  
    padding: 60px 60px 40px;  
    color: var(--text-muted);  
  }

  .footer-top {  
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;  
    gap: 60px; margin-bottom: 60px;  
  }

  .footer-brand .brand-title {  
    font-family: 'Playfair Display', serif;  
    font-size: 22px;  
    font-weight: 700;  
    color: var(--gold);  
    margin-bottom: 4px;  
  }

  .footer-brand .brand-sub {  
    font-size: 11px;  
    letter-spacing: 2.5px;  
    text-transform: uppercase;  
    color: var(--text-muted);  
    margin-bottom: 20px;  
  }

  .footer-brand p {  
    font-size: 14px;  
    line-height: 1.8;  
    max-width: 280px;  
  }

  .footer-col h4 {  
    font-size: 11px;  
    letter-spacing: 2px;  
    text-transform: uppercase;  
    color: var(--cream);  
    margin-bottom: 20px;  
  }

  .footer-col a {  
    display: block;  
    font-size: 14px;  
    color: var(--text-muted);  
    text-decoration: none;  
    margin-bottom: 12px;  
    transition: color 0.2s;  
  }

  .footer-col a:hover { color: var(--gold); }

  .footer-bottom {  
    border-top: 1px solid rgba(232,193,74,0.1);  
    padding-top: 30px;  
    display: flex; justify-content: space-between; align-items: center;  
    font-size: 13px;  
  }

  .footer-bottom .copy { opacity: 0.5; }

  .footer-disclaimer {  
    font-size: 11px;  
    line-height: 1.7;  
    color: rgba(138,155,181,0.5);  
    margin-top: 24px;  
    max-width: 800px;  
    border-top: 1px solid rgba(232,193,74,0.06);  
    padding-top: 24px;  
  }

  /\* ─── ANIMATIONS ─── \*/  
  @keyframes fadeDown {  
    from { opacity: 0; transform: translateY(-20px); }  
    to { opacity: 1; transform: translateY(0); }  
  }

  @keyframes fadeUp {  
    from { opacity: 0; transform: translateY(30px); }  
    to { opacity: 1; transform: translateY(0); }  
  }

  .reveal {  
    opacity: 0; transform: translateY(40px);  
    transition: opacity 0.7s ease, transform 0.7s ease;  
  }

  .reveal.visible {  
    opacity: 1; transform: translateY(0);  
  }

  /\* On mobile, never let reveal hide content — too risky with varying viewport sizes \*/  
  @media (max-width: 900px) {  
    .reveal {  
      opacity: 1;  
      transform: none;  
      transition: none;  
    }  
  }

  /\* ─── TRUST BAR ─── \*/  
  .trust-bar {  
    background: rgba(232,193,74,0.06);  
    border-top: 1px solid rgba(232,193,74,0.12);  
    border-bottom: 1px solid rgba(232,193,74,0.12);  
    padding: 20px 60px;  
    display: flex; align-items: center; gap: 60px;  
    overflow: hidden;  
  }

  .trust-label {  
    font-size: 11px;  
    letter-spacing: 2px;  
    text-transform: uppercase;  
    color: var(--text-muted);  
    white-space: nowrap;  
    flex-shrink: 0;  
  }

  .trust-items {  
    display: flex; align-items: center; gap: 48px;  
    flex-wrap: wrap;  
  }

  .trust-item {  
    display: flex; align-items: center; gap: 10px;  
    font-size: 13px;  
    color: rgba(249,244,232,0.6);  
    white-space: nowrap;  
  }

  .trust-item .ti-dot {  
    width: 20px; height: 20px;  
    background: rgba(232,193,74,0.12);  
    border-radius: 4px;  
    display: flex; align-items: center; justify-content: center;  
    font-size: 11px;  
  }

  /\* ─── HAMBURGER MENU ─── \*/  
  .nav-hamburger {  
    display: none;  
    flex-direction: column; justify-content: center; gap: 5px;  
    width: 36px; height: 36px; cursor: pointer;  
    border: 1px solid rgba(232,193,74,0.25); border-radius: 4px;  
    padding: 7px;  
    background: none;  
  }  
  .nav-hamburger span {  
    display: block; width: 100%; height: 1.5px;  
    background: var(--gold); border-radius: 2px;  
    transition: transform 0.3s, opacity 0.3s;  
  }  
  .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }  
  .nav-hamburger.open span:nth-child(2) { opacity: 0; }  
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  .nav-mobile-menu {  
    display: none;  
    position: fixed; top: 64px; left: 0; right: 0; z-index: 99;  
    background: rgba(10,24,40,0.98);  
    backdrop-filter: blur(12px);  
    border-bottom: 1px solid rgba(232,193,74,0.12);  
    padding: 0;  
    transform: translateY(-10px);  
    opacity: 0;  
    transition: transform 0.3s ease, opacity 0.3s ease;  
    pointer-events: none;  
  }  
  .nav-mobile-menu.open {  
    transform: translateY(0);  
    opacity: 1;  
    pointer-events: all;  
  }  
  .nav-mobile-menu a {  
    display: block; padding: 16px 24px;  
    font-size: 14px; letter-spacing: 1.5px; text-transform: uppercase;  
    color: rgba(249,244,232,0.75); text-decoration: none;  
    border-bottom: 1px solid rgba(232,193,74,0.07);  
    transition: color 0.2s, background 0.2s;  
  }  
  .nav-mobile-menu a:hover { color: var(--gold); background: rgba(232,193,74,0.04); }  
  .nav-mobile-menu .mob-cta {  
    margin: 16px 24px 20px;  
    display: flex; align-items: center; justify-content: center;  
    background: var(--gold); color: var(--navy); font-weight: 700;  
    padding: 14px; border-radius: 4px; border-bottom: none;  
    letter-spacing: 0.5px;  
  }  
  .nav-mobile-menu .mob-cta:hover { background: var(--gold-light); }

  /\* ─── TABLET (601–900px) ─── \*/  
  @media (max-width: 900px) {  
    nav { padding: 16px 28px; }  
    .nav-links { display: none; }  
    .nav-hamburger { display: flex; }  
    .nav-mobile-menu { display: block; }

    .hero {  
      padding: 110px 32px 52px;  
      min-height: unset \!important;  
      display: block \!important; /\* must be block so .hero-stats flows below content \*/  
    }  
    .hero-content { position: relative; z-index: 1; }  
    .hero h1 { font-size: clamp(36px, 7vw, 56px); }  
    .hero-sub { font-size: 17px; }  
    .hero-pillar { font-size: 14px; }  
    .hero-actions { flex-wrap: wrap; gap: 14px; }  
    .hero-arc { width: 400px; height: 400px; right: \-20%; }

    /\* Pull stats out of absolute positioning — make them in normal flow \*/  
    .hero-stats {  
      position: relative \!important;  
      bottom: auto \!important; left: auto \!important; right: auto \!important;  
      display: flex; gap: 24px; flex-wrap: wrap;  
      margin-top: 48px; padding-top: 28px;  
      border-top: 1px solid rgba(232,193,74,0.15);  
      animation: none \!important;  
      opacity: 1 \!important; transform: none \!important;  
    }  
    .stat-number { font-size: 28px; }  
    .stat-divider { display: none; }

    .trust-bar { padding: 16px 28px; gap: 24px; flex-wrap: wrap; }  
    .trust-label { display: none; }  
    .trust-items { gap: 20px; }  
    .trust-item { font-size: 12px; }

    section { padding: 72px 32px; }

    .benefits-header { grid-template-columns: 1fr; gap: 24px; margin-bottom: 48px; }  
    .benefits-grid { grid-template-columns: 1fr; gap: 2px; }  
    .benefit-card { padding: 36px 28px; }

    .mission { grid-template-columns: 1fr; gap: 48px; padding: 72px 32px; }  
    .mission-visual { max-width: 480px; margin: 0 auto; width: 100%; }  
    .mission-badge-float { bottom: \-16px; right: \-8px; padding: 16px 20px; }  
    .mission-badge-float .badge-num { font-size: 28px; }  
    .mission-content { padding-right: 0; }  
    .mission-body { font-size: 15px; }

    .faq-layout { grid-template-columns: 1fr; gap: 40px; }  
    .faq-sticky { position: static; }  
    .faq-q { font-size: 17px; }

    .how-it-works { padding: 72px 32px; }  
    .hiw-steps { grid-template-columns: 1fr; gap: 40px; }  
    .hiw-step:not(:last-child)::after { content: '↓'; right: auto; bottom: \-28px; left: 50%; top: auto; transform: translateX(-50%); }  
    .hiw-step { padding: 0 20px; }

    .calculator { padding: 72px 32px; }  
    .calc-body { grid-template-columns: 1fr; gap: 36px; }

    .cta-section { padding: 60px 32px; }  
    .cta-stats-row { gap: 24px; flex-wrap: wrap; }  
    .cta-stat .cta-stat-num { font-size: 28px; }  
    .btn-cta-primary { font-size: 15px; padding: 17px 32px; width: 100%; justify-content: center; }

    footer { padding: 48px 32px 32px; }  
    .footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }  
    .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }  
  }

  /\* ─── MOBILE (≤600px) ─── \*/  
  @media (max-width: 600px) {  
    nav { padding: 14px 16px; }  
    .nav-logo-text span:last-child { display: none; }  
    .nav-mobile-menu { top: 58px; }

    /\* Hero: fully in-flow, nothing absolute-positioned \*/  
    .hero {  
      padding: 90px 20px 44px;  
      min-height: unset \!important;  
      display: block \!important;  
    }  
    .hero-content { max-width: 100%; position: relative; z-index: 1; }  
    .hero h1 { font-size: clamp(30px, 9vw, 42px); margin-bottom: 14px; }  
    .hero-sub { font-size: 15px; margin-bottom: 24px; }  
    .hero-badge { font-size: 10px; letter-spacing: 1.5px; padding: 5px 12px; margin-bottom: 20px; }  
    .hero-tagline { font-size: clamp(22px, 6vw, 30px); margin-bottom: 24px; padding-bottom: 24px; }  
    .hero-pillars { gap: 10px; margin-bottom: 28px; }  
    .hero-pillar { font-size: 13px; gap: 10px; }  
    .pillar-dot { width: 20px; height: 20px; flex-shrink: 0; }

    /\* Both action buttons visible and full-width stacked \*/  
    .hero-actions { flex-direction: column; gap: 10px; margin-bottom: 0; }  
    .btn-primary { width: 100%; justify-content: center; padding: 15px 24px; font-size: 15px; }  
    .btn-phone { width: 100%; justify-content: center; }

    /\* Stats: in-flow 2×2 grid \*/  
    .hero-stats {  
      position: relative \!important;  
      bottom: auto \!important; left: auto \!important; right: auto \!important;  
      display: grid \!important; grid-template-columns: 1fr 1fr; gap: 16px;  
      margin-top: 36px; padding-top: 24px;  
      border-top: 1px solid rgba(232,193,74,0.15);  
      animation: none \!important;  
      opacity: 1 \!important; transform: none \!important;  
    }  
    .stat-item { display: flex; flex-direction: column; gap: 4px; }  
    .stat-divider { display: none; }  
    .stat-number { font-size: 26px; }  
    .stat-label { font-size: 10px; }

    /\* Trust bar: scrollable row \*/  
    .trust-bar {  
      padding: 14px 20px; gap: 0;  
      overflow-x: auto; flex-wrap: nowrap;  
      \-webkit-overflow-scrolling: touch;  
    }  
    .trust-label { display: none; }  
    .trust-items { gap: 16px; flex-wrap: nowrap; }  
    .trust-item { font-size: 11px; gap: 7px; white-space: nowrap; }  
    .trust-item .ti-dot { width: 18px; height: 18px; font-size: 10px; flex-shrink: 0; }

    section { padding: 52px 20px; }  
    .section-label { font-size: 10px; }  
    .section-title { font-size: clamp(24px, 7vw, 34px); }

    /\* Benefits \*/  
    .benefits-header { margin-bottom: 28px; gap: 16px; }  
    .benefits-intro { font-size: 14px; }  
    .benefits-grid { grid-template-columns: 1fr; }  
    .benefit-card { padding: 28px 20px; }  
    .benefit-num { font-size: 52px; margin-bottom: \-16px; }  
    .benefit-title { font-size: 19px; }  
    .benefit-desc { font-size: 13px; }  
    .benefit-link { font-size: 12px; margin-top: 18px; }

    /\* Mission \*/  
    .mission { padding: 52px 20px; gap: 32px; }  
    .mission-visual { max-width: 100%; }  
    .mission-badge-float { right: 0; padding: 12px 16px; bottom: \-12px; }  
    .mission-badge-float .badge-num { font-size: 22px; }  
    .mission-badge-float .badge-text { font-size: 9px; }  
    .mission-body { font-size: 14px; margin-bottom: 24px; }  
    .mission-features { gap: 16px; margin-bottom: 28px; }  
    .feature-icon-box { width: 36px; height: 36px; font-size: 16px; }  
    .feature-text h4 { font-size: 14px; }  
    .feature-text p { font-size: 12px; }

    /\* FAQ \*/  
    .faq { padding: 52px 20px; }  
    .faq-layout { gap: 28px; }  
    .faq-body { font-size: 14px; margin-bottom: 24px; }  
    /\* Hide the CTA button in sticky sidebar on mobile — there's one at the bottom already \*/  
    .faq-sticky .btn-primary { display: none; }  
    .faq-q { font-size: 15px; gap: 12px; }  
    .faq-toggle { width: 26px; height: 26px; font-size: 16px; }  
    .faq-a { font-size: 13px; }  
    .faq-item { padding: 18px 0; }  
    /\* Show a CTA after the last FAQ item \*/  
    .faq-items::after {  
      content: '';  
      display: block; margin-top: 28px;  
    }

    /\* CTA banner \*/  
    .cta-section { padding: 44px 20px; }  
    .cta-section .cta-title { font-size: clamp(26px, 7vw, 36px); }  
    .cta-section .cta-sub { font-size: 15px; }  
    .cta-stats-row { gap: 16px; padding: 20px 0; }  
    .cta-stat .cta-stat-num { font-size: 24px; }  
    .cta-stat .cta-stat-label { font-size: 10px; }  
    .btn-cta-primary { font-size: 14px; padding: 15px 24px; width: 100%; justify-content: center; }  
    .cta-reassurance { gap: 12px; }  
    .cta-reassurance span { font-size: 12px; }  
    .cta-phone { font-size: 12px; text-align: center; }

    /\* Footer \*/  
    footer { padding: 40px 20px 24px; }  
    .footer-top { grid-template-columns: 1fr; gap: 28px; }  
    .footer-brand p { max-width: 100%; font-size: 13px; }  
    .footer-col h4 { margin-bottom: 14px; }  
    .footer-col a { font-size: 13px; margin-bottom: 10px; }  
    .footer-bottom { flex-direction: column; gap: 8px; text-align: center; font-size: 12px; }  
    .footer-disclaimer { font-size: 10px; padding-top: 18px; margin-top: 18px; }

    .how-it-works { padding: 52px 20px; }  
    .hiw-steps { grid-template-columns: 1fr; gap: 32px; }  
    .hiw-step:not(:last-child)::after { content: '↓'; right: auto; top: auto; bottom: \-24px; left: 50%; transform: translateX(-50%); font-size: 20px; }  
    .hiw-step { padding: 0; }

    .calculator { padding: 52px 20px; }  
    .calc-body { grid-template-columns: 1fr; gap: 32px; }  
    .calc-result-num { font-size: 32px; }  
  }

\</style\>  
\</head\>  
\<body\>

\<\!-- NAV \--\>  
\<nav\>  
  \<div class="nav-logo"\>  
    \<div class="nav-logo-mark"\>E\</div\>  
    \<div class="nav-logo-text"\>  
      \<span\>Empower\</span\>  
      \<span\>Financial Network\</span\>  
    \</div\>  
  \</div\>  
  \<ul class="nav-links"\>  
    \<li\>\<a href="\#benefits"\>Benefits\</a\>\</li\>  
    \<li\>\<a href="\#mission"\>Our Mission\</a\>\</li\>  
    \<li\>\<a href="\#faq"\>FAQ\</a\>\</li\>  
    \<li\>\<a href="tel:8664901617" class="nav-cta"\>Free Consultation\</a\>\</li\>  
  \</ul\>  
  \<button class="nav-hamburger" id="hamburger" aria-label="Open menu"\>  
    \<span\>\</span\>\<span\>\</span\>\<span\>\</span\>  
  \</button\>  
\</nav\>

\<\!-- MOBILE NAV MENU \--\>  
\<div class="nav-mobile-menu" id="mobileMenu"\>  
  \<a href="\#benefits"\>Benefits\</a\>  
  \<a href="\#mission"\>Our Mission\</a\>  
  \<a href="\#faq"\>FAQ\</a\>  
  \<a href="tel:8664901617"\>📞 (866) 490-1617\</a\>  
  \<a href="\#" class="mob-cta"\>Get Free Consultation →\</a\>  
\</div\>

\<\!-- HERO \--\>  
\<section class="hero"\>  
  \<div class="hero-bg"\>\</div\>  
  \<div class="hero-grid"\>\</div\>  
  \<div class="hero-arc"\>\</div\>

  \<div class="hero-content"\>  
    \<p class="hero-tagline"\>Empower helps people \<span class="ht-highlight"\>break free from overwhelming debt\</span\> and rebuild their financial future.\</p\>  
    \<h1\>You Deserve a Life\<br\>\<em\>Without Debt.\</em\>\</h1\>  
    \<p class="hero-sub"\>If you're juggling multiple payments, losing sleep over balances that never shrink — there's a better way. One call changes everything.\</p\>

    \<div class="hero-pillars"\>  
      \<div class="hero-pillar"\>\<div class="pillar-dot"\>\</div\>Cut your monthly payments — often by 40% or more\</div\>  
      \<div class="hero-pillar"\>\<div class="pillar-dot"\>\</div\>One simple payment replaces all your creditors\</div\>  
      \<div class="hero-pillar"\>\<div class="pillar-dot"\>\</div\>No credit impact to check your options. Zero obligations.\</div\>  
    \</div\>

    \<div class="hero-actions"\>  
      \<a href="/apply-now" class="btn-primary"\>See My Options \<span class="arrow"\>→\</span\>\</a\>  
      \<a href="tel:8664901617" class="btn-phone"\>  
        \<div class="phone-icon"\>📞\</div\>  
        \<div class="phone-text"\>  
          \<span class="phone-label"\>Talk to a Debt Specialist\</span\>  
          \<span class="phone-number"\>(866) 490-1617\</span\>  
        \</div\>  
      \</a\>  
    \</div\>  
  \</div\>

  \<div class="hero-stats"\>  
    \<div class="stat-item"\>  
      \<span class="stat-number"\>$0\</span\>  
      \<span class="stat-label"\>Upfront Fees\</span\>  
    \</div\>  
    \<div class="stat-divider"\>\</div\>  
    \<div class="stat-item"\>  
      \<span class="stat-number"\>Free\</span\>  
      \<span class="stat-label"\>Consultation\</span\>  
    \</div\>  
    \<div class="stat-divider"\>\</div\>  
    \<div class="stat-item"\>  
      \<span class="stat-number"\>1\</span\>  
      \<span class="stat-label"\>Monthly Payment\</span\>  
    \</div\>  
    \<div class="stat-divider"\>\</div\>  
    \<div class="stat-item"\>  
      \<span class="stat-number"\>Fast\</span\>  
      \<span class="stat-label"\>Application\</span\>  
    \</div\>  
  \</div\>  
\</section\>

\<\!-- TRUST BAR \--\>  
\<div class="trust-bar"\>  
  \<span class="trust-label"\>Why Choose Us\</span\>  
  \<div class="trust-items"\>  
    \<div class="trust-item"\>\<div class="ti-dot"\>🔒\</div\> No credit score impact to apply\</div\>  
    \<div class="trust-item"\>\<div class="ti-dot"\>⚡\</div\> Fast application process\</div\>  
    \<div class="trust-item"\>\<div class="ti-dot"\>🤝\</div\> Personalized debt solutions\</div\>  
    \<div class="trust-item"\>\<div class="ti-dot"\>💰\</div\> Lower your monthly payments\</div\>  
    \<div class="trust-item"\>\<div class="ti-dot"\>✨\</div\> Path to a debt-free future\</div\>  
  \</div\>  
\</div\>

\<\!-- BENEFITS \--\>  
\<section class="benefits" id="benefits"\>  
  \<div class="benefits-header reveal"\>  
    \<div\>  
      \<div class="section-label"\>What we offer\</div\>  
      \<h2 class="section-title"\>The Benefits of\<br\>\<em\>Debt Relief\</em\>\</h2\>  
    \</div\>  
    \<p class="benefits-intro"\>  
      Struggling under multiple high-interest payments? Our expert partners connect you with solutions tailored to your unique financial situation — and your path forward starts with a single, free conversation.  
    \</p\>  
  \</div\>

  \<div class="benefits-grid reveal"\>  
    \<div class="benefit-card"\>  
      \<div class="benefit-num"\>01\</div\>  
      \<div class="benefit-icon"\>📉\</div\>  
      \<h3 class="benefit-title"\>Reduce Monthly Payments\</h3\>  
      \<p class="benefit-desc"\>Debt relief consolidates your payments into one manageable monthly amount — often dramatically lower than what you're paying across multiple accounts today.\</p\>  
      \<a href="\#" class="benefit-link"\>Apply Now →\</a\>  
    \</div\>  
    \<div class="benefit-card"\>  
      \<div class="benefit-num"\>02\</div\>  
      \<div class="benefit-icon"\>🎯\</div\>  
      \<h3 class="benefit-title"\>Tailored Solutions\</h3\>  
      \<p class="benefit-desc"\>No two financial situations are the same. Our debt relief programs are customized to your budget, timeline, and goals — giving you flexibility when you need it most.\</p\>  
      \<a href="\#" class="benefit-link"\>Learn More →\</a\>  
    \</div\>  
    \<div class="benefit-card"\>  
      \<div class="benefit-num"\>03\</div\>  
      \<div class="benefit-icon"\>🌅\</div\>  
      \<h3 class="benefit-title"\>A Debt-Free Future\</h3\>  
      \<p class="benefit-desc"\>Once the process is complete, you emerge with the opportunity to rebuild your financial health from the ground up — without the burden of unresolved debt hanging over you.\</p\>  
      \<a href="\#" class="benefit-link"\>Get Started →\</a\>  
    \</div\>  
  \</div\>  
\</section\>

\<\!-- HOW IT WORKS \--\>  
\<section class="how-it-works reveal"\>  
  \<div class="hiw-header"\>  
    \<div class="section-label"\>Simple process\</div\>  
    \<h2 class="section-title" style="color:var(--cream);"\>Get Relief in\<br\>\<em\>3 Simple Steps\</em\>\</h2\>  
    \<p style="font-size:16px;color:var(--text-muted);margin-top:14px;font-family:'Libre Baskerville',serif;font-style:italic;"\>No complicated paperwork. No confusing jargon. Just a clear path forward.\</p\>  
  \</div\>

  \<div class="hiw-steps"\>  
    \<div class="hiw-step"\>  
      \<div class="hiw-num"\>1\</div\>  
      \<span class="hiw-icon"\>📋\</span\>  
      \<h3 class="hiw-title"\>Tell Us About Your Debt\</h3\>  
      \<p class="hiw-desc"\>Fill out our 2-minute form. Share how much you owe and what type of debt you're carrying — no credit check, no obligations.\</p\>  
    \</div\>  
    \<div class="hiw-step"\>  
      \<div class="hiw-num"\>2\</div\>  
      \<span class="hiw-icon"\>🤝\</span\>  
      \<h3 class="hiw-title"\>Speak with a Specialist\</h3\>  
      \<p class="hiw-desc"\>A certified debt specialist reviews your situation and presents a personalized relief plan — with real numbers, not vague promises.\</p\>  
    \</div\>  
    \<div class="hiw-step"\>  
      \<div class="hiw-num"\>3\</div\>  
      \<span class="hiw-icon"\>🌅\</span\>  
      \<h3 class="hiw-title"\>Start Your New Chapter\</h3\>  
      \<p class="hiw-desc"\>One low monthly payment replaces the chaos of multiple creditors. Watch your debt shrink and your stress disappear — month by month.\</p\>  
    \</div\>  
  \</div\>

  \<div class="hiw-cta"\>  
    \<a href="/apply-now" class="btn-primary"\>Start Step 1 — It's Free \<span class="arrow"\>→\</span\>\</a\>  
    \<p style="margin-top:14px;font-size:13px;color:var(--text-muted);"\>No credit check · No upfront fees · No obligations\</p\>  
  \</div\>  
\</section\>

\<\!-- SAVINGS CALCULATOR \--\>  
\<section class="calculator"\>  
  \<div class="calc-inner"\>  
    \<div class="calc-header reveal"\>  
      \<div class="section-label" style="color:var(--gold-dim);"\>See the numbers\</div\>  
      \<h2 class="section-title"\>How Much Could\<br\>\<em\>You Save?\</em\>\</h2\>  
      \<p style="font-size:16px;color:\#7a7060;margin-top:12px;font-family:'Libre Baskerville',serif;font-style:italic;"\>Adjust the sliders to estimate your potential savings with Empower.\</p\>  
    \</div\>

    \<div class="calc-body reveal"\>  
      \<div class="calc-inputs"\>  
        \<div class="calc-field"\>  
          \<label\>Total Debt \<span id="debtDisplay"\>$25,000\</span\>\</label\>  
          \<input type="range" class="calc-slider" id="debtSlider" min="5000" max="100000" step="1000" value="25000"\>  
        \</div\>  
        \<div class="calc-field"\>  
          \<label\>Current Monthly Payment \<span id="paymentDisplay"\>$850\</span\>\</label\>  
          \<input type="range" class="calc-slider" id="paymentSlider" min="200" max="3000" step="50" value="850"\>  
        \</div\>  
        \<div class="calc-field"\>  
          \<label\>Average Interest Rate \<span id="rateDisplay"\>22%\</span\>\</label\>  
          \<input type="range" class="calc-slider" id="rateSlider" min="10" max="35" step="1" value="22"\>  
        \</div\>  
        \<p class="calc-disclaimer"\>\* Estimates based on typical debt relief program outcomes. Individual results vary. This is not a guarantee of savings.\</p\>  
      \</div\>

      \<div class="calc-results"\>  
        \<div\>  
          \<div class="calc-result-title"\>Estimated new monthly payment\</div\>  
          \<div class="calc-result-num" id="newPayment"\>$510\</div\>  
          \<div class="calc-result-sub"\>vs. your current $850/mo\</div\>  
        \</div\>  
        \<div class="calc-divider"\>\</div\>  
        \<div class="calc-result-row"\>  
          \<span class="calc-result-label"\>Monthly savings\</span\>  
          \<span class="calc-result-val" id="monthlySavings" style="color:var(--gold)"\>$340\</span\>  
        \</div\>  
        \<div class="calc-result-row"\>  
          \<span class="calc-result-label"\>Annual savings\</span\>  
          \<span class="calc-result-val" id="annualSavings"\>$4,080\</span\>  
        \</div\>  
        \<div class="calc-result-row"\>  
          \<span class="calc-result-label"\>Est. program length\</span\>  
          \<span class="calc-result-val" id="programLength"\>36–48 months\</span\>  
        \</div\>  
        \<div class="calc-divider"\>\</div\>  
        \<a href="/apply-now" class="btn-primary" style="width:100%;justify-content:center;margin-top:4px;"\>Get My Real Numbers →\</a\>  
        \<p style="font-size:11px;color:rgba(249,244,232,0.3);text-align:center;margin-top:8px;"\>Free · No credit check · No obligations\</p\>  
      \</div\>  
    \</div\>  
  \</div\>  
\</section\>

\<\!-- MISSION \--\>  
\<section class="mission" id="mission"\>  
  \<div class="mission-visual reveal"\>  
    \<div class="mission-img-frame"\>  
      \<div class="mission-graphic"\>  
        \<svg viewBox="0 0 500 620" xmlns="http://www.w3.org/2000/svg"\>  
          \<\!-- background \--\>  
          \<rect width="500" height="620" fill="\#142850"/\>  
          \<\!-- decorative lines \--\>  
          \<line x1="0" y1="620" x2="500" y2="0" stroke="rgba(232,193,74,0.05)" stroke-width="1"/\>  
          \<line x1="0" y1="500" x2="500" y2="0" stroke="rgba(232,193,74,0.05)" stroke-width="1"/\>  
          \<line x1="100" y1="620" x2="500" y2="100" stroke="rgba(232,193,74,0.05)" stroke-width="1"/\>  
          \<\!-- chart bars \--\>  
          \<rect x="60" y="380" width="50" height="160" rx="4" fill="rgba(232,193,74,0.15)"/\>  
          \<rect x="130" y="300" width="50" height="240" rx="4" fill="rgba(232,193,74,0.2)"/\>  
          \<rect x="200" y="240" width="50" height="300" rx="4" fill="rgba(232,193,74,0.25)"/\>  
          \<rect x="270" y="180" width="50" height="360" rx="4" fill="rgba(232,193,74,0.35)"/\>  
          \<rect x="340" y="120" width="50" height="420" rx="4" fill="rgba(232,193,74,0.5)"/\>  
          \<rect x="410" y="60" width="50" height="480" rx="4" fill="\#e8c14a"/\>  
          \<\!-- trend line \--\>  
          \<polyline points="85,380 155,300 225,240 295,180 365,120 435,60" fill="none" stroke="rgba(232,193,74,0.6)" stroke-width="2" stroke-dasharray="8 4"/\>  
          \<\!-- dots on trend \--\>  
          \<circle cx="85" cy="380" r="5" fill="rgba(232,193,74,0.4)"/\>  
          \<circle cx="155" cy="300" r="5" fill="rgba(232,193,74,0.5)"/\>  
          \<circle cx="225" cy="240" r="5" fill="rgba(232,193,74,0.6)"/\>  
          \<circle cx="295" cy="180" r="5" fill="rgba(232,193,74,0.7)"/\>  
          \<circle cx="365" cy="120" r="5" fill="rgba(232,193,74,0.85)"/\>  
          \<circle cx="435" cy="60" r="7" fill="\#e8c14a"/\>  
          \<\!-- label \--\>  
          \<text x="250" y="560" text-anchor="middle" font-family="Playfair Display, serif" font-size="18" fill="rgba(232,193,74,0.6)"\>Your path to financial freedom\</text\>  
          \<\!-- top large circle accent \--\>  
          \<circle cx="435" cy="60" r="30" fill="none" stroke="rgba(232,193,74,0.2)" stroke-width="1"/\>  
          \<circle cx="435" cy="60" r="50" fill="none" stroke="rgba(232,193,74,0.1)" stroke-width="1"/\>  
        \</svg\>  
      \</div\>  
    \</div\>  
    \<div class="mission-badge-float"\>  
      \<div class="badge-num"\>Free\</div\>  
      \<div class="badge-text"\>Consultation\</div\>  
    \</div\>  
  \</div\>

  \<div class="mission-content reveal"\>  
    \<div class="section-label"\>Our Mission\</div\>  
    \<h2 class="section-title"\>Dedicated Partners\<br\>in Your \<em\>Journey\</em\>\</h2\>  
    \<p class="mission-body"\>  
      At Empower Financial Network, we're your \<strong\>dedicated partners\</strong\> in the journey to financial freedom. With years of experience and a proven track record, our team is passionate about helping clients \<strong\>break free from high-interest debt\</strong\>. We understand that every financial situation is unique, which is why we connect you with personalized solutions that deliver real results.  
    \</p\>

    \<div class="mission-features"\>  
      \<div class="mission-feature"\>  
        \<div class="feature-icon-box"\>🛡️\</div\>  
        \<div class="feature-text"\>  
          \<h4\>No Credit Impact\</h4\>  
          \<p\>Completing our application does not affect your credit score — apply with confidence.\</p\>  
        \</div\>  
      \</div\>  
      \<div class="mission-feature"\>  
        \<div class="feature-icon-box"\>👥\</div\>  
        \<div class="feature-text"\>  
          \<h4\>Expert Guidance\</h4\>  
          \<p\>Our debt specialists have helped thousands of clients reclaim their financial lives.\</p\>  
        \</div\>  
      \</div\>  
      \<div class="mission-feature"\>  
        \<div class="feature-icon-box"\>📋\</div\>  
        \<div class="feature-text"\>  
          \<h4\>Transparent Process\</h4\>  
          \<p\>No hidden fees, no surprises. We walk you through every step of the journey.\</p\>  
        \</div\>  
      \</div\>  
    \</div\>

    \<a href="\#" class="btn-primary"\>Apply for Free Consultation \<span class="arrow"\>→\</span\>\</a\>  
  \</div\>  
\</section\>

\<\!-- FAQ \--\>  
\<section class="faq" id="faq"\>  
  \<div class="faq-layout"\>  
    \<div class="faq-sticky reveal"\>  
      \<div class="section-label"\>Common Questions\</div\>  
      \<h2 class="section-title"\>Debt Consolidation\<br\>\<em\>101\</em\>\</h2\>  
      \<p class="faq-body"\>Everything you need to know before taking the first step toward financial freedom.\</p\>  
      \<a href="\#" class="btn-primary"\>Get Started \<span class="arrow"\>→\</span\>\</a\>  
    \</div\>

    \<div class="faq-items reveal"\>  
      \<div class="faq-item open"\>  
        \<div class="faq-q" onclick="toggleFaq(this)"\>  
          What is a debt consolidation loan?  
          \<div class="faq-toggle"\>+\</div\>  
        \</div\>  
        \<div class="faq-a"\>  
          A debt consolidation loan is a single loan used to combine multiple debts into one. By using the proceeds to pay off outstanding credit card debt and other balances, you simplify repayment and can often save significantly on interest over time.  
        \</div\>  
      \</div\>  
      \<div class="faq-item"\>  
        \<div class="faq-q" onclick="toggleFaq(this)"\>  
          How do I know if I qualify?  
          \<div class="faq-toggle"\>+\</div\>  
        \</div\>  
        \<div class="faq-a"\>  
          Fill out our simple application and one of our debt consolidation experts will contact you to discuss your eligibility. The process is quick, and there's no obligation to proceed.  
        \</div\>  
      \</div\>  
      \<div class="faq-item"\>  
        \<div class="faq-q" onclick="toggleFaq(this)"\>  
          Will this affect my credit score?  
          \<div class="faq-toggle"\>+\</div\>  
        \</div\>  
        \<div class="faq-a"\>  
          No. Completing our application does not impact your credit score. It's simply the first step in understanding your options — you remain in full control of the process.  
        \</div\>  
      \</div\>  
      \<div class="faq-item"\>  
        \<div class="faq-q" onclick="toggleFaq(this)"\>  
          What are the real benefits of consolidation?  
          \<div class="faq-toggle"\>+\</div\>  
        \</div\>  
        \<div class="faq-a"\>  
          Consolidating your debts can reduce the number of monthly payments you manage, lower your interest rates, and potentially improve your credit score by helping you make regular, on-time payments.  
        \</div\>  
      \</div\>  
      \<div class="faq-item"\>  
        \<div class="faq-q" onclick="toggleFaq(this)"\>  
          Are there any drawbacks to consider?  
          \<div class="faq-toggle"\>+\</div\>  
        \</div\>  
        \<div class="faq-a"\>  
          Debt consolidation is a powerful tool, but it works best when combined with sound financial planning. We help you address both the symptoms and the root causes, setting you on a sustainable path forward.  
        \</div\>  
      \</div\>  
    \</div\>  
  \</div\>  
\</section\>

\<\!-- CTA BANNER \--\>  
\<div class="cta-section reveal"\>  
  \<div class="cta-inner"\>

    \<div class="cta-urgency-tag"\>Limited availability — Free consultations filling fast\</div\>

    \<h2 class="cta-title"\>Every month you wait\<br\>costs you \<em\>real money.\</em\>\</h2\>  
    \<p class="cta-sub"\>People with $20,000+ in debt save an average of $400/month within 90 days of enrolling. Your first step is free.\</p\>

    \<div class="cta-stats-row"\>  
      \<div class="cta-stat"\>  
        \<span class="cta-stat-num"\>$400+\</span\>  
        \<span class="cta-stat-label"\>Avg. monthly savings\</span\>  
      \</div\>  
      \<div class="cta-stat"\>  
        \<span class="cta-stat-num"\>2 min\</span\>  
        \<span class="cta-stat-label"\>To see your options\</span\>  
      \</div\>  
      \<div class="cta-stat"\>  
        \<span class="cta-stat-num"\>$0\</span\>  
        \<span class="cta-stat-label"\>Upfront cost\</span\>  
      \</div\>  
      \<div class="cta-stat"\>  
        \<span class="cta-stat-num"\>No\</span\>  
        \<span class="cta-stat-label"\>Credit impact\</span\>  
      \</div\>  
    \</div\>

    \<div class="cta-actions"\>  
      \<a href="/apply-now" class="btn-cta-primary"\>See My Options — It's Free →\</a\>  
      \<div class="cta-reassurance"\>  
        \<span\>✓ No obligations\</span\>  
        \<span\>✓ No upfront fees\</span\>  
        \<span\>✓ No credit check to apply\</span\>  
      \</div\>  
      \<a href="tel:8664901617" class="cta-phone"\>📞 Prefer to call? (866) 490-1617 — Mon–Fri 8am–8pm ET\</a\>  
    \</div\>

  \</div\>  
\</div\>

\<\!-- FOOTER \--\>  
\<footer\>  
  \<div class="footer-top"\>  
    \<div class="footer-brand"\>  
      \<div class="brand-title"\>Empower\</div\>  
      \<div class="brand-sub"\>Financial Network\</div\>  
      \<p\>Helping individuals and families break free from debt and build a stronger financial future — one step at a time.\</p\>  
      \<p style="margin-top:16px;font-size:13px;"\>P.O. Box 24 · Eastport, NY 11941\</p\>  
    \</div\>  
    \<div class="footer-col"\>  
      \<h4\>Navigate\</h4\>  
      \<a href="\#"\>Home\</a\>  
      \<a href="\#benefits"\>Benefits\</a\>  
      \<a href="\#mission"\>About Us\</a\>  
      \<a href="\#faq"\>FAQ\</a\>  
    \</div\>  
    \<div class="footer-col"\>  
      \<h4\>Legal\</h4\>  
      \<a href="\#"\>Terms & Conditions\</a\>  
      \<a href="\#"\>Privacy Policy\</a\>  
    \</div\>  
    \<div class="footer-col"\>  
      \<h4\>Contact\</h4\>  
      \<a href="tel:8664901617"\>(866) 490-1617\</a\>  
      \<a href="/cdn-cgi/l/email-protection\#5f363139301f3a322f30283a2d3931713c3032"\>\<span class="\_\_cf\_email\_\_" data-cfemail="eb82858d84ab8e869b849c8e998d85c5888486"\>\[email&\#160;protected\]\</span\>\</a\>  
      \<a href="\#" style="margin-top:20px;" class="btn-primary" style="font-size:13px;"\>Free Consultation →\</a\>  
    \</div\>  
  \</div\>  
  \<div class="footer-bottom"\>  
    \<span class="copy"\>© 2026 Empower Financial Network. All rights reserved.\</span\>  
    \<span style="font-size:12px;opacity:0.4;"\>Eastport, NY\</span\>  
  \</div\>  
  \<p class="footer-disclaimer"\>  
    Empower Financial Network connects consumers with debt relief service providers. We are not a lender or debt settlement company. Results may vary. Completing an application does not guarantee approval or specific outcomes. Debt relief programs may have tax implications and may affect your credit score.  
  \</p\>  
\</footer\>

\<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"\>\</script\>\<script\>  
  // Hamburger menu  
  const hamburger \= document.getElementById('hamburger');  
  const mobileMenu \= document.getElementById('mobileMenu');  
  hamburger.addEventListener('click', () \=\> {  
    hamburger.classList.toggle('open');  
    mobileMenu.classList.toggle('open');  
  });  
  // Close menu when a link is clicked  
  mobileMenu.querySelectorAll('a').forEach(a \=\> {  
    a.addEventListener('click', () \=\> {  
      hamburger.classList.remove('open');  
      mobileMenu.classList.remove('open');  
    });  
  });

  // Reveal on scroll — lower threshold \+ fallback for tall elements on small screens  
  const reveals \= document.querySelectorAll('.reveal');  
  const observer \= new IntersectionObserver((entries) \=\> {  
    entries.forEach((entry, i) \=\> {  
      if (entry.isIntersecting) {  
        setTimeout(() \=\> entry.target.classList.add('visible'), i \* 80);  
        observer.unobserve(entry.target);  
      }  
    });  
  }, { threshold: 0.05, rootMargin: '0px 0px \-40px 0px' });  
  reveals.forEach(el \=\> observer.observe(el));

  // Safety net: reveal anything still hidden after 1.5s (e.g. elements taller than viewport)  
  setTimeout(() \=\> {  
    document.querySelectorAll('.reveal:not(.visible)').forEach(el \=\> el.classList.add('visible'));  
  }, 1500);

  // FAQ toggle  
  function toggleFaq(el) {  
    const isOpen \= el.parentElement.classList.contains('open');  
    document.querySelectorAll('.faq-item').forEach(item \=\> {  
      item.classList.remove('open');  
      const answer \= item.querySelector('.faq-a');  
      if (answer) answer.style.maxHeight \= '0';  
    });  
    if (\!isOpen) {  
      el.parentElement.classList.add('open');  
      const answer \= el.parentElement.querySelector('.faq-a');  
      if (answer) answer.style.maxHeight \= answer.scrollHeight \+ 'px';  
    }  
  }

  // Savings Calculator  
  function formatCurrency(n) {  
    return '$' \+ Math.round(n).toLocaleString();  
  }

  function updateCalc() {  
    const debt    \= parseInt(document.getElementById('debtSlider').value);  
    const payment \= parseInt(document.getElementById('paymentSlider').value);  
    const rate    \= parseInt(document.getElementById('rateSlider').value);

    document.getElementById('debtDisplay').textContent    \= formatCurrency(debt);  
    document.getElementById('paymentDisplay').textContent \= formatCurrency(payment);  
    document.getElementById('rateDisplay').textContent    \= rate \+ '%';

    // Estimate new payment at \~40% reduction, adjusted for debt size  
    const reductionRate \= Math.min(0.45, 0.30 \+ (rate / 100));  
    const newPmt   \= Math.round(payment \* (1 \- reductionRate) / 10\) \* 10;  
    const monthly  \= payment \- newPmt;  
    const annual   \= monthly \* 12;  
    const months   \= debt \< 15000 ? '24–36 months' : debt \< 40000 ? '36–48 months' : '48–60 months';

    document.getElementById('newPayment').textContent    \= formatCurrency(newPmt);  
    document.getElementById('monthlySavings').textContent \= formatCurrency(monthly);  
    document.getElementById('annualSavings').textContent  \= formatCurrency(annual);  
    document.getElementById('programLength').textContent  \= months;  
    document.querySelector('\#newPayment \+ .calc-result-sub').textContent \=  
      'vs. your current ' \+ formatCurrency(payment) \+ '/mo';  
  }

  \['debtSlider','paymentSlider','rateSlider'\].forEach(id \=\> {  
    const el \= document.getElementById(id);  
    if (el) el.addEventListener('input', updateCalc);  
  });  
  updateCalc();

\</script\>  
\</body\>  
\</html\>  
