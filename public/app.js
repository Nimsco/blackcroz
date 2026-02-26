const { useEffect, useState } = React;

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "collections", label: "Collections" },
  { id: "lookbook", label: "Lookbook" },
  { id: "contact", label: "Contact" },
];

const COLLECTION_ITEMS = [
  {
    id: "grey-hoodie",
    name: "The Grey Hoodie",
    category: "Outerwear",
    description:
      "Soft fleece hoodie in Kathmandu grey — clean, minimal and made for everyday layers.",
    priceLabel: "NPR 7,500",
    imageUrl: "/assets/grey_hoodie.jpg",
    tag: "New",
  },
  {
    id: "trench-coat",
    name: "The Trench Coat",
    category: "Outerwear",
    description:
      "Tailored trench in muted sand, the perfect top layer for cool evenings in the valley.",
    priceLabel: "NPR 14,500",
    imageUrl: "/assets/trench_coat.jpg",
    tag: "Signature",
  },
  {
    id: "puffer-jacket",
    name: "The Puffer Jacket",
    category: "Outerwear",
    description:
      "Lightweight navy puffer with a streamlined profile, warm enough for Himalayan winds.",
    priceLabel: "NPR 11,200",
    imageUrl: "/assets/puffer_jacket.jpg",
    tag: "Essential",
  },
  {
    id: "denim-jacket",
    name: "The Denim Jacket",
    category: "Outerwear",
    description:
      "Classic indigo denim jacket with subtle distressing — built for Kathmandu streets.",
    priceLabel: "NPR 8,900",
    imageUrl: "/assets/denim_jacket.jpg",
    tag: "Core",
  },
];

const LOOKBOOK_SHOTS = [
  {
    id: "night-shift",
    title: "Night Shift, Thamel",
    description: "Elevated streetwear under city lights above the valley.",
    imageUrl: "/assets/puffer_jacket.jpg",
    mood: "City / Night",
  },
  {
    id: "soft-concrete",
    title: "Soft Concrete",
    description: "Muted layers against raw concrete and brick walls.",
    imageUrl: "/assets/grey_hoodie.jpg",
    mood: "Minimal / Day",
  },
  {
    id: "edge-of-light",
    title: "Edge of Light",
    description: "Monochrome silhouettes catching the last Kathmandu light.",
    imageUrl: "/assets/trench_coat.jpg",
    mood: "Motion / Contrast",
  },
  {
    id: "static-calm",
    title: "Static Calm",
    description: "Quiet luxury in denim and padded layers.",
    imageUrl: "/assets/denim_jacket.jpg",
    mood: "Calm / Texture",
  },
];

function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

