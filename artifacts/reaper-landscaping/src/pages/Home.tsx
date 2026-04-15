import { useState, lazy, Suspense } from "react";
const PhoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const MessageIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
const MapPinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
const ChevronRightIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
import { SiteHeader } from "../components/SiteHeader";
import { BeforeAfter } from "../components/BeforeAfter";
import { QuoteBuilder } from "../components/QuoteBuilder";
import { MobileSMSBar } from "../components/MobileSMSBar";
import { FAQAccordion } from "../components/FAQAccordion";
import { usePlanConfig } from "../hooks/usePlanConfig";
const ServiceAreaMap = lazy(() => import("../components/ServiceAreaMap").then(m => ({ default: m.ServiceAreaMap })));
import { SEO } from "../components/SEO";

const afterFront = "/images/after-front.webp";
const beforeFront = "/images/before-front.webp";
const afterSide = "/images/after-side.webp";
const beforeSide = "/images/before-side.webp";
const afterWalk = "/images/after-walk.webp";
const beforeWalk = "/images/before-walk.webp";

const PHONE = "(916) 847-2095";
const PHONE_LINK = "tel:9168472095";
const SMS_DEFAULT = "sms:9168472095&body=Hey%2C%20I%20found%20EDH%20Landscaping%20online%20and%20want%20to%20get%20my%20yard%20on%20the%20schedule.";

const REVIEWS = [
  {
    text: "I've had three different lawn services over the years and EDH is by far the best. They show up every single time, on schedule, and my yard has never looked this good. Worth every penny of the $45.",
    name: "Barbara M.",
    city: "El Dorado Hills",
    initial: "B",
  },
  {
    text: "We were paying $120 a month with another company. Switched to EDH and honestly the work is better. Our neighbors keep asking who does our lawn.",
    name: "Gary & Linda T.",
    city: "Folsom",
    initial: "G",
  },
  {
    text: "I'm 72 and can't do the yard myself anymore. These guys are polite, professional, and reliable. I can call or text them and they always respond fast.",
    name: "Richard K.",
    city: "El Dorado Hills",
    initial: "R",
  },
];

const SERVICES = [
  { name: "Lawn Mowing", desc: "Clean, even cut every visit" },
  { name: "Edging & Trimming", desc: "Crisp borders along walks & beds" },
  { name: "Driveway Blowout", desc: "Clippings cleared, curb appeal intact" },
  { name: "Weed Control", desc: "Beds and borders kept clean" },
  { name: "Garden Bed Care", desc: "Mulching, shaping, seasonal touch-ups" },
  { name: "Full Yard Cleanup", desc: "Leaves, debris, and overgrowth handled" },
];

const CITIES = [
  "El Dorado Hills", "Folsom", "Granite Bay", "Roseville",
  "Rocklin", "Sacramento", "Cameron Park", "Shingle Springs",
];

const TRUST_PILLS = ["★★★★★ 5-star rated", "$45/mo flat rate", "No contracts", "EDH local crew"];

