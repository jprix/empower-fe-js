import React, { useState } from "react";
import Head from "next/head";

const contactCards = [
  {
    eyebrow: "Direct Line",
    title: "(866) 490-1617",
    detail: "Speak with a debt specialist Monday through Friday, 8am to 8pm ET.",
    href: "tel:8664901617",
    cta: "Call now",
  },
  {
    eyebrow: "Email Support",
    title: "Marketing@EmpowerFN.com",
    detail: "Send questions anytime and our team will follow up within one business day.",
    href: "mailto:Marketing@EmpowerFN.com",
    cta: "Send email",
  },
  {
    eyebrow: "Mailing Address",
    title: "P.O. Box 24, Eastport, NY 11941",
    detail: "For documentation, written correspondence, and account-related mail.",
    href: null,
    cta: "Empower Financial Network",
  },
];

const reassuranceItems = [
  "No obligations",
  "No credit check to start",
  "Confidential consultation",
];

const benefits = [
  {
    number: "01",
    icon: "📉",
    title: "Reduce Monthly Payments",
    description:
      "Explore options that may combine multiple balances into one more manageable monthly payment, often with less strain on your budget.",
  },
  {
    number: "02",
    icon: "🧭",
    title: "Get a Clearer Plan",
    description:
      "Instead of guessing your way through creditor calls and due dates, speak with a specialist who can help map out realistic next steps.",
  },
  {
    number: "03",
    icon: "🌅",
    title: "Build Toward Relief",
    description:
      "The goal is not just short-term breathing room. It is creating a path that helps you regain momentum and move toward long-term stability.",
  },
];

const faqs = [
  {
    question: "What happens after I submit the contact form?",
    answer:
      "A debt specialist reviews the information you shared and follows up to discuss your situation, goals, and which options may be available. There is no obligation to move forward.",
  },
  {
    question: "Will reaching out affect my credit score?",
    answer:
      "No. Contacting Empower Financial Network and discussing your options does not by itself affect your credit score.",
  },
  {
    question: "Do I need a certain amount of debt to ask for help?",
    answer:
      "Not necessarily. People reach out at different stages, whether they are managing growing balances, missed payments, or simply trying to find a more sustainable path forward.",
  },
  {
    question: "How quickly will someone get back to me?",
    answer:
      "Most inquiries receive a response within one business day, and many are handled sooner during business hours.",
  },
];

