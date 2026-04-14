import { Phone, MessageSquare } from "lucide-react";
import { Link, useLocation } from "wouter";

const PHONE_LINK = "tel:9168472095";
const SMS_LINK = "sms:9168472095&body=Hey%2C%20I%20found%20EDH%20Landscaping%20online%20and%20want%20to%20get%20my%20yard%20on%20the%20schedule.";

const NAV = [
  { label: "Services", id: "services" },
  { label: "Reviews", id: "reviews" },
  { label: "Pricing", id: "pricing" },
  { label: "Contact", id: "contact" },
];

export function SiteHeader() {
  const [location] = useLocation();

  const scrollTo = (id: string) => {
    if (location !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="EDH Landscaping - home">
          <img src="/logo.svg" alt="EDH" className="h-8 w-auto" width={48} height={32} />
          <span className="font-black text-[#111111] text-[17px] tracking-tight leading-none">Landscaping</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              className="text-[14px] text-stone-500 hover:text-[#006837] font-semibold transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Link
            href="/blog"
            className="text-[14px] text-stone-500 hover:text-[#006837] font-semibold transition-colors"
          >
            Blog
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={PHONE_LINK}
            className="flex items-center gap-1.5 bg-[#006837] hover:bg-[#005030] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            Call Now
          </a>
          <a
            href={SMS_LINK}
            className="flex items-center gap-1.5 border-2 border-[#006837] text-[#006837] hover:bg-[#006837] hover:text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Text
          </a>
        </div>

        {/* Mobile Call button */}
        <a
          href={PHONE_LINK}
          className="md:hidden flex items-center gap-1.5 bg-[#006837] text-white text-sm font-bold px-3.5 py-2 rounded-lg"
        >
          <Phone className="w-3.5 h-3.5" />
          Call
        </a>
      </div>
    </header>
  );
}