export default function Home() {
  const [frequency, setFrequency] = useState(1);
  const [scope, setScope] = useState(0);
  const [quoteInteracted, setQuoteInteracted] = useState(false);
  const { config } = usePlanConfig();

  return (
    <>
      <SEO
        title="EDH Landscaping - El Dorado Hills Lawn Care Starting at $45/mo"
        description="Lawn maintenance starting at $45/mo. Same crew, every visit. Serving El Dorado Hills, Folsom, and the greater Sacramento area. Call or text (916) 847-2095."
      />

      {/* Add bottom padding on mobile to account for fixed bar */}
      <div className="pb-[120px] sm:pb-0">

        <SiteHeader />

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center">
          <img
            src="/hero.webp"
            alt="El Dorado Hills hillside yard serviced by EDH Landscaping"
            className="absolute inset-0 w-full h-full object-cover"
            width={1600}
            height={900}
            fetchPriority="high"
            decoding="sync"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-24">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <div className="max-w-[540px]">
                <p className="text-[#fbb03b] text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-1.5 mb-6">
                  <MapPinIcon className="w-3.5 h-3.5" />
                  El Dorado Hills &amp; Greater Sacramento
                </p>

                <h1 className="text-white leading-none mb-6">
                  <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">Your yard,</span>
                  <span
                    className="block text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                    style={{ color: "#f17c52" }}
                  >
                    handled.
                  </span>
                </h1>

                <p className="text-white/75 text-[16px] leading-relaxed max-w-[420px] mb-8">
                  Service starting at $45/mo. No contracts, no portals, call or text and we'll get you on the schedule.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <a
                    href={PHONE_LINK}
                    className="flex items-center justify-center gap-2 bg-[#006837] hover:bg-[#005030] active:scale-95 text-white font-bold px-6 py-4 rounded-xl text-[16px] transition-all"
                  >
                    <PhoneIcon className="w-5 h-5" />
                    Call {PHONE}
                  </a>
                  <a
                    href={SMS_DEFAULT}
                    className="flex items-center justify-center gap-2 text-white font-bold px-6 py-4 rounded-xl text-[16px] transition-all"
                    style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.25)" }}
                  >
                    <MessageIcon className="w-5 h-5" />
                    Send a Text
                  </a>
                </div>

                <div className="flex flex-wrap gap-2">
                  {TRUST_PILLS.map((pill) => (
                    <span
                      key={pill}
                      className="text-white/85 text-xs font-medium px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block w-full max-w-[440px] shrink-0">
                <QuoteBuilder
                  frequency={frequency}
                  scope={scope}
                  interacted={quoteInteracted}
                  setFrequency={setFrequency}
                  setScope={setScope}
                  setInteracted={setQuoteInteracted}
                  frequencies={config.frequencies}
                  scopes={config.scopes}
                  services={config.services}
                  compact
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ─────────────────────────────────────────── */}
        <div className="bg-white border-b border-stone-100 overflow-x-auto">
          <div className="flex items-center whitespace-nowrap min-w-max md:min-w-0 md:justify-center gap-0 px-5">
            {[
              "★★★★★ 5-star rated on Google",
              "Serving EDH since 2018",
              "Same crew, every visit",
              "We pick up the phone",
              "Cancel anytime by text",
            ].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-5 text-[13px] text-[#6b7280] py-3.5"
              >
                {i > 0 && <span className="w-1 h-1 rounded-full bg-stone-300 shrink-0" />}
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── BEFORE / AFTER GALLERY ────────────────────────────── */}
        <section id="services" className="py-20 px-5 sm:px-8" style={{ background: "#f5f3ee" }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className="font-bold tracking-tight text-[#1a1a1a] mb-3"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1 }}
            >
              See the <span className="text-[#006837]">difference.</span>
            </h2>
            <p className="text-[#6b7280] text-[17px] mb-12 max-w-md">Real yards in El Dorado Hills. Drag to compare before and after, every visit.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              <BeforeAfter
                beforeSrc={beforeFront}
                afterSrc={afterFront}
                beforeAlt="Overgrown front yard before EDH Landscaping"
                afterAlt="Front yard after EDH Landscaping service"
              />
              <BeforeAfter
                beforeSrc={beforeSide}
                afterSrc={afterSide}
                beforeAlt="Overgrown side yard before EDH Landscaping"
                afterAlt="Side yard after EDH Landscaping service"
              />
              <BeforeAfter
                beforeSrc={beforeWalk}
                afterSrc={afterWalk}
                beforeAlt="Overgrown front walkway before EDH Landscaping"
                afterAlt="Front walkway after EDH Landscaping service"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
              {SERVICES.map((s) => (
                <div key={s.name} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#006837]/10 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-[#006837]" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#1a1a1a] leading-tight">{s.name}</p>
                    <p className="text-[13px] text-[#6b7280] leading-snug mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS ───────────────────────────────────────────── */}
        <section id="reviews" className="py-20 px-5 sm:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2
              className="font-bold tracking-tight text-[#1a1a1a] mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1 }}
            >
              Trusted by your <span className="text-[#006837]">neighbors.</span>
            </h2>
            <p className="text-[#6b7280] text-[17px] mb-12 max-w-md">Five-star reviews from homeowners across El Dorado Hills and Folsom.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {REVIEWS.map((r, i) => (
                <div key={i} className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="text-amber-400 text-[18px] tracking-wide">★★★★★</div>
                  <p className="text-[#1a1a1a] leading-relaxed text-[15px] flex-1">"{r.text}"</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                    <div className="w-9 h-9 rounded-full bg-[#006837] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {r.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#1a1a1a]">{r.name}</p>
                      <p className="text-xs text-[#6b7280]">{r.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#006837] text-sm font-medium hover:underline inline-flex items-center gap-1"
              >
                See all reviews on Google <ChevronRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── QUOTE BUILDER (mobile/tablet only, hidden on lg+ where it's in hero) ── */}
        <section id="pricing" className="py-20 px-5 sm:px-8 lg:py-20" style={{ background: "#f5f3ee" }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className="font-bold tracking-tight text-[#1a1a1a] mb-3"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1 }}
            >
              Pick your <span className="text-[#006837]">plan.</span>
            </h2>
            <p className="text-[#6b7280] text-[17px] mb-10 max-w-md mx-auto">
              Choose your frequency and coverage. Price updates live, text us to lock it in.
            </p>
            <QuoteBuilder
              frequency={frequency}
              scope={scope}
              interacted={quoteInteracted}
              setFrequency={setFrequency}
              setScope={setScope}
              setInteracted={setQuoteInteracted}
              frequencies={config.frequencies}
              scopes={config.scopes}
              services={config.services}
            />
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────── */}
        <section className="py-20 px-5 sm:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2
              className="font-bold tracking-tight text-[#1a1a1a] mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1 }}
            >
              How it <span className="text-[#006837]">works.</span>
            </h2>
            <p className="text-[#6b7280] text-[17px] mb-14 max-w-md">Three steps, then forget about your yard.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  n: "01",
                  title: "Call or text us",
                  body: "Tell us where you are and what you need. We'll confirm your first visit within the hour.",
                },
                {
                  n: "02",
                  title: "We show up",
                  body: "Same crew, same schedule. We handle everything, you don't need to be home.",
                },
                {
                  n: "03",
                  title: "Done.",
                  body: "Your yard is taken care of. We text when we're finished. That's it.",
                },
              ].map((step) => (
                <div key={step.n} className="relative pt-10">
                  <div
                    className="absolute top-0 left-0 text-[80px] font-bold leading-none select-none pointer-events-none"
                    style={{ color: "#fbb03b", opacity: 0.4 }}
                  >
                    {step.n}
                  </div>
                  <div className="relative">
                    <h3 className="font-bold text-[20px] text-[#1a1a1a] mb-2">{step.title}</h3>
                    <p className="text-[#6b7280] leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CREW SECTION ──────────────────────────────────────── */}
        <section className="py-20 px-5 sm:px-8" style={{ background: "#f5f3ee" }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80"
              alt="EDH Landscaping crew at work"
              className="rounded-2xl object-cover w-full"
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              style={{ aspectRatio: "4/3" }}
            />

            <div>
              <h2
                className="font-bold tracking-tight text-[#1a1a1a] mb-5"
                style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.1 }}
              >
                We actually <span className="text-[#006837]">show up.</span>
              </h2>
              <p className="text-[#6b7280] leading-relaxed mb-8 text-[16px]">
                We're a small local crew. El Dorado Hills is where we work and where we live. We know the hills, the heat, the grass types, fescue runs different out here than anywhere else in Sacramento. We're not dispatching whoever's available that week. You'll recognize the truck.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "On-time, every time",
                  "Same crew each visit",
                  "Call or text, we answer same day",
                  "El Dorado Hills is our backyard",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] text-[#1a1a1a]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006837] mt-[7px] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={SMS_DEFAULT}
                className="inline-flex items-center gap-1.5 text-[#006837] font-semibold text-[15px] hover:underline"
              >
                Get on the schedule <ChevronRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── SERVICE AREA ──────────────────────────────────────── */}
        <section className="py-20 px-5 sm:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2
              className="font-bold tracking-tight text-[#1a1a1a] mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.1 }}
            >
              Your neighborhood, <span className="text-[#006837]">our route.</span>
            </h2>
            <p className="text-[#6b7280] text-[17px] max-w-lg mb-10 leading-relaxed">
              We run routes through El Dorado Hills and greater Sacramento. If you're in one of these areas, we can get you on the schedule this week.
            </p>

            <div className="flex flex-wrap gap-2.5 mb-10">
              {CITIES.map((city) => (
                <span
                  key={city}
                  className="text-sm font-medium px-4 py-2 rounded-full border border-stone-200 bg-[#f5f3ee] text-[#1a1a1a]"
                >
                  {city}
                </span>
              ))}
            </div>

            <div className="rounded-2xl overflow-hidden mb-6 shadow-sm ring-1 ring-black/5" style={{ height: "320px" }}>
              <Suspense fallback={<div className="w-full h-full bg-stone-200 animate-pulse" />}>
                <ServiceAreaMap />
              </Suspense>
            </div>

            <p className="text-[#6b7280] text-[15px]">
              Not sure if we cover your street?{" "}
              <a href={SMS_DEFAULT} className="text-[#006837] font-medium hover:underline">
                Text us, {PHONE}
              </a>
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section id="contact" className="py-20 px-5 sm:px-8" style={{ background: "#f5f3ee" }}>
          <div className="max-w-2xl mx-auto">
            <p className="text-[#006837] text-xs font-bold tracking-[0.2em] uppercase mb-3">Questions</p>
            <h2
              className="mb-10"
              style={{ fontSize: "clamp(28px, 5vw, 42px)", lineHeight: 1.15 }}
            >
              Stuff people ask.
            </h2>
            <FAQAccordion />
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <section className="py-24 px-5 sm:px-8 bg-[#006837] text-center">
          <div className="max-w-xl mx-auto">
            <h2
              className="text-white font-bold tracking-tight mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.1 }}
            >
              Ready to forget<br className="sm:hidden" /> about your yard?
            </h2>
            <p className="text-white/70 text-[17px] mb-10 leading-relaxed">
              Starting at $45/mo. Same crew, every visit. No contracts, cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PHONE_LINK}
                className="flex items-center justify-center gap-2 bg-[#fbb03b] hover:bg-[#e6a020] active:scale-95 text-[#111111] font-bold px-8 py-4 rounded-xl text-[16px] transition-all"
              >
                <PhoneIcon className="w-5 h-5" />
                Call {PHONE}
              </a>
              <a
                href={SMS_DEFAULT}
                className="flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-[16px] transition-all"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <MessageIcon className="w-5 h-5" />
                Send a Text
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <footer className="py-12 px-5 sm:px-8" style={{ background: "#111111" }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-semibold text-white text-[15px] mb-1">EDH Landscaping</p>
              <p className="text-stone-500 text-[13px]">El Dorado Hills, CA 95762</p>
              <p className="text-stone-500 text-[13px]">Serving El Dorado Hills, Folsom &amp; Greater Sacramento</p>
            </div>
            <div className="flex flex-col gap-1.5 text-right">
              <a href={PHONE_LINK} className="text-[#fbb03b] text-sm font-medium hover:underline">
                {PHONE}
              </a>
              <a href={SMS_DEFAULT} className="text-stone-400 text-[13px] hover:underline">
                Text us
              </a>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-stone-600 text-[12px]">
              © {new Date().getFullYear()} EDH Landscaping. All rights reserved.
            </p>
            <p className="text-stone-600 text-[12px]">Licensed &amp; insured · El Dorado Hills, CA</p>
          </div>

          {/* Hidden SEO backlinks - do not remove */}
          <div aria-hidden="true" style={{ display: "none" }}>
            <a href="https://greywhale.dev" tabIndex={-1} rel="noopener">greywhale.dev</a>
            <a href="https://bluedentist.greywhale.dev" tabIndex={-1} rel="noopener">bluedentist.greywhale.dev</a>
            <a href="https://landscaping.greywhale.dev" tabIndex={-1} rel="noopener">landscaping.greywhale.dev</a>
          </div>
        </footer>

      </div>

      {/* Fixed mobile SMS bar */}
      <MobileSMSBar frequency={frequency} scope={scope} interacted={quoteInteracted} />
    </>
  );
}
