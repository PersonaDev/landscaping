import { useState } from "react";
import { buildSMS, calcPrice, FREQ, SCOPE } from "../lib/quote";

interface Props {
  frequency: number;
  scope: number;
  interacted: boolean;
}

export function MobileSMSBar({ frequency, scope, interacted }: Props) {
  const [flashing, setFlashing] = useState(false);

  const price = calcPrice(frequency, scope);
  const smsHref = buildSMS(frequency, scope, interacted);

  const btnLabel = interacted
    ? `Text us about the ${SCOPE[scope].text} ${FREQ[frequency].text} plan`
    : "Text us, we'll handle the rest";

  const microText = interacted
    ? `${FREQ[frequency].label} · $${price}/mo · no contracts`
    : "No forms. No payment upfront. Just a text.";

  const handleClick = () => {
    setFlashing(true);
    setTimeout(() => setFlashing(false), 200);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] sm:hidden">
      <div
        style={{
          background: "#ffffff",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}
        className="px-4 pt-3 flex flex-col items-stretch"
      >
        <p className="text-center text-[#8e8e93] text-[12px] mb-2">{microText}</p>
        <a
          href={smsHref}
          onClick={handleClick}
          className="block w-full font-semibold text-[16px] text-center py-3.5 rounded-[14px] transition-all duration-150 min-h-[52px] flex items-center justify-center"
          style={{
            background: flashing ? "#005030" : "#006837",
            color: "#fff",
          }}
        >
          {btnLabel}
        </a>
      </div>
    </div>
  );
}
