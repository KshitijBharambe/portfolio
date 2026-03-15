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
    <CardHoverRevealContext.Provider
      value={{
        isHovered,
        setIsHovered,
      }}
    >
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
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

const CardHoverRevealContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  const { isHovered } = useCardHoverRevealContext();
  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-[auto_1.5rem_1.5rem] p-6 backdrop-blur-lg",
        className,
      )}
      style={{
        transform: isHovered ? "translateY(0)" : "translateY(110%)",
        opacity: isHovered ? 1 : 0,
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
        ...style,
      }}
      {...props}
    />
  );
});
CardHoverRevealContent.displayName = "CardHoverRevealContent";

export { CardHoverReveal, CardHoverRevealMain, CardHoverRevealContent };
