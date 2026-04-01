import { useState, useRef, useCallback } from "react";

interface Props {
  beforeLabel: string;
  afterLabel: string;
}

export function BeforeAfter({ beforeLabel, afterLabel }: Props) {
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
      className="relative overflow-hidden rounded-2xl aspect-[4/3] select-none touch-none cursor-col-resize"
      onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {/* Before panel */}
      <div className="absolute inset-0 bg-stone-300 flex items-center justify-center p-4">
        <p className="text-stone-600 text-xs font-medium text-center leading-relaxed">{beforeLabel}</p>
      </div>

      {/* After panel — clipped to right of divider */}
      <div
        className="absolute inset-0 bg-green-100 flex items-center justify-center p-4 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <p className="text-green-800 text-xs font-medium text-center leading-relaxed">{afterLabel}</p>
      </div>

      {/* BEFORE badge */}
      <div className="absolute top-3 left-3 bg-black/55 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md pointer-events-none">
        Before
      </div>

      {/* AFTER badge */}
      <div className="absolute top-3 right-3 bg-[#1a5c30]/80 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md pointer-events-none">
        After
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none"
        style={{ left: `${pos}%` }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center cursor-col-resize z-10"
        style={{ left: `${pos}%` }}
        onMouseDown={(e) => { e.preventDefault(); dragging.current = true; }}
        onTouchStart={() => { dragging.current = true; }}
      >
        <svg className="w-4 h-4 text-[#1a5c30]" viewBox="0 0 20 20" fill="none">
          <path d="M7 4L4 10L7 16M13 4L16 10L13 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
