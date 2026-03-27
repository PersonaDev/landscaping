import { motion } from "framer-motion";
import { Star, Phone, MessageSquare, Quote } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

const PHONE_LINK = "tel:9168472095";
const SMS_LINK = "sms:9168472095";
const PHONE_NUMBER = "(916) 847-2095";

const ALL_REVIEWS = [
  {
    name: "Barbara M.",
    location: "El Dorado Hills",
    since: "Customer since 2023",
    stars: 5,
    text: "I've had three different lawn services over the years and Reaper is by far the best. They show up every single time, on schedule, and my yard has never looked this good. Worth every penny of the $60.",
    detail: "Barbara's backyard had been neglected by two previous services that kept skipping visits.",
  },
  {
    name: "Gary & Linda T.",
    location: "Folsom",
    since: "Customer since 2023",
    stars: 5,
    text: "We were paying $120 a month with another company. Switched to Reaper and honestly the work is better. Our neighbors keep asking who does our lawn. We've referred three families on our street already.",
    detail: null,
  },
  {
    name: "Richard K.",
    location: "El Dorado Hills",
    since: "Customer since 2024",
    stars: 5,
    text: "I'm 72 and can't do the yard myself anymore. These guys are polite, professional, and reliable. I can call or text them and they always respond fast. That matters more than people realize at my age.",
    detail: null,
  },
  {
    name: "Diane R.",
    location: "Granite Bay",
    since: "Customer since 2024",
    stars: 5,
    text: "We have a corner lot with a big front yard and a back slope that nobody else wanted to touch. Reaper quoted it reasonably and has handled it every two weeks without fail. Couldn't ask for more.",
    detail: null,
  },
  {
    name: "Tom S.",
    location: "El Dorado Hills",
    since: "Customer since 2023",
    stars: 5,
    text: "I travel a lot for work and I used to come home to an embarrassing yard. Not anymore. They don't need me home — they just show up, do the job right, and send me a text when they're done.",
    detail: null,
  },
  {
    name: "Carolyn P.",
    location: "Rocklin",
    since: "Customer since 2024",
    stars: 5,
    text: "The edging alone is worth it. My previous service never did the borders clean — Reaper does it every single visit and it makes a huge difference. The yard looks manicured, not just mowed.",
    detail: null,
  },
  {
    name: "Mike & Sue F.",
    location: "El Dorado Hills",
    since: "Customer since 2023",
    stars: 5,
    text: "Called on a Monday, they were at our house Friday. We've been on their route ever since. Straightforward pricing, no drama, no invoicing confusion. Just good consistent service.",
    detail: null,
  },
  {
    name: "Evelyn H.",
    location: "Roseville",
    since: "Customer since 2024",
    stars: 5,
    text: "My son set this up for me after I kept struggling with the heat last summer. I can't say enough good things. The crew is always respectful of my garden beds and they leave everything tidy.",
    detail: null,
  },
  {
    name: "James O.",
    location: "Folsom",
    since: "Customer since 2024",
    stars: 5,
    text: "Super easy to work with. I text, they confirm. They show up on time, cut everything clean, and I don't have to think about it. Exactly what I needed.",
    detail: null,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1208] md:pb-0 pb-24">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="bg-[#f7f3ee] py-20 border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-green-700 mb-4">What people say</p>
              <h1
                className="text-[clamp(2.2rem,5vw,3.5rem)] font-serif font-bold text-stone-900 leading-[1.1] mb-6"
                style={{ fontVariationSettings: '"opsz" 56' }}
              >
                Every review is a neighbor<br />
                <em className="italic font-light text-green-700">recommending us to another.</em>
              </h1>
              <p className="text-stone-500 text-lg max-w-xl mx-auto leading-relaxed">
                We don't advertise much. Most of our new customers come from someone on their street who already uses us.
              </p>
            </motion.div>

            {/* Summary bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-12 inline-flex flex-wrap justify-center gap-8 bg-white rounded-2xl border border-stone-200 px-8 py-6 shadow-sm"
            >
              <div className="text-center">
                <div className="text-3xl font-black text-green-700 leading-none mb-1">5.0</div>
                <Stars count={5} />
                <div className="text-stone-400 text-xs mt-1">avg rating</div>
              </div>
              <div className="w-px bg-stone-100 self-stretch" />
              <div className="text-center">
                <div className="text-3xl font-black text-stone-900 leading-none mb-1">100%</div>
                <div className="text-stone-500 text-sm font-medium">5-star reviews</div>
                <div className="text-stone-400 text-xs mt-1">no exceptions</div>
              </div>
              <div className="w-px bg-stone-100 self-stretch" />
              <div className="text-center">
                <div className="text-3xl font-black text-stone-900 leading-none mb-1">0</div>
                <div className="text-stone-500 text-sm font-medium">missed visits</div>
                <div className="text-stone-400 text-xs mt-1">ever</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Reviews grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {ALL_REVIEWS.map((r, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="break-inside-avoid bg-white rounded-2xl border border-stone-100 shadow-md shadow-stone-100/80 p-7 mb-6"
                >
                  <Quote className="w-6 h-6 text-green-200 mb-4" />
                  <Stars count={r.stars} />
                  <p className="text-stone-700 leading-relaxed mt-4 mb-6 text-[15px]">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                    <div className="w-9 h-9 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-700 font-bold text-sm shrink-0">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 text-sm">{r.name}</div>
                      <div className="text-stone-400 text-xs">{r.location} · {r.since}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-green-800 py-20 text-white text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2
              className="text-[clamp(1.8rem,4vw,2.8rem)] font-serif font-bold mb-4 leading-[1.15]"
              style={{ fontVariationSettings: '"opsz" 40' }}
            >
              Ready to join the list?
            </h2>
            <p className="text-green-200 text-lg mb-10 leading-relaxed">
              Call or text today. We'll get you on the route this week.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={PHONE_LINK}
                className="btn-press flex items-center justify-center gap-2 bg-white text-green-900 hover:bg-stone-100 font-bold px-8 py-4 rounded-xl text-lg shadow-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call {PHONE_NUMBER}
              </a>
              <a
                href={SMS_LINK}
                className="btn-press flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                Text Us
              </a>
            </div>
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
