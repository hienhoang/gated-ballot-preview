"use client";

import { useState, useEffect } from "react";
import { useViewMode } from "../ViewModeContext";

export interface EndorserQuote {
  name: string;
  avatar: string;
  verified?: boolean;
  quote: string;
}

export interface EndorserEntry {
  name: string;
  avatar: string;
  verified?: boolean;
}

export interface RecommendationData {
  candidateName: string;
  raceLabel: string;
  quotes: EndorserQuote[];
  allEndorsers: EndorserEntry[];
}

export interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RecommendationData;
  inline?: boolean;
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#403A49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#403A49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <div className="absolute w-3 h-3 bg-[#1aa11c] rounded-full p-[2px] left-[18px] top-[12px] z-10">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function RecommendationContent({
  onClose,
  data,
}: {
  onClose: () => void;
  data: RecommendationData;
}) {
  const totalEndorsements = data.allEndorsers.length;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 sticky top-0 bg-white z-10">
        <p className="font-bold text-sm leading-5 text-[#403a49]">
          {totalEndorsements} Recommendations
        </p>
        <button type="button" onClick={onClose} className="cursor-pointer">
          <CloseIcon />
        </button>
      </div>

      <div className="flex flex-col gap-10 px-8 pb-16 flex-1">
        {/* Candidate info */}
        <div className="flex flex-col gap-1 items-start w-full">
          <p className="font-bold text-sm leading-5 text-[#403a49]">
            {data.raceLabel} Candidate
          </p>
          <p className="font-bold text-2xl leading-8 text-[#403a49]">
            {data.candidateName}
          </p>
        </div>

        {/* Quote cards */}
        <div className="flex flex-col gap-2.5 items-start w-full">
          {data.quotes.map((q) => (
            <div
              key={q.name}
              className="border border-[#e1dde9] flex flex-col gap-5 items-start p-6 rounded-2xl w-full overflow-hidden"
            >
              <p className="italic text-xs leading-5 text-[#403a49] w-full" style={{ fontFamily: "'Merriweather', serif" }}>
                &ldquo;{q.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2.5 items-center relative">
                  <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={q.avatar} alt={q.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  {q.verified && <VerifiedBadge />}
                  <p className="font-bold text-xs leading-5 text-[#403a49]">{q.name}</p>
                </div>
                <ChevronRight />
              </div>
            </div>
          ))}
        </div>

        {/* All endorsements list */}
        <div className="flex flex-col gap-5 items-start w-full">
          <p className="font-bold text-sm leading-5 text-[#403a49]">
            All {totalEndorsements} recommendations
          </p>
          <div className="flex flex-col gap-2.5 items-start w-full">
            {data.allEndorsers.map((e) => (
              <div key={e.name} className="flex gap-2.5 items-start w-full relative">
                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-[#e1dde9] relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.avatar} alt={e.name} className="absolute inset-0 w-full h-full object-cover rounded-full" />
                </div>
                {e.verified && <VerifiedBadge />}
                <p className="flex-1 text-sm leading-5 text-[#403a49]">{e.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function RecommendationMobileContent({ data }: { data: RecommendationData }) {
  const totalEndorsements = data.allEndorsers.length;

  return (
    <div className="flex flex-col gap-10 px-8 pb-16">
      {/* Candidate info */}
      <div className="flex flex-col gap-1 items-start w-full">
        <p className="font-bold text-sm leading-5 text-[#403a49]">
          {data.raceLabel} Candidate
        </p>
        <p className="font-bold text-2xl leading-8 text-[#403a49]">
          {data.candidateName}
        </p>
      </div>

      {/* Quote cards */}
      <div className="flex flex-col gap-2.5 items-start w-full">
        {data.quotes.map((q) => (
          <div
            key={q.name}
            className="border border-[#e1dde9] flex flex-col gap-5 items-start p-6 rounded-2xl w-full overflow-hidden"
          >
            <p className="italic text-xs leading-5 text-[#403a49] w-full" style={{ fontFamily: "'Merriweather', serif" }}>
              &ldquo;{q.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2.5 items-center relative">
                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={q.avatar} alt={q.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                {q.verified && <VerifiedBadge />}
                <p className="font-bold text-xs leading-5 text-[#403a49]">{q.name}</p>
              </div>
              <ChevronRight />
            </div>
          </div>
        ))}
      </div>

      {/* All endorsements list */}
      <div className="flex flex-col gap-5 items-start w-full">
        <p className="font-bold text-sm leading-5 text-[#403a49]">
          All {totalEndorsements} recommendations
        </p>
        <div className="flex flex-col gap-2.5 items-start w-full">
          {data.allEndorsers.map((e) => (
            <div key={e.name} className="flex gap-2.5 items-start w-full relative">
              <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-[#e1dde9] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.avatar} alt={e.name} className="absolute inset-0 w-full h-full object-cover rounded-full" />
              </div>
              {e.verified && <VerifiedBadge />}
              <p className="flex-1 text-sm leading-5 text-[#403a49]">{e.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RecommendationModal({
  isOpen,
  onClose,
  data,
  inline = false,
}: RecommendationModalProps) {
  const { viewMode } = useViewMode();
  const isDesktop = viewMode === "desktop";
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (inline) {
    return (
      <div className="flex flex-col flex-1 min-h-full bg-white border-l border-[#e8e5ed]">
        <RecommendationContent onClose={onClose} data={data} />
      </div>
    );
  }

  if (!isDesktop && !isOpen && !show) return null;
  if (isDesktop) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-250 ease-out ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Recommendations"
        className={`absolute left-1/2 -translate-x-1/2 w-[375px] bottom-0 bg-white rounded-t-2xl flex flex-col shadow-[0px_-2px_16px_0px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-250 ease-out ${
          show
            ? "top-[60px] opacity-100 translate-y-0"
            : "top-[60px] opacity-0 translate-y-[40px]"
        }`}
      >
        {/* Fixed header */}
        <div className="flex items-center justify-between px-8 py-6 bg-white z-10 shrink-0">
          <p className="font-bold text-sm leading-5 text-[#403a49]">
            {data.allEndorsers.length} Recommendations
          </p>
          <button type="button" onClick={onClose} className="cursor-pointer">
            <CloseIcon />
          </button>
        </div>
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto flex flex-col bg-white hide-scrollbar">
          <RecommendationMobileContent data={data} />
        </div>
      </div>
    </div>
  );
}
