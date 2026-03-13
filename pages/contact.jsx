import React, { useState } from "react";
import Head from "next/head";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    debtAmount: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
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
        <title>Contact Us — Empower Financial Network</title>
      </Head>

      <div className="o3-contact-page">
        <div className="o3-contact-inner">
          <div>
            <div className="o3-section-label">Get in touch</div>
            <h1 className="o3-section-title">
              Start Your Path to
              <br />
              <em>Financial Freedom</em>
            </h1>
            <p
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "17px",
                color: "var(--text-muted)",
                lineHeight: "1.8",
                marginTop: "8px",
                maxWidth: "560px",
              }}
            >
              Have questions? Ready to explore your options? Fill out the form
              below and a certified debt specialist will reach out within one
              business day — no obligation, no pressure.
            </p>
          </div>

          {status === "success" ? (
            <div className="o3-form-success">
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "24px",
                  color: "var(--gold)",
                  marginBottom: "12px",
                }}
              >
                Message Received!
              </h3>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "'Libre Baskerville', serif",
                  lineHeight: "1.7",
                }}
              >
                Thank you for reaching out to Empower Financial Network. A
                specialist will contact you within one business day to discuss
                your options.
              </p>
              <p
                style={{
                  marginTop: "16px",
                  fontSize: "14px",
                  color: "var(--text-muted)",
                }}
              >
                Need immediate assistance? Call us at{" "}
                <a
                  href="tel:8664901617"
                  style={{ color: "var(--gold)", textDecoration: "none" }}
                >
                  (866) 490-1617
                </a>
              </p>
            </div>
          ) : (
            <form
              className="o3-contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              {status === "error" && (
                <div className="o3-form-error">{errorMsg}</div>
              )}

              <div className="o3-form-row">
                <div className="o3-form-group">
                  <label className="o3-form-label" htmlFor="name">
                    Full Name *
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
                    Email Address *
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
                    className="o3-form-input"
                    name="debtAmount"
                    value={formData.debtAmount}
                    onChange={handleChange}
                    style={{
                      appearance: "none",
                      cursor: "pointer",
                      background:
                        "rgba(13,31,60,0.6) url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a9bb5' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\") no-repeat right 16px center",
                    }}
                  >
                    <option value="">Select range</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-25k">$10,000 – $25,000</option>
                    <option value="25k-50k">$25,000 – $50,000</option>
                    <option value="50k-75k">$50,000 – $75,000</option>
                    <option value="75k-100k">$75,000 – $100,000</option>
                    <option value="over-100k">Over $100,000</option>
                  </select>
                </div>
              </div>

              <div className="o3-form-group full-width">
                <label className="o3-form-label" htmlFor="message">
                  How Can We Help? *
                </label>
                <textarea
                  id="message"
                  className="o3-form-textarea"
                  name="message"
                  placeholder="Tell us a bit about your situation and what you're hoping to achieve..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <button
                  type="submit"
                  className="o3-form-submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending..." : "Send Message →"}
                </button>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--text-muted)",
                    margin: 0,
                  }}
                >
                  ✓ No obligations &nbsp;·&nbsp; ✓ No credit check &nbsp;·&nbsp;
                  ✓ Confidential
                </p>
              </div>
            </form>
          )}

          {/* Contact Info Strip */}
          <div
            style={{
              marginTop: "48px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {[
              { icon: "📞", label: "Phone", value: "(866) 490-1617", href: "tel:8664901617" },
              { icon: "✉️", label: "Email", value: "Marketing@EmpowerFN.com", href: "mailto:Marketing@EmpowerFN.com" },
              { icon: "📍", label: "Address", value: "P.O. Box 24, Eastport, NY 11941", href: null },
            ].map(({ icon, label, value, href }) => (
              <div
                key={label}
                style={{
                  background: "var(--navy-mid)",
                  border: "1px solid rgba(232,193,74,0.12)",
                  borderRadius: "6px",
                  padding: "24px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{icon}</div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "6px",
                  }}
                >
                  {label}
                </div>
                {href ? (
                  <a
                    href={href}
                    style={{
                      fontSize: "14px",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "var(--gold)")}
                    onMouseOut={(e) => (e.target.style.color = "var(--text-muted)")}
                  >
                    {value}
                  </a>
                ) : (
                  <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                    {value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
