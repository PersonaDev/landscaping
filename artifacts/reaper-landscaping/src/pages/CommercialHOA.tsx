import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Phone, Check } from "lucide-react";
import { track } from "@vercel/analytics";
import { SEO } from "../components/SEO";
import "./refresh.css";

const serviceAreas = [
  "El Dorado Hills",
  "Folsom",
  "Granite Bay",
  "Roseville",
  "Rocklin",
  "Sacramento",
  "Cameron Park",
  "Shingle Springs",
];

export default function CommercialHOA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [separator, setSeparator] = useState("?");
  useEffect(() => {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) setSeparator("&");
  }, []);
  function requestQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const propertyType = String(fields.get("propertyType"));
    const body = `Hi EDH Landscaping, I'd like to request a property walkthrough and proposal for a ${propertyType}. Property: ${fields.get("address")}. Service timing: ${fields.get("schedule") || "Please advise"}. Priorities: ${fields.get("needs") || "Please discuss with me"}.`;
    track("Commercial proposal started", { propertyType });
    window.location.href = `sms:9168472095${separator}body=${encodeURIComponent(body)}`;
  }
  return (
    <div className="edh-refresh commercial-page">
      <SEO
        title="Commercial Landscaping & HOA Maintenance | El Dorado Hills"
        description="Commercial landscape maintenance for businesses, HOA common areas, and managed communities in El Dorado Hills and Greater Sacramento. Request a property walkthrough and custom proposal."
        path="/commercial-hoa"
        image="/images/commercial-grounds-hero.jpg"
        service={{
          name: "Commercial landscaping and HOA grounds maintenance",
          description:
            "Property-specific grounds maintenance for commercial properties, HOA common areas, and managed communities in El Dorado Hills and nearby communities.",
          serviceTypes: [
            "Commercial landscape maintenance",
            "HOA common-area landscape maintenance",
            "Lawn mowing and edging",
            "Garden bed and shrub care",
            "Seasonal landscape cleanup",
          ],
        }}
      />
      <a className="refresh-skip" href="#main">
        Skip to content
      </a>
      <header
        className="refresh-header"
        onKeyDown={(e) => {
          if (e.key === "Escape") setMenuOpen(false);
        }}
      >
        <a className="refresh-brand" href="/" aria-label="EDH Landscaping home">
          <img src="/logo.svg" width="56" height="38" alt="EDH" />
          <span>Landscaping</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="/">Residential</a>
          <a href="#property-services">Services</a>
          <a href="#property-areas">Service areas</a>
          <a href="#property-faq">FAQs</a>
        </nav>
        <button
          className="refresh-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="property-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        {menuOpen && (
          <nav
            className="refresh-mobile-menu"
            id="property-menu"
            aria-label="Mobile navigation"
          >
            {[
              ["#property-quote", "Property quote"],
              ["#property-services", "Services"],
              ["#property-areas", "Service areas"],
              ["#property-faq", "FAQs"],
              ["/", "Residential lawn care"],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowRight size={18} />
              </a>
            ))}
          </nav>
        )}
        <a className="refresh-button small" href="#property-quote">
          Property quote <ArrowRight size={17} />
        </a>
      </header>
      <main id="main">
        <section className="property-hero">
          <img
            className="property-hero-image"
            src="/images/commercial-grounds-hero.jpg"
            alt=""
            width="1600"
            height="901"
            fetchPriority="high"
          />
          <div className="property-hero-copy">
            <h1>Commercial landscaping that stays presentation-ready.</h1>
            <p>
              One clear scope for your grounds, schedule, and priorities.
            </p>
            <div className="property-types">
              <span>Business properties</span>
              <span>HOA common areas</span>
              <span>Managed communities</span>
            </div>
            <a
              className="refresh-text-link"
              href="tel:+19168472095"
              onClick={() => track("Commercial phone call", { location: "hero" })}
            >
              <Phone size={18} /> (916) 847-2095
            </a>
          </div>
          <form
            id="property-quote"
            className="property-form"
            onSubmit={requestQuote}
          >
            <h2>Request a walkthrough</h2>
            <p className="property-form-intro">
              Start with the property. We’ll use the details to discuss fit and
              next steps.
            </p>
            <label>
              Property type
              <select name="propertyType" defaultValue="commercial property">
                <option value="commercial property">Commercial property</option>
                <option value="HOA common-area">
                  HOA / community association
                </option>
                <option value="managed community">Managed community</option>
              </select>
            </label>
            <label>
              Property address
              <input
                name="address"
                autoComplete="street-address"
                placeholder="Street address and city"
                required
                maxLength={250}
              />
            </label>
            <label>
              Service need
              <select
                name="schedule"
                defaultValue="Ongoing maintenance"
              >
                <option>Ongoing maintenance</option>
                <option>Replace a current provider</option>
                <option>New property or new contract</option>
                <option>One-time cleanup or enhancement</option>
              </select>
            </label>
            <label>
              What needs care? <span>(optional)</span>
              <textarea
                name="needs"
                rows={2}
                maxLength={800}
                placeholder="Lawns, shared spaces, garden beds…"
              />
            </label>
            <button className="refresh-button" type="submit">
              Send details by text <ArrowRight size={18} />
            </button>
            <p className="property-form-note">
              Opens a prefilled text for you to review and send.
              <br />
              No commitment. Commercial pricing is property-specific.
            </p>
            <a className="refresh-text-link" href="tel:+19168472095">
              Prefer to call? (916) 847-2095
            </a>
          </form>
        </section>
        <section className="refresh-section" id="property-services">
            <h2>A practical scope for managed grounds.</h2>
          <div className="property-service-grid">
            {[
              [
                "Lawn maintenance",
                "Mowing, edging, and clearing clippings from walkways.",
              ],
              [
                "Beds & borders",
                "Weed control, garden bed care, and shrub trimming.",
              ],
              [
                "Seasonal cleanup",
                "Leaves, overgrowth, and yard debris. Scope confirmed before scheduling.",
              ],
              [
                "Irrigation support",
                "Ask about sprinkler and drip checks, repairs, and water-conscious adjustments.",
              ],
            ].map(([title, copy]) => (
              <article key={title}>
                <Check size={22} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="property-process refresh-section">
          <h2>A proposal path built for decision-makers.</h2>
          <ol>
            <li>
              <strong>1. Send the property</strong>
              <p>
                Share the address, areas to maintain, and access requirements.
              </p>
            </li>
            <li>
              <strong>2. Walk through the scope</strong>
              <p>
                Align on service frequency, priorities, access, and any site
                review needed.
              </p>
            </li>
            <li>
              <strong>3. Review the proposal</strong>
              <p>
                Review pricing, scope, and availability before making a
                decision.
              </p>
            </li>
          </ol>
        </section>
        <section className="refresh-local" id="property-areas">
          <div>
            <h2>Local service. Property-specific care.</h2>
            <p>
              Serving El Dorado Hills and nearby communities. Confirm
              availability for your address.
            </p>
            <a className="refresh-button light" href="#property-quote">
              Request a walkthrough <ArrowRight size={18} />
            </a>
          </div>
          <div className="refresh-cities">
            {serviceAreas.map((city) => (
              <span key={city}>{city}</span>
            ))}
          </div>
        </section>
        <section className="refresh-section property-faq" id="property-faq">
          <h2>Property manager FAQs</h2>
          <details>
            <summary>Does the residential calculator apply?</summary>
            <p>
              No. Commercial and HOA properties receive a custom quote based on
              their scope, size, service frequency, and access needs.
              Residential promotional pricing does not apply.
            </p>
          </details>
          <details>
            <summary>Can you maintain HOA common areas?</summary>
            <p>
              Ask about shared lawns, garden beds, borders, and walkways. We’ll
              confirm which areas and services can be included in your
              property’s plan.
            </p>
          </details>
          <details>
            <summary>What should I send for a quote?</summary>
            <p>
              The property address, the areas needing care, and your preferred
              schedule. Photos, access instructions, and your association’s
              maintenance requirements help define the scope.
            </p>
          </details>
          <details>
            <summary>Can I request a one-time cleanup?</summary>
            <p>
              Yes. Send the details. Cleanup scope and availability are confirmed
              before scheduling.
            </p>
          </details>
        </section>
        <section className="property-final">
          <h2>Ready for a clearer maintenance plan?</h2>
          <a className="refresh-button" href="#property-quote">
            Request a walkthrough <ArrowRight size={18} />
          </a>
        </section>
      </main>
      <footer className="refresh-footer">
        <div>
          <a className="refresh-brand" href="/">
            EDH Landscaping
          </a>
          <address>El Dorado Hills, CA 95762</address>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/">Residential lawn care</a>
          <a href="/services">All services</a>
          <a href="/blog">Articles</a>
          <a href="tel:+19168472095">(916) 847-2095</a>
        </nav>
        <p>© {new Date().getFullYear()} EDH Landscaping</p>
      </footer>
      <div className="refresh-mobile-bar">
        <a href="tel:+19168472095">
          <Phone size={18} /> Call
        </a>
        <a href="#property-quote">
          Property quote <ArrowRight size={18} />
        </a>
      </div>
    </div>
  );
}
