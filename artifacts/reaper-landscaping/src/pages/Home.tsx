import { Phone, CheckCircle2, MapPin, Leaf, Scissors, Star } from "lucide-react";
import { SEO } from "@/components/SEO";

const PHONE_NUMBER = "(916) 847-2095";
const PHONE_LINK = "tel:9168472095";

function CallButton({ size = "normal", label = `Call ${PHONE_NUMBER}` }: { size?: "normal" | "large"; label?: string }) {
  return (
    <a
      href={PHONE_LINK}
      className={`flex items-center justify-center gap-3 w-full bg-green-500 text-black font-bold rounded-xl shadow-lg active:scale-95 transition-transform ${
        size === "large"
          ? "py-6 text-2xl sm:text-3xl"
          : "py-5 text-xl sm:text-2xl"
      }`}
    >
      <Phone className={`fill-black ${size === "large" ? "w-8 h-8" : "w-7 h-7"}`} />
      {label}
    </a>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white pb-28">
      <SEO />

      {/* TOP HEADER — simple, clean */}
      <header className="bg-zinc-950 border-b border-zinc-800 px-4 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Leaf className="w-7 h-7 text-green-500 shrink-0" />
          <div>
            <div className="text-white font-bold text-lg leading-tight">Reaper Landscaping</div>
            <div className="text-zinc-400 text-sm leading-tight">El Dorado Hills, CA</div>
          </div>
        </div>
        <a
          href={PHONE_LINK}
          className="flex items-center gap-2 bg-green-500 text-black font-bold px-5 py-3 rounded-xl text-base active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5 fill-black" />
          Call Us
        </a>
      </header>

      <main>
        {/* HERO — friendly, clear, welcoming */}
        <section className="bg-zinc-900 px-5 pt-10 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            <MapPin className="w-4 h-4" />
            El Dorado Hills &amp; Greater Sacramento
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Lawn Care You Can<br />
            <span className="text-green-500">Count On</span>
          </h1>

          <p className="text-zinc-300 text-xl leading-relaxed mb-8 max-w-md mx-auto">
            Reliable, affordable lawn mowing and yard care for homeowners in El Dorado Hills. No hassle. No contracts. Just a clean yard.
          </p>

          <CallButton size="large" label={`Call ${PHONE_NUMBER}`} />

          <p className="text-zinc-400 text-base mt-4">
            Tap to call — we answer quickly
          </p>
        </section>

        {/* $60/MO DEAL — front and center, huge */}
        <section className="px-5 py-10 bg-zinc-950">
          <div className="bg-green-500 rounded-2xl p-7 text-black text-center shadow-xl max-w-lg mx-auto">
            <div className="text-sm font-bold uppercase tracking-widest mb-2 opacity-70">Most Popular Plan</div>
            <div className="text-7xl font-black leading-none mb-1">$60</div>
            <div className="text-2xl font-bold mb-3">Per Month</div>
            <div className="text-lg font-semibold mb-6 opacity-90">
              Backyard grass cut every 2 weeks
            </div>
            <div className="space-y-2 text-left mb-7">
              {[
                "Bi-weekly visits — twice a month",
                "No long-term contracts",
                "Simple, flat rate — no surprises",
                "Just call to get started today",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-base font-medium">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <a
              href={PHONE_LINK}
              className="block w-full bg-black text-white font-bold text-xl py-5 rounded-xl active:scale-95 transition-transform"
            >
              Call to Sign Up — {PHONE_NUMBER}
            </a>
          </div>
        </section>

        {/* SERVICES — simple list, large text */}
        <section className="px-5 py-10 bg-zinc-900">
          <h2 className="text-3xl font-bold text-white text-center mb-2">What We Do</h2>
          <p className="text-zinc-400 text-lg text-center mb-8">All services available in El Dorado Hills &amp; nearby areas</p>
          <div className="grid grid-cols-1 gap-4 max-w-lg mx-auto">
            {[
              { icon: Scissors, label: "Lawn Mowing & Grass Cutting" },
              { icon: Leaf, label: "Landscaping & Yard Cleanup" },
              { icon: CheckCircle2, label: "Weed Control" },
              { icon: Star, label: "Garden & Shrub Maintenance" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 bg-zinc-800 rounded-xl px-5 py-5"
              >
                <Icon className="w-7 h-7 text-green-500 shrink-0" />
                <span className="text-white text-xl font-semibold">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-lg mx-auto">
            <CallButton label="Call for a Free Quote" />
          </div>
        </section>

        {/* WHY US — plain language, large text */}
        <section className="px-5 py-10 bg-zinc-950">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Why Homeowners Choose Us</h2>
          <div className="space-y-5 max-w-lg mx-auto">
            {[
              {
                title: "Affordable Pricing",
                desc: "Just $60/month for bi-weekly cuts. No hidden fees, no surprises on your bill.",
              },
              {
                title: "We Show Up",
                desc: "We're reliable. If we say we'll be there, we'll be there — on time, every time.",
              },
              {
                title: "Local & Friendly",
                desc: "We live and work in El Dorado Hills. We know the area, the climate, and what your lawn needs.",
              },
              {
                title: "Easy to Reach",
                desc: "Just call or text. No complicated apps or online forms required.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex gap-4">
                <CheckCircle2 className="w-7 h-7 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white text-xl font-bold mb-1">{title}</div>
                  <div className="text-zinc-400 text-base leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICE AREA — simple list */}
        <section className="px-5 py-10 bg-zinc-900 border-t border-zinc-800">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Areas We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-lg mx-auto">
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
                className="bg-zinc-800 text-zinc-200 text-base font-semibold px-4 py-2 rounded-full border border-zinc-700"
              >
                {city}
              </span>
            ))}
          </div>
        </section>

        {/* BIG CONTACT SECTION */}
        <section className="px-5 py-10 bg-zinc-950 border-t border-zinc-800">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Ready to Get Started?</h2>
            <p className="text-zinc-300 text-xl mb-8 leading-relaxed">
              Give us a call or send a text. We'll get your yard on the schedule right away — no paperwork needed.
            </p>
            <CallButton size="large" />
            <div className="mt-5 text-zinc-400 text-lg">
              Or text us at{" "}
              <a href="sms:9168472095" className="text-green-400 font-bold underline underline-offset-2">
                (916) 847-2095
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black px-5 py-8 border-t border-zinc-800 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Leaf className="w-5 h-5 text-green-500" />
          <span className="font-bold text-white text-lg">Reaper Landscaping</span>
        </div>
        <address className="text-zinc-400 not-italic text-base mb-2">
          El Dorado Hills, CA
        </address>
        <a href={PHONE_LINK} className="text-green-400 font-bold text-lg">
          {PHONE_NUMBER}
        </a>
        <div className="mt-6 text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} Reaper Landscaping. All rights reserved. · Affordable Mowing &amp; Landscaping in El Dorado County.
        </div>

        {/* HIDDEN SEO BACKLINKS */}
        <div aria-hidden="true" style={{ display: "none" }}>
          <a href="https://greywhale.dev" tabIndex={-1}>greywhale.dev</a>
          <a href="https://bluedentist.greywhale.dev" tabIndex={-1}>bluedentist.greywhale.dev</a>
        </div>
      </footer>

      {/* STICKY BOTTOM CALL BAR — always visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-3 bg-zinc-950 border-t border-zinc-800 z-50 shadow-2xl">
        <a
          href={PHONE_LINK}
          className="flex items-center justify-center gap-3 w-full bg-green-500 text-black font-bold text-xl py-5 rounded-xl active:scale-95 transition-transform shadow-lg"
        >
          <Phone className="w-6 h-6 fill-black" />
          Call {PHONE_NUMBER}
        </a>
      </div>
    </div>
  );
}
