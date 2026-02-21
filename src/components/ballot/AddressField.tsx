"use client";

import { forwardRef } from "react";

interface AddressFieldProps {
  placeholder?: string;
  value?: string;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const AddressField = forwardRef<HTMLButtonElement, AddressFieldProps>(
  function AddressField(
    { placeholder = "Search address or location", value, onClick, onKeyDown },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
          onKeyDown?.(e);
        }}
        className="bg-white border border-[#766f81] flex w-full gap-2 items-center p-3 rounded-lg text-left cursor-pointer transition-colors hover:border-[#0d4dfb] hover:bg-[#E2EFFF] focus:outline-2 focus:outline-[#0d4dfb] focus:outline-offset-2"
        aria-label={value || placeholder}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#766f81"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span
          className={`flex-1 text-[16px] leading-6 ${
            value ? "text-[#403a49]" : "text-[rgba(64,58,73,0.4)]"
          }`}
        >
          {value || placeholder}
        </span>
      </button>
    );
  }
);

export default AddressField;
