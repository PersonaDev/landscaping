import { Phone, MessageSquare } from "lucide-react";
import { PepperIcon } from "@/components/PepperIcon";
import { useLocation, Link } from "wouter";

const PHONE_LINK = "tel:9168472095";
const SMS_LINK = "sms:9168472095";

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
  const [location] = useLocation();

  const handleNav = (item: NavItem) => {
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
    <header className="bg-white/95 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Reaper Landscaping — home">
          <div className="bg-green-700 p-2 rounded-lg group-hover:bg-green-800 transition-colors">
            <PepperIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-[17px] tracking-tight text-stone-900 leading-none">EDH Landscaping
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

        {/* Mobile Call button */}
        <a
          href={PHONE_LINK}
          className="md:hidden btn-press flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
      </div>
    </header>
  );
}
