import type { FreqOption, ScopeOption, ServiceItem } from "../lib/quote";

const PhoneIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
import { DEFAULT_FREQ, DEFAULT_SCOPE, DEFAULT_SERVICES, calcPrice } from "../lib/quote";

interface Props {
  frequency: number;
  scope: number;
  interacted: boolean;
  setFrequency: (v: number) => void;
  setScope: (v: number) => void;
  setInteracted: (v: boolean) => void;
  frequencies?: FreqOption[];
  scopes?: ScopeOption[];
  services?: ServiceItem[];
  compact?: boolean;
}

export function QuoteBuilder({
  frequency, scope, interacted, setFrequency, setScope, setInteracted,
  frequencies, scopes, services, compact,
}: Props) {
  const FREQ = frequencies || DEFAULT_FREQ;
  const SCOPE = scopes || DEFAULT_SCOPE;
  const ALL_SERVICES = services || DEFAULT_SERVICES;

  const price = calcPrice(frequency, scope, FREQ, SCOPE);
  const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const sep = isIOS ? "&" : "?";
  const msgBody = `Hey, I'm interested in the ${SCOPE[scope]?.text || "basic"} ${FREQ[frequency]?.text || "monthly"} plan ($${price}/mo). Can you get me on the schedule?`;
  const smsHref = `sms:9168472095${sep}body=${encodeURIComponent(msgBody)}`;

  const handleFreq = (i: number) => { setFrequency(i); setInteracted(true); };
  const handleScope = (i: number) => { setScope(i); setInteracted(true); };

  const btnLabel = interacted
    ? `Text us — ${FREQ[frequency]?.text || ""} ${SCOPE[scope]?.text || ""}, $${price}/mo`
    : "Text us to get started";

  const cardBg = compact
    ? "bg-white/85 backdrop-blur-2xl backdrop-saturate-150 border-white/60"
    : "bg-white border-black/[0.04]";

  return (
    <div className={`rounded-3xl overflow-hidden w-full ${compact ? "max-w-[440px]" : "max-w-[540px]"} mx-auto shadow-[0_2px_40px_rgba(0,0,0,0.12)] border ${cardBg}`}>

      <div className={`px-6 ${compact ? "pt-6 pb-4" : "pt-10 pb-8"} text-center`}>
        <p className={`${compact ? "text-[#6b7280]" : "text-[#8e8e93]"} text-[13px] font-medium tracking-wide uppercase mb-3`}>Build your plan</p>
        <div className={compact ? "text-[#1a1a1a]" : "text-[#1a1a1a]"}>
          <span className={`${compact ? "text-[48px]" : "text-[64px]"} font-bold leading-none tracking-tight`}>
            ${interacted ? price : FREQ[0]?.price ?? 45}
          </span>
          <span className={`${compact ? "text-[20px]" : "text-[22px]"} font-normal text-[#8e8e93]`}>/mo</span>
        </div>
        <p className="text-[#8e8e93] text-[13px] mt-1.5">
          {interacted
            ? `${FREQ[frequency]?.label || ""} · ${SCOPE[scope]?.label || ""}`
            : "Monthly yard service · El Dorado Hills"}
        </p>
      </div>

      <div className={`px-6 ${compact ? "pb-5 space-y-4" : "pb-8 space-y-7"}`}>

        <div>
          <p className={`text-[12px] font-semibold text-[#8e8e93] uppercase tracking-wider ${compact ? "mb-2" : "mb-3"}`}>How often</p>
          <div className={`flex ${compact ? "bg-black/[0.06]" : "bg-[#f2f2f7]"} rounded-[10px] p-1`}>
            {FREQ.map((f, i) => (
              <button
                key={i}
                onClick={() => handleFreq(i)}
                className={`flex-1 py-2 text-[13px] font-medium rounded-[8px] transition-all duration-200 relative ${
                  frequency === i
                    ? `bg-white text-[#1a1a1a] shadow-[0_1px_4px_rgba(0,0,0,0.1)]`
                    : "text-[#8e8e93]"
                }`}
              >
                {f.label}
                {f.recommended && frequency !== i && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] bg-[#006837] text-white px-1.5 py-0.5 rounded-full font-semibold leading-none whitespace-nowrap">
                    Popular
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={`text-[12px] font-semibold text-[#8e8e93] uppercase tracking-wider ${compact ? "mb-2" : "mb-3"}`}>Service level</p>
          <div className={`flex ${compact ? "bg-black/[0.06]" : "bg-[#f2f2f7]"} rounded-[10px] p-1`}>
            {SCOPE.map((s, i) => (
              <button
                key={i}
                onClick={() => handleScope(i)}
                className={`flex-1 py-2 text-[13px] font-medium rounded-[8px] transition-all duration-200 ${
                  scope === i
                    ? "bg-white text-[#1a1a1a] shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
                    : "text-[#8e8e93]"
                }`}
              >
                <span className="block">{s.label}</span>
                {i > 0 && (
                  <span className="text-[10px] text-[#8e8e93]">+${s.addon}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={`text-[12px] font-semibold text-[#8e8e93] uppercase tracking-wider ${compact ? "mb-2" : "mb-3"}`}>Included</p>
          {compact ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {ALL_SERVICES.map((svc, i) => {
                const included = svc.minScope <= scope;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 transition-opacity"
                    style={{ opacity: included ? 1 : 0.3 }}
                  >
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: included ? "#006837" : "#d1d5db" }}
                    >
                      {included && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-[13px] leading-tight ${included ? "text-[#1a1a1a]" : "text-[#c7c7cc]"}`}>
                      {svc.name}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
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
          )}
        </div>

        <div className={compact ? "pt-0" : "pt-1"}>
          <a
            href={smsHref}
            className={`block w-full bg-[#006837] hover:bg-[#005030] active:scale-[0.98] text-white text-center font-semibold ${compact ? "py-3.5 rounded-[12px] text-[15px]" : "py-4 rounded-[14px] text-[16px]"} transition-all`}
          >
            {btnLabel}
          </a>
          <p className="text-center mt-2.5">
            <a
              href="tel:9168472095"
              className={`${compact ? "text-[#4a4a4a]" : "text-[#006837]"} text-[13px] hover:underline inline-flex items-center gap-1`}
            >
              <PhoneIcon className="w-3.5 h-3.5" />
              Or call (916) 847-2095
            </a>
          </p>
          {!compact && (
            <p className="text-center text-[12px] text-[#8e8e93] mt-2">
              No payment until your first visit. No contracts. Cancel anytime.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
