"use client";

import { useViewMode } from "../ViewModeContext";

interface SectionHeaderProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function SectionHeader({ label, isOpen, onToggle }: SectionHeaderProps) {
  const { viewMode } = useViewMode();
  const isDesktop = viewMode === "desktop";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`border-t border-[#e1dde9] flex items-center justify-between pl-8 w-full cursor-pointer ${isDesktop ? "pr-8" : "pr-4"}`}
    >
      <p className={`font-bold leading-5 text-[#403a49] ${isDesktop ? "text-sm" : "text-xs"}`}>{label}</p>
      <div className="flex items-center p-2.5">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#403A49"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </button>
  );
}
