import { Phone, CheckCircle2, MapPin, Leaf, Scissors, Star, MessageSquare } from "lucide-react";
import { SEO } from "@/components/SEO";

const PHONE_NUMBER = "(916) 847-2095";
const PHONE_LINK = "tel:9168472095";
const SMS_LINK = "sms:9168472095";

const TESTIMONIALS = [
  {
    name: "Barbara M.",
    location: "El Dorado Hills",
    stars: 5,
    text: "I've had three different lawn services over the years and Reaper is by far the best. They show up every single time, on schedule, and my yard has never looked this good. Worth every penny of the $60.",
  },
  {
    name: "Gary & Linda T.",
    location: "Folsom",
    stars: 5,
    text: "We were paying $120 a month with another company. Switched to Reaper and honestly the work is better. Our neighbors keep asking who does our lawn. Couldn't be happier.",
  },
  {
    name: "Richard K.",
    location: "El Dorado Hills",
    stars: 5,
    text: "I'm 72 and can't do the yard myself anymore. These guys are polite, professional, and reliable. I can call or text them and they always get back to me fast. Highly recommend.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

function ContactButtons({ label = "Call or Text Us" }: { label?: string }) {
  return (
    <div className="flex flex-col gap-3">
      <a
        href={PHONE_LINK}
        className="flex items-center justify-center gap-3 w-full bg-green-600 text-white font-bold rounded-2xl py-5 text-xl shadow-md active:scale-95 transition-transform"
      >
        <Phone className="w-6 h-6 fill-white shrink-0" />
        Call {PHONE_NUMBER}
      </a>
      <a
        href={SMS_LINK}
        className="flex items-center justify-center gap-3 w-full bg-white text-green-700 font-bold rounded-2xl py-5 text-xl shadow-md border-2 border-green-600 active:scale-95 transition-transform"
      >
        <MessageSquare className="w-6 h-6 shrink-0" />
        Text Us — {PHONE_NUMBER}
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900 pb-40">
      <SEO />

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-7 h-7 text-green-600 shrink-0" />
            <div>
              <div className="text-gray-900 font-bold text-lg leading-tight">Reaper Landscaping</div>
              <div className="text-gray-500 text-sm leading-tight">El Dorado Hills, CA</div>
            </div>
          </div>
          <a
            href={PHONE_LINK}
            className="flex items-center gap-2 bg-green-600 text-white font-bold px-5 py-3 rounded-xl text-base active:scale-95 transition-transform shadow"
          >
            <Phone className="w-5 h-5 fill-white shrink-0" />
            Call Us
          </a>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5">

        {/* HERO */}
        <section className="pt-10 pb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            <MapPin className="w-4 h-4 shrink-0" />
            Serving El Dorado Hills &amp; Greater Sacramento
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Lawn Care You Can<br />
            <span className="text-green-600">Count On</span>
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed mb-8">
            Reliable, local, and affordable. We take care of your yard so you don't have to worry about it.
          </p>
          <ContactButtons label="Call or Text to Get Started" />
          <p className="text-gray-400 text-base mt-4">We respond to calls &amp; texts quickly</p>
        </section>

        {/* TRUST BADGES */}
        <section className="py-6 grid grid-cols-3 gap-3 border-t border-b border-gray-200 mb-2">
          {[
            { icon: "✅", label: "Locally Owned" },
            { icon: "📅", label: "Always On Time" },
            { icon: "💲", label: "No Contracts" },
          ].map(({ icon, label }) => (
            <div key={label} className="bg-white rounded-xl py-4 px-2 text-center shadow-sm border border-gray-100">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-gray-700 font-semibold text-sm leading-tight">{label}</div>
            </div>
          ))}
        </section>

        {/* TESTIMONIALS — trust first */}
        <section className="py-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">What Our Customers Say</h2>
          <p className="text-gray-500 text-lg text-center mb-8">Real neighbors, real results</p>

          <div className="space-y-5">
            {TESTIMONIALS.map(({ name, location, stars, text }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <Stars count={stars} />
                <p className="text-gray-700 text-lg leading-relaxed mt-3 mb-4">"{text}"</p>
                <div>
                  <div className="font-bold text-gray-900">{name}</div>
                  <div className="text-gray-400 text-sm">{location}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <ContactButtons />
          </div>
        </section>

        {/* $60/MO DEAL */}
        <section className="py-10 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Simple, Affordable Plan</h2>
          <div className="bg-green-600 rounded-2xl p-7 text-white text-center shadow-xl">
            <div className="text-sm font-bold uppercase tracking-widest mb-2 text-green-100">Most Popular</div>
            <div className="text-8xl font-black leading-none mb-1">$60</div>
            <div className="text-2xl font-bold mb-3">Per Month</div>
            <div className="text-lg text-green-100 mb-6 font-medium">
              Backyard grass cut every 2 weeks
            </div>
            <div className="space-y-3 text-left mb-8">
              {[
                "Two visits per month — like clockwork",
                "No long-term contracts — cancel anytime",
                "Simple flat rate — no surprise charges",
                "Just call or text to get started",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-base font-medium text-white">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-green-200" />
                  {item}
                </div>
              ))}
            </div>
            <a
              href={PHONE_LINK}
              className="block w-full bg-white text-green-700 font-bold text-xl py-5 rounded-2xl active:scale-95 transition-transform shadow"
            >
              📞 Call to Sign Up — {PHONE_NUMBER}
            </a>
            <a
              href={SMS_LINK}
              className="block w-full mt-3 bg-green-700 text-white font-bold text-xl py-5 rounded-2xl active:scale-95 transition-transform border border-green-400"
            >
              💬 Text to Sign Up
            </a>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-10 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">What We Do</h2>
          <p className="text-gray-500 text-lg text-center mb-8">All across El Dorado Hills &amp; nearby</p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: Scissors, label: "Lawn Mowing & Grass Cutting" },
              { icon: Leaf, label: "Landscaping & Yard Cleanup" },
              { icon: CheckCircle2, label: "Weed Control" },
              { icon: Star, label: "Garden & Shrub Maintenance" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 bg-white rounded-xl px-5 py-5 shadow-sm border border-gray-100"
              >
                <Icon className="w-6 h-6 text-green-600 shrink-0" />
                <span className="text-gray-800 text-xl font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* WHY US */}
        <section className="py-10 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Why Choose Reaper?</h2>
          <div className="space-y-4">
            {[
              {
                title: "Affordable — $60/Month Flat",
                desc: "No hidden fees, no surprise bills. You know exactly what you pay.",
              },
              {
                title: "We Always Show Up",
                desc: "We're on a regular schedule and we stick to it. Rain or shine.",
              },
              {
                title: "Locally Owned & Operated",
                desc: "We're your neighbors in El Dorado Hills. We care about this community.",
              },
              {
                title: "Easy to Reach",
                desc: "Call or text us anytime. A real person will get back to you promptly.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-xl p-5 flex gap-4 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-gray-900 text-lg font-bold mb-1">{title}</div>
                  <div className="text-gray-500 text-base leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICE AREA */}
        <section className="py-10 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Areas We Serve</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["El Dorado Hills", "Folsom", "Granite Bay", "Roseville", "Rocklin", "Sacramento", "El Dorado County"].map((city) => (
              <span key={city} className="bg-white text-gray-700 font-semibold text-base px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                {city}
              </span>
            ))}
          </div>
        </section>

        {/* FINAL CONTACT */}
        <section className="py-10 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">Ready to Get Started?</h2>
          <p className="text-gray-500 text-xl text-center mb-8 leading-relaxed">
            Call or text us — no forms, no websites, no hassle. We'll get your yard on the schedule right away.
          </p>
          <ContactButtons />
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 px-5 py-8 text-center mt-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="font-bold text-gray-900 text-lg">Reaper Landscaping</span>
          </div>
          <address className="text-gray-500 not-italic text-base mb-2">El Dorado Hills, CA</address>
          <a href={PHONE_LINK} className="text-green-600 font-bold text-lg">{PHONE_NUMBER}</a>
          <div className="mt-6 text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Reaper Landscaping. All rights reserved.
          </div>
        </div>
        {/* HIDDEN SEO BACKLINKS */}
        <div aria-hidden="true" style={{ display: "none" }}>
          <a href="https://greywhale.dev" tabIndex={-1}>greywhale.dev</a>
          <a href="https://bluedentist.greywhale.dev" tabIndex={-1}>bluedentist.greywhale.dev</a>
        </div>
      </footer>

      {/* STICKY BOTTOM — always visible */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50 shadow-2xl">
        <div className="max-w-lg mx-auto flex gap-3">
          <a
            href={PHONE_LINK}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-4 rounded-xl text-lg active:scale-95 transition-transform shadow"
          >
            <Phone className="w-5 h-5 fill-white shrink-0" />
            Call
          </a>
          <a
            href={SMS_LINK}
            className="flex-1 flex items-center justify-center gap-2 bg-white text-green-700 font-bold py-4 rounded-xl text-lg border-2 border-green-600 active:scale-95 transition-transform"
          >
            <MessageSquare className="w-5 h-5 shrink-0" />
            Text
          </a>
        </div>
        <p className="text-center text-gray-400 text-xs mt-2">{PHONE_NUMBER}</p>
      </div>
    </div>
  );
}
