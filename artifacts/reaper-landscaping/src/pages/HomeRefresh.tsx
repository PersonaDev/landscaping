import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Phone,
  MessageCircle,
  Leaf,
  Scissors,
  Sprout,
} from "lucide-react";
import { SEO } from "../components/SEO";
import { BeforeAfter } from "../components/BeforeAfter";
import { FAQAccordion } from "../components/FAQAccordion";
import { QuoteBuilder } from "../components/QuoteBuilder";
import { ClientOnly } from "../components/ClientOnly";
import { usePlanConfig } from "../hooks/usePlanConfig";
import { calcPrice } from "../lib/quote";
import "./refresh.css";

const ServiceAreaMap = lazy(() =>
  import("../components/ServiceAreaMap").then((module) => ({
    default: module.ServiceAreaMap,
  })),
);

const cities = [
  "El Dorado Hills",
  "Folsom",
  "Granite Bay",
  "Roseville",
  "Rocklin",
  "Sacramento",
  "Cameron Park",
  "Shingle Springs",
];
const phone = "tel:+19168472095";

export default function HomeRefresh() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [frequency, setFrequency] = useState(0);
  const [scope, setScope] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const { config } = usePlanConfig();
  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);
  const mobilePrice = calcPrice(
    frequency,
    scope,
    config.frequencies,
    config.scopes,
  );
  const mobileFirstMonth = Math.floor(mobilePrice * 0.9);
  const mobilePlan = `${config.scopes[scope]?.text || "basic"} ${config.frequencies[frequency]?.text || "monthly"}`;
  const mobileMessage = `Hey, I'm interested in the ${mobilePlan} plan ($${mobileFirstMonth} for the first month with 10% off, then $${mobilePrice}/mo). Can you confirm my quote and availability?`;
  const mobileSmsHref = `sms:9168472095${isIOS ? "&" : "?"}body=${encodeURIComponent(mobileMessage)}`;
  return (
    <div className="edh-refresh">
      <SEO
        title="EDH Landscaping | El Dorado Hills Lawn Care From $45/mo"
        description="Lawn care and yard maintenance in El Dorado Hills, Folsom, and nearby communities. Explore plans, see our work, and call or text for a quote."
        includeFaq
      />
      <a className="refresh-skip" href="#main">
        Skip to content
      </a>
      <header
        className="refresh-header"
        onKeyDown={(event) => {
          if (event.key === "Escape") setMenuOpen(false);
        }}
      >
        <a className="refresh-brand" href="/" aria-label="EDH Landscaping home">
          <img src="/logo.svg" width="56" height="38" alt="EDH" />
          <span>Landscaping</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#services">Our services</a>
          <a href="/commercial-hoa">Commercial & HOA</a>
          <a href="#work">Our work</a>
          <a href="#pricing">Your plan</a>
          <a href="/blog">Articles</a>
        </nav>
        <button
          className="refresh-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        {menuOpen && (
          <nav
            className="refresh-mobile-menu"
            id="mobile-menu"
            aria-label="Mobile navigation"
          >
            {[
              ["#pricing", "Get a quote"],
              ["#services", "Services"],
              ["/commercial-hoa", "Commercial & HOA"],
              ["#work", "Our work"],
              ["#areas", "Service areas"],
              ["#contact", "FAQs"],
              ["/blog", "Articles"],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowRight size={18} />
              </a>
            ))}
          </nav>
        )}
        <a className="refresh-button small" href="#pricing">
          Get a quote <ArrowUpRight size={17} />
        </a>
      </header>
      <main id="main">
        <section className="refresh-hero refresh-conversion-hero">
          <img
            className="refresh-hero-background"
            src="/images/before-front.webp"
            alt=""
            width="800"
            height="600"
            fetchPriority="high"
          />
          <div className="refresh-hero-copy">
            <h1>
              El Dorado Hills
              <br />
              lawn care.
            </h1>
            <p className="refresh-intro">
              Choose your plan. Text us. We’ll handle the yard.
            </p>
            <div className="refresh-hero-offer">
              <strong>10% off your first month.</strong>
            </div>
            <div className="refresh-reassurance">
              <span>
                <Check size={16} /> No contracts
              </span>
              <span>
                <Check size={16} /> No upfront payment
              </span>
              <span>
                <Check size={16} /> Local service
              </span>
            </div>
            <a className="refresh-text-link" href={phone}>
              <Phone size={18} /> Call (916) 847-2095
            </a>
          </div>
          <div className="refresh-quote" id="pricing">
            <QuoteBuilder
              compact
              introductoryDiscount={0.1}
              frequency={frequency}
              scope={scope}
              interacted={interacted}
              setFrequency={setFrequency}
              setScope={setScope}
              setInteracted={setInteracted}
              frequencies={config.frequencies}
              scopes={config.scopes}
              services={config.services}
            />
            <a className="refresh-property-link" href="/commercial-hoa">
              Commercial or HOA? Get a property quote →
            </a>
          </div>
        </section>

        <section className="refresh-section" id="services">
          <div className="refresh-section-heading">
            <div>
              <h2>Our services</h2>
            </div>
            <div>
              <a className="refresh-text-link" href="/services">
                Explore all services <ArrowRight size={19} />
              </a>
            </div>
          </div>
          <div className="refresh-service-grid">
            {[
              {
                icon: Scissors,
                title: "Lawn mowing & edging.",
                label: "LAWN MOWING & EDGING",
                copy: "Mowed lawns. Clean edges.",
                image: "before-front",
              },
              {
                icon: Sprout,
                title: "Garden bed care.",
                label: "BEDS, WEEDS & TRIMMING",
                copy: "Weeding, trimming, and bed care.",
                image: "before-side",
              },
              {
                icon: Leaf,
                title: "Seasonal yard cleanup.",
                label: "SEASONAL YARD CLEANUP",
                copy: "Clear leaves and overgrowth. Ask for availability.",
                image: "before-walk",
              },
            ].map((service) => (
              <article className="refresh-service" key={service.label}>
                <div className="refresh-service-image">
                  <img
                    src={`/images/${service.image}.webp`}
                    alt={service.label.toLowerCase()}
                    width="640"
                    height="480"
                    loading="lazy"
                  />
                </div>
                <div className="refresh-service-body">
                  <service.icon size={25} />
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <a
                    href="#pricing"
                    aria-label={`Ask about ${service.label.toLowerCase()}`}
                  >
                    Get a quote <ArrowUpRight size={18} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="refresh-commercial refresh-section" id="commercial">
          <div>
            <h2>Commercial & HOA</h2>
            <p>Grounds care for business properties and shared spaces.</p>
          </div>
          <a className="refresh-button" href="/commercial-hoa">
            Explore property services <ArrowUpRight size={18} />
          </a>
        </section>
        <section className="refresh-work" id="work">
          <div className="refresh-section-heading">
            <div>
              <h2>Before & after</h2>
            </div>
            <p>Drag to compare.</p>
          </div>
          <div className="refresh-work-grid">
            {["front", "side", "walk"].map((yard, i) => (
              <figure key={yard}>
                <BeforeAfter
                  // Legacy filenames are reversed: before-* contains the maintained yard.
                  beforeSrc={`/images/after-${yard}.webp`}
                  afterSrc={`/images/before-${yard}.webp`}
                  beforeAlt={`Yard ${i + 1} before maintenance`}
                  afterAlt={`Yard ${i + 1} after maintenance`}
                />
                <figcaption>
                  <span>
                    0{i + 1} / {["Front yard", "Side yard", "Walkway"][i]}
                  </span>
                  <span>Yard maintenance ↗</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <section className="refresh-local" id="areas">
          <div className="refresh-area-copy">
            <h2>Areas we serve</h2>
            <p>El Dorado Hills and nearby communities.</p>
            <a className="refresh-button light" href={phone}>
              Check my service area <ArrowUpRight size={19} />
            </a>
            <div className="refresh-cities">
              {cities.map((city, i) => (
                <span key={city}>
                  <small>0{i + 1}</small>
                  {city}
                </span>
              ))}
            </div>
          </div>
          <div className="refresh-map-shell" aria-label="Map of the EDH Landscaping service area">
            <ClientOnly fallback={<div className="refresh-map-loading" />}>
              <Suspense fallback={<div className="refresh-map-loading" />}>
                <ServiceAreaMap />
              </Suspense>
            </ClientOnly>
          </div>
        </section>
        <section className="refresh-section refresh-faq" id="contact">
          <div>
            <h2>Questions?</h2>
          </div>
          <FAQAccordion />
        </section>
        <section className="refresh-notes">
          <div>
            <h2>Articles</h2>

            <a className="refresh-text-link" href="/blog">
              Read lawn care articles <ArrowRight size={18} />
            </a>
          </div>
          <div className="refresh-google">
            <span className="refresh-google-symbol" aria-hidden="true">
              G
            </span>
            <h3>Keep EDH close.</h3>

            <a
              className="refresh-button outline"
              href="https://www.google.com/preferences/source?q=www.edhlandscaping.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add as a preferred source <ArrowUpRight size={17} />
            </a>
            <small>
              Your personal Google preference. Availability depends on Google.
            </small>
          </div>
        </section>
      </main>
      <footer className="refresh-footer">
        <div>
          <a className="refresh-brand" href="/">
            EDH <span>Landscaping</span>
          </a>
          <address>
            El Dorado Hills, CA 95762
            <br />
            Serving El Dorado Hills & Greater Sacramento
          </address>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/services">Services</a>
          <a href="/commercial-hoa">Commercial & HOA</a>
          <a href="/testimonials">Customer stories</a>
            <a href="/blog">Articles</a>
          <a href={phone}>(916) 847-2095</a>
        </nav>
        <p>© {new Date().getFullYear()} EDH Landscaping</p>
      </footer>
      <div className="refresh-mobile-bar">
        <a href={phone}>
          <Phone size={18} /> Call
        </a>
        <a
          href={mobileSmsHref}
          aria-label={`Text us about the ${mobilePlan} plan and claim 10% off`}
        >
          <MessageCircle size={18} /> Claim 10% off
        </a>
      </div>
    </div>
  );
}
