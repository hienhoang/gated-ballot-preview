"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { assets } from "./assets";
import {
  Logo,
  FilterKey,
  BallotFilters,
  AllRaces,
  SourceDisclaimer,
  VoterGuides,
  ShareCTA,
  Footer,
} from "./BallotPreview";

function FullBallotHero({ address }: { address: string }) {
  return (
    <div className="flex flex-col gap-8 items-start w-full">
      {/* Navigation */}
      <div className="bg-white flex items-center justify-between overflow-hidden sticky top-0 w-full z-30">
        <div className="flex items-center px-5">
          <div className="w-8 h-8 overflow-hidden relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.symbolLogo} alt="change.vote" className="absolute w-full h-full" />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="bg-[#403a49] flex gap-1 items-center justify-center pl-2.5 pr-1 py-0.5 rounded-full">
            <span className="text-xs leading-5 text-white">✨</span>
            <span className="text-xs leading-5 text-white">Guided View</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
          <div className="p-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#403A49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hero text */}
      <div className="flex flex-col items-start px-8 w-full">
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex flex-col items-start w-full">
            <p className="font-bold text-sm leading-5 text-[#403a49]">
              Fort Worth March 2026 Ballot
            </p>
            <p className="font-bold text-[24px] leading-8 text-[#403a49]">
              Your ballot
            </p>
          </div>
          <p className="text-sm leading-5 text-[#403a49] max-w-[311px]">
            Your vote on March 3rd will shape funding for
            affordable housing, rail lines, seawalls, and
            neighborhood safety.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FullBallotView({ address }: { address: string }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const router = useRouter();

  return (
    <>
      <div className="bg-white flex flex-col gap-8 items-start w-[375px] mx-auto">
        <FullBallotHero address={address} />
        <BallotFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <AllRaces activeFilter={activeFilter} showAddIssues />
        <SourceDisclaimer />
        <VoterGuides />
        <ShareCTA />
        <Footer />
      </div>

      {/* Docked prototype bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e1dde9]">
        <div className="flex items-center justify-between p-10">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-[#403a49] text-white font-bold text-sm leading-5 px-5 py-3 rounded-lg cursor-pointer hover:bg-[#2e2834] transition-colors"
          >
            Back to start
          </button>
          <p className="font-bold text-sm leading-5 text-[#403a49]">
            End of prototype
          </p>
        </div>
      </div>
    </>
  );
}
