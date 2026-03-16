"use client";
import { useState, useCallback, useRef, useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: "hover" | "mount";
  speed?: number;
}

export function TextScramble({
  text,
  className = "",
  trigger = "hover",
  speed = 30,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef(0);
  const hasMounted = useRef(false);

  const scramble = useCallback(() => {
    setIsScrambling(true);
    frameRef.current = 0;
    const duration = text.length * 3;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      frameRef.current++;
      const progress = frameRef.current / duration;
      const revealedLength = Math.floor(progress * text.length);

      const newText = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealedLength) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(newText);

      if (frameRef.current >= duration) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  }, [text, speed]);

  // Mount trigger
  useEffect(() => {
    if (trigger === "mount" && !hasMounted.current) {
      hasMounted.current = true;
      scramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger, scramble]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      scramble();
    }
  };

  const handleMouseLeave = () => {
    // noop — reserved for future unscramble-on-leave
  };

  return (
    <span
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className={`inline-block transition-all duration-100 ${
            isScrambling && char !== text[i]
              ? "text-[var(--cyan)] scale-105"
              : ""
          }`}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
