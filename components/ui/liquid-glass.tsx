"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── Context for global toggle ── */
const LiquidGlassContext = React.createContext<{
  enabled: boolean;
  toggle: () => void;
}>({ enabled: true, toggle: () => {} });

export function useLiquidGlass() {
  return React.useContext(LiquidGlassContext);
}

export function LiquidGlassProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = React.useState(true);
  const toggle = React.useCallback(() => setEnabled((v) => !v), []);
  return (
    <LiquidGlassContext.Provider value={{ enabled, toggle }}>
      {children}
    </LiquidGlassContext.Provider>
  );
}

/**
 * SVG filter — smoother, lighter distortion.
 * Rendered once at page level.
 */
export function LiquidGlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter
          id="liquid-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.02"
            numOctaves="1"
            seed="3"
            result="turbulence"
          />
          <feGaussianBlur
            in="turbulence"
            stdDeviation="5"
            result="blurredNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur
            in="displaced"
            stdDeviation="1.5"
            result="finalBlur"
          />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

/* ── Toggle button (bottom-right) ── */
export function LiquidGlassToggle() {
  const { enabled, toggle } = useLiquidGlass();
  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-wider uppercase transition-all duration-300 hover:border-[var(--accent)]/40 hover:bg-black/80 cursor-pointer select-none"
      style={{ color: enabled ? "var(--accent)" : "var(--text-muted)" }}
      aria-label="Toggle liquid glass effect"
    >
      <span
        className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
        style={{ background: enabled ? "var(--accent)" : "var(--text-muted)" }}
      />
      Glass {enabled ? "On" : "Off"}
    </button>
  );
}

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: string;
  intensity?: "subtle" | "medium" | "strong";
  children: React.ReactNode;
}

export function LiquidGlass({
  className,
  rounded = "rounded-2xl",
  intensity = "medium",
  children,
  ...props
}: LiquidGlassProps) {
  const { enabled } = useLiquidGlass();

  // When disabled, just render a plain wrapper
  if (!enabled) {
    return (
      <div className={cn("relative", rounded, className)} {...props}>
        {children}
      </div>
    );
  }

  const shadowStyles: Record<string, string> = {
    subtle:
      "shadow-[inset_1px_1px_0.5px_-1px_rgba(255,255,255,0.05),inset_-1px_-1px_0.5px_-1px_rgba(255,255,255,0.05),inset_0_0_3px_3px_rgba(255,255,255,0.03),0_0_6px_rgba(0,0,0,0.08)]",
    medium:
      "shadow-[inset_2px_2px_0.5px_-2px_rgba(255,255,255,0.06),inset_-2px_-2px_0.5px_-2px_rgba(255,255,255,0.06),inset_0.5px_0.5px_0.5px_-0.25px_rgba(255,255,255,0.04),inset_-0.5px_-0.5px_0.5px_-0.25px_rgba(255,255,255,0.04),inset_0_0_4px_4px_rgba(255,255,255,0.04),0_0_8px_rgba(0,0,0,0.1)]",
    strong:
      "shadow-[inset_2px_2px_0.5px_-2px_rgba(255,255,255,0.08),inset_-2px_-2px_0.5px_-2px_rgba(255,255,255,0.08),inset_1px_1px_0.5px_-0.5px_rgba(255,255,255,0.05),inset_-1px_-1px_0.5px_-0.5px_rgba(255,255,255,0.05),inset_0_0_5px_5px_rgba(255,255,255,0.06),0_0_10px_rgba(0,0,0,0.12)]",
  };

  return (
    <div className={cn("relative", rounded, className)} {...props}>
      {/* Inset shadow overlay */}
      <div
        className={cn(
          "absolute inset-0 z-0 pointer-events-none transition-opacity duration-500",
          rounded,
          shadowStyles[intensity]
        )}
      />

      {/* Glass distortion backdrop */}
      <div
        className={cn(
          "absolute inset-0 isolate -z-10 overflow-hidden pointer-events-none",
          rounded
        )}
        style={{ backdropFilter: 'url("#liquid-glass") blur(0.5px)' }}
      />

      {/* Content */}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
