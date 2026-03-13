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
      </main>
    </>
  );
}
