import { cn } from "@/lib/utils";

interface DotPatternProps {
  className?: string;
  gapSize?: number;
  dotSize?: number;
}

export function DotPattern({
  className,
  gapSize = 24,
  dotSize = 1.2,
}: DotPatternProps) {
  const id = "dot-pattern";
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-white/[0.08]",
        className
      )}
    >
      <defs>
        <pattern
          id={id}
          width={gapSize}
          height={gapSize}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx={dotSize} cy={dotSize} r={dotSize} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
