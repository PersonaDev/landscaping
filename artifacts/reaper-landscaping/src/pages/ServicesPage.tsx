import { motion } from "framer-motion";
import { Phone, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

const PHONE_LINK = "tel:9168472095";
const SMS_LINK = "sms:9168472095";
const PHONE_NUMBER = "(916) 847-2095";

const CORE_SERVICES = [
  {
    num: "01",
    name: "Lawn Mowing",
    tag: "Included in $60/mo plan",
    tagColor: "bg-green-100 text-green-700",
    desc: "We cut at 3.5 inches — the sweet spot for tall fescue in the Sacramento foothills to hold moisture and resist summer heat. Every cut includes a full pass with the weed trimmer along fences and structures.",
    includes: [
      "Bi-weekly schedule (2x per month)",
      "Proper height calibrated for your grass type",
      "Perimeter trimming with every visit",
      "Driveway & walkway blowout at finish",
    ],
  },
  {
    num: "02",
    name: "Edging & Borders",
    tag: "Included in $60/mo plan",
    tagColor: "bg-green-100 text-green-700",
    desc: "We use a stick edger on all concrete borders — not just a string trimmer held sideways. The difference is visible: a clean 1–2 inch cut line along every driveway edge, sidewalk, and garden bed curb.",
    includes: [
      "Steel-blade stick edger (not trimmer edging)",
      "All concrete borders per visit",
      "Garden bed border definition",
      "Re-edging after heavy growth periods",
    ],
  },
  {
    num: "03",
    name: "Yard Cleanup",
    tag: "Add-on or seasonal",
    tagColor: "bg-amber-100 text-amber-700",
    desc: "Leaf removal, seasonal debris clearing, and general yard cleanup. We bag everything and haul it off — no pile left at the curb for you to deal with. Common in fall after the oaks drop and spring after winter die-off.",
    includes: [
      "Full leaf and debris removal",
      "Haul-off included (no curbside piles)",
      "Mulched plant beds refreshed",
      "Branch and clipping disposal",
    ],
  },
];

const ADVANCED_SERVICES = [
  {
    name: "Lawn Renovation & Overseeding",
    img: "https://images.unsplash.com/photo-1599594073997-45b3fe86cc38?w=800&q=80",
    desc: "If your lawn has dead patches, compaction issues, or thin coverage from the summer, we can renovate it. We overseed in fall when soil temps are right for germination, using drought-tolerant fescue blends suited for El Dorado Hills' clay-heavy soil.",
    details: [
      "Scalp mow to prepare the surface",
      "Core aeration to break compaction",
      "Premium drought-resistant fescue seed",
      "Starter fertilizer application",
      "Recommended watering schedule provided",
    ],
    callout: "Best done Sept–Nov in the Sacramento foothills.",
  },
  {
    name: "Sprinkler & Drip System Repair",
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&q=80",
    desc: "Broken heads, clogged drip emitters, timer issues — we diagnose and fix. We don't do full installs, but we handle most common repairs that keep your irrigation system from wasting water or leaving dry spots.",
    details: [
      "Head replacement (pop-up and rotary)",
      "Zone pressure testing",
      "Drip emitter replacement and flush",
      "Timer programming and scheduling",
      "Valve box inspection",
    ],
    callout: "Call first — we'll confirm it's in scope before scheduling.",
  },
  {
    name: "Bark & Mulch Installation",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    desc: "Fresh mulch makes an immediate difference — it suppresses weeds, retains moisture, and gives beds a finished look. We install gorilla hair, shredded cedar, or walk-on bark depending on the application. We can also remove old mulch before installing.",
    details: [
      "Gorilla hair, cedar, or wood chips",
      "Old mulch removal if needed",
      "2–3 inch depth installation",
      "Hand-raked to bed edges",
      "Priced per cubic yard delivered",
    ],
    callout: "Most beds take 2–4 yards. We'll estimate on a walkthrough.",
  },
  {
    name: "Fertilization & Weed Control Program",
    img: "https://images.unsplash.com/photo-1592415486689-125cbbfcdfbe?w=800&q=80",
    desc: "A 4-application annual program timed to El Dorado Hills' climate: early spring pre-emergent, late spring feed, summer slow-release, and fall winterizer. Broadleaf weed spot-spray included with each application.",
    details: [
      "4 applications per year on a schedule",
      "Pre-emergent in early spring",
      "Slow-release summer formula",
      "Fall winterizer for root development",
      "Broadleaf weed spot-treatment each visit",
    ],
    callout: "Bundle with your mowing plan for a discount.",
  },
  {
    name: "Shrub & Ornamental Trimming",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    desc: "We shape boxwood, photinia, pittosporum, ornamental grasses, and most common shrubs found in El Dorado Hills neighborhoods. We don't top trees or do large palm work — but anything you can reach with a ladder, we handle.",
    details: [
      "All common ornamental shrubs",
      "Hedge shaping with power shears",
      "Ornamental grass cutbacks",
      "Rose pruning (canes and deadheading)",
      "Cleanup and debris hauling included",
    ],
    callout: "Usually combined with a seasonal cleanup visit.",
  },
  {
    name: "Sod Installation",
    img: "https://images.unsplash.com/photo-1593196272613-cce0b1bb3ff6?w=800&q=80",
    desc: "Full replacement of dead or patchy lawns with fresh sod. We use Marathon II or Fescue depending on sun exposure and your water budget. We prep the soil, lay and roll the sod, and walk you through the 30-day establishment care routine.",
    details: [
      "Soil prep and grade leveling",
      "Marathon II or Tall Fescue sod options",
      "Roller compaction after lay",
      "Starter fertilizer at installation",
      "30-day watering schedule included",
    ],
    callout: "Best done March–May or September–October.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" as const } },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.36, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1208] md:pb-0 pb-24">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="bg-[#f7f3ee] py-20 border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-green-700 mb-4">What we offer</p>
              <h1
                className="text-[clamp(2.2rem,5vw,3.5rem)] font-serif font-bold text-stone-900 leading-[1.1] mb-6"
                style={{ fontVariationSettings: '"opsz" 56' }}
              >
                The $60 plan covers the basics.<br />
                <em className="italic font-light text-stone-500">We can do a lot more.</em>
              </h1>
              <p className="text-stone-500 text-lg max-w-2xl leading-relaxed">
                Our bi-weekly mowing plan is where most customers start. But we also do one-time and seasonal jobs for customers who need more than just a cut.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core services */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp className="mb-14">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-stone-400 mb-3">Recurring plan</p>
              <h2
                className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-serif font-bold text-stone-900 leading-[1.15]"
                style={{ fontVariationSettings: '"opsz" 40' }}
              >
                What's in the $60/mo plan
              </h2>
            </FadeUp>

            <div className="space-y-0">
              {CORE_SERVICES.map((s, i) => (
                <FadeUp key={i} delay={i * 0.07}>
                  <div className="border-t border-stone-200 py-10 grid grid-cols-1 md:grid-cols-[200px_1fr_260px] gap-8 items-start">
                    {/* Number + name */}
                    <div>
                      <span className="text-[11px] font-bold text-stone-300 tracking-widest block mb-2">{s.num}</span>
                      <h3 className="text-xl font-bold text-stone-900 mb-2">{s.name}</h3>
                      <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${s.tagColor}`}>
                        {s.tag}
                      </span>
                    </div>
                    {/* Description */}
                    <p className="text-stone-500 leading-relaxed text-[15px]">{s.desc}</p>
                    {/* Includes */}
                    <ul className="space-y-2">
                      {s.includes.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-[14px] text-stone-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              ))}
              <div className="border-t border-stone-200" />
            </div>

            {/* Pricing CTA */}
            <FadeUp className="mt-12">
              <div className="bg-green-700 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
                <div>
                  <div className="text-3xl font-black leading-none mb-1">$60<span className="text-green-300 text-lg font-normal">/mo</span></div>
                  <p className="text-green-200 text-sm">Bi-weekly backyard cuts · No contracts · Cancel anytime</p>
                </div>
                <a
                  href={PHONE_LINK}
                  className="btn-press flex items-center gap-2 bg-white text-green-900 hover:bg-stone-100 font-bold px-7 py-3.5 rounded-xl text-[16px] shrink-0 shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call to Get Started
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Advanced services */}
        <section className="py-24 bg-[#f7f3ee]">
          <div className="max-w-7xl mx-auto px-6">
            <FadeUp className="mb-14">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-stone-400 mb-3">Beyond the basics</p>
              <h2
                className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-serif font-bold text-stone-900 leading-[1.15] mb-4"
                style={{ fontVariationSettings: '"opsz" 40' }}
              >
                Advanced & one-time work
              </h2>
              <p className="text-stone-500 max-w-xl leading-relaxed">
                These aren't on a fixed price list — every yard is different. Call and describe what you need. We'll take a look and give you a straight quote.
              </p>
            </FadeUp>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {ADVANCED_SERVICES.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-md shadow-stone-100/80 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-stone-900 mb-3">{s.name}</h3>
                    <p className="text-stone-500 text-[14px] leading-relaxed mb-5">{s.desc}</p>
                    <ul className="space-y-2 mb-5">
                      {s.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-[13px] text-stone-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    {s.callout && (
                      <div className="mt-auto bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 text-amber-700 text-[13px] font-medium">
                        {s.callout}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <FadeUp className="mt-14 text-center">
              <p className="text-stone-400 text-sm mb-6">Not sure if we do what you need? Just ask.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={PHONE_LINK}
                  className="btn-press flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-md transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call {PHONE_NUMBER}
                </a>
                <a
                  href={SMS_LINK}
                  className="btn-press flex items-center justify-center gap-2 text-green-700 border-2 border-green-700 hover:bg-green-50 font-bold px-8 py-4 rounded-xl text-lg transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  Text Us
                </a>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-stone-200 px-4 py-3 z-50 shadow-[0_-8px_24px_rgba(0,0,0,0.07)] md:hidden">
        <div className="flex gap-3 max-w-md mx-auto">
          <a href={PHONE_LINK} className="btn-press flex-1 flex items-center justify-center gap-2 bg-green-700 text-white font-bold py-3.5 rounded-xl text-[16px] shadow-md">
            <Phone className="w-5 h-5" />
            Call
          </a>
          <a href={SMS_LINK} className="btn-press flex-1 flex items-center justify-center gap-2 text-green-700 border-2 border-green-700 font-bold py-3.5 rounded-xl text-[16px]">
            <MessageSquare className="w-5 h-5" />
            Text
          </a>
        </div>
      </div>
    </div>
  );
}
