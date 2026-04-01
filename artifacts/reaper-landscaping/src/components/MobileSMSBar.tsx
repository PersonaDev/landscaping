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
    ? `Text us about the ${SCOPE[scope].text} ${FREQ[frequency].text} plan →`
    : "Tap to text us — we'll figure out the rest →";

  const microText = interacted
    ? `${FREQ[frequency].label} yard service · $${price}/mo · tap to confirm`
    : "No forms. No payment upfront. Just a text.";

  const handleClick = () => {
    setFlashing(true);
    setTimeout(() => setFlashing(false), 200);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 sm:hidden transition-transform duration-300 ease-out"
      style={{ transform: visible ? "translateY(0)" : "translateY(100%)" }}
    >
      <div
        className="px-4 pt-3 flex flex-col items-stretch"
        style={{
          background: "#1a5c30",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)",
        }}
      >
        <p className="text-center text-white/60 text-[12px] mb-2">{microText}</p>
        <a
          href={smsHref}
          onClick={handleClick}
          className="block w-full text-white font-bold text-[16px] text-center py-4 rounded-xl transition-colors duration-200 min-h-[56px] flex items-center justify-center"
          style={{ background: flashing ? "#155228" : "transparent", border: "1.5px solid rgba(255,255,255,0.25)" }}
        >
          {btnLabel}
        </a>
      </div>
    </div>
  );
}
