// ─────────────────────────────────────────────────────────────────────────────
//  Contact Section
// ─────────────────────────────────────────────────────────────────────────────
import { useState } from "react";

export default function Contact() {
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

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">We'd Love to Hear From You</h2>
          <p className="section-subtitle">
            Our support team typically responds within 2 hours on business days.
          </p>
        </div>

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
                <a key={i} href="#" className="social-link" aria-label={`Social link ${i}`}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {sent && (
              <div className="form-success">
                ✅ Thanks! We'll respond within 2 hours.
              </div>
            )}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text" id="name" name="name"
                  value={form.name} onChange={handleChange}
                  placeholder="John Doe" required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email" id="email" name="email"
                  value={form.email} onChange={handleChange}
                  placeholder="john@example.com" required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text" id="subject" name="subject"
                value={form.subject} onChange={handleChange}
                placeholder="Product inquiry, order support…" required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message" rows={5}
                value={form.message} onChange={handleChange}
                placeholder="Tell us how we can help…" required
              />
            </div>
            <button type="submit" className="btn-primary form-submit">
              Send Message 📨
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
