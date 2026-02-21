"use client";

interface SectionHeaderProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function SectionHeader({ label, isOpen, onToggle }: SectionHeaderProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="border-t border-[#e1dde9] flex items-center justify-between pl-8 pr-4 w-full cursor-pointer"
    >
      <p className="font-bold text-xs leading-5 text-[#403a49]">{label}</p>
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