const debtAmountOptions = [
  { value: "", label: "Select range" },
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-75k", label: "$50,000 - $75,000" },
  { value: "75k-100k", label: "$75,000 - $100,000" },
  { value: "over-100k", label: "Over $100,000" },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    debtAmount: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - Empower Financial Network</title>
      </Head>

      <main className="o3-contact-page">
        <div className="o3-contact-grid">
          <section className="o3-contact-story">
            <div className="o3-contact-badge">Certified debt specialists</div>
            <div className="o3-section-label">Get in touch</div>
            <h1 className="o3-section-title">
              Start Your Path to
              <br />
              <em>Financial Freedom</em>
            </h1>
            <p className="o3-contact-intro">
              Questions about debt relief, consolidation, or your next best
              move? Share a few details and we will connect you with a real
              specialist who can walk through your options without pressure.
            </p>

            <div className="o3-contact-points">
              <div className="o3-contact-point">
                <div className="o3-contact-point-icon">01</div>
                <div>
                  <h3>Talk to a person, not a funnel</h3>
                  <p>
                    We keep the intake simple so you can get answers faster and
                    understand what programs may fit your situation.
                  </p>
                </div>
              </div>
              <div className="o3-contact-point">
                <div className="o3-contact-point-icon">02</div>
                <div>
                  <h3>Private and judgment-free</h3>
                  <p>
                    Your information stays confidential, and checking your
                    options does not impact your credit score.
                  </p>
                </div>
              </div>
              <div className="o3-contact-point">
                <div className="o3-contact-point-icon">03</div>
                <div>
                  <h3>Built around your goals</h3>
                  <p>
                    Whether you need a lower payment, one manageable plan, or a
                    clean starting point, we will help you understand the path.
                  </p>
                </div>
              </div>
            </div>

            <div className="o3-contact-trust-bar">
              {reassuranceItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="o3-contact-card-grid">
              {contactCards.map((card) => (
                <div key={card.eyebrow} className="o3-contact-info-card">
                  <div className="o3-contact-card-eyebrow">{card.eyebrow}</div>
                  {card.href ? (
                    <a className="o3-contact-card-title" href={card.href}>
                      {card.title}
                    </a>
                  ) : (
                    <div className="o3-contact-card-title">{card.title}</div>
                  )}
                  <p>{card.detail}</p>
                  <div className="o3-contact-card-cta">{card.cta}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="o3-contact-form-shell">
            {status === "success" ? (
              <div className="o3-contact-success">
                <div className="o3-contact-success-icon">+</div>
                <h2>Message Received</h2>
                <p>
                  Thank you for reaching out. A debt specialist will review your
                  note and contact you within one business day.
                </p>
                <a href="tel:8664901617">(866) 490-1617</a>
                <span>Need faster help? Call us directly.</span>
              </div>
            ) : (
              <form className="o3-contact-form" onSubmit={handleSubmit} noValidate>
                <div className="o3-contact-form-top">
                  <div className="o3-contact-form-step">Free consultation</div>
                  <h2>Tell us a little about your situation</h2>
                  <p>
                    A few details is all it takes to start the conversation.
                  </p>
                </div>

                {status === "error" ? (
                  <div className="o3-form-error">{errorMsg}</div>
                ) : null}

                <div className="o3-form-row">
                  <div className="o3-form-group">
                    <label className="o3-form-label" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      className="o3-form-input"
                      type="text"
                      name="name"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="o3-form-group">
                    <label className="o3-form-label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      className="o3-form-input"
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="o3-form-row">
                  <div className="o3-form-group">
                    <label className="o3-form-label" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      className="o3-form-input"
                      type="tel"
                      name="phone"
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="o3-form-group">
                    <label className="o3-form-label" htmlFor="debtAmount">
                      Approximate Debt Amount
                    </label>
                    <select
                      id="debtAmount"
                      className="o3-form-input o3-form-select"
                      name="debtAmount"
                      value={formData.debtAmount}
                      onChange={handleChange}
                    >
                      {debtAmountOptions.map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="o3-form-group full-width">
                  <label className="o3-form-label" htmlFor="message">
                    How Can We Help?
                  </label>
                  <textarea
                    id="message"
                    className="o3-form-textarea"
                    name="message"
                    placeholder="Tell us what is weighing on you, what kind of payment pressure you are feeling, or what outcome you are hoping for."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="o3-contact-form-footer">
                  <button
                    type="submit"
                    className="o3-form-submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Send Message ->"}
                  </button>
                  <p>
                    No obligations. No credit check to start. Completely
                    confidential.
                  </p>
                </div>
              </form>
            )}
          </section>
        </div>

        <section className="o3-benefits" id="benefits">
          <div className="o3-benefits-header">
            <div>
              <div className="o3-section-label">Benefits</div>
              <h2 className="o3-section-title">
                What Real Relief Can
                <br />
                <em>Look Like</em>
              </h2>
            </div>
            <p className="o3-benefits-intro">
              The right conversation can turn financial stress into a practical
              plan. These are the outcomes many people are hoping to create when
              they first reach out.
            </p>
          </div>

          <div className="o3-benefits-grid">
            {benefits.map((benefit) => (
              <div key={benefit.number} className="o3-benefit-card">
                <div className="o3-benefit-num">{benefit.number}</div>
                <div className="o3-benefit-icon">{benefit.icon}</div>
                <h3 className="o3-benefit-title">{benefit.title}</h3>
                <p className="o3-benefit-desc">{benefit.description}</p>
                <a href="/apply-now" className="o3-benefit-link">
                  Start the conversation →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="o3-mission" id="mission">
          <div className="o3-mission-visual">
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
                    A steadier financial path starts here
                  </text>
                  <circle cx="435" cy="60" r="30" fill="none" stroke="rgba(232,193,74,0.2)" strokeWidth="1" />
                  <circle cx="435" cy="60" r="50" fill="none" stroke="rgba(232,193,74,0.1)" strokeWidth="1" />
                </svg>
              </div>
            </div>
            <div className="o3-mission-badge">
              <div className="badge-num">1:1</div>
              <div className="badge-text">Guidance</div>
            </div>
          </div>

          <div className="o3-mission-content">
            <div className="o3-section-label">Our Mission</div>
            <h2 className="o3-section-title">
              Give Every Client a
              <br />
              <em>Clearer Way Forward</em>
            </h2>
            <p className="o3-mission-body">
              Empower Financial Network exists to make debt relief feel more
              human, more transparent, and far less overwhelming. We believe
              people deserve <strong>clear information</strong>, respectful
              support, and solutions that are grounded in their real financial
              situation rather than pressure or guesswork.
            </p>

            <div className="o3-mission-features">
              <div className="o3-mission-feature">
                <div className="o3-feature-icon-box">🛡️</div>
                <div className="o3-feature-text">
                  <h4>Clarity First</h4>
                  <p>
                    We focus on helping you understand your options before you
                    make any decisions.
                  </p>
                </div>
              </div>
              <div className="o3-mission-feature">
                <div className="o3-feature-icon-box">🤝</div>
                <div className="o3-feature-text">
                  <h4>People Over Pressure</h4>
                  <p>
                    Our goal is to be useful, informative, and respectful at
                    every step of the process.
                  </p>
                </div>
              </div>
              <div className="o3-mission-feature">
                <div className="o3-feature-icon-box">📋</div>
                <div className="o3-feature-text">
                  <h4>Practical Next Steps</h4>
                  <p>
                    We help turn a stressful situation into a concrete path you
                    can actually act on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="o3-faq" id="faq">
          <div className="o3-faq-layout">
            <div className="o3-faq-sticky">
              <div className="o3-section-label">FAQ</div>
              <h2 className="o3-section-title">
                Questions People Ask
                <br />
                <em>Before They Start</em>
              </h2>
              <p className="o3-faq-body">
                A few quick answers to the most common questions we hear from
                people exploring debt relief options.
              </p>
            </div>

            <div className="o3-faq-items">
              {faqs.map((item, index) => (
                <div
                  key={item.question}
                  className={`o3-faq-item${openFaq === index ? " open" : ""}`}
                >
                  <button
                    type="button"
                    className="o3-faq-q"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? -1 : index)
                    }
                  >
                    {item.question}
                    <div className="o3-faq-toggle">+</div>
                  </button>
                  <div className="o3-faq-a">{item.answer}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
