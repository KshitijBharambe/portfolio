"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardHoverRevealContextValue {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}
const CardHoverRevealContext = React.createContext<CardHoverRevealContextValue>(
  {} as CardHoverRevealContextValue,
);
const useCardHoverRevealContext = () => {
  const context = React.useContext(CardHoverRevealContext);
  if (!context) {
    throw new Error(
      "useCardHoverRevealContext must be used within a CardHoverRevealProvider",
    );
  }
  return context;
};

const CardHoverReveal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <CardHoverRevealContext.Provider value={{ isHovered, setIsHovered }}>
      <div
        ref={ref}
        className={cn("relative overflow-hidden group", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    </CardHoverRevealContext.Provider>
  );
});
CardHoverReveal.displayName = "CardHoverReveal";

interface CardHoverRevealMainProps {
  initialScale?: number;
  hoverScale?: number;
}
const CardHoverRevealMain = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CardHoverRevealMainProps
>(({ className, initialScale = 1, hoverScale = 1.05, style, ...props }, ref) => {
  const { isHovered } = useCardHoverRevealContext();
  return (
    <div
      ref={ref}
      className={cn("size-full transition-transform duration-300", className)}
      style={{
        transform: `scale(${isHovered ? hoverScale : initialScale})`,
        ...style,
      }}
      {...props}
    />
  );
});
CardHoverRevealMain.displayName = "CardHoverRevealMain";

/* ── Stagger item ── */
const StaggerChild = ({
  isHovered,
  index,
  delay,
  children,
}: {
  isHovered: boolean;
  index: number;
  delay: number;
  children: React.ReactNode;
}) => {
  const d = index * delay;
  return (
    <div
      className="reveal-stagger-child"
      style={
        {
          "--stagger-delay": `${d}s`,
        } as React.CSSProperties
      }
      data-visible={isHovered}
    >
      {children}
    </div>
  );
};

const CardHoverRevealContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { staggerDelay?: number }
>(({ className, style, children, staggerDelay = 0.08, ...props }, ref) => {
  const { isHovered } = useCardHoverRevealContext();
  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-[auto_1.5rem_1.5rem] p-6 backdrop-blur-lg",
        className,
      )}
      style={{
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? "translateY(0)" : "translateY(20px)",
        transition:
          "opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        pointerEvents: isHovered ? "auto" : "none",
        ...style,
      }}
      {...props}
    >
      {React.Children.map(children, (child, i) =>
        React.isValidElement(child) ? (
          <StaggerChild isHovered={isHovered} index={i} delay={staggerDelay}>
            {child}
          </StaggerChild>
        ) : (
          child
        ),
      )}
    </div>
  );
});
CardHoverRevealContent.displayName = "CardHoverRevealContent";

export { CardHoverReveal, CardHoverRevealMain, CardHoverRevealContent };
