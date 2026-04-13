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

  const btnLabel = interacted
    ? `Text us about the ${FREQ[frequency].text} ${SCOPE[scope].text} plan - $${price}/mo`
    : "Text us to get started";

  return (
    <div className="bg-white rounded-3xl overflow-hidden w-full max-w-[540px] mx-auto shadow-[0_2px_40px_rgba(0,0,0,0.08)] border border-black/[0.04]">

      <div className="px-6 pt-10 pb-8 text-center">
        <p className="text-[#8e8e93] text-[13px] font-medium tracking-wide uppercase mb-4">Build your plan</p>
        <div className="text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="text-[64px] font-bold leading-none tracking-tight">
            ${interacted ? price : 45}
          </span>
          <span className="text-[22px] font-normal text-[#8e8e93]">/mo</span>
        </div>
        <p className="text-[#8e8e93] text-[14px] mt-2">
          {interacted
            ? `${FREQ[frequency].label} · ${SCOPE[scope].label}`
            : "Monthly yard service · El Dorado Hills"}
        </p>
      </div>

      <div className="px-6 pb-8 space-y-7">

        <div>
          <p className="text-[12px] font-semibold text-[#8e8e93] uppercase tracking-wider mb-3">How often</p>
          <div className="flex bg-[#f2f2f7] rounded-[12px] p-1">
            {FREQ.map((f, i) => (
              <button
                key={i}
                onClick={() => handleFreq(i)}
                className={`flex-1 py-2.5 text-[14px] font-medium rounded-[10px] transition-all duration-200 relative ${
                  frequency === i
                    ? "bg-white text-[#1a1a1a] shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                    : "text-[#8e8e93]"
                }`}
              >
                {f.label}
                {"recommended" in f && f.recommended && frequency !== i && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] bg-[#006837] text-white px-1.5 py-0.5 rounded-full font-semibold leading-none whitespace-nowrap">
                    Popular
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[12px] font-semibold text-[#8e8e93] uppercase tracking-wider mb-3">Service level</p>
          <div className="flex bg-[#f2f2f7] rounded-[12px] p-1">
            {SCOPE.map((s, i) => (
              <button
                key={i}
                onClick={() => handleScope(i)}
                className={`flex-1 py-2.5 text-[14px] font-medium rounded-[10px] transition-all duration-200 ${
                  scope === i
                    ? "bg-white text-[#1a1a1a] shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                    : "text-[#8e8e93]"
                }`}
              >
                <span className="block">{s.label}</span>
                {i > 0 && (
                  <span className="text-[11px] text-[#8e8e93]">+${s.addon}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[12px] font-semibold text-[#8e8e93] uppercase tracking-wider mb-3">What's included</p>
          <div className="space-y-0">
            {ALL_SERVICES.map((svc, i) => {
              const included = svc.minScope <= scope;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2.5 border-b border-[#f2f2f7] last:border-0 transition-opacity"
                  style={{ opacity: included ? 1 : 0.35 }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: included ? "#006837" : "#e5e5ea" }}
                  >
                    {included && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-[15px] ${included ? "text-[#1a1a1a]" : "text-[#c7c7cc]"}`}>
                    {svc.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-1">
          <a
            href={smsHref}
            className="block w-full bg-[#006837] hover:bg-[#005030] active:scale-[0.98] text-white text-center font-semibold py-4 rounded-[14px] transition-all text-[16px]"
          >
            {btnLabel}
          </a>
          <p className="text-center mt-3">
            <a
              href="tel:9168472095"
              className="text-[#006837] text-[14px] hover:underline inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              Or call (916) 847-2095
            </a>
          </p>
          <p className="text-center text-[12px] text-[#8e8e93] mt-2">
            No payment until your first visit. No contracts. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
