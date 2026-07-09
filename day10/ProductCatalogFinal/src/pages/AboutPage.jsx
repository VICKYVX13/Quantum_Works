// ─────────────────────────────────────────────────────────────────────────────
//  About Page — standalone full page version
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from "react-router-dom";

const stats = [
  { num: "50K+",  label: "Happy Customers" },
  { num: "45",    label: "Countries Served" },
  { num: "2015",  label: "Founded" },
  { num: "2-Yr",  label: "Warranty" },
];

const team = [
  { name: "Aryan Mehta",   role: "CEO & Co-Founder",    avatar: "👨‍💼", bio: "Former Google engineer with a passion for disruptive tech." },
  { name: "Priya Sharma",  role: "CTO",                 avatar: "👩‍💻", bio: "Hardware innovator and IEEE award winner." },
  { name: "Raj Patel",     role: "Head of Design",      avatar: "🎨", bio: "Brought award-winning UX to 12+ consumer products." },
  { name: "Anita Nair",    role: "Head of Operations",  avatar: "⚙️", bio: "Scaled NovaTech's supply chain to 45 countries." },
];

const milestones = [
  { year: "2015", event: "NovaTech founded in Bengaluru with a team of 5" },
  { year: "2017", event: "First product launch — NovaTech Wireless Earbuds" },
  { year: "2019", event: "Expanded to 20 countries; hit ₹100 Cr ARR" },
  { year: "2021", event: "Awarded CES Innovation Award for NovaTech X1 Laptop" },
  { year: "2023", event: "50,000th customer milestone; opened 3 experience stores" },
  { year: "2024", event: "CES Best Brand — Consumer Electronics category" },
];

export default function AboutPage() {
  return (
    <main className="page-main">
      {/* Hero */}
      <div className="about-page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">›</span>
            <span>About</span>
          </nav>
          <h1 className="page-hero-title">About NovaTech</h1>
          <p className="page-hero-sub">Pioneering the future of consumer electronics since 2015</p>
        </div>
      </div>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=700&q=80"
                alt="NovaTech headquarters"
                className="about-img"
                loading="lazy"
              />
              <div className="about-badge">
                <span className="badge-icon">🏆</span>
                <div>
                  <strong>Award Winning</strong>
                  <p>CES Best Brand 2024</p>
                </div>
              </div>
            </div>
            <div className="about-content">
              <span className="section-tag">Our Mission</span>
              <h2 className="section-title">Technology That Genuinely Improves Everyday Life</h2>
              <p className="about-desc">
                Founded in 2015, NovaTech is a global electronics brand trusted by over 50,000 customers
                in 45 countries. We combine cutting-edge engineering with thoughtful design to create
                technology that genuinely improves everyday life.
              </p>
              <p className="about-desc" style={{ marginTop: "1rem" }}>
                Every product in our catalogue goes through 200+ quality checks before it reaches you.
                We believe great technology should be accessible, durable, and sustainable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section" style={{ background: "linear-gradient(135deg, var(--blue), var(--indigo))", padding: "3rem 0" }}>
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="about-stat">
                <span className="about-stat-num">{s.num}</span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Journey</span>
            <h2 className="section-title">From Startup to Global Brand</h2>
          </div>
          <div className="timeline">
            {milestones.map((m) => (
              <div key={m.year} className="timeline-item">
                <div className="timeline-year">{m.year}</div>
                <div className="timeline-dot" />
                <div className="timeline-event">{m.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: "var(--light)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">The People</span>
            <h2 className="section-title">Meet Our Leadership</h2>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <div className="team-avatar">{member.avatar}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="section-tag">Join the Family</span>
          <h2 className="section-title">Ready to Experience NovaTech?</h2>
          <p className="section-subtitle" style={{ marginBottom: "2rem" }}>
            Explore our full range of award-winning electronics.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/products" className="btn-primary">Shop Now →</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
