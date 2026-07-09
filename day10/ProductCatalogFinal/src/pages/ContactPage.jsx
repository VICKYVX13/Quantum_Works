// ─────────────────────────────────────────────────────────────────────────────
//  Contact Page — standalone full page version
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const info = [
    { icon: "📍", label: "Address",  value: "42 Innovation Drive, Tech City, CA 94103" },
    { icon: "📧", label: "Email",    value: "hello@novatech.com" },
    { icon: "📞", label: "Phone",    value: "+1 (800) 668-2832" },
    { icon: "🕐", label: "Hours",    value: "Mon – Fri · 9 am – 6 pm PST" },
  ];

  const faqs = [
    { q: "What is your return policy?", a: "We offer a 30-day no-questions-asked return policy on all products." },
    { q: "Do you offer international shipping?", a: "Yes! We ship to 45+ countries worldwide with free express shipping on orders above ₹5,000." },
    { q: "How long does delivery take?", a: "Domestic orders are delivered in 2–3 business days. International orders take 7–14 business days." },
    { q: "What warranty do you provide?", a: "All NovaTech products come with a 2-year manufacturer's warranty covering hardware defects." },
  ];

  return (
    <main className="page-main">
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span>Contact</span>
          </nav>
          <h1 className="page-hero-title">Get In Touch</h1>
          <p className="page-hero-sub">Our support team responds within 2 hours on business days</p>
        </div>
      </div>

      {/* Contact section */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info panel */}
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>Fill out the form and we'll get back to you as soon as possible.</p>
              <div className="info-list">
                {info.map((item) => (
                  <div key={item.label} className="info-row">
                    <span className="info-icon">{item.icon}</span>
                    <div>
                      <strong>{item.label}</strong>
                      <p>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="social-links">
                {["𝕏", "in", "📘", "📸"].map((s, i) => (
                  <a key={i} href="#" className="social-link" aria-label={`Social link ${i}`}>{s}</a>
                ))}
              </div>
            </div>

            {/* Form */}
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {sent && (
                <div className="form-success">✅ Thanks! We'll respond within 2 hours.</div>
              )}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cp-name">Full Name</label>
                  <input type="text" id="cp-name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="cp-email">Email Address</label>
                  <input type="email" id="cp-email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cp-subject">Subject</label>
                <input type="text" id="cp-subject" name="subject" value={form.subject} onChange={handleChange} placeholder="Product inquiry, order support…" required />
              </div>
              <div className="form-group">
                <label htmlFor="cp-message">Message</label>
                <textarea id="cp-message" name="message" rows={5} value={form.message} onChange={handleChange} placeholder="Tell us how we can help…" required />
              </div>
              <button type="submit" className="btn-primary form-submit">Send Message 📨</button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--light)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid">
            {faqs.map((faq) => (
              <div key={faq.q} className="faq-card">
                <h4>❓ {faq.q}</h4>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
