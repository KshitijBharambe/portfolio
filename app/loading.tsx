// app/loading.tsx
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-6"></div>
      <h3 className="text-xl font-medium text-white mb-2">Loading Projects</h3>
      <p className="text-gray-400 text-center max-w-md px-4">
        Fetching your projects from GitHub. This will only take a moment...
      </p>
    </div>
  );
}
