// app/loading.tsx
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--accent)] mb-6" />
      <h3 className="text-xl font-medium text-[var(--foreground)] mb-2">Loading Projects</h3>
      <p className="text-[var(--text-secondary)] text-center max-w-md px-4">
        Fetching your projects from GitHub. This will only take a moment...
      </p>
    </div>
  );
}
