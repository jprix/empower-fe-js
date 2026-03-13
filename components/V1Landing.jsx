import React, { useState, useEffect, useRef } from "react";
import { useFlags } from "launchdarkly-react-client-sdk";
import ApplyModal from "./ApplyModal";
import Link from "next/link";
import { useRouter } from "next/router";

// ─── Savings Calculator Logic ───────────────────────────────────────────────
function formatCurrency(n) {
  return "$" + Math.round(n).toLocaleString();
}

function calcResults(debt, payment, rate) {
  const reductionRate = Math.min(0.45, 0.3 + rate / 100);
  const newPmt = Math.round((payment * (1 - reductionRate)) / 10) * 10;
  const monthly = payment - newPmt;
  const annual = monthly * 12;
  const months =
    debt < 15000 ? "24–36 months" : debt < 40000 ? "36–48 months" : "48–60 months";
  return { newPmt, monthly, annual, months };
}

// ─── Scroll Reveal Hook ─────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
    const safety = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) =>
        el.classList.add("visible")
      );
    }, 1500);
    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, []);
}

// ─── FAQ Item ────────────────────────────────────────────────────────────────
const faqData = [
  {
    q: "What is a debt consolidation loan?",
    a: "A debt consolidation loan is a single loan used to combine multiple debts into one. By using the proceeds to pay off outstanding credit card debt and other balances, you simplify repayment and can often save significantly on interest over time.",
  },
  {
    q: "How do I know if I qualify?",
    a: "Fill out our simple application and one of our debt consolidation experts will contact you to discuss your eligibility. The process is quick, and there's no obligation to proceed.",
  },
  {
    q: "Will this affect my credit score?",
    a: "No. Completing our application does not impact your credit score. It's simply the first step in understanding your options — you remain in full control of the process.",
  },
  {
    q: "What are the real benefits of consolidation?",
    a: "Consolidating your debts can reduce the number of monthly payments you manage, lower your interest rates, and potentially improve your credit score by helping you make regular, on-time payments.",
  },
  {
    q: "Are there any drawbacks to consider?",
    a: "Debt consolidation is a powerful tool, but it works best when combined with sound financial planning. We help you address both the symptoms and the root causes, setting you on a sustainable path forward.",
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────
const V1Landing = () => {
  const [openModal, setOpenModal] = useState(false);
  const flags = useFlags();
  const router = useRouter();

  // Calculator state
  const [debt, setDebt] = useState(25000);
  const [payment, setPayment] = useState(850);
  const [rate, setRate] = useState(22);
  const calc = calcResults(debt, payment, rate);

  // FAQ state
  const [openFaq, setOpenFaq] = useState(0);

  useScrollReveal();

  const handleCta = () => {
    if (flags.speakWithSpecialist) {
      router.push("/contact");
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="o3-hero">
        <div className="o3-hero-bg" />
        <div className="o3-hero-grid" />
        <div className="o3-hero-arc" />

        <div className="o3-hero-main">
          <div className="o3-hero-content">
            <div className="o3-hero-badge">
              <span>Debt Relief Specialists</span>
            </div>
            <h1>
              You Deserve a Life
              <br />
              <em>Without Debt.</em>
            </h1>
            <p className="o3-hero-sub">
              If you're juggling multiple payments, losing sleep over balances that
              never shrink — there's a better way. One call changes everything.
            </p>

            <div className="o3-hero-pillars">
              <div className="o3-hero-pillar">
                <div className="o3-pillar-dot" />
                Cut your monthly payments — often by 40% or more
              </div>
              <div className="o3-hero-pillar">
                <div className="o3-pillar-dot" />
                One simple payment replaces all your creditors
              </div>
              <div className="o3-hero-pillar">
                <div className="o3-pillar-dot" />
                No credit impact to check your options. Zero obligations.
              </div>
            </div>

            <div className="o3-hero-actions">
              <button className="o3-btn-primary" onClick={handleCta}>
                See My Options <span className="arrow">→</span>
              </button>
              <a href="tel:8664901617" className="o3-btn-phone">
                <div className="o3-phone-icon">📞</div>
                <div className="o3-phone-text">
                  <span className="o3-phone-label">Talk to a Debt Specialist</span>
                  <span className="o3-phone-number">(866) 490-1617</span>
                </div>
              </a>
            </div>
          </div>

          <div className="o3-hero-card-wrap">
            <div className="o3-hero-card">
              <div className="o3-hero-card-title">Get Your Free Consultation</div>
              <p className="o3-hero-card-sub">
                See your options in 2 minutes — no credit check, no obligations.
              </p>

              <div className="o3-hero-card-field">
                <label className="o3-hero-card-label">Full Name</label>
                <input
                  className="o3-hero-card-input"
                  type="text"
                  placeholder="Jane Smith"
                />
              </div>
              <div className="o3-hero-card-field">
                <label className="o3-hero-card-label">Phone Number</label>
                <input
                  className="o3-hero-card-input"
                  type="tel"
                  placeholder="(555) 000-0000"
                />
              </div>
              <div className="o3-hero-card-field">
                <label className="o3-hero-card-label">Total Debt Amount</label>
                <select className="o3-hero-card-select" defaultValue="">
                  <option value="" disabled>Select range</option>
                  <option value="under-10k">Under $10,000</option>
                  <option value="10k-25k">$10,000 – $25,000</option>
                  <option value="25k-50k">$25,000 – $50,000</option>
                  <option value="50k-75k">$50,000 – $75,000</option>
                  <option value="75k-100k">$75,000 – $100,000</option>
                  <option value="over-100k">Over $100,000</option>
                </select>
              </div>

              <button className="o3-hero-card-btn" onClick={handleCta}>
                See My Options →
              </button>
              <p className="o3-hero-card-note">
                ✓ No credit impact &nbsp;·&nbsp; ✓ Free &nbsp;·&nbsp; ✓ No obligations
              </p>

              <div className="o3-hero-card-divider" />
              <a href="tel:8664901617" className="o3-hero-card-phone">
                📞 Or call us: <strong>(866) 490-1617</strong>
              </a>
            </div>
          </div>
        </div>

        <div className="o3-hero-stats">
          <div className="o3-stat-item">
            <span className="o3-stat-number">$0</span>
            <span className="o3-stat-label">Upfront Fees</span>
          </div>
          <div className="o3-stat-divider" />
          <div className="o3-stat-item">
            <span className="o3-stat-number">Free</span>
            <span className="o3-stat-label">Consultation</span>
          </div>
          <div className="o3-stat-divider" />
          <div className="o3-stat-item">
            <span className="o3-stat-number">1</span>
            <span className="o3-stat-label">Monthly Payment</span>
          </div>
          <div className="o3-stat-divider" />
          <div className="o3-stat-item">
            <span className="o3-stat-number">Fast</span>
            <span className="o3-stat-label">Application</span>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <div className="o3-trust-bar">
        <span className="o3-trust-label">Why Choose Us</span>
        <div className="o3-trust-items">
          <div className="o3-trust-item">
            <div className="o3-ti-dot">🔒</div> No credit score impact to apply
          </div>
          <div className="o3-trust-item">
            <div className="o3-ti-dot">⚡</div> Fast application process
          </div>
          <div className="o3-trust-item">
            <div className="o3-ti-dot">🤝</div> Personalized debt solutions
          </div>
          <div className="o3-trust-item">
            <div className="o3-ti-dot">💰</div> Lower your monthly payments
          </div>
          <div className="o3-trust-item">
            <div className="o3-ti-dot">✨</div> Path to a debt-free future
          </div>
        </div>
      </div>

      {/* ─── BENEFITS ─── */}
      <section className="o3-benefits" id="benefits">
        <div className="o3-benefits-header reveal">
          <div>
            <div className="o3-section-label">What we offer</div>
            <h2 className="o3-section-title">
              The Benefits of
              <br />
              <em>Debt Relief</em>
            </h2>
          </div>
          <p className="o3-benefits-intro">
            Struggling under multiple high-interest payments? Our expert partners
            connect you with solutions tailored to your unique financial situation
            — and your path forward starts with a single, free conversation.
          </p>
        </div>

        <div className="o3-benefits-grid reveal">
          <div className="o3-benefit-card">
            <div className="o3-benefit-num">01</div>
            <div className="o3-benefit-icon">📉</div>
            <h3 className="o3-benefit-title">Reduce Monthly Payments</h3>
            <p className="o3-benefit-desc">
              Debt relief consolidates your payments into one manageable monthly
              amount — often dramatically lower than what you're paying across
              multiple accounts today.
            </p>
            <button className="o3-benefit-link" onClick={handleCta}>
              Apply Now →
            </button>
          </div>
          <div className="o3-benefit-card">
            <div className="o3-benefit-num">02</div>
            <div className="o3-benefit-icon">🎯</div>
            <h3 className="o3-benefit-title">Tailored Solutions</h3>
            <p className="o3-benefit-desc">
              No two financial situations are the same. Our debt relief programs
              are customized to your budget, timeline, and goals — giving you
              flexibility when you need it most.
            </p>
            <button className="o3-benefit-link" onClick={handleCta}>
              Learn More →
            </button>
          </div>
          <div className="o3-benefit-card">
            <div className="o3-benefit-num">03</div>
            <div className="o3-benefit-icon">🌅</div>
            <h3 className="o3-benefit-title">A Debt-Free Future</h3>
            <p className="o3-benefit-desc">
              Once the process is complete, you emerge with the opportunity to
              rebuild your financial health from the ground up — without the
              burden of unresolved debt hanging over you.
            </p>
            <button className="o3-benefit-link" onClick={handleCta}>
              Get Started →
            </button>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="o3-how-it-works reveal">
        <div className="o3-hiw-header">
          <div className="o3-section-label">Simple process</div>
          <h2 className="o3-section-title">
            Get Relief in
            <br />
            <em>3 Simple Steps</em>
          </h2>
          <p>
            No complicated paperwork. No confusing jargon. Just a clear path
            forward.
          </p>
        </div>

        <div className="o3-hiw-steps">
          <div className="o3-hiw-step">
            <div className="o3-hiw-num">1</div>
            <span className="o3-hiw-icon">📋</span>
            <h3 className="o3-hiw-title">Tell Us About Your Debt</h3>
            <p className="o3-hiw-desc">
              Fill out our 2-minute form. Share how much you owe and what type of
              debt you're carrying — no credit check, no obligations.
            </p>
          </div>
          <div className="o3-hiw-step">
            <div className="o3-hiw-num">2</div>
            <span className="o3-hiw-icon">🤝</span>
            <h3 className="o3-hiw-title">Speak with a Specialist</h3>
            <p className="o3-hiw-desc">
              A certified debt specialist reviews your situation and presents a
              personalized relief plan — with real numbers, not vague promises.
            </p>
          </div>
          <div className="o3-hiw-step">
            <div className="o3-hiw-num">3</div>
            <span className="o3-hiw-icon">🌅</span>
            <h3 className="o3-hiw-title">Start Your New Chapter</h3>
            <p className="o3-hiw-desc">
              One low monthly payment replaces the chaos of multiple creditors.
              Watch your debt shrink and your stress disappear — month by month.
            </p>
          </div>
        </div>

        <div className="o3-hiw-cta">
          <button className="o3-btn-primary" onClick={handleCta}>
            Start Step 1 — It&apos;s Free <span className="arrow">→</span>
          </button>
          <p>No credit check · No upfront fees · No obligations</p>
        </div>
      </section>

      {/* ─── SAVINGS CALCULATOR ─── */}
      <section className="o3-calculator">
        <div className="o3-calc-inner">
          <div className="o3-calc-header reveal">
            <div className="o3-section-label">See the numbers</div>
            <h2 className="o3-section-title">
              How Much Could
              <br />
              <em>You Save?</em>
            </h2>
            <p>
              Adjust the sliders to estimate your potential savings with Empower.
            </p>
          </div>

          <div className="o3-calc-body reveal">
            <div className="o3-calc-inputs">
              <div className="o3-calc-field">
                <label>
                  Total Debt <span>{formatCurrency(debt)}</span>
                </label>
                <input
                  type="range"
                  className="o3-calc-slider"
                  min="5000"
                  max="100000"
                  step="1000"
                  value={debt}
                  onChange={(e) => setDebt(Number(e.target.value))}
                />
              </div>
              <div className="o3-calc-field">
                <label>
                  Current Monthly Payment <span>{formatCurrency(payment)}</span>
                </label>
                <input
                  type="range"
                  className="o3-calc-slider"
                  min="200"
                  max="3000"
                  step="50"
                  value={payment}
                  onChange={(e) => setPayment(Number(e.target.value))}
                />
              </div>
              <div className="o3-calc-field">
                <label>
                  Average Interest Rate <span>{rate}%</span>
                </label>
                <input
                  type="range"
                  className="o3-calc-slider"
                  min="10"
                  max="35"
                  step="1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                />
              </div>
              <p className="o3-calc-disclaimer">
                * Estimates based on typical debt relief program outcomes.
                Individual results vary. This is not a guarantee of savings.
              </p>
            </div>

            <div className="o3-calc-results">
              <div>
                <div className="o3-calc-result-title">
                  Estimated new monthly payment
                </div>
                <div className="o3-calc-result-num">
                  {formatCurrency(calc.newPmt)}
                </div>
                <div className="o3-calc-result-sub">
                  vs. your current {formatCurrency(payment)}/mo
                </div>
              </div>
              <div className="o3-calc-divider" />
              <div className="o3-calc-result-row">
                <span className="o3-calc-result-label">Monthly savings</span>
                <span
                  className="o3-calc-result-val"
                  style={{ color: "var(--gold)" }}
                >
                  {formatCurrency(calc.monthly)}
                </span>
              </div>
              <div className="o3-calc-result-row">
                <span className="o3-calc-result-label">Annual savings</span>
                <span className="o3-calc-result-val">
                  {formatCurrency(calc.annual)}
                </span>
              </div>
              <div className="o3-calc-result-row">
                <span className="o3-calc-result-label">Est. program length</span>
                <span className="o3-calc-result-val">{calc.months}</span>
              </div>
              <div className="o3-calc-divider" />
              <button
                className="o3-btn-primary o3-calc-cta"
                onClick={handleCta}
              >
                Get My Real Numbers →
              </button>
              <p className="o3-calc-note">
                Free · No credit check · No obligations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="o3-mission" id="mission">
        <div className="o3-mission-visual reveal">
          <div className="o3-mission-img-frame">
            <div className="o3-mission-graphic">
              <svg viewBox="0 0 500 620" xmlns="http://www.w3.org/2000/svg">
                <rect width="500" height="620" fill="#142850" />
                <line x1="0" y1="620" x2="500" y2="0" stroke="rgba(232,193,74,0.05)" strokeWidth="1" />
                <line x1="0" y1="500" x2="500" y2="0" stroke="rgba(232,193,74,0.05)" strokeWidth="1" />
                <line x1="100" y1="620" x2="500" y2="100" stroke="rgba(232,193,74,0.05)" strokeWidth="1" />
                <rect x="60" y="380" width="50" height="160" rx="4" fill="rgba(232,193,74,0.15)" />
                <rect x="130" y="300" width="50" height="240" rx="4" fill="rgba(232,193,74,0.2)" />
                <rect x="200" y="240" width="50" height="300" rx="4" fill="rgba(232,193,74,0.25)" />
                <rect x="270" y="180" width="50" height="360" rx="4" fill="rgba(232,193,74,0.35)" />
                <rect x="340" y="120" width="50" height="420" rx="4" fill="rgba(232,193,74,0.5)" />
                <rect x="410" y="60" width="50" height="480" rx="4" fill="#e8c14a" />
                <polyline points="85,380 155,300 225,240 295,180 365,120 435,60" fill="none" stroke="rgba(232,193,74,0.6)" strokeWidth="2" strokeDasharray="8 4" />
                <circle cx="85" cy="380" r="5" fill="rgba(232,193,74,0.4)" />
                <circle cx="155" cy="300" r="5" fill="rgba(232,193,74,0.5)" />
                <circle cx="225" cy="240" r="5" fill="rgba(232,193,74,0.6)" />
                <circle cx="295" cy="180" r="5" fill="rgba(232,193,74,0.7)" />
                <circle cx="365" cy="120" r="5" fill="rgba(232,193,74,0.85)" />
                <circle cx="435" cy="60" r="7" fill="#e8c14a" />
                <text x="250" y="560" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="18" fill="rgba(232,193,74,0.6)">
                  Your path to financial freedom
                </text>
                <circle cx="435" cy="60" r="30" fill="none" stroke="rgba(232,193,74,0.2)" strokeWidth="1" />
                <circle cx="435" cy="60" r="50" fill="none" stroke="rgba(232,193,74,0.1)" strokeWidth="1" />
              </svg>
            </div>
          </div>
          <div className="o3-mission-badge">
            <div className="badge-num">Free</div>
            <div className="badge-text">Consultation</div>
          </div>
        </div>

        <div className="o3-mission-content reveal">
          <div className="o3-section-label">Our Mission</div>
          <h2 className="o3-section-title">
            Dedicated Partners
            <br />
            in Your <em>Journey</em>
          </h2>
          <p className="o3-mission-body">
            At Empower Financial Network, we&apos;re your{" "}
            <strong>dedicated partners</strong> in the journey to financial
            freedom. With years of experience and a proven track record, our team
            is passionate about helping clients{" "}
            <strong>break free from high-interest debt</strong>. We understand
            that every financial situation is unique, which is why we connect you
            with personalized solutions that deliver real results.
          </p>

          <div className="o3-mission-features">
            <div className="o3-mission-feature">
              <div className="o3-feature-icon-box">🛡️</div>
              <div className="o3-feature-text">
                <h4>No Credit Impact</h4>
                <p>
                  Completing our application does not affect your credit score —
                  apply with confidence.
                </p>
              </div>
            </div>
            <div className="o3-mission-feature">
              <div className="o3-feature-icon-box">👥</div>
              <div className="o3-feature-text">
                <h4>Expert Guidance</h4>
                <p>
                  Our debt specialists have helped thousands of clients reclaim
                  their financial lives.
                </p>
              </div>
            </div>
            <div className="o3-mission-feature">
              <div className="o3-feature-icon-box">📋</div>
              <div className="o3-feature-text">
                <h4>Transparent Process</h4>
                <p>
                  No hidden fees, no surprises. We walk you through every step of
                  the journey.
                </p>
              </div>
            </div>
          </div>

          <button className="o3-btn-primary" onClick={handleCta}>
            Apply for Free Consultation <span className="arrow">→</span>
          </button>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="o3-faq" id="faq">
        <div className="o3-faq-layout">
          <div className="o3-faq-sticky reveal">
            <div className="o3-section-label">Common Questions</div>
            <h2 className="o3-section-title">
              Debt Consolidation
              <br />
              <em>101</em>
            </h2>
            <p className="o3-faq-body">
              Everything you need to know before taking the first step toward
              financial freedom.
            </p>
            <button className="o3-btn-primary" onClick={handleCta}>
              Get Started <span className="arrow">→</span>
            </button>
          </div>

          <div className="o3-faq-items reveal">
            {faqData.map((item, i) => (
              <div
                key={i}
                className={`o3-faq-item${openFaq === i ? " open" : ""}`}
              >
                <button
                  className="o3-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  {item.q}
                  <div className="o3-faq-toggle">+</div>
                </button>
                <div className="o3-faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <div className="o3-cta-section reveal">
        <div className="o3-cta-inner">
          <div className="o3-cta-urgency-tag">
            Limited availability — Free consultations filling fast
          </div>

          <h2 className="o3-cta-title">
            Every month you wait
            <br />
            costs you <em>real money.</em>
          </h2>
          <p className="o3-cta-sub">
            People with $20,000+ in debt save an average of $400/month within 90
            days of enrolling. Your first step is free.
          </p>

          <div className="o3-cta-stats-row">
            <div className="o3-cta-stat">
              <span className="o3-cta-stat-num">$400+</span>
              <span className="o3-cta-stat-label">Avg. monthly savings</span>
            </div>
            <div className="o3-cta-stat">
              <span className="o3-cta-stat-num">2 min</span>
              <span className="o3-cta-stat-label">To see your options</span>
            </div>
            <div className="o3-cta-stat">
              <span className="o3-cta-stat-num">$0</span>
              <span className="o3-cta-stat-label">Upfront cost</span>
            </div>
            <div className="o3-cta-stat">
              <span className="o3-cta-stat-num">No</span>
              <span className="o3-cta-stat-label">Credit impact</span>
            </div>
          </div>

          <div className="o3-cta-actions">
            <button className="o3-btn-cta-primary" onClick={handleCta}>
              See My Options — It&apos;s Free →
            </button>
            <div className="o3-cta-reassurance">
              <span>✓ No obligations</span>
              <span>✓ No upfront fees</span>
              <span>✓ No credit check to apply</span>
            </div>
            <a href="tel:8664901617" className="o3-cta-phone">
              📞 Prefer to call? (866) 490-1617 — Mon–Fri 8am–8pm ET
            </a>
          </div>
        </div>
      </div>

      <ApplyModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default V1Landing;
