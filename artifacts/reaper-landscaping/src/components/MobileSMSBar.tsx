import { useEffect, useState } from "react";
import { buildSMS, calcPrice, FREQ, SCOPE } from "../lib/quote";

interface Props {
  frequency: number;
  scope: number;
  interacted: boolean;
}

export function MobileSMSBar({ frequency, scope, interacted }: Props) {
  const [visible, setVisible] = useState(false);
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      if (!visible && window.scrollY > 0) {
        timer = setTimeout(() => setVisible(true), 1500);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const price = calcPrice(frequency, scope);
  const smsHref = buildSMS(frequency, scope, interacted);

  const btnLabel = interacted
    ? `Text us about the ${SCOPE[scope].text} ${FREQ[frequency].text} plan`
    : "Text us — we'll handle the rest";

  const microText = interacted
    ? `${FREQ[frequency].label} · $${price}/mo · no contracts`
    : "No forms. No payment upfront. Just a text.";

  const handleClick = () => {
    setFlashing(true);
    setTimeout(() => setFlashing(false), 200);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] sm:hidden transition-transform duration-300 ease-out"
      style={{ transform: visible ? "translateY(0)" : "translateY(100%)" }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)",
        }}
        className="px-4 pt-3 flex flex-col items-stretch"
      >
        <p className="text-center text-[#6b7280] text-[12px] mb-2 tracking-wide">{microText}</p>
        <a
          href={smsHref}
          onClick={handleClick}
          className="block w-full font-semibold text-[16px] text-center py-3.5 rounded-[14px] transition-all duration-200 min-h-[52px] flex items-center justify-center"
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
