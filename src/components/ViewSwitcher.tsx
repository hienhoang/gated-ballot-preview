"use client";

import { useViewMode } from "./ViewModeContext";

function MonitorIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "white" : "rgba(255,255,255,0.5)"}
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
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "white" : "rgba(255,255,255,0.5)"}
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
    <div className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between bg-[#1a1a1a] px-4 h-9">
      {/* Left — label */}
      <p className="text-xs font-medium text-white/70 tracking-wide">
        Elections Prototype
      </p>

      {/* Center — view mode switcher */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-white/10 rounded-full p-0.5">
        <button
          type="button"
          onClick={() => setViewMode("mobile")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
            viewMode === "mobile"
              ? "bg-white/20 text-white"
              : "text-white/50 hover:text-white/70"
          }`}
          aria-label="Switch to mobile view"
        >
          <PhoneIcon active={viewMode === "mobile"} />
          <span>Mobile</span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode("desktop")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
            viewMode === "desktop"
              ? "bg-white/20 text-white"
              : "text-white/50 hover:text-white/70"
          }`}
          aria-label="Switch to desktop view"
        >
          <MonitorIcon active={viewMode === "desktop"} />
          <span>Desktop</span>
        </button>
      </div>

      {/* Right — disabled "Back to start" */}
      <button
        type="button"
        disabled
        className="flex items-center gap-1 text-[11px] font-medium text-white/30 cursor-not-allowed"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to start
      </button>
    </div>
  );
}
