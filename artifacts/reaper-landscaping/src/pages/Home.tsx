import { motion } from "framer-motion";
import {
  Phone,
  MessageSquare,
  Star,
  CheckCircle2,
  MapPin,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { SEO } from "@/components/SEO";

const PHONE_NUMBER = "(916) 847-2095";
const PHONE_LINK = "tel:9168472095";
const SMS_LINK = "sms:9168472095";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.38, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const TESTIMONIALS = [
  {
    name: "Barbara M.",
    location: "El Dorado Hills",
    stars: 5,
    text: "I've had three different lawn services over the years and Reaper is by far the best. They show up every single time, on schedule, and my yard has never looked this good. Worth every penny of the $60.",
    elevated: false,
  },
  {
    name: "Gary & Linda T.",
    location: "Folsom",
    stars: 5,
    text: "We were paying $120 a month with another company. Switched to Reaper and honestly the work is better. Our neighbors keep asking who does our lawn.",
    elevated: true,
  },
  {
    name: "Richard K.",
    location: "El Dorado Hills",
    stars: 5,
    text: "I'm 72 and can't do the yard myself anymore. These guys are polite, professional, and reliable. I can call or text them and they always respond fast.",
    elevated: false,
  },
];

const SERVICES = [
  {
    num: "01",
    name: "Lawn Mowing",
    detail: "We cut fescue at 3.5 inches — the right height for Sacramento Valley summers to keep roots cool and growth steady.",
  },
  {
    num: "02",
    name: "Edging & Trimming",
    detail: "Crisp lines along every walkway, driveway, and garden bed. We use a stick edger, not just a trimmer.",
  },
  {
    num: "03",
    name: "Blowout & Cleanup",
    detail: "Every visit ends with a full blowdown of your driveways and walkways — clippings cleared, nothing left behind.",
  },
  {
    num: "04",
    name: "Yard Cleanup",
    detail: "Seasonal debris, leaves, and cuttings hauled off on request. We leave it looking like we were never there.",
  },
  {
    num: "05",
    name: "Weed Control",
    detail: "Hand-pull from beds, spray where appropriate. We check borders every visit so small problems don't become big ones.",
  },
  {
    num: "06",
    name: "Garden Bed Care",
    detail: "Shrub shaping and mulch refresh available on request — ask when you call and we'll work it into your route.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

export default function Home() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-white text-[#1a1208] md:pb-0 pb-24 font-sans">
      <SEO />

      {/* ── HEADER ── */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
            aria-label="Back to top"
          >
            <div className="bg-green-700 p-2 rounded-lg group-hover:bg-green-800 transition-colors">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[18px] tracking-tight text-stone-900">Reaper Landscaping</span>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-stone-500">
            {["services", "pricing", "reviews", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="capitalize hover:text-green-700 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-green-700 after:transition-all hover:after:w-full"
              >
                {id}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={PHONE_LINK}
              className="btn-press flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            <a
              href={SMS_LINK}
              className="btn-press flex items-center gap-2 text-green-700 border-2 border-green-700 hover:bg-green-50 font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Text
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[92vh] flex items-end grain-overlay overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80"
              alt="Lush green garden"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-stone-950/80 via-stone-950/60 to-green-950/50" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 pt-32">
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="max-w-3xl"
            >
              <motion.div variants={fadeUp} className="mb-5">
                <span className="inline-flex items-center gap-2 text-green-300 text-sm font-semibold tracking-widest uppercase">
                  <MapPin className="w-3.5 h-3.5" />
                  El Dorado Hills & greater Sacramento
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-[clamp(2.8rem,7vw,5.5rem)] font-serif font-bold text-white leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontVariationSettings: '"opsz" 72' }}
              >
                Your lawn,<br />
                <em className="font-light italic text-green-300 not-italic" style={{ fontStyle: "italic" }}>
                  taken care of.
                </em>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-[1.2rem] text-stone-300 mb-10 max-w-xl leading-[1.7] font-light"
              >
                Bi-weekly backyard cuts starting at $60/mo. No contracts, no complicated portals — just call or text and we'll get you on the route.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <a
                  href={PHONE_LINK}
                  className="btn-press flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-green-900/40 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call {PHONE_NUMBER}
                </a>
                <a
                  href={SMS_LINK}
                  className="btn-press flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  Send a Text
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom stat strip — inset into hero bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/10 backdrop-blur-md border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-x-10 gap-y-2 text-white/90 text-sm font-medium">
              <span className="flex items-center gap-2"><span className="text-amber-400">★★★★★</span> 5-star rated</span>
              <span className="text-white/30 hidden sm:block">·</span>
              <span>$60/mo flat rate</span>
              <span className="text-white/30 hidden sm:block">·</span>
              <span>No contracts</span>
              <span className="text-white/30 hidden sm:block">·</span>
              <span>El Dorado Hills local</span>
            </div>
          </div>
        </section>

        {/* ── PULL QUOTE ── */}
        <FadeUp>
          <section className="py-20 bg-[#f7f3ee]">
            <div className="max-w-4xl mx-auto px-6">
              <blockquote className="relative">
                <span className="absolute -top-4 -left-2 text-[8rem] leading-none font-serif text-green-100 select-none" aria-hidden="true">"</span>
                <p className="relative z-10 text-[clamp(1.3rem,2.5vw,1.75rem)] font-serif font-light italic text-stone-700 leading-[1.55]">
                  We were paying $120 a month with another company. Switched to Reaper and honestly the work is better. Our neighbors keep asking who does our lawn.
                </p>
                <footer className="mt-6 flex items-center gap-4 not-italic">
                  <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm">G</div>
                  <div>
                    <div className="font-semibold text-stone-900 text-sm">Gary & Linda T.</div>
                    <div className="text-stone-400 text-xs">Folsom, CA</div>
                  </div>
                  <Stars count={5} />
                </footer>
              </blockquote>
            </div>
          </section>
        </FadeUp>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-24 bg-white clip-diagonal relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">

              <FadeUp delay={0}>
                <div className="pt-2">
                  <p className="text-xs font-bold tracking-[0.18em] uppercase text-green-700 mb-4">Pricing</p>
                  <h2 className="text-[clamp(2rem,4vw,3rem)] font-serif font-bold text-stone-900 leading-[1.1] mb-6" style={{ fontVariationSettings: '"opsz" 48' }}>
                    One plan.<br />One price.<br />No surprises.
                  </h2>
                  <p className="text-stone-500 text-lg leading-relaxed mb-8">
                    We cut your backyard twice a month, edge the borders, blow the walks clean, and leave. That's it. No add-on fees, no "seasonal adjustment" invoices.
                  </p>

                  <ul className="space-y-3 mb-10">
                    {[
                      "2 visits per month, consistent schedule",
                      "Precision edging along all walkways",
                      "Full blowout after every cut",
                      "Cancel anytime — text us and it's done",
                      "Call or text to pay, no portal required",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-stone-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-stone-400 text-sm italic">
                    Larger property or custom work? Call and we'll figure it out.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="relative">
                  {/* Decorative offset shadow */}
                  <div className="absolute inset-0 translate-x-3 translate-y-3 bg-green-900/20 rounded-3xl" aria-hidden="true" />
                  <div className="relative bg-green-800 rounded-3xl p-10 text-white overflow-hidden grain-overlay">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-green-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" aria-hidden="true" />
                    <div className="relative z-10">
                      <p className="text-green-300 text-xs font-bold tracking-[0.16em] uppercase mb-4">Standard Plan</p>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-[5rem] font-black leading-none tracking-tight">$60</span>
                        <span className="text-green-300 text-xl">/mo</span>
                      </div>
                      <p className="text-green-200 text-lg mb-8">Bi-weekly backyard cuts</p>

                      <div className="border-t border-green-700/60 pt-8 space-y-4 mb-10">
                        {[
                          "2 cuts per month",
                          "Precision edging every visit",
                          "Driveway & walkway blowout",
                          "Satisfaction guaranteed",
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="w-4.5 h-4.5 text-green-400 shrink-0" />
                            <span className="text-green-50 text-[15px]">{item}</span>
                          </div>
                        ))}
                      </div>

                      <a
                        href={PHONE_LINK}
                        className="btn-press flex items-center justify-center gap-2 w-full bg-white text-green-900 hover:bg-stone-100 font-bold text-lg py-4 rounded-xl shadow-md transition-colors"
                      >
                        Call to Get on the Route
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>

            </div>
          </div>
        </section>

        {/* ── SERVICES ── (editorial list layout — kills the icon grid) */}
        <section id="services" className="py-24 bg-[#f7f3ee]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">

              {/* Left: label + headline */}
              <FadeUp className="md:sticky md:top-28">
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] uppercase text-green-700 mb-4">What we do</p>
                  <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-serif font-bold text-stone-900 leading-[1.1] mb-6" style={{ fontVariationSettings: '"opsz" 48' }}>
                    Every yard,<br />done right.
                  </h2>
                  <p className="text-stone-500 leading-relaxed mb-8">
                    We're not a franchise operation. We're a small local crew that pays attention to your specific property — the same team, the same schedule, every time.
                  </p>
                  <a
                    href={PHONE_LINK}
                    className="btn-press inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg text-[15px] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Ask About Your Yard
                  </a>
                </div>
              </FadeUp>

              {/* Right: numbered service list */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={stagger}
                className="space-y-0"
              >
                {SERVICES.map((s, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="border-t border-stone-200 py-8 grid grid-cols-[56px_1fr] gap-6 group"
                  >
                    <span className="text-[13px] font-bold text-stone-300 tracking-widest pt-1">{s.num}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-stone-900 mb-2 group-hover:text-green-700 transition-colors">{s.name}</h3>
                      <p className="text-stone-500 leading-relaxed">{s.detail}</p>
                    </div>
                  </motion.div>
                ))}
                <div className="border-t border-stone-200" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── (staggered, not uniform grid) */}
        <section id="reviews" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp className="mb-16">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-green-700 mb-3">Reviews</p>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-serif font-bold text-stone-900 leading-[1.1]" style={{ fontVariationSettings: '"opsz" 48' }}>
                What the neighbors say.
              </h2>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-start">
              {TESTIMONIALS.map((t, idx) => (
                <FadeUp key={idx} delay={idx * 0.09}>
                  <div
                    className={`bg-white rounded-2xl p-8 border border-stone-100 flex flex-col transition-shadow hover:shadow-lg ${
                      t.elevated
                        ? "md:-translate-y-6 shadow-xl shadow-stone-200/60 border-stone-200"
                        : "shadow-md shadow-stone-100/80"
                    }`}
                  >
                    <Stars count={t.stars} />
                    <p className="text-stone-600 leading-relaxed mt-5 mb-8 flex-grow text-[15px]">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-stone-900 text-sm">{t.name}</div>
                        <div className="text-stone-400 text-xs">{t.location}</div>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── (dark panel + white panel, no uniform icon list) */}
        <section className="bg-[#f7f3ee] py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">

              <FadeUp>
                <div className="bg-green-900 p-12 md:p-16 text-white h-full grain-overlay relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-700/20 rounded-full blur-3xl" aria-hidden="true" />
                  <div className="relative z-10">
                    <p className="text-green-400 text-xs font-bold tracking-[0.18em] uppercase mb-4">Why Reaper</p>
                    <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-serif font-bold leading-[1.15] mb-10" style={{ fontVariationSettings: '"opsz" 36' }}>
                      We actually show up.
                    </h2>
                    <div className="space-y-8">
                      {[
                        {
                          title: "On-time, every time",
                          desc: "We hear it constantly — other guys flake. We don't. Your yard gets cut on the day we said it would.",
                        },
                        {
                          title: "The same crew, not a stranger",
                          desc: "You'll recognize the truck. We're not dispatching whoever's available that week.",
                        },
                        {
                          title: "Call or text — we answer",
                          desc: "No ticket system, no customer portal. Just our number. We respond the same day.",
                        },
                        {
                          title: "El Dorado Hills is our backyard",
                          desc: "We live here. We know the hills, the heat, the grass types. This isn't a remote operation.",
                        },
                      ].map((item, i) => (
                        <div key={i} className="border-l-2 border-green-700 pl-5">
                          <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                          <p className="text-green-200/80 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="bg-white p-12 md:p-16 flex flex-col justify-center h-full">
                  <p className="text-xs font-bold tracking-[0.18em] uppercase text-green-700 mb-4">Get started</p>
                  <h3 className="text-[clamp(1.6rem,3vw,2.2rem)] font-serif font-bold text-stone-900 mb-4 leading-[1.2]">
                    Ready to hand it off?
                  </h3>
                  <p className="text-stone-500 leading-relaxed mb-10">
                    We'll get you on the schedule this week. Give us a call or send a text — we'll confirm your spot and you're done.
                  </p>
                  <div className="space-y-4">
                    <a
                      href={PHONE_LINK}
                      className="btn-press flex items-center justify-center gap-2 w-full bg-green-700 hover:bg-green-800 text-white font-bold text-lg py-4 rounded-xl shadow-md transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Call {PHONE_NUMBER}
                    </a>
                    <a
                      href={SMS_LINK}
                      className="btn-press flex items-center justify-center gap-2 w-full text-green-700 border-2 border-green-700 hover:bg-green-50 font-bold text-lg py-4 rounded-xl transition-colors"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Send a Text
                    </a>
                  </div>
                </div>
              </FadeUp>

            </div>
          </div>
        </section>

        {/* ── SERVICE AREAS ── */}
        <FadeUp>
          <section className="py-16 bg-white border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-stone-400 mb-5 text-center">Areas we serve</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "El Dorado Hills",
                  "Folsom",
                  "Granite Bay",
                  "Roseville",
                  "Rocklin",
                  "Sacramento",
                  "El Dorado County",
                ].map((city) => (
                  <span
                    key={city}
                    className="text-stone-600 font-medium px-5 py-2 rounded-full border border-stone-200 text-[14px] bg-stone-50"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ── CONTACT CTA ── */}
        <section id="contact" className="relative py-28 bg-green-800 text-white overflow-hidden grain-overlay">
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} aria-hidden="true" />

          <FadeUp className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-green-400 text-xs font-bold tracking-[0.18em] uppercase mb-5">Contact</p>
            <h2
              className="text-[clamp(2.2rem,6vw,4.5rem)] font-serif font-bold leading-[1.05] mb-4"
              style={{ fontVariationSettings: '"opsz" 72' }}
            >
              Skip the form.<br />
              <em className="italic font-light">Just call.</em>
            </h2>
            <p className="text-green-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              We pick up. If we miss you, we call back same day. No automated systems, no hold music — just us.
            </p>

            <a
              href={PHONE_LINK}
              className="btn-press block text-[clamp(2.5rem,8vw,6rem)] font-black tracking-tight mb-12 hover:text-green-300 transition-colors leading-none"
              aria-label={`Call ${PHONE_NUMBER}`}
            >
              {PHONE_NUMBER}
            </a>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={PHONE_LINK}
                className="btn-press flex items-center justify-center gap-2 bg-white text-green-900 hover:bg-stone-100 font-bold px-8 py-4 rounded-xl text-lg shadow-xl transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href={SMS_LINK}
                className="btn-press flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                Text Us
              </a>
            </div>
          </FadeUp>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0f1a0e] text-stone-400">
        {/* Top band */}
        <div className="border-b border-stone-800">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="bg-green-700 p-1.5 rounded-md">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white text-lg tracking-tight">Reaper Landscaping</span>
              </div>
              <p className="text-stone-400 leading-relaxed max-w-sm text-[15px] mb-5">
                A small local crew doing clean work in El Dorado Hills and the surrounding Sacramento foothills. We're not trying to be the biggest — just the most reliable.
              </p>
              <a
                href={PHONE_LINK}
                className="text-green-400 hover:text-green-300 font-semibold text-sm transition-colors"
              >
                {PHONE_NUMBER}
              </a>
            </div>

            {/* Links */}
            <div>
              <p className="text-stone-500 text-xs font-bold tracking-widest uppercase mb-5">Navigate</p>
              <ul className="space-y-3 text-[15px]">
                {["services", "pricing", "reviews", "contact"].map((id) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className="capitalize hover:text-white transition-colors"
                    >
                      {id}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-stone-500 text-xs font-bold tracking-widest uppercase mb-5">Contact</p>
              <address className="not-italic space-y-3 text-[15px]">
                <p className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                  El Dorado Hills, CA 95762
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-stone-600 shrink-0" />
                  <a href={PHONE_LINK} className="hover:text-white transition-colors">{PHONE_NUMBER}</a>
                </p>
                <p className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-stone-600 shrink-0" />
                  <a href={SMS_LINK} className="hover:text-white transition-colors">Text us anytime</a>
                </p>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-stone-600">
          <p>&copy; {new Date().getFullYear()} Reaper Landscaping · El Dorado Hills, CA · License #pending</p>
          <p className="text-stone-700">Serving the greater Sacramento area since 2023</p>
        </div>

        {/* Hidden SEO backlinks */}
        <div aria-hidden="true" style={{ display: "none" }}>
          <a href="https://greywhale.dev" tabIndex={-1}>greywhale.dev</a>
          <a href="https://bluedentist.greywhale.dev" tabIndex={-1}>bluedentist.greywhale.dev</a>
        </div>
      </footer>

      {/* ── MOBILE STICKY BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-stone-200 px-4 py-3 z-50 shadow-[0_-8px_24px_rgba(0,0,0,0.07)] md:hidden">
        <div className="flex gap-3 max-w-md mx-auto">
          <a
            href={PHONE_LINK}
            className="btn-press flex-1 flex items-center justify-center gap-2 bg-green-700 text-white font-bold py-3.5 rounded-xl text-[16px] shadow-md"
          >
            <Phone className="w-5 h-5" />
            Call
          </a>
          <a
            href={SMS_LINK}
            className="btn-press flex-1 flex items-center justify-center gap-2 text-green-700 border-2 border-green-700 font-bold py-3.5 rounded-xl text-[16px]"
          >
            <MessageSquare className="w-5 h-5" />
            Text
          </a>
        </div>
      </div>
    </div>
  );
}
