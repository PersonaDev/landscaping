import {
  Phone,
  MessageSquare,
  Star,
  CheckCircle2,
  MapPin,
  Leaf,
  Scissors,
  DollarSign,
  Calendar,
  Shield,
  ArrowRight
} from "lucide-react";
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
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
      ))}
    </div>
  );
}

export default function Home() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 md:pb-0 pb-24">
      <SEO />

      {/* 1. HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="bg-green-700 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-gray-900 font-bold text-xl leading-none">Reaper Landscaping</div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
            <button onClick={() => scrollTo("services")} className="hover:text-green-700 transition-colors">Services</button>
            <button onClick={() => scrollTo("pricing")} className="hover:text-green-700 transition-colors">Pricing</button>
            <button onClick={() => scrollTo("reviews")} className="hover:text-green-700 transition-colors">Reviews</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-green-700 transition-colors">Contact</button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={PHONE_LINK}
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold px-5 py-2.5 rounded-lg active:scale-95 transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            <a
              href={SMS_LINK}
              className="flex items-center gap-2 bg-white text-green-700 border-2 border-green-700 hover:bg-green-50 font-bold px-5 py-2.5 rounded-lg active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Text
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 2. HERO */}
        <section className="relative min-h-[90vh] flex items-center">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80" 
              alt="Beautifully manicured green lawn" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-950/65" />
          </div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 bg-green-700/90 text-white rounded-full px-4 py-1.5 text-sm font-semibold mb-6 backdrop-blur-sm">
                <MapPin className="w-4 h-4" />
                El Dorado Hills & Surrounding Areas
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif leading-[1.1]">
                Your Lawn,<br />Taken Care Of.
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed font-light">
                Professional, reliable lawn mowing and landscaping services without the hassle. We show up on time, do great work, and make it easy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={PHONE_LINK}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-xl text-lg active:scale-95 transition-all shadow-lg"
                >
                  <Phone className="w-5 h-5 fill-white" />
                  Call {PHONE_NUMBER}
                </a>
                <a
                  href={SMS_LINK}
                  className="flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl text-lg active:scale-95 transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  Send a Text
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TRUST BAR */}
        <section className="bg-gray-50 border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-gray-200">
              <div className="flex flex-col items-center justify-center gap-2 md:px-4">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500 mb-1" />
                <span className="font-semibold text-gray-800">5-Star Rated</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 md:px-4">
                <MapPin className="w-8 h-8 text-green-700 mb-1" />
                <span className="font-semibold text-gray-800">El Dorado Hills Local</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 md:px-4">
                <CheckCircle2 className="w-8 h-8 text-green-700 mb-1" />
                <span className="font-semibold text-gray-800">No Contracts</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 md:px-4">
                <DollarSign className="w-8 h-8 text-green-700 mb-1" />
                <span className="font-semibold text-gray-800">$60/mo Flat Rate</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. TESTIMONIALS */}
        <section id="reviews" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Trusted by Your Neighbors</h2>
              <p className="text-xl text-gray-600">Don't just take our word for it.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col h-full">
                  <Stars count={t.stars} />
                  <p className="text-gray-700 text-lg leading-relaxed mt-6 mb-8 flex-grow">"{t.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{t.name}</div>
                      <div className="text-gray-500 text-sm">{t.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PRICING */}
        <section id="pricing" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 font-serif mb-6">Simple & Transparent Pricing</h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  We believe in keeping things simple. No complicated tiers, no hidden fees, and absolutely no long-term contracts.
                </p>
                
                <ul className="space-y-4 mb-10">
                  {[
                    "Consistent, reliable schedule",
                    "Professional-grade equipment",
                    "Includes edging and blowing",
                    "Cancel anytime, no questions asked",
                    "Easy payment options"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <p className="text-gray-500 italic">Have a larger property or need extensive landscaping? Give us a call for a custom quote.</p>
              </div>
              
              <div className="bg-green-700 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden transform md:-rotate-1">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-green-600 rounded-full opacity-50 mix-blend-screen blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-green-800 rounded-full opacity-50 mix-blend-multiply blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="inline-block bg-green-800 text-green-100 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                    Standard Plan
                  </div>
                  <div className="flex items-baseline mb-2">
                    <span className="text-6xl font-black">$60</span>
                    <span className="text-xl text-green-200 ml-2">/ month</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-8 text-green-50">Bi-weekly backyard cuts</h3>
                  
                  <div className="space-y-4 mb-10 border-t border-green-600/50 pt-8">
                    {[
                      "2 cuts per month",
                      "Precision edging along walkways",
                      "Complete cleanup & blowing",
                      "Satisfaction guaranteed"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-300 shrink-0" />
                        <span className="text-lg text-green-50">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <a
                    href={PHONE_LINK}
                    className="flex items-center justify-center gap-2 w-full bg-white text-green-800 hover:bg-gray-100 font-bold text-xl py-4 rounded-xl active:scale-95 transition-transform shadow-lg"
                  >
                    Call to Sign Up
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. SERVICES */}
        <section id="services" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Complete Lawn Care Solutions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need to keep your outdoor spaces looking pristine all year round.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Scissors, title: "Lawn Mowing", desc: "Precision cutting at the optimal height for your grass type to promote healthy growth." },
                { icon: Leaf, title: "Yard Cleanup", desc: "Seasonal cleanups, leaf removal, and clearing of debris to keep your yard neat." },
                { icon: Shield, title: "Weed Control", desc: "Targeted weed removal and prevention to keep your flower beds and lawn flawless." },
                { icon: Scissors, title: "Edging & Trimming", desc: "Crisp, clean lines along sidewalks, driveways, and garden beds." },
                { icon: Calendar, title: "Routine Maintenance", desc: "Set-it-and-forget-it schedules so you never have to worry about your yard again." },
                { icon: Star, title: "Garden Care", desc: "Shrub trimming, mulching, and general maintenance for your beautiful garden beds." },
              ].map((service, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors border border-gray-100">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 text-green-700">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. WHY US */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <div className="bg-green-800 p-12 md:p-16 text-white">
                <h2 className="text-4xl font-bold font-serif mb-8">Why Choose Reaper?</h2>
                <div className="space-y-8">
                  {[
                    { title: "We Actually Show Up", desc: "We hear it all the time—other guys flake. We don't. We're on schedule, every time." },
                    { title: "No Surprises", desc: "You'll never get a bill you didn't expect. Our pricing is straightforward." },
                    { title: "Local & Invested", desc: "We live and work right here in El Dorado Hills. We care about our community." },
                    { title: "Easy Communication", desc: "Want to text us? Go ahead. Need to call? We answer. No frustrating portals." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-white">{item.title}</h3>
                        <p className="text-green-100 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-12 md:p-16 flex flex-col justify-center text-center items-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h3>
                <p className="text-lg text-gray-600 mb-10 max-w-sm">
                  Let's get your property on our route. Call or text today for immediate scheduling.
                </p>
                
                <div className="w-full max-w-xs space-y-4">
                  <a
                    href={PHONE_LINK}
                    className="flex items-center justify-center gap-2 w-full bg-green-700 hover:bg-green-800 text-white font-bold text-lg py-4 rounded-xl active:scale-95 transition-all shadow-md"
                  >
                    <Phone className="w-5 h-5" />
                    Call {PHONE_NUMBER}
                  </a>
                  <a
                    href={SMS_LINK}
                    className="flex items-center justify-center gap-2 w-full bg-white text-green-700 hover:bg-gray-50 font-bold text-lg py-4 rounded-xl active:scale-95 transition-all border-2 border-green-700"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Send a Text
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SERVICE AREAS */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 font-serif mb-8">Service Areas</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["El Dorado Hills", "Folsom", "Granite Bay", "Roseville", "Rocklin", "Sacramento", "El Dorado County"].map((city) => (
                <span key={city} className="bg-gray-50 text-gray-700 font-medium px-5 py-2.5 rounded-full border border-gray-200">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 9. CONTACT CTA */}
        <section id="contact" className="py-24 bg-green-700 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">Ready for a Cleaner Yard?</h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
              Skip the complicated forms. Just give us a call or send a quick text, and we'll get you set up.
            </p>
            
            <a href={PHONE_LINK} className="block text-5xl md:text-7xl font-black mb-12 hover:text-green-200 transition-colors">
              {PHONE_NUMBER}
            </a>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={PHONE_LINK}
                className="flex items-center justify-center gap-2 bg-white text-green-800 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl text-xl active:scale-95 transition-all shadow-xl"
              >
                <Phone className="w-6 h-6" />
                Call Now
              </a>
              <a
                href={SMS_LINK}
                className="flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl text-xl active:scale-95 transition-all"
              >
                <MessageSquare className="w-6 h-6" />
                Text Us
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* 10. FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-green-700 p-1.5 rounded-md">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white text-xl">Reaper Landscaping</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                Professional, reliable, and affordable lawn care for El Dorado Hills and surrounding communities.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollTo("services")} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => scrollTo("pricing")} className="hover:text-white transition-colors">Pricing</button></li>
                <li><button onClick={() => scrollTo("reviews")} className="hover:text-white transition-colors">Reviews</button></li>
                <li><button onClick={() => scrollTo("contact")} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
              <address className="not-italic space-y-3">
                <p className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  El Dorado Hills, CA
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <a href={PHONE_LINK} className="hover:text-white transition-colors">{PHONE_NUMBER}</a>
                </p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Reaper Landscaping. All rights reserved.</p>
          </div>
          
          {/* HIDDEN SEO BACKLINKS */}
          <div aria-hidden="true" style={{ display: "none" }}>
            <a href="https://greywhale.dev" tabIndex={-1}>greywhale.dev</a>
            <a href="https://bluedentist.greywhale.dev" tabIndex={-1}>bluedentist.greywhale.dev</a>
          </div>
        </div>
      </footer>

      {/* STICKY BOTTOM BAR (mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:hidden">
        <div className="flex gap-3 max-w-md mx-auto">
          <a
            href={PHONE_LINK}
            className="flex-1 flex items-center justify-center gap-2 bg-green-700 text-white font-bold py-3.5 rounded-xl text-lg active:scale-95 transition-transform shadow-md"
          >
            <Phone className="w-5 h-5 fill-white" />
            Call
          </a>
          <a
            href={SMS_LINK}
            className="flex-1 flex items-center justify-center gap-2 bg-white text-green-700 border-2 border-green-700 font-bold py-3.5 rounded-xl text-lg active:scale-95 transition-transform"
          >
            <MessageSquare className="w-5 h-5" />
            Text
          </a>
        </div>
      </div>
    </div>
  );
}