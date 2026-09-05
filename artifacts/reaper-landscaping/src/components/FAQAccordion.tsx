import { useState } from "react";

const PlusIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
);
const MinusIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
);

export interface FAQItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    q: "How do I pay?",
    a: "Call or text after your first visit. We accept Venmo, Zelle, and check. No portal, no auto-billing you didn't set up.",
  },
  {
    q: "Do I need to be home?",
    a: "Nope. We let ourselves in through the side gate if you leave it unlocked. We'll text you when we're done.",
  },
  {
    q: "What if I need to skip a week?",
    a: "Text us. Done. No penalties, no questions.",
  },
  {
    q: "Do you do one-time cleanups?",
    a: "Sometimes. Call us and we'll tell you straight if it's something we can fit in.",
  },
  {
    q: "Is there a contract?",
    a: "No. Cancel anytime by text. We earn your business every visit.",
  },
  {
    q: "What areas do you serve?",
    a: "El Dorado Hills, Folsom, Granite Bay, Roseville, Rocklin, Sacramento, Cameron Park, and Shingle Springs. Text us your address if you're unsure.",
  },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-stone-200">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i}>
          <button
            className="w-full flex items-center justify-between gap-4 py-5 text-left group"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-medium text-[#1a1a1a] text-[17px] group-hover:text-[#006837] transition-colors">
              {item.q}
            </span>
            <span className="shrink-0 text-[#006837]">
              {open === i ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
            </span>
          </button>
          <div className={`faq-answer ${open === i ? "open" : ""}`}>
            <div>
              <p className="pb-5 text-[#6b7280] leading-relaxed">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
