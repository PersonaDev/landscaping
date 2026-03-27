import { useState, useEffect } from "react";
import { Phone, MessageSquare, Menu, X } from "lucide-react";
import { PepperIcon } from "@/components/PepperIcon";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const PHONE_LINK = "tel:9168472095";
const SMS_LINK = "sms:9168472095";
const PHONE_NUMBER = "(916) 847-2095";

interface NavItem {
  label: string;
  href?: string;
  scrollId?: string;
}

const NAV: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pricing", scrollId: "pricing" },
  { label: "Contact", scrollId: "contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNav = (item: NavItem) => {
    setOpen(false);
    if (item.scrollId) {
      if (location !== "/") {
        window.location.href = `/#${item.scrollId}`;
        return;
      }
      const el = document.getElementById(item.scrollId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Reaper Landscaping — home">
            <div className="bg-green-700 p-2 rounded-lg group-hover:bg-green-800 transition-colors">
              <PepperIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[17px] tracking-tight text-stone-900 leading-none">
              Reaper Landscaping
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-stone-500">
            {NAV.map((item) =>
              item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-green-700 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-green-700 after:transition-all hover:after:w-full"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNav(item)}
                  className="hover:text-green-700 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-green-700 after:transition-all hover:after:w-full"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 top-[68px] z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative bg-white border-b border-stone-200 shadow-xl"
            >
              <div className="px-5 py-6 space-y-1">
                {NAV.map((item, i) =>
                  item.href ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between w-full py-3.5 text-[17px] font-semibold text-stone-800 hover:text-green-700 border-b border-stone-100 last:border-0 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => handleNav(item)}
                      className="flex items-center justify-between w-full py-3.5 text-[17px] font-semibold text-stone-800 hover:text-green-700 border-b border-stone-100 last:border-0 transition-colors"
                    >
                      {item.label}
                    </button>
                  )
                )}

                <div className="pt-5 pb-2 grid grid-cols-2 gap-3">
                  <a
                    href={PHONE_LINK}
                    className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold py-3.5 rounded-xl text-[16px] transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Call
                  </a>
                  <a
                    href={SMS_LINK}
                    className="flex items-center justify-center gap-2 text-green-700 border-2 border-green-700 hover:bg-green-50 font-bold py-3.5 rounded-xl text-[16px] transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Text
                  </a>
                </div>
                <p className="text-center text-stone-400 text-sm pt-1">{PHONE_NUMBER}</p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
