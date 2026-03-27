import { motion } from "framer-motion";
import { Phone, CheckCircle2, MapPin, Leaf, Scissors, Sprout, Axe, Sun, ShieldCheck } from "lucide-react";
import { SEO } from "@/components/SEO";

const PHONE_NUMBER = "(916) 847-2095";
const PHONE_LINK = "tel:9168472095";

export default function Home() {
  return (
    <div className="relative min-h-screen pb-24 md:pb-0">
      <SEO />
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/5 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="font-display text-2xl md:text-3xl font-bold tracking-wider">
              REAPER <span className="text-primary">LANDSCAPING</span>
            </span>
          </div>
          <a
            href={PHONE_LINK}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-display text-lg tracking-wide rounded-sm hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            <Phone className="w-5 h-5" />
            CALL NOW
          </a>
        </div>
      </header>

      <main className="pt-20">
        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden clip-diagonal bg-black">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            {/* perfect green lawn macro shot */}
            <img 
              src="https://pixabay.com/get/g38e278474f90ba2db90d965023d609295e8a282f1847ae526019bf4c95b79b57ac3e170eed011f1c5cdff746a2f21d4542da81406565581017a50336a04b0259_1280.jpg" 
              alt="Freshly cut grass" 
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold mb-6">
                <MapPin className="w-4 h-4" />
                <span>EL DORADO HILLS & GREATER SACRAMENTO</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold leading-[0.9] text-white mb-6">
                WE KILL WEEDS.<br />
                <span className="text-primary">WE SAVE LAWNS.</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl font-medium">
                No-nonsense, reliable landscaping and grass cutting. 
                Keep your yard looking pristine without breaking the bank.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={PHONE_LINK}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-primary text-primary-foreground font-display text-2xl tracking-wide rounded-sm overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                >
                  <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <Phone className="w-6 h-6 fill-current relative z-10" />
                  <span className="relative z-10">CALL {PHONE_NUMBER}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MASSIVE OFFER SECTION */}
        <section className="relative z-20 -mt-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900 border-2 border-primary/30 p-8 md:p-12 rounded-xl shadow-2xl relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-primary text-primary-foreground font-display px-3 py-1 text-sm tracking-wider rounded-sm mb-4">
                  OUR SIGNATURE DEAL
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  BI-WEEKLY GRASS CUTS
                </h2>
                <p className="text-xl text-muted-foreground">
                  Simple. Affordable. No contracts. Just a clean backyard every two weeks.
                </p>
              </div>
              
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="text-6xl md:text-8xl font-display font-bold text-primary leading-none">
                  $60
                </div>
                <div className="text-xl font-bold text-white mb-6 uppercase tracking-widest opacity-80">
                  Per Month
                </div>
                <a 
                  href={PHONE_LINK}
                  className="w-full text-center px-8 py-4 bg-white text-black font-display text-xl tracking-wider rounded-sm hover:bg-gray-200 transition-colors"
                >
                  CLAIM OFFER
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                OUR <span className="text-primary">SERVICES</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to maintain a killer yard in the Greater Sacramento Area.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Lawn Mowing", desc: "Precision cuts that leave your grass healthy and sharp.", icon: Scissors },
                { title: "Grass Cutting", desc: "Taming overgrown yards and restoring order to the chaos.", icon: Sprout },
                { title: "Landscaping", desc: "Mulch, rock, planting, and full yard transformations.", icon: Leaf },
                { title: "Yard Cleanup", desc: "Leaf removal, debris clearing, and seasonal resets.", icon: Axe },
                { title: "Weed Control", desc: "Ruthless eradication of weeds from your flowerbeds and lawns.", icon: ShieldCheck },
                { title: "Garden Maintenance", desc: "Trimming, pruning, and keeping your plants thriving.", icon: Sun },
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-zinc-900/50 border border-white/5 rounded-lg hover:border-primary/50 transition-colors group"
                >
                  <service.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-display font-bold text-white mb-3 uppercase tracking-wide">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24 bg-zinc-950 relative overflow-hidden clip-diagonal-reverse pb-32">
          {/* background texture from requirements */}
          <img 
            src={`${import.meta.env.BASE_URL}images/rugged-texture.png`} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
            aria-hidden="true"
          />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                  WHY GO WITH <span className="text-primary">REAPER?</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { title: "AFFORDABLE", desc: "We don't overcharge. Simple, transparent pricing like our $60/mo plan." },
                    { title: "RELIABLE", desc: "We show up when we say we will. Rain or shine, we get the job done." },
                    { title: "LOCAL", desc: "Locally owned and operated in El Dorado Hills. We know California lawns." },
                    { title: "SIMPLE", desc: "No massive contracts or hidden fees. Just text or call to get started." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4"
                    >
                      <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="text-xl font-display font-bold text-white tracking-wide">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <a 
                    href={PHONE_LINK}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-primary text-primary font-display text-xl tracking-wide rounded-sm hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    GET A FREE QUOTE
                  </a>
                </div>
              </div>
              
              <div className="relative h-[600px] rounded-xl overflow-hidden shadow-2xl border border-white/10 hidden lg:block">
                {/* beautiful modern landscaping backyard */}
                <img 
                  src="https://pixabay.com/get/gb72a331244826cf414f55ed389fabf62a6980789a07b14e782fa02878a51410ad2f6c4f2b9f869680b3bf20427eee17154d7b7922fafdb6d8b232ba407fa2fd8_1280.jpg" 
                  alt="Beautifully landscaped backyard in El Dorado Hills" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE AREA & CONTACT */}
        <section className="py-24 bg-background border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase">
              Serving the Greater Sacramento Area
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              El Dorado Hills • Folsom • Granite Bay • Roseville • Rocklin • Sacramento • El Dorado County
            </p>
            
            <div className="bg-zinc-900 p-8 md:p-12 rounded-2xl border border-primary/20">
              <h3 className="text-3xl font-display font-bold text-white mb-4">READY TO BOOK?</h3>
              <p className="text-muted-foreground mb-8">Skip the forms. Just call or text us directly for immediate service.</p>
              <a 
                href={PHONE_LINK}
                className="block w-full sm:w-auto mx-auto px-8 py-6 bg-primary text-primary-foreground font-display text-4xl sm:text-5xl tracking-wider rounded-md hover:bg-primary/90 transition-all shadow-[0_0_40px_rgba(34,197,94,0.2)] hover:shadow-[0_0_60px_rgba(34,197,94,0.4)] hover:-translate-y-1"
              >
                {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="font-display text-xl font-bold tracking-wider text-white">
                REAPER <span className="text-primary">LANDSCAPING</span>
              </span>
            </div>
            
            <address className="text-muted-foreground not-italic text-center md:text-right">
              El Dorado Hills, CA<br />
              <a href={PHONE_LINK} className="text-white hover:text-primary transition-colors">{PHONE_NUMBER}</a>
            </address>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground/60">
            <p>&copy; {new Date().getFullYear()} Reaper Landscaping. All rights reserved.</p>
            <p>Affordable Mowing & Grass Cutting in El Dorado County.</p>
          </div>
        </div>

        {/* HIDDEN SEO BACKLINKS (CRITICAL REQUIREMENT) */}
        <div aria-hidden="true" style={{ display: 'none' }}>
          <a href="https://greywhale.dev" tabIndex={-1}>greywhale.dev</a>
          <a href="https://bluedentist.greywhale.dev" tabIndex={-1}>bluedentist.greywhale.dev</a>
        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-white/10 z-50">
        <a 
          href={PHONE_LINK}
          className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground font-display text-xl tracking-wider rounded-lg shadow-lg active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5 fill-current" />
          CALL {PHONE_NUMBER}
        </a>
      </div>
    </div>
  );
}
