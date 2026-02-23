"use client";

import { useState, useEffect } from "react";
import { useViewMode } from "../ViewModeContext";
import { assets } from "./assets";

export interface CandidateComparison {
  name: string;
  photo: string;
  stance: string;
}

export interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  raceTitle: string;
  roleDescription: string;
  candidateCount: number;
  candidates: CandidateComparison[];
  inline?: boolean;
}

const ISSUES = [
  { label: "All", emoji: "" },
  { label: "Affordable Housing", emoji: "🏘️" },
  { label: "Public Transit", emoji: "🚍" },
  { label: "Environment", emoji: "🌳" },
];

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#403A49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function CompareContent({
  onClose,
  raceTitle,
  roleDescription,
  candidateCount,
  candidates,
  headerLabel,
}: {
  onClose: () => void;
  raceTitle: string;
  roleDescription: string;
  candidateCount: number;
  candidates: CandidateComparison[];
  headerLabel: string;
}) {
  const [activeIssue, setActiveIssue] = useState("Affordable Housing");
  const [showAll, setShowAll] = useState(false);

  const visibleCandidates = showAll ? candidates : candidates.slice(0, 3);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 sticky top-0 bg-white z-10">
        <p className="font-bold text-sm leading-5 text-[#403a49]">{headerLabel}</p>
        <button type="button" onClick={onClose} className="cursor-pointer">
          <CloseIcon />
        </button>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-5 items-start w-full pl-8 pr-5 pt-0">
        <p className="font-bold text-2xl leading-8 text-[#403a49] tracking-[-1px]">
          Compare {candidateCount} candidates
        </p>
      </div>

      {/* Filter pills — horizontal scroll, bleeds off right edge */}
      <div className="flex gap-2.5 items-start overflow-x-auto hide-scrollbar pl-8 pr-4 pt-5 pb-1 flex-nowrap shrink-0">
        {ISSUES.map((issue) => {
          const isActive = activeIssue === issue.label;
          return (
            <button
              key={issue.label}
              type="button"
              onClick={() => setActiveIssue(issue.label)}
              className={`flex gap-1.5 items-center px-3.5 py-2 rounded-3xl border text-xs leading-5 cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? "bg-[#cddbff] border-[#a5b9ff] text-[#003cd6]"
                  : "bg-white border-[#e1dde9] text-[#766f81]"
              }`}
            >
              {issue.emoji && <span className="text-sm">{issue.emoji}</span>}
              {issue.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-8 pl-8 pr-5 pb-16 flex-1 pt-8">
        {/* Candidates */}
        <div className="flex flex-col gap-8 items-start w-full">
          {visibleCandidates.map((c) => (
            <div key={c.name} className="flex flex-col gap-2.5 items-start w-full">
              <div className="flex gap-1.5 items-center">
                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.photo} alt={c.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <p className="font-bold text-sm leading-5 text-[#403a49]">{c.name}</p>
              </div>
              <p className="text-sm leading-5 text-[#766f81]">{c.stance}</p>
            </div>
          ))}
          {!showAll && candidates.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="text-xs leading-5 text-[#0d4dfb] cursor-pointer"
            >
              Show all candidates
            </button>
          )}
        </div>

        {/* Ballot CTA */}
        <div className="border border-[#e1dde9] flex flex-col gap-5 items-start p-6 rounded-2xl w-full">
          <div className="flex flex-col gap-5 items-center w-full">
            <div className="relative inline-flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={assets.ctaPinLeft} alt="" className="h-[86px] w-[64px] object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={assets.ctaPinRight} alt="" className="h-[54px] w-[37px] object-cover mt-8 -ml-3" />
            </div>
            <div className="flex flex-col gap-1 items-start w-full text-center text-[#403a49]">
              <p className="font-bold text-base leading-6 w-full">Is this race on your ballot?</p>
              <p className="text-sm leading-5 w-full">Ballots vary by address and election. Enter an address to see what&apos;s on yours.</p>
            </div>
          </div>
          <div className="flex items-start w-full">
            <div className="bg-white border-l border-t border-b border-[#766f81] flex flex-1 gap-2 items-center p-3 rounded-tl-lg rounded-bl-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#766f81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="flex-1 text-base leading-6 text-[rgba(64,58,73,0.4)]">Search address</p>
            </div>
            <button className="bg-[#ffdb00] flex items-center justify-center px-3 py-3.5 rounded-tr-lg rounded-br-lg shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#403A49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Role description */}
      <div className="border-t border-[#e1dde9] flex flex-col gap-2.5 items-start p-6 w-full">
        <p className="font-bold text-base leading-6 text-[#403a49] w-full">
          What the {raceTitle.split(" ").slice(-1)[0]} does
        </p>
        <p className="text-sm leading-5 text-[#403a49] w-full">{roleDescription}</p>
      </div>
    </>
  );
}

export default function CompareModal({
  isOpen,
  onClose,
  raceTitle,
  roleDescription,
  candidateCount,
  candidates,
  inline = false,
}: CompareModalProps) {
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

  const headerLabel = raceTitle;

  if (inline) {
    return (
      <div className="flex flex-col flex-1 min-h-full bg-white border-l border-[#e8e5ed]">
        <CompareContent
          onClose={onClose}
          raceTitle={raceTitle}
          roleDescription={roleDescription}
          candidateCount={candidateCount}
          candidates={candidates}
          headerLabel={headerLabel}
        />
      </div>
    );
  }

  if (!isOpen && !show) return null;

  // Mobile modal — same shell as AddressSearchModal
  return (
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-250 ease-out ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Compare candidates"
        className={`absolute left-1/2 -translate-x-1/2 w-[375px] bottom-0 bg-white rounded-t-2xl flex flex-col shadow-[0px_-2px_16px_0px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-250 ease-out ${
          show
            ? "top-[60px] opacity-100 translate-y-0"
            : "top-[60px] opacity-0 translate-y-[40px]"
        }`}
      >
        <div className="flex-1 overflow-y-auto flex flex-col hide-scrollbar">
          <CompareContent
            onClose={onClose}
            raceTitle={raceTitle}
            roleDescription={roleDescription}
            candidateCount={candidateCount}
            candidates={candidates}
            headerLabel={headerLabel}
          />
        </div>
      </div>
    </div>
  );
}
