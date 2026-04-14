import { useState, useRef, useCallback } from "react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export function BeforeAfter({ beforeSrc, afterSrc, beforeAlt = "Before", afterAlt = "After" }: Props) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl aspect-[4/3] select-none touch-none cursor-col-resize shadow-lg ring-1 ring-black/5"
      onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
      onTouchEnd={() => { dragging.current = false; }}
    >
      <img
        src={beforeSrc}
        alt={beforeAlt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        width={800}
        height={600}
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={afterSrc}
          alt={afterAlt}
          className="absolute inset-0 w-full h-full object-cover"
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="absolute top-4 left-4 pointer-events-none">
        <span className="bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
          Before
        </span>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none">
        <span className="bg-[#006837]/85 backdrop-blur-md text-white text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
          After
        </span>
      </div>

      <div
        className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
        style={{
          left: `${pos}%`,
          background: "rgba(255,255,255,0.85)",
          boxShadow: "0 0 12px rgba(0,0,0,0.3)",
        }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 cursor-col-resize"
        style={{ left: `${pos}%` }}
        onMouseDown={(e) => { e.preventDefault(); dragging.current = true; }}
        onTouchStart={() => { dragging.current = true; }}
      >
        <div className="flex items-center gap-1">
          <svg className="w-7 h-7 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]" viewBox="0 0 24 24" fill="none">
            <path d="M14 6L8 12L14 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="w-7 h-7 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]" viewBox="0 0 24 24" fill="none">
            <path d="M10 6L16 12L10 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