function useRevealOnScroll() {
  useEffect(() => {
    const revealables = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealables.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function Navbar({ activeId, theme, onToggleTheme }) {
  return (
    <header className="bc-nav">
      <div className="bc-nav-brand">
        <button
          type="button"
          className="bc-logo-click"
          onClick={() => {
            const el = document.getElementById("home");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        >
          <div className="bc-logo-mark">
            {/* Logo image – place your file at /public/assets/black-croz-logo.png */}
            <img
              src="/assets/blackcrozlogo.svg"
              alt="Black Croz logo"
              className="bc-logo-img"
              onError={(e) => {
                e.target.style.display = "none";
                const fallback = document.createElement("span");
                fallback.className = "bc-logo-fallback";
                fallback.textContent = "BC";
                e.target.parentNode.appendChild(fallback);
              }}
            />
          </div>
        </button>
        <div className="bc-logo-type">
          <span className="bc-logo-wordmark">Black Croz</span>
          <span className="bc-logo-tagline">Luxury Streetwear / Nepal</span>
        </div>
      </div>
      <div className="bc-nav-right">
        <nav className="bc-nav-links">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              className={
                "bc-nav-link" +
                (activeId === section.id ? " bc-nav-link--active" : "")
              }
              onClick={() => {
                const el = document.getElementById(section.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              {section.label}
            </button>
          ))}
        </nav>
        <button
          className="bc-theme-toggle"
          type="button"
          onClick={onToggleTheme}
        >
          <span className="bc-theme-toggle-thumb">
            {theme === "light" ? "☾" : "☼"}
          </span>
          <span className="bc-theme-toggle-label">
            {theme === "light" ? "Dark" : "Light"}
          </span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="bc-section bc-hero" data-reveal>
      <div className="bc-hero-bg-orbit" />
      <div className="bc-hero-content">
        <p className="bc-eyebrow">Black Croz / Since 2026</p>
        <h1 className="bc-hero-title">
          Quiet luxury
          <span className="bc-hero-title-accent">
            {" "}
            for Kathmandu nights.
          </span>
        </h1>
        <p className="bc-hero-subtitle">
          A high-end streetwear label for Gen Z and young adults who move after
          dark. Monochrome palettes, sculpted silhouettes, and pieces that feel
          as elevated as they look — inspired by the rhythm of Kathmandu.
        </p>
        <div className="bc-hero-actions">
          <button
            className="bc-button bc-button--primary"
            onClick={() =>
              document
                .getElementById("collections")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            View Collections
          </button>
          <button
            className="bc-button bc-button--ghost"
            onClick={() =>
              document
                .getElementById("lookbook")
                .scrollIntoView({ behavior: "smooth" })
            }
          >   a
            Explore Lookbook
          </button>
        </div>
        <div className="bc-hero-meta">
          <span>Monochrome / Muted Neutrals</span>
          <span>Designed for urban nights</span>
          <span>Limited drops only</span>
        </div>
      </div>
      <div className="bc-hero-visual" data-reveal>
  <div className="bc-hero-orbit-layer bc-hero-orbit-layer--outer" />
  <div className="bc-hero-orbit-layer bc-hero-orbit-layer--inner" />

  {/* Added Image */}
  <img 
    src="/assets/oversized.jpeg" 
    alt="Oversized Midnight Raven Outfit"
    className="bc-hero-image"
  />

  <div className="bc-hero-card">
    <span className="bc-hero-card-tag">Drop 01</span>
    <p className="bc-hero-card-title">MIDNIGHT RAVEN</p>
    <p className="bc-hero-card-copy">
      Oversized silhouettes in heavy-weight cotton with tonal embroidery.
    </p>
  </div>
</div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bc-section bc-section--inverse" data-reveal>
      <div className="bc-section-inner bc-about-layout">
        <div>
          <p className="bc-eyebrow">About Us</p>
          <h2 className="bc-section-title">
            A label born in the in-between hours of Kathmandu.
          </h2>
        </div>
        <div className="bc-about-copy">
          <p>
            Black Croz is a luxury streetwear brand crafted for those who don&apos;t
            wait for daylight. From Kathmandu, we blend high-end tailoring with
            relaxed, oversized forms, using a muted palette of blacks,
            off-whites, and softened neutrals.
          </p>
          <p>
            Every piece is designed to move effortlessly from late studio
            sessions to rooftop nights — elevated enough for the front row,
            grounded enough for the city. No loud logos. No fast trends. Just
            quietly powerful silhouettes that speak when you don&apos;t have to.
          </p>
          <div className="bc-about-grid">
            <div className="bc-about-stat">
              <span className="bc-about-stat-label">Design Language</span>
              <span className="bc-about-stat-value">
                Monochrome / Soft Neutrals
              </span>
            </div>
            <div className="bc-about-stat">
              <span className="bc-about-stat-label">Focus</span>
              <span className="bc-about-stat-value">
                Limited drops, considered details
              </span>
            </div>
            <div className="bc-about-stat">
              <span className="bc-about-stat-label">Made For</span>
              <span className="bc-about-stat-value">
                Gen Z &amp; young adults
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Collections() {
  return (
    <section id="collections" className="bc-section" data-reveal>
      <div className="bc-section-inner">
        <div className="bc-section-header">
          <div>
            <p className="bc-eyebrow">Collections</p>
            <h2 className="bc-section-title">Pieces for the after hours.</h2>
          </div>
          <p className="bc-section-subtitle">
            A curated selection of core and limited silhouettes. Clean lines,
            elevated fabrics, and details that only reveal themselves up close.
          </p>
        </div>
        <div className="bc-grid bc-grid--collections">
          {COLLECTION_ITEMS.map((item) => (
            <article key={item.id} className="bc-card bc-card--collection">
              <div className="bc-card-media">
                <div className="bc-card-media-fallback" />
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
                {item.tag && (
                  <span className="bc-pill bc-pill--light">{item.tag}</span>
                )}
              </div>
              <div className="bc-card-body">
                <div className="bc-card-row">
                  <h3 className="bc-card-title">{item.name}</h3>
                  <span className="bc-card-price">{item.priceLabel}</span>
                </div>
                <p className="bc-card-meta">{item.category}</p>
                <p className="bc-card-description">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lookbook() {
  return (
    <section id="lookbook" className="bc-section bc-section--edge" data-reveal>
      <div className="bc-section-inner">
        <div className="bc-section-header">
          <div>
            <p className="bc-eyebrow">Lookbook</p>
            <h2 className="bc-section-title">Visual stories after dark.</h2>
          </div>
          <p className="bc-section-subtitle">
            Editorial imagery that captures the Black Croz mood — soft light,
            hard lines, and the quiet confidence of monochrome layering.
          </p>
        </div>
      </div>
      <div className="bc-lookbook-strip">
        {LOOKBOOK_SHOTS.map((shot) => (
          <figure key={shot.id} className="bc-lookbook-frame">
            <div className="bc-lookbook-media">
              <div className="bc-lookbook-fallback" />
              {shot.imageUrl && (
                <img
                  src={shot.imageUrl}
                  alt={shot.title}
                  loading="lazy"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
            </div>
            <figcaption className="bc-lookbook-caption">
              <div className="bc-lookbook-caption-header">
                <span className="bc-pill">{shot.mood}</span>
                <span className="bc-lookbook-dot" />
              </div>
              <h3>{shot.title}</h3>
              <p>{shot.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bc-section bc-section--inverse" data-reveal>
      <div className="bc-section-inner bc-contact-layout">
        <div>
          <p className="bc-eyebrow">Contact</p>
          <h2 className="bc-section-title">
            For drops, styling and collaborations.
          </h2>
          <p className="bc-section-subtitle">
            Black Croz currently operates invite-only drops from Kathmandu.
            Reach out for lookbooks, private previews, or creative
            collaborations across Nepal and beyond.
          </p>
          <div className="bc-contact-links">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="bc-contact-link"
            >
              <span>@blackcroz</span>
              <span className="bc-contact-link-arrow">↗</span>
            </a>
            <a
              href="mailto:blackcroz@gmail.com"
              className="bc-contact-link"
            >
              <span>blackcroz@gmail.com</span>
              <span className="bc-contact-link-arrow">↗</span>
            </a>
            <a href="tel:+9779765289135" className="bc-contact-link">
              <span>+977 9765289135</span>
              <span className="bc-contact-link-arrow">↗</span>
            </a>
          </div>
        </div>
        <form className="bc-form" onSubmit={handleSubmit}>
          <div className="bc-form-row">
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>
          <label>
            Inquiry type
            <select name="type" defaultValue="drop">
              <option value="drop">Drop access</option>
              <option value="styling">Styling / pulls</option>
              <option value="collab">Collaboration</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="4"
              placeholder="Tell us what you have in mind."
              required
            />
          </label>
          <button type="submit" className="bc-button bc-button--primary">
            Send Inquiry
          </button>
          {submitted && (
            <p className="bc-form-confirmation">
              Inquiry captured. For now this demo does not send emails — please
              also reach out on Instagram or email for a faster response.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function App() {
  const activeId = useScrollSpy(SECTIONS.map((s) => s.id));
  const [theme, setTheme] = useState("light");
  useRevealOnScroll();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={`bc-page bc-page--${theme}`}>
      <Navbar
        activeId={activeId}
        theme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      />
      <main className="bc-main">
        <Hero />
        <About />
        <Collections />
        <Lookbook />
        <Contact />
      </main>
      <footer className="bc-footer">
        <div className="bc-section-inner bc-footer-layout">
          <div className="bc-footer-brand">
            <span className="bc-footer-title">Black Croz</span>
            <span className="bc-footer-subtitle">
              Luxury streetwear for Kathmandu nights.
            </span>
            <span className="bc-footer-copy">
              © {new Date().getFullYear()} Black Croz, Kathmandu. All rights
              reserved.
            </span>
          </div>
          <div className="bc-footer-columns">
            <div className="bc-footer-column">
              <span className="bc-footer-heading">Navigate</span>
              <button
                type="button"
                className="bc-footer-link"
                onClick={() =>
                  document
                    .getElementById("collections")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Collections
              </button>
              <button
                type="button"
                className="bc-footer-link"
                onClick={() =>
                  document
                    .getElementById("lookbook")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Lookbook
              </button>
              <button
                type="button"
                className="bc-footer-link"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact
              </button>
            </div>
            <div className="bc-footer-column">
              <span className="bc-footer-heading">Connect</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="bc-footer-link"
              >
                Instagram @blackcroz
              </a>
              <a
                href="mailto:blackcroz@gmail.com"
                className="bc-footer-link"
              >
                blackcroz@gmail.com
              </a>
              <a href="tel:+9779765289135" className="bc-footer-link">
                +977 9765289135
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

