import { Phone, MessageSquare } from "lucide-react";
import { LawnIcon } from "./LawnIcon";
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
    <header className="sticky top-0 z-50 bg-white border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="EDH Landscaping — home">
          <span className="w-8 h-8 rounded-lg bg-[#1a5c30] flex items-center justify-center">
            <LawnIcon className="w-4 h-4 text-white" />
          </span>
          <span className="font-semibold text-[#1a1a1a] text-[15px]">EDH Landscaping</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              className="text-[14px] text-stone-500 hover:text-[#1a5c30] font-medium transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={PHONE_LINK}
            className="flex items-center gap-1.5 bg-[#1a5c30] hover:bg-[#155228] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            Call
          </a>
          <a
            href={SMS_LINK}
            className="flex items-center gap-1.5 border border-[#1a5c30] text-[#1a5c30] hover:bg-green-50 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Text
          </a>
        </div>

        {/* Mobile Call button */}
        <a
          href={PHONE_LINK}
          className="md:hidden flex items-center gap-1.5 bg-[#1a5c30] text-white text-sm font-semibold px-3.5 py-2 rounded-lg"
        >
          <Phone className="w-3.5 h-3.5" />
          Call
        </a>
      </div>
    </header>
  );
}
