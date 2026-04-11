import { Phone } from "lucide-react";
import { FREQ, SCOPE, ALL_SERVICES, calcPrice } from "../lib/quote";

interface Props {
  frequency: number;
  scope: number;
  interacted: boolean;
  setFrequency: (v: number) => void;
  setScope: (v: number) => void;
  setInteracted: (v: boolean) => void;
}

export function QuoteBuilder({ frequency, scope, interacted, setFrequency, setScope, setInteracted }: Props) {
  const price = calcPrice(frequency, scope);
  const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const sep = isIOS ? "&" : "?";
  const msgBody = `Hey, I'm interested in the ${SCOPE[scope].text} ${FREQ[frequency].text} plan ($${price}/mo). Can you get me on the schedule?`;
  const smsHref = `sms:9168472095${sep}body=${encodeURIComponent(msgBody)}`;

  const handleFreq = (i: number) => { setFrequency(i); setInteracted(true); };
  const handleScope = (i: number) => { setScope(i); setInteracted(true); };

  const freqLabel = FREQ[frequency].text;
  const scopeLabel = SCOPE[scope].text;
  const btnLabel = interacted
    ? `Text us about the ${freqLabel} ${scopeLabel} plan — $${price}/mo →`
    : "Text us to build your plan →";

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100 w-full max-w-[540px] mx-auto">

      {/* Card header — green */}
      <div className="bg-[#006837] px-6 py-8 text-center">
        <p className="text-[#fbb03b] text-xs font-semibold tracking-widest uppercase mb-3">Build your plan</p>
        <div className="text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="text-[72px] font-bold leading-none">
            {interacted ? `$${price}` : "$60"}
          </span>
          <span className="text-2xl font-normal opacity-70">/mo</span>
        </div>
        <p className="text-white/60 text-sm mt-2">
          {interacted
            ? `${FREQ[frequency].label} yard service · El Dorado Hills`
            : "Bi-weekly yard service · El Dorado Hills"}
        </p>
      </div>

      {/* Card body */}
      <div className="px-6 py-8 space-y-8">

        {/* Frequency selector */}
        <div>
          <p className="text-[13px] font-semibold text-stone-500 uppercase tracking-wider mb-3">How often?</p>
          <div className="flex border border-stone-200 rounded-xl overflow-visible">
            {FREQ.map((f, i) => (
              <button
                key={i}
                onClick={() => handleFreq(i)}
                className={`flex-1 py-3 text-sm font-medium transition-all relative ${
                  frequency === i
                    ? "bg-[#006837] text-white"
                    : "bg-white text-stone-500 hover:bg-stone-50"
                } ${i > 0 ? "border-l border-stone-200" : ""} ${
                  i === 0 ? "rounded-l-xl" : ""
                } ${i === FREQ.length - 1 ? "rounded-r-xl" : ""}`}
              >
                {f.label}
                {"recommended" in f && f.recommended && frequency !== i && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 text-[10px] bg-[#fbb03b] text-[#006837] px-1.5 py-0.5 rounded font-bold leading-none whitespace-nowrap">
                    Popular
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Scope selector */}
        <div>
          <p className="text-[13px] font-semibold text-stone-500 uppercase tracking-wider mb-3">How much help?</p>
          <div className="flex rounded-xl overflow-hidden border border-stone-200">
            {SCOPE.map((s, i) => (
              <button
                key={i}
                onClick={() => handleScope(i)}
                className={`flex-1 py-3 text-sm font-medium transition-all ${
                  scope === i
                    ? "bg-[#006837] text-white"
                    : "bg-white text-stone-500 hover:bg-stone-50"
                } ${i > 0 ? "border-l border-stone-200" : ""}`}
              >
                <span className="block">{s.label}</span>
                {i > 0 && (
                  <span className={`text-[11px] ${scope === i ? "text-[#fbb03b]" : "text-stone-400"}`}>
                    +${s.addon}/mo
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Services list */}
        <div>
          <p className="text-[13px] font-semibold text-stone-500 uppercase tracking-wider mb-3">What's included</p>
          <ul className="space-y-2">
            {ALL_SERVICES.map((svc, i) => {
              const included = svc.minScope <= scope;
              return (
                <li
                  key={i}
                  className="flex items-center gap-2.5 transition-opacity"
                  style={{ opacity: included ? 1 : 0.3 }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: included ? "#006837" : "#9ca3af" }}
                  />
                  <span className={`text-[15px] ${included ? "text-[#1a1a1a]" : "text-stone-400"}`}>
                    {svc.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTA */}
        <div>
          <a
            href={smsHref}
            className="block w-full bg-[#f17c52] hover:bg-[#e06840] active:scale-[0.98] text-white text-center font-black py-4 rounded-xl transition-all text-[15px] leading-snug tracking-tight"
          >
            {btnLabel}
          </a>
          <p className="text-center mt-3">
            <a
              href="tel:9168472095"
              className="text-[#006837] text-sm hover:underline inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              Or call (916) 847-2095 — we pick up
            </a>
          </p>
          <p className="text-center text-[12px] text-stone-400 mt-2 leading-relaxed">
            No payment until your first visit. No contracts. Cancel anytime by text.
          </p>
        </div>
      </div>
    </div>
  );
}
