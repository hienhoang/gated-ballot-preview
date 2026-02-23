"use client";

import { useViewMode } from "./ViewModeContext";

function MonitorIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#0d4dfb" : "#766f81"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function PhoneIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#0d4dfb" : "#766f81"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

export default function ViewSwitcher() {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-1 bg-white rounded-full shadow-lg border border-[#e1dde9] p-1">
      <button
        type="button"
        onClick={() => setViewMode("mobile")}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
          viewMode === "mobile"
            ? "bg-[#f0f7ff] text-[#0d4dfb]"
            : "text-[#766f81] hover:bg-gray-50"
        }`}
        aria-label="Switch to mobile view"
        title="Mobile view"
      >
        <PhoneIcon active={viewMode === "mobile"} />
        <span className="hidden sm:inline">Mobile</span>
      </button>
      <button
        type="button"
        onClick={() => setViewMode("desktop")}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
          viewMode === "desktop"
            ? "bg-[#f0f7ff] text-[#0d4dfb]"
            : "text-[#766f81] hover:bg-gray-50"
        }`}
        aria-label="Switch to desktop view"
        title="Desktop view"
      >
        <MonitorIcon active={viewMode === "desktop"} />
        <span className="hidden sm:inline">Desktop</span>
      </button>
    </div>
  );
}
