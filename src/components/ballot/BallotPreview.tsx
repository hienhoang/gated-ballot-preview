"use client";

import React, { useState, useMemo, useRef } from "react";
import { assets } from "./assets";
import AddressField from "./AddressField";
import AddressSearchModal from "./AddressSearchModal";
import SectionHeader from "./SectionHeader";
import RaceSection from "./RaceSection";
import CandidateCard from "./CandidateCard";
import MeasureCard from "./MeasureCard";
import CompareModal from "./CompareModal";
import RecommendationModal, { type RecommendationData } from "./RecommendationModal";
import { useViewMode } from "../ViewModeContext";

export function Logo() {
  // Baseline alignment: "change." (viewBox 20 tall) has its baseline at y≈15.88.
  // At 20px rendered, baseline = 15.88px from top. The "g" descender extends to y=20.
  // "vote" letters have baselines at their SVG bottom edge.
  // "v"/"t" viewBox heights ≈15px, "o"/"e" ≈12.5px.
  // With items-start, "v" at 15px has its baseline at 15px — needs +0.88px to reach 15.88.
  // Within vote group, items-end ensures o/e bottoms align with v/t bottoms (all baselines).
  return (
    <div className="inline-flex items-start">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={assets.logo} alt="change." className="h-5 w-auto" />
      <div className="flex items-end mt-[0.9px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assets.logoV} alt="" className="h-[15.1px] w-auto" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assets.logoPath2} alt="" className="h-[12.5px] w-auto" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assets.logoVote} alt="" className="h-[15px] w-auto" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assets.logoPath1} alt="" className="h-[12.5px] w-auto" />
      </div>
    </div>
  );
}

interface HeroSectionProps {
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  selectedAddress: string;
  onOpenModal: () => void;
  isDesktop?: boolean;
}

function HeroSection({ triggerRef, selectedAddress, onOpenModal, isDesktop }: HeroSectionProps) {
  return (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-3 items-start w-full">
        <div className="flex flex-col items-center py-5 w-full">
          <div className="bg-white flex items-center justify-center w-full overflow-hidden sticky top-0">
            <Logo />
          </div>
        </div>
        <div className="flex flex-col gap-2.5 items-center px-8 w-full">
          <p className={`leading-5 text-[#403a49] ${isDesktop ? "text-sm" : "text-xs"}`}>
            <span className="font-bold">Primary Election</span>
            <span className="text-[rgba(64,58,73,0.4)]"> | </span>
            <span className="font-bold"> March 3, 2026</span>
          </p>
          <div className="flex flex-col items-start w-full">
            <p className={`font-bold text-[#403a49] text-center tracking-[-0.32px] w-full ${
              isDesktop ? "text-[40px] leading-[48px] tracking-[-2px]" : "text-[32px] leading-10"
            }`}>
              What&apos;s on the ballot for Fort Worth.
            </p>
          </div>
          <p className={`leading-6 text-[#403a49] text-center ${
            isDesktop ? "text-[16px] max-w-[420px]" : "text-[16px] max-w-[311px]"
          }`}>
            See the candidates and measures you&apos;ll vote on without partisan bias.
          </p>
        </div>
      </div>

      <div className={`flex flex-col gap-2.5 items-start w-full ${isDesktop ? "px-8 max-w-[500px] mx-auto" : "px-8"}`}>
        <AddressField
          ref={triggerRef}
          value={selectedAddress}
          onClick={onOpenModal}
        />
        <p className="text-xs leading-5 text-[#766f81] text-center w-full">
          By continuing, you agree to the{" "}
          <span className="text-[#003cd6]">ToS</span> &{" "}
          <span className="text-[#003cd6]">Privacy Policy</span>.
        </p>
      </div>

      <div className="flex flex-col gap-5 items-start w-full">
        <div className="flex flex-col gap-2.5 items-start px-8 w-full">
          <p className="text-xs leading-5 text-[#766f81] text-center w-full">
            Powered by deep research and local sources
          </p>
          <div className="flex flex-wrap gap-5 items-center justify-center opacity-40 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.logo1} alt="" className="h-5 w-[74px] object-cover grayscale" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.logo2} alt="" className="h-5 w-[35px] object-contain grayscale" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.logo3} alt="" className="h-5 w-[30px] object-cover grayscale" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.logo4} alt="" className="h-5 w-[51px] object-cover grayscale" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.logo5} alt="" className="h-5 w-[40px] object-cover grayscale" />
          </div>
        </div>
        <div
          className={`overflow-hidden relative w-full ${isDesktop ? "h-[120px]" : "h-[84px]"}`}
          style={{
            backgroundImage: `url(${assets.fortWorth})`,
            backgroundRepeat: "repeat-x",
            backgroundSize: isDesktop ? "auto 130px" : "auto 94px",
            backgroundPosition: "center top",
          }}
          role="img"
          aria-label="Fort Worth neighborhood"
        />
      </div>
    </div>
  );
}

export type RaceFilterKey = "senate" | "house" | "governor" | "lt_governor";
export type FilterKey = "all" | RaceFilterKey;
export type PartyFilter = "all" | "democrat" | "republican";

const PARTY_OPTIONS: { key: PartyFilter; label: string; iconSrc: string; iconW: number; iconH: number }[] = [
  { key: "all", label: "All Primaries", iconSrc: assets.allPrimariesIcon, iconW: 20, iconH: 20 },
  { key: "democrat", label: "Democratic Party", iconSrc: assets.democraticPartyIcon, iconW: 20, iconH: 17 },
  { key: "republican", label: "Republican Party", iconSrc: assets.republicanPartyIcon, iconW: 20, iconH: 15 },
];

interface BallotFiltersProps {
  activeFilters: Set<RaceFilterKey>;
  onToggleFilter: (filter: RaceFilterKey) => void;
  partyFilter: PartyFilter;
  onPartyFilterChange: (filter: PartyFilter) => void;
  onResetAll: () => void;
}

export function BallotFilters({ activeFilters, onToggleFilter, partyFilter, onPartyFilterChange, onResetAll }: BallotFiltersProps) {
  const { viewMode } = useViewMode();
  const isDesktop = viewMode === "desktop";
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobilePhase, setMobilePhase] = useState<"closed" | "entering" | "open" | "leaving">("closed");
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filters: { key: RaceFilterKey; label: string }[] = [
    { key: "senate", label: "Senate" },
    { key: "house", label: "House" },
    { key: "governor", label: "Governor" },
    { key: "lt_governor", label: "Lieutenant Governor" },
  ];

  const activeParty = PARTY_OPTIONS.find((p) => p.key === partyFilter) || PARTY_OPTIONS[0];
  const isAnyFilterActive = activeFilters.size > 0 || partyFilter !== "all";

  const openMobileSheet = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setMobilePhase("entering");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMobilePhase("open"));
    });
  };

  const closeMobileSheet = () => {
    setMobilePhase("leaving");
    leaveTimerRef.current = setTimeout(() => setMobilePhase("closed"), 250);
  };

  const handlePartySelect = (key: PartyFilter) => {
    onPartyFilterChange(key);
    if (isDesktop) {
      setDesktopDropdownOpen(false);
    } else {
      closeMobileSheet();
    }
  };

  const handlePillClick = () => {
    if (isDesktop) {
      setDesktopDropdownOpen(!desktopDropdownOpen);
    } else {
      openMobileSheet();
    }
  };

  const PartyIcon = ({ option, size }: { option: typeof PARTY_OPTIONS[number]; size?: number }) => {
    const w = size || option.iconW;
    const h = size ? (size * option.iconH / option.iconW) : option.iconH;
    return (
      <span className="shrink-0 flex items-center justify-center" style={{ width: w, height: w }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={option.iconSrc} alt="" style={{ width: w, height: h }} />
      </span>
    );
  };

  const mobileShow = mobilePhase === "open";

  return (
    <div className={`flex flex-col gap-3 items-start pl-8 w-full ${isDesktop ? "" : "overflow-hidden"}`}>
      <div className="flex items-start justify-between pr-8 w-full">
        <p className={`font-bold leading-5 text-[#403a49] ${isDesktop ? "text-sm" : "text-xs"}`}>
          Filter Ballot
        </p>
        <button
          type="button"
          onClick={onResetAll}
          className={`text-xs leading-5 text-right cursor-pointer ${
            isAnyFilterActive
              ? "text-[#0d4dfb]"
              : "text-[rgba(64,58,73,0.4)]"
          }`}
        >
          Reset
        </button>
      </div>
      <div className={`flex gap-3 items-center w-full ${isDesktop ? "" : "overflow-x-auto"}`}>
        {/* Party primary pill */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={handlePillClick}
            className={`flex gap-2 items-center px-4 py-2 rounded-3xl shrink-0 cursor-pointer border transition-colors ${
              partyFilter !== "all"
                ? "bg-[#cddbff] border-[#a5b9ff]"
                : "bg-white border-[#e1dde9]"
            }`}
          >
            <PartyIcon option={activeParty} size={isDesktop ? 20 : 16} />
            <p className={`leading-5 ${isDesktop ? "text-sm" : "text-xs"} ${partyFilter !== "all" ? "text-[#003cd6]" : "text-[#766f81]"}`}>
              {activeParty.label}
            </p>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={partyFilter !== "all" ? "#003cd6" : "#766f81"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Desktop: dropdown menu */}
          {isDesktop && desktopDropdownOpen && (
            <>
              <div className="fixed inset-0 z-[70]" onClick={() => setDesktopDropdownOpen(false)} />
              <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-[0px_3px_19px_rgba(58,41,62,0.06),0px_2px_2px_rgba(0,0,0,0.05)] z-[71] min-w-[240px] overflow-hidden">
                {PARTY_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => handlePartySelect(option.key)}
                    className="flex gap-2.5 items-center px-8 py-4 w-full cursor-pointer hover:bg-gray-50 border-b border-[#e1dde9] last:border-b-0 transition-colors"
                  >
                    <PartyIcon option={option} />
                    <p className="flex-1 text-base leading-6 text-[#403a49] text-left">{option.label}</p>
                    {partyFilter === option.key && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d4dfb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="w-px h-[20px] bg-[#e1dde9] shrink-0" />
        <div className="flex gap-1 items-center">
          {filters.map((filter) => {
            const isActive = activeFilters.has(filter.key);
            return (
              <button
                type="button"
                key={filter.key}
                onClick={() => onToggleFilter(filter.key)}
                className={`flex items-center px-4 py-2 rounded-3xl shrink-0 cursor-pointer border transition-colors outline-none ${
                  isActive
                    ? "bg-[#cddbff] border-[#a5b9ff] text-[#003cd6]"
                    : "bg-white border-[#e1dde9] text-[#766f81] hover:bg-[#f0f7ff] hover:border-[#4771ff] hover:text-[#003cd6] focus-visible:border-[#4771ff] focus-visible:shadow-[0px_0px_0px_8px_rgba(71,113,255,0.2)]"
                }`}
              >
                <p className={`leading-5 ${isDesktop ? "text-sm" : "text-xs"}`}>{filter.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile: modal bottom sheet — same pattern as AddressSearchModal */}
      {!isDesktop && mobilePhase !== "closed" && (
        <div className="fixed inset-0 z-50" aria-hidden={!mobileShow}>
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-250 ease-out ${
              mobileShow ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMobileSheet}
          />
          {/* Modal panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter by Party Primary"
            className={`absolute left-1/2 -translate-x-1/2 w-[375px] bottom-0 bg-white rounded-t-2xl flex flex-col shadow-[0px_-2px_16px_0px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-250 ease-out ${
              mobileShow
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-[40px]"
            }`}
            style={{ minHeight: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 shrink-0">
              <p className="font-bold text-sm leading-5 text-[#403a49]">Filter by Party Primary</p>
              <button type="button" onClick={closeMobileSheet} className="cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#403a49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {/* Options */}
            <div className="flex flex-col">
              {PARTY_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => handlePartySelect(option.key)}
                  className="flex gap-2.5 items-center px-8 h-14 w-full cursor-pointer border-b border-[#e1dde9] transition-colors"
                >
                  <PartyIcon option={option} />
                  <p className="flex-1 text-base leading-6 text-[#403a49] text-left">{option.label}</p>
                  {partyFilter === option.key && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d4dfb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            {/* Safe-area bottom spacer */}
            <div className="h-16 shrink-0" />
          </div>
        </div>
      )}
    </div>
  );
}

export interface CandidateComparison {
  name: string;
  photo: string;
  stance: string;
}

export interface RaceData {
  title: string;
  candidateCount: number;
  filterKey: FilterKey;
  section: "federal" | "state" | "local";
  type: "candidate" | "measure" | "board";
  candidates: React.ReactNode;
  comparisonCandidates?: CandidateComparison[];
  roleDescription?: string;
}

export function AllRaces({ activeFilters, partyFilter = "all", showAddIssues = false, onCompare, compareActiveTitle, onRecommendation, recActiveCandidateName }: { activeFilters: Set<RaceFilterKey>; partyFilter?: PartyFilter; showAddIssues?: boolean; onCompare?: (race: RaceData) => void; compareActiveTitle?: string; onRecommendation?: (data: RecommendationData) => void; recActiveCandidateName?: string }) {
  const e1 = assets.endorser1;
  const e2 = assets.endorser2;
  const e3 = assets.endorser3;
  const e4 = assets.endorser4;
  const e5 = assets.endorser5;
  const e6 = assets.endorser6;
  const e7 = assets.endorser7;
  const e8 = assets.endorser8;
  const e9 = assets.endorser9;
  const e10 = assets.endorser10;
  const e11 = assets.endorser11;
  const e12 = assets.endorser12;
  const e13 = assets.endorser13;
  const e14 = assets.endorser14;
  const e15 = assets.endorser15;
  const e16 = assets.endorser16;
  const e17 = assets.endorser17;
  const e18 = assets.endorser18;
  const e19 = assets.endorser19;
  const e20 = assets.endorser20;

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    federal: true,
    state: true,
    local: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const recommendationMap: Record<string, RecommendationData> = useMemo(() => ({
    "Colin Allred": {
      candidateName: "Colin Allred",
      raceLabel: "U.S. Senate",
      quotes: [
        { name: "Texas AFL-CIO", avatar: e1, verified: true, quote: "Colin Allred has been a tireless fighter for working families in Texas. His record on healthcare access and labor protections is exactly what the Senate needs." },
        { name: "Mothers Against Gun Violence TX", avatar: e3, verified: true, quote: "Allred's commitment to common-sense gun safety legislation and protecting our children in schools gives us real hope for change." },
        { name: "Fort Worth Star-Telegram", avatar: e5, verified: true, quote: "A pragmatic voice for North Texas, Allred bridges divides on infrastructure and education funding better than any candidate in this race." },
      ],
      allEndorsers: [
        { name: "Texas AFL-CIO", avatar: e1, verified: true },
        { name: "Mothers Against Gun Violence TX", avatar: e3, verified: true },
        { name: "Fort Worth Star-Telegram", avatar: e5, verified: true },
        { name: "Tarrant County Democrats", avatar: e7, verified: true },
        { name: "Sierra Club Texas", avatar: e9, verified: true },
        { name: "Texas State Teachers Assoc.", avatar: e11, verified: true },
        { name: "Rep. Marc Veasey", avatar: e13, verified: true },
      ],
    },
    "John Cornyn": {
      candidateName: "John Cornyn",
      raceLabel: "U.S. Senate",
      quotes: [
        { name: "Texas Farm Bureau", avatar: e2, verified: true, quote: "Senator Cornyn has consistently defended Texas agriculture and rural communities. His seniority means real influence for our state." },
        { name: "Ft. Worth Chamber of Commerce", avatar: e4, verified: true, quote: "Cornyn's leadership on trade policy and border security directly supports the North Texas economy and our small businesses." },
      ],
      allEndorsers: [
        { name: "Texas Farm Bureau", avatar: e2, verified: true },
        { name: "Ft. Worth Chamber of Commerce", avatar: e4, verified: true },
        { name: "NRA Political Victory Fund", avatar: e6, verified: true },
        { name: "National Right to Life", avatar: e8, verified: true },
        { name: "Texas Assoc. of Realtors", avatar: e10 },
      ],
    },
    "Craig Goldman": {
      candidateName: "Craig Goldman",
      raceLabel: "U.S. House",
      quotes: [
        { name: "Ft. Worth Business Press", avatar: e4, verified: true, quote: "Craig Goldman brings decades of real business experience to Congress. He understands the tax and regulatory challenges facing Texas employers firsthand." },
        { name: "Tarrant County GOP", avatar: e6, verified: true, quote: "Goldman's commitment to border security and fiscal responsibility makes him the clear choice for District 12." },
      ],
      allEndorsers: [
        { name: "Ft. Worth Business Press", avatar: e4, verified: true },
        { name: "Tarrant County GOP", avatar: e6, verified: true },
        { name: "National Federation of Ind. Business", avatar: e8, verified: true },
        { name: "Texas Right to Life", avatar: e10 },
        { name: "Rep. Kay Granger (ret.)", avatar: e12, verified: true },
      ],
    },
    "Jane Hamilton": {
      candidateName: "Jane Hamilton",
      raceLabel: "U.S. House",
      quotes: [
        { name: "Texas Organizing Project", avatar: e3, verified: true, quote: "Jane Hamilton has spent her career fighting for families who can't afford healthcare or childcare. She'll bring that same energy to Washington." },
      ],
      allEndorsers: [
        { name: "Texas Organizing Project", avatar: e3, verified: true },
        { name: "Emily's List", avatar: e5, verified: true },
        { name: "Planned Parenthood TX Votes", avatar: e7, verified: true },
        { name: "Sierra Club Texas", avatar: e9, verified: true },
      ],
    },
    "Mattie Parker": {
      candidateName: "Mattie Parker",
      raceLabel: "Mayor",
      quotes: [
        { name: "Fort Worth Star-Telegram", avatar: e5, verified: true, quote: "Mayor Parker has delivered on economic development and made Fort Worth a national model for managing rapid growth without losing its character." },
        { name: "Streams & Valleys Inc.", avatar: e7, verified: true, quote: "Her parks and trails investments have transformed quality of life in underserved neighborhoods across Fort Worth." },
        { name: "Tarrant County Medical Society", avatar: e9, verified: true, quote: "Parker's focus on expanding mental health services and community clinics shows a mayor who cares about public health, not just headlines." },
      ],
      allEndorsers: [
        { name: "Fort Worth Star-Telegram", avatar: e5, verified: true },
        { name: "Streams & Valleys Inc.", avatar: e7, verified: true },
        { name: "Tarrant County Medical Society", avatar: e9, verified: true },
        { name: "Ft. Worth Hispanic Chamber", avatar: e11, verified: true },
        { name: "Police Officers Assoc. of FW", avatar: e13, verified: true },
        { name: "North Texas Builders Assoc.", avatar: e15, verified: true },
      ],
    },
    "Carlos Flores": {
      candidateName: "Carlos Flores",
      raceLabel: "Mayor",
      quotes: [
        { name: "Texas Organizing Project", avatar: e3, verified: true, quote: "Carlos Flores has deep roots in South Fort Worth and understands what families need—better transit, affordable childcare, and safe streets." },
      ],
      allEndorsers: [
        { name: "Texas Organizing Project", avatar: e3, verified: true },
        { name: "LULAC Fort Worth", avatar: e1, verified: true },
        { name: "Fort Worth Education Assoc.", avatar: e11, verified: true },
        { name: "Tarrant County Central Labor Council", avatar: e14, verified: true },
      ],
    },
    "Beto O'Rourke": {
      candidateName: "Beto O'Rourke",
      raceLabel: "Governor",
      quotes: [
        { name: "Texas Tribune", avatar: e1, verified: true, quote: "O'Rourke's grassroots campaign operation is unmatched in Texas. He has visited every county and built a coalition that crosses urban-rural divides." },
        { name: "Everytown for Gun Safety", avatar: e3, verified: true, quote: "After Uvalde, Beto stood up when others stayed silent. Texas needs a governor who will prioritize the safety of our children." },
      ],
      allEndorsers: [
        { name: "Texas Tribune", avatar: e1, verified: true },
        { name: "Everytown for Gun Safety", avatar: e3, verified: true },
        { name: "Texas State Teachers Assoc.", avatar: e5, verified: true },
        { name: "SEIU Texas", avatar: e7, verified: true },
        { name: "MoveOn", avatar: e9, verified: true },
        { name: "Julian Castro", avatar: e11, verified: true },
      ],
    },
    "Greg Abbott": {
      candidateName: "Greg Abbott",
      raceLabel: "Governor",
      quotes: [
        { name: "Texas Assoc. of Business", avatar: e2, verified: true, quote: "Governor Abbott's pro-growth policies have made Texas the number one state for business relocation. His leadership keeps our economy strong." },
      ],
      allEndorsers: [
        { name: "Texas Assoc. of Business", avatar: e2, verified: true },
        { name: "NRA", avatar: e4, verified: true },
        { name: "Texas Farm Bureau", avatar: e6, verified: true },
        { name: "Border Sheriffs Coalition", avatar: e8 },
      ],
    },
    "Roland Gutierrez": {
      candidateName: "Roland Gutierrez",
      raceLabel: "U.S. Senate",
      quotes: [
        { name: "Everytown for Gun Safety", avatar: e7, verified: true, quote: "After Uvalde, Senator Gutierrez was the loudest voice in the Texas legislature demanding change. He has earned our trust and our endorsement." },
      ],
      allEndorsers: [
        { name: "Everytown for Gun Safety", avatar: e7, verified: true },
        { name: "Moms Demand Action TX", avatar: e9, verified: true },
        { name: "Texas Medical Assoc.", avatar: e11 },
      ],
    },
    "Justin Nelson": {
      candidateName: "Justin Nelson",
      raceLabel: "U.S. Senate",
      quotes: [
        { name: "TX Trial Lawyers Assoc.", avatar: e11, verified: true, quote: "Justin Nelson has dedicated his career to holding corporations accountable. He'll bring that same tenacity to the Senate on behalf of Texas consumers." },
      ],
      allEndorsers: [
        { name: "TX Trial Lawyers Assoc.", avatar: e11, verified: true },
        { name: "Small Business Majority TX", avatar: e13 },
      ],
    },
    "Ricardo Trevino-Martinez": {
      candidateName: "Ricardo Trevino-Martinez",
      raceLabel: "U.S. House",
      quotes: [
        { name: "Sierra Club Texas", avatar: e9, verified: true, quote: "Ricardo is the environmental champion North Texas needs in Congress. His legal work on clean air regulations has already made a tangible difference for Tarrant County families." },
      ],
      allEndorsers: [
        { name: "Sierra Club Texas", avatar: e9, verified: true },
        { name: "League of Conservation Voters", avatar: e11 },
        { name: "Sunrise Movement DFW", avatar: e3 },
      ],
    },
    "Kay Granger": {
      candidateName: "Kay Granger",
      raceLabel: "U.S. House",
      quotes: [
        { name: "Veterans of Foreign Wars", avatar: e12, verified: true, quote: "Congresswoman Granger's decades of service on the Appropriations Committee have directly supported our veterans and Fort Worth's defense community." },
      ],
      allEndorsers: [
        { name: "Veterans of Foreign Wars", avatar: e12, verified: true },
        { name: "Lockheed Martin PAC", avatar: e8 },
        { name: "Fort Worth Chamber", avatar: e4 },
      ],
    },
    "Imelda Reyes": {
      candidateName: "Imelda Reyes",
      raceLabel: "Governor",
      quotes: [
        { name: "TX State Teachers Assoc.", avatar: e11, verified: true, quote: "Imelda Reyes understands our classrooms because she's been in them. Her plan for universal pre-K and teacher pay raises is exactly what Texas schools need." },
      ],
      allEndorsers: [
        { name: "TX State Teachers Assoc.", avatar: e11, verified: true },
        { name: "American Federation of Teachers TX", avatar: e13, verified: true },
        { name: "LULAC Texas", avatar: e1 },
      ],
    },
    "Mark Cuban": {
      candidateName: "Mark Cuban",
      raceLabel: "Governor",
      quotes: [
        { name: "TechNet Texas", avatar: e14, verified: true, quote: "Mark Cuban's Cost Plus Drugs model proved he can disrupt broken systems. Imagine that same approach applied to state government and healthcare in Texas." },
      ],
      allEndorsers: [
        { name: "TechNet Texas", avatar: e14, verified: true },
        { name: "Dallas Entrepreneurs Forum", avatar: e4 },
      ],
    },
    "Dan Patrick": {
      candidateName: "Dan Patrick",
      raceLabel: "Lt. Governor",
      quotes: [
        { name: "Texas Right to Life", avatar: e6, verified: true, quote: "Lt. Governor Patrick has been the strongest pro-life voice in Texas government. His leadership in the Senate ensures our values are represented." },
      ],
      allEndorsers: [
        { name: "Texas Right to Life", avatar: e6, verified: true },
        { name: "Gun Owners of America TX", avatar: e8 },
        { name: "Texas Public Policy Foundation", avatar: e10 },
      ],
    },
    "Mike Collier": {
      candidateName: "Mike Collier",
      raceLabel: "Lt. Governor",
      quotes: [
        { name: "Texas AFL-CIO", avatar: e1, verified: true, quote: "Mike Collier's plan to fix school finance by closing corporate tax loopholes is the most serious proposal we've seen from any Lt. Governor candidate in a decade." },
        { name: "Streams & Valleys Inc.", avatar: e7, verified: true, quote: "Collier's broadband expansion plan would connect rural communities that have been left behind for too long." },
      ],
      allEndorsers: [
        { name: "Texas AFL-CIO", avatar: e1, verified: true },
        { name: "Streams & Valleys Inc.", avatar: e7, verified: true },
        { name: "Fort Worth Star-Telegram", avatar: e5, verified: true },
        { name: "TX Assoc. of School Boards", avatar: e11 },
      ],
    },
    "Deanna Luna": {
      candidateName: "Deanna Luna",
      raceLabel: "Lt. Governor",
      quotes: [
        { name: "TX Defender Service", avatar: e9, verified: true, quote: "Deanna Luna has spent her career in the trenches of our criminal justice system. She knows firsthand why reform is urgent and how to achieve it responsibly." },
      ],
      allEndorsers: [
        { name: "TX Defender Service", avatar: e9, verified: true },
        { name: "Texas Criminal Justice Coalition", avatar: e3 },
        { name: "Fort Worth NAACP", avatar: e15 },
      ],
    },
    "Deb Johnson": {
      candidateName: "Deb Johnson",
      raceLabel: "Mayor",
      quotes: [
        { name: "Preservation Fort Worth", avatar: e10, verified: true, quote: "Deb Johnson understands that Fort Worth's historic neighborhoods are what make this city special. Her planning expertise is exactly what we need to grow responsibly." },
      ],
      allEndorsers: [
        { name: "Preservation Fort Worth", avatar: e10, verified: true },
        { name: "Historic Southside Assoc.", avatar: e12 },
      ],
    },
    "Christina Reyes": {
      candidateName: "Christina Reyes",
      raceLabel: "City Council",
      quotes: [
        { name: "FW Education Assoc.", avatar: e3, verified: true, quote: "Christina Reyes listens to her neighbors. Her bilingual outreach has connected families to city services who never knew they existed." },
      ],
      allEndorsers: [
        { name: "FW Education Assoc.", avatar: e3, verified: true },
        { name: "East Fort Worth Business Assoc.", avatar: e11 },
        { name: "Tarrant County Central Labor Council", avatar: e14 },
      ],
    },
    "Jared Williams": {
      candidateName: "Jared Williams",
      raceLabel: "City Council",
      quotes: [
        { name: "Streams & Valleys Inc.", avatar: e7, verified: true, quote: "Jared Williams has been a fixture in his community for years. His passion for youth programs and neighborhood infrastructure is exactly what District 4 needs." },
      ],
      allEndorsers: [
        { name: "Streams & Valleys Inc.", avatar: e7, verified: true },
        { name: "Fort Worth Youth Coalition", avatar: e1 },
      ],
    },
    "Natalie Ruiz": {
      candidateName: "Natalie Ruiz",
      raceLabel: "Board of Education",
      quotes: [
        { name: "FW Teachers Union", avatar: e1, verified: true, quote: "Natalie Ruiz has led literacy improvement programs that actually work. Her data-driven approach to closing achievement gaps is exactly what our school board needs." },
      ],
      allEndorsers: [
        { name: "FW Teachers Union", avatar: e1, verified: true },
        { name: "Tarrant County Bilingual Educators", avatar: e3, verified: true },
        { name: "Fort Worth PTA Council", avatar: e11 },
      ],
    },
    "Michael Washington": {
      candidateName: "Michael Washington",
      raceLabel: "Board of Education",
      quotes: [
        { name: "FW Clergy Coalition", avatar: e5, verified: true, quote: "Pastor Washington has mentored hundreds of young people in Fort Worth. He'll bring that same heart and dedication to improving our schools." },
      ],
      allEndorsers: [
        { name: "FW Clergy Coalition", avatar: e5, verified: true },
        { name: "Tarrant County Youth Sports Assoc.", avatar: e7 },
      ],
    },
    "Andrea Harrison": {
      candidateName: "Andrea Harrison",
      raceLabel: "Board of Education",
      quotes: [
        { name: "Texas PTA", avatar: e9, verified: true, quote: "Andrea Harrison's financial expertise and hands-on PTA leadership make her uniquely qualified to ensure our school budgets serve students, not bureaucracy." },
      ],
      allEndorsers: [
        { name: "Texas PTA", avatar: e9, verified: true },
        { name: "Fort Worth STEM Alliance", avatar: e13 },
        { name: "League of Women Voters FW", avatar: e15 },
      ],
    },
    "Leonard Firestone": {
      candidateName: "Leonard Firestone",
      raceLabel: "Mayor",
      quotes: [
        { name: "FW Restaurant Assoc.", avatar: e16, verified: true, quote: "Leonard Firestone has lived the red-tape nightmare firsthand. His plan to cut permitting wait times from months to weeks will be a game-changer for Fort Worth small businesses." },
        { name: "Tarrant Taxpayers Union", avatar: e17, verified: true, quote: "Firestone is the only candidate with a concrete plan to freeze property tax rates. Homeowners in Fort Worth deserve a break." },
      ],
      allEndorsers: [
        { name: "FW Restaurant Assoc.", avatar: e16, verified: true },
        { name: "Tarrant Taxpayers Union", avatar: e17, verified: true },
        { name: "Texas NFIB Chapter", avatar: e18 },
      ],
    },
    "Patricia Davis": {
      candidateName: "Patricia Davis",
      raceLabel: "City Council",
      quotes: [
        { name: "Riverside Neighborhood Assoc.", avatar: e19, verified: true, quote: "Patricia Davis has been the backbone of our neighborhood for over two decades. Her tireless advocacy for tree planting and sidewalk repair has made a visible difference block by block." },
        { name: "Fort Worth Food Cooperative", avatar: e20, verified: true, quote: "Davis's farmers market proposal would bring fresh produce to a food desert. She understands what District 4 families need on their tables." },
      ],
      allEndorsers: [
        { name: "Riverside Neighborhood Assoc.", avatar: e19, verified: true },
        { name: "Fort Worth Food Cooperative", avatar: e20, verified: true },
        { name: "Retired Teachers Assoc. FW", avatar: e12 },
        { name: "East Side Civic League", avatar: e14 },
      ],
    },
  }), [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15, e16, e17, e18, e19, e20]);

  const races: RaceData[] = useMemo(
    () => [
      // ── FEDERAL ──────────────────────────────────────────────
      {
        title: "U.S. Senate, Texas",
        candidateCount: 4,
        filterKey: "senate" as FilterKey,
        section: "federal",
        type: "candidate",
        roleDescription: "A U.S. Senator represents Texas in the United States Senate. They vote on federal legislation, confirm presidential appointments, ratify treaties, and serve on committees overseeing national policy. Texas has two senators who each serve six-year terms.",
        comparisonCandidates: [
          { name: "John Cornyn", photo: assets.johnCornyn, stance: "Supports market-driven housing, opposes federal rent control, and emphasizes property tax relief for homeowners." },
          { name: "Colin Allred", photo: assets.colinAllred, stance: "Backs expanded federal housing vouchers and the Downpayment Toward Equity Act for first-time buyers." },
          { name: "Roland Gutierrez", photo: assets.rolandGutierrez, stance: "Advocates for state-federal partnerships to build affordable housing along the I-35 corridor." },
          { name: "Justin Nelson", photo: assets.justinNelson, stance: "Wants to incentivize mixed-income development through targeted tax credits for rural Texas." },
        ],
        candidates: (
          <>
            <CandidateCard name="John Cornyn" photo={assets.johnCornyn} party="Republican Party" title="Senior U.S. Senator" description="A three-term senator and former state Attorney General focused on border security, trade agreements, and maintaining Texas's pro-business regulatory environment." endorsers={[{ image: e2, verified: true }, { image: e4 }, { image: e6 }]} endorsementText="Recommended by TX Farm Bureau & 4 more" />
            <CandidateCard name="Colin Allred" photo={assets.colinAllred} party="Democratic Party" title="U.S. Representative, TX-32" description="A former NFL linebacker turned civil rights attorney who has championed healthcare access, infrastructure investment, and public education funding in Congress." endorsers={[{ image: e1, verified: true }, { image: e3 }, { image: e5, verified: true }]} endorsementText="Recommended by TX AFL-CIO & 6 more" />
            <CandidateCard name="Roland Gutierrez" photo={assets.rolandGutierrez} party="Democratic Party" title="State Senator, District 19" description="A San Antonio-based lawmaker known for his vocal advocacy on gun reform after the Uvalde tragedy and his push for expanded Medicaid in Texas." endorsers={[{ image: e7, verified: true }, { image: e9 }]} endorsementText="Recommended by Everytown & 3 more" />
            <CandidateCard name="Justin Nelson" photo={assets.justinNelson} party="Democratic Party" title="Attorney & Small Business Owner" description="An Austin-based attorney and entrepreneur who ran for AG in 2018, focused on antitrust enforcement, rural broadband expansion, and consumer protections." endorsers={[{ image: e11 }]} endorsementText="Recommended by TX Trial Lawyers" />
          </>
        ),
      },
      {
        title: "U.S. House, Texas District 12",
        candidateCount: 4,
        filterKey: "house" as FilterKey,
        section: "federal",
        type: "candidate",
        roleDescription: "A U.S. Representative serves in the House of Representatives for Texas's 12th Congressional District, which covers Fort Worth and surrounding Tarrant County. They introduce and vote on federal legislation, approve budgets, and serve on oversight committees.",
        comparisonCandidates: [
          { name: "Craig Goldman", photo: assets.craigGoldman, stance: "Supports expanding homeownership tax incentives and reducing regulations on new construction in North Texas." },
          { name: "Jane Hamilton", photo: assets.janeHamilton, stance: "Advocates for federal childcare subsidies and expanding community health centers in underserved Fort Worth neighborhoods." },
          { name: "Ricardo Trevino-Martinez", photo: assets.trevinoMartinez, stance: "Pushes for a Green New Deal approach with clean energy jobs and environmental justice in Tarrant County." },
          { name: "Kay Granger", photo: assets.kayGranger, stance: "A longtime incumbent focused on defense appropriations and supporting the Fort Worth defense industry." },
        ],
        candidates: (
          <>
            <CandidateCard name="Craig Goldman" photo={assets.craigGoldman} party="Republican Party" title="State Representative, HD-97" description="A Fort Worth business owner and state legislator who chairs the House Energy Resources Committee and advocates for oil and gas deregulation." endorsers={[{ image: e4, verified: true }, { image: e6 }]} endorsementText="Recommended by FW Business Press & 4 more" />
            <CandidateCard name="Jane Hamilton" photo={assets.janeHamilton} party="Democratic Party" title="Public Health Administrator" description="A healthcare executive who has expanded community clinic access across Tarrant County and advocates for Medicaid expansion and maternal health funding." endorsers={[{ image: e3, verified: true }, { image: e5 }, { image: e7 }]} endorsementText="Recommended by Emily's List & 3 more" />
            <CandidateCard name="Ricardo Trevino-Martinez" photo={assets.trevinoMartinez} party="Democratic Party" title="Environmental Attorney" description="An environmental lawyer focused on clean air and water regulations, climate resilience planning, and transitioning North Texas to renewable energy sources." endorsers={[{ image: e9, verified: true }]} endorsementText="Recommended by Sierra Club TX" />
            <CandidateCard name="Kay Granger" photo={assets.kayGranger} party="Republican Party" title="U.S. Representative (Incumbent)" description="The longest-serving woman in the Texas congressional delegation and former chair of the House Appropriations Committee, focused on defense and veterans' affairs." endorsers={[{ image: e12, verified: true }, { image: e8 }]} endorsementText="Recommended by Veterans of Foreign Wars" />
          </>
        ),
      },
      // ── STATE ────────────────────────────────────────────────
      {
        title: "Governor of Texas",
        candidateCount: 4,
        filterKey: "governor" as FilterKey,
        section: "state",
        type: "candidate",
        roleDescription: "The Governor is the chief executive of Texas, responsible for enforcing state laws, proposing the biennial state budget, appointing agency heads and judges, and serving as commander-in-chief of the Texas National Guard.",
        comparisonCandidates: [
          { name: "Greg Abbott", photo: assets.gregAbbott, stance: "Focuses on property tax relief, border wall expansion, and opposing any state-level rent regulation." },
          { name: "Beto O'Rourke", photo: assets.betoORourke, stance: "Proposes legalizing marijuana for tax revenue, expanding Medicaid, and investing in renewable energy jobs." },
          { name: "Imelda Reyes", photo: assets.imelda_reyes, stance: "Advocates for universal pre-K, teacher pay increases, and equitable school funding formulas." },
          { name: "Mark Cuban", photo: assets.markCuban, stance: "Proposes a public-private healthcare marketplace and reducing occupational licensing barriers for entrepreneurs." },
        ],
        candidates: (
          <>
            <CandidateCard name="Greg Abbott" photo={assets.gregAbbott} party="Republican Party" title="Governor (Incumbent)" description="A two-term governor and former Attorney General who has prioritized border security through Operation Lone Star, property tax relief, and school choice legislation." endorsers={[{ image: e2, verified: true }, { image: e4 }, { image: e6, verified: true }]} endorsementText="Recommended by TX Assoc. of Business & 3 more" />
            <CandidateCard name="Beto O'Rourke" photo={assets.betoORourke} party="Democratic Party" title="Former U.S. Representative" description="An El Paso native and grassroots campaigner who has visited all 254 Texas counties, advocating for gun reform, Medicaid expansion, and legalizing marijuana." endorsers={[{ image: e1, verified: true }, { image: e3, verified: true }, { image: e5 }]} endorsementText="Recommended by TX Tribune & 5 more" />
            <CandidateCard name="Imelda Reyes" photo={assets.imelda_reyes} party="Democratic Party" title="Former School Board Trustee" description="A longtime educator and school board leader from the Rio Grande Valley who campaigns on universal pre-K, teacher pay raises, and closing the digital divide." endorsers={[{ image: e11, verified: true }, { image: e13 }]} endorsementText="Recommended by TX State Teachers & 2 more" />
            <CandidateCard name="Mark Cuban" photo={assets.markCuban} party="Independent" title="Entrepreneur & Investor" description="The Dallas-based billionaire and former Shark Tank investor running on a platform of healthcare cost transparency, tech workforce development, and government modernization." endorsers={[{ image: e14 }]} endorsementText="Recommended by TechNet Texas" />
          </>
        ),
      },
      {
        title: "Lieutenant Governor of Texas",
        candidateCount: 3,
        filterKey: "lt_governor" as FilterKey,
        section: "state",
        type: "candidate",
        roleDescription: "The Lieutenant Governor presides over the Texas Senate, assigns bills to committees, casts tie-breaking votes, and succeeds the Governor if needed. Often called the most powerful position in Texas state government.",
        comparisonCandidates: [
          { name: "Dan Patrick", photo: assets.danPatrick, stance: "Supports eliminating property taxes via increased sales tax and opposes any form of rent regulation." },
          { name: "Mike Collier", photo: assets.mikeCollier, stance: "Proposes closing corporate tax loopholes to fund public education and opposes school voucher programs." },
          { name: "Deanna Luna", photo: assets.deannaLuna, stance: "Advocates for criminal justice reform, reducing mandatory minimums, and expanding drug treatment courts." },
        ],
        candidates: (
          <>
            <CandidateCard name="Dan Patrick" photo={assets.danPatrick} party="Republican Party" title="Lt. Governor (Incumbent)" description="A conservative media personality turned three-term Lt. Governor who has driven the Senate's agenda on property tax reform, school vouchers, and immigration enforcement." endorsers={[{ image: e6, verified: true }, { image: e8 }]} endorsementText="Recommended by TX Right to Life & 3 more" />
            <CandidateCard name="Mike Collier" photo={assets.mikeCollier} party="Democratic Party" title="CPA & Energy Executive" description="A former PricewaterhouseCoopers partner and energy sector CFO who campaigns on fixing school finance, expanding broadband, and closing corporate tax loopholes." endorsers={[{ image: e1, verified: true }, { image: e5 }, { image: e7, verified: true }]} endorsementText="Recommended by TX AFL-CIO & 4 more" />
            <CandidateCard name="Deanna Luna" photo={assets.deannaLuna} party="Democratic Party" title="Criminal Defense Attorney" description="A Fort Worth attorney focused on criminal justice reform, reducing mandatory minimums, expanding drug courts, and increasing public defender funding statewide." endorsers={[{ image: e9 }]} endorsementText="Recommended by TX Defender Service" />
          </>
        ),
      },
      // ── LOCAL ────────────────────────────────────────────────
      {
        title: "Mayor of Fort Worth",
        candidateCount: 4,
        filterKey: "all" as FilterKey,
        section: "local",
        type: "candidate",
        roleDescription: "The Mayor of Fort Worth serves as the city's chief elected official, presiding over City Council meetings, setting policy priorities, representing the city in regional and state affairs, and working with the city manager on the annual budget.",
        comparisonCandidates: [
          { name: "Mattie Parker", photo: assets.mattieParker, stance: "Prioritizes economic development, new parks and trails, and public safety hiring to keep pace with population growth." },
          { name: "Carlos Flores", photo: assets.carlosFlores, stance: "Focuses on affordable housing in South Fort Worth, improving public transit routes, and expanding after-school programs." },
          { name: "Deb Johnson", photo: assets.debJohnson, stance: "Advocates for senior property tax freezes, historic preservation, and neighborhood-level infrastructure investment." },
          { name: "Leonard Firestone", photo: assets.leonardFirestone, stance: "Supports cutting city regulations for small businesses, privatizing waste management, and reducing the city budget." },
        ],
        candidates: (
          <>
            <CandidateCard name="Mattie Parker" photo={assets.mattieParker} party="Nonpartisan" title="Mayor (Incumbent)" description="At 38, the youngest mayor of a major U.S. city, Parker has focused on economic development incentives, expanding the city's trail network, and hiring more first responders." endorsers={[{ image: e5, verified: true }, { image: e7, verified: true }, { image: e13 }]} endorsementText="Recommended by FW Star-Telegram & 5 more" />
            <CandidateCard name="Carlos Flores" photo={assets.carlosFlores} party="Nonpartisan" title="Community Organizer" description="A longtime South Fort Worth resident and housing advocate who leads neighborhood revitalization projects and campaigns on equitable transit access and youth mentorship programs." endorsers={[{ image: e1, verified: true }, { image: e3 }, { image: e11, verified: true }]} endorsementText="Recommended by LULAC Fort Worth & 3 more" />
            <CandidateCard name="Deb Johnson" photo={assets.debJohnson} party="Nonpartisan" title="Retired City Planner" description="A 30-year veteran of Fort Worth's planning department who advocates for walkable neighborhoods, senior-friendly zoning, and preserving historic districts from overdevelopment." endorsers={[{ image: e10 }, { image: e12 }]} endorsementText="Recommended by Preservation FW & 1 more" />
            <CandidateCard name="Leonard Firestone" photo={assets.leonardFirestone} party="Nonpartisan" title="Restaurant Owner" description="A small business owner running on cutting city red tape, reducing permitting fees, privatizing select city services, and freezing property tax rates for five years." endorsers={[{ image: e16, verified: true }, { image: e17 }]} endorsementText="Recommended by FW Restaurant Assoc. & 2 more" />
          </>
        ),
      },
      {
        title: "City Council, District 4",
        candidateCount: 3,
        filterKey: "all" as FilterKey,
        section: "local",
        type: "candidate",
        roleDescription: "A Fort Worth City Council member represents their district in the municipal legislature. They vote on local ordinances, approve the city budget, oversee city departments, and advocate for their community's infrastructure and service needs.",
        comparisonCandidates: [
          { name: "Christina Reyes", photo: assets.christinaReyes, stance: "Supports expanded code enforcement, community policing, and new sidewalk construction in East Fort Worth." },
          { name: "Jared Williams", photo: assets.jaredWilliams, stance: "Wants to bring a new library branch, expand after-school programs, and improve stormwater drainage in the district." },
          { name: "Patricia Davis", photo: assets.patriciaDavis, stance: "Advocates for more small business grants, a district farmers market, and tree canopy expansion." },
        ],
        candidates: (
          <>
            <CandidateCard name="Christina Reyes" photo={assets.christinaReyes} party="Nonpartisan" title="Social Worker" description="A bilingual social worker and PTA president who campaigns on expanding code enforcement, building safer crosswalks, and increasing bilingual city services in East Fort Worth." endorsers={[{ image: e3, verified: true }, { image: e11 }]} endorsementText="Recommended by FW Education Assoc. & 2 more" />
            <CandidateCard name="Jared Williams" photo={assets.jaredWilliams} party="Nonpartisan" title="Small Business Owner" description="A barbershop owner and youth basketball coach focused on bringing a new library branch, improving stormwater drainage, and funding after-school programs in underserved areas." endorsers={[{ image: e7, verified: true }]} endorsementText="Recommended by Streams & Valleys Inc." />
            <CandidateCard name="Patricia Davis" photo={assets.patriciaDavis} party="Nonpartisan" title="Retired Educator" description="A 25-year veteran teacher and neighborhood association leader who advocates for small business grants, tree canopy expansion, and establishing a weekly farmers market." endorsers={[{ image: e19, verified: true }, { image: e20 }]} endorsementText="Recommended by Riverside Neighborhood Assoc. & 3 more" />
          </>
        ),
      },
      {
        title: "Board of Education, District 2",
        candidateCount: 3,
        filterKey: "all" as FilterKey,
        section: "local",
        type: "board",
        roleDescription: "A Fort Worth ISD Board of Education Trustee serves on the elected body that governs the school district. They set educational policy, approve the annual budget, hire the superintendent, adopt curriculum standards, and oversee school construction and facilities for over 80,000 students.",
        comparisonCandidates: [
          { name: "Natalie Ruiz", photo: assets.natalieRuiz, stance: "Advocates for dual-language programs in every elementary school, increased literacy specialist staffing, and transparent achievement data dashboards for parents." },
          { name: "Michael Washington", photo: assets.michaelWashington, stance: "Supports expanding mental health counselors to a 250:1 ratio, improving athletic facilities at Title I schools, and creating a student mentorship program with local businesses." },
          { name: "Andrea Harrison", photo: assets.andreaHarrison, stance: "Pushes for zero-based budgeting, directing more funds to classrooms instead of administration, and expanding STEM and vocational programs across the district." },
        ],
        candidates: (
          <>
            <div className="flex flex-col pt-2.5 pb-2 relative shrink-0 self-stretch">
              <CandidateCard name="Natalie Ruiz" photo={assets.natalieRuiz} party="Nonpartisan" title="Curriculum Specialist" description="A bilingual curriculum coordinator who has led literacy improvement programs across Fort Worth ISD, focused on closing achievement gaps and expanding dual-language offerings." endorsers={[{ image: e1, verified: true }, { image: e3, verified: true }, { image: e11 }]} endorsementText="Recommended by FW Teachers Union & 2 more" />
              <div className="absolute bg-[#403a49] flex flex-col items-start px-2 py-1 rounded-full top-0 left-6">
                <p className="text-xs font-medium leading-[10px] text-white whitespace-nowrap">1 of 3 seats</p>
              </div>
            </div>
            <div className="flex flex-col pt-2.5 pb-2 relative shrink-0 self-stretch">
              <CandidateCard name="Michael Washington" photo={assets.michaelWashington} party="Nonpartisan" title="Youth Pastor & Coach" description="A youth pastor and high school football coach who campaigns on expanding mental health counselors in schools, improving athletic facilities, and increasing parent engagement programs." endorsers={[{ image: e5, verified: true }, { image: e7 }]} endorsementText="Recommended by FW Clergy Coalition & 1 more" />
              <div className="absolute bg-[#403a49] flex items-center justify-center px-2 py-1 rounded-full top-0 left-6">
                <p className="text-xs font-medium leading-[10px] text-white whitespace-nowrap">2 of 3 seats</p>
              </div>
            </div>
            <div className="flex flex-col pt-2.5 pb-2 relative shrink-0 self-stretch">
              <CandidateCard name="Andrea Harrison" photo={assets.andreaHarrison} party="Nonpartisan" title="Accountant & PTA President" description="A CPA and active PTA leader focused on transparent school budgeting, equitable facility investments, and expanding STEM and vocational programs across the district." endorsers={[{ image: e9, verified: true }, { image: e13 }]} endorsementText="Recommended by TX PTA & 2 more" />
              <div className="absolute bg-[#403a49] flex items-center justify-center px-2 py-1 rounded-full top-0 left-6">
                <p className="text-xs font-medium leading-[10px] text-white whitespace-nowrap">3 of 3 seats</p>
              </div>
            </div>
          </>
        ),
      },
      // ── MEASURES ─────────────────────────────────────────────
      {
        title: "Proposition A",
        candidateCount: 2,
        filterKey: "all" as FilterKey,
        section: "local",
        type: "measure",
        candidates: (
          <>
            <MeasureCard position="Yes" title="Fort Worth Parks & Recreation Bond ($250M)" description="A yes vote authorizes $250 million in bonds for new parks, trail extensions, splash pads, and recreational facility upgrades across all council districts, funded through existing tax revenue." endorsementText="Recommended by Streams & Valleys & 12 more" endorserImage={e7} />
            <MeasureCard position="No" title="Fort Worth Parks & Recreation Bond ($250M)" description="A no vote opposes the bond, citing concerns about increasing city debt, prioritizing core infrastructure like roads and water over recreational amenities, and potential property tax increases." endorsementText="Recommended by Tarrant Taxpayers Union" endorserImage={e14} />
          </>
        ),
      },
      {
        title: "Proposition B",
        candidateCount: 2,
        filterKey: "all" as FilterKey,
        section: "local",
        type: "measure",
        candidates: (
          <>
            <MeasureCard position="Yes" title="Public Transit Sales Tax (0.25% Increase)" description="A yes vote raises sales tax by a quarter-cent to fund expanded bus routes, a new commuter rail line to DFW Airport, and improved transit stops with shelters and real-time arrival screens." endorsementText="Recommended by Transit Riders Union & 8 more" endorserImage={e9} />
            <MeasureCard position="No" title="Public Transit Sales Tax (0.25% Increase)" description="A no vote opposes the sales tax increase, arguing that Fort Worth should invest in road capacity and highway expansions rather than rail projects with historically low ridership projections." endorsementText="Recommended by FW Taxpayers Assoc. & 3 more" endorserImage={e10} />
          </>
        ),
      },
      {
        title: "Proposition C",
        candidateCount: 2,
        filterKey: "all" as FilterKey,
        section: "local",
        type: "measure",
        candidates: (
          <>
            <MeasureCard position="Yes" title="Fort Worth Fire & Emergency Services Bond ($180M)" description="A yes vote authorizes $180 million in bonds to build three new fire stations, upgrade aging emergency vehicles, and fund a new centralized 911 dispatch center with modern technology." endorsementText="Recommended by FW Firefighters Assoc. & 6 more" endorserImage={e16} />
            <MeasureCard position="No" title="Fort Worth Fire & Emergency Services Bond ($180M)" description="A no vote opposes additional borrowing, arguing that the city should prioritize efficiency gains and reallocation of existing funds before adding to the debt burden on taxpayers." endorsementText="Recommended by Citizens for Fiscal Responsibility" endorserImage={e17} />
          </>
        ),
      },
    ],
    [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15, e16, e17, e18, e19, e20]
  );

  const sections: { key: string; label: string; sectionKey: "federal" | "state" | "local" }[] = [
    { key: "federal", label: "Federal Races", sectionKey: "federal" },
    { key: "state", label: "State Races", sectionKey: "state" },
    { key: "local", label: "Local Races", sectionKey: "local" },
  ];

  const matchesParty = (candidateParty: string): boolean => {
    if (partyFilter === "all") return true;
    if (candidateParty === "Nonpartisan" || candidateParty === "Independent") return true;
    if (partyFilter === "democrat") return candidateParty === "Democratic Party";
    if (partyFilter === "republican") return candidateParty === "Republican Party";
    return true;
  };

  const filterCandidateChild = (child: React.ReactNode): React.ReactNode => {
    if (React.isValidElement(child) && child.type === CandidateCard) {
      const cardParty = (child.props as { party?: string }).party || "";
      if (!matchesParty(cardParty)) return null;
      const cardName = (child.props as { name?: string }).name || "";
      const recDataItem = recommendationMap[cardName];
      const extra: Record<string, unknown> = {};
      if (showAddIssues) extra.showAddIssues = true;
      if (recDataItem && onRecommendation) extra.onRecommendationClick = () => onRecommendation(recDataItem);
      if (recActiveCandidateName && cardName === recActiveCandidateName) extra.highlightActive = true;
      return React.cloneElement(child as React.ReactElement, extra);
    }
    if (React.isValidElement(child) && (child.props as Record<string, unknown>)?.children) {
      const inner = (child.props as { children?: React.ReactNode }).children;
      const cloned = React.Children.map(inner, (c) => filterCandidateChild(c));
      const nonNull = cloned?.filter(Boolean);
      if (!nonNull || nonNull.length === 0) return null;
      return React.cloneElement(child as React.ReactElement, {}, nonNull);
    }
    return child;
  };

  return (
    <div className="flex flex-col gap-6 items-start w-full">
      {sections.map((section) => {
        const sectionRaces = races.filter((r) => {
          if (r.section !== section.sectionKey) return false;
          if (activeFilters.size === 0) return true;
          return activeFilters.has(r.filterKey as RaceFilterKey);
        });

        if (sectionRaces.length === 0) return null;

        const isOpen = openSections[section.key] ?? true;

        return (
          <div key={section.key} className="flex flex-col gap-6 items-start w-full">
            <SectionHeader
              label={section.label}
              isOpen={isOpen}
              onToggle={() => toggleSection(section.key)}
            />
            <div
              className={`flex flex-col gap-10 items-start overflow-hidden pl-8 pr-8 w-full transition-all duration-300 ${
                isOpen ? "max-h-[9999px] opacity-100 pb-5" : "max-h-0 opacity-0"
              }`}
            >
              {sectionRaces.map((race) => {
                const filteredChildren = React.Children.map(race.candidates, filterCandidateChild)?.filter(Boolean);
                if (race.type === "candidate" && partyFilter !== "all" && (!filteredChildren || filteredChildren.length === 0)) return null;

                return (
                  <RaceSection
                    key={race.title}
                    title={race.title}
                    candidateCount={race.candidateCount}
                    onCompare={race.comparisonCandidates && onCompare ? () => onCompare(race) : undefined}
                    compareActive={compareActiveTitle === race.title}
                  >
                    {filteredChildren}
                  </RaceSection>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface AddLocationCTAProps {
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  selectedAddress: string;
  onOpenModal: () => void;
}

function AddLocationCTA({ triggerRef, selectedAddress, onOpenModal }: AddLocationCTAProps) {
  const { viewMode } = useViewMode();
  const isDesktop = viewMode === "desktop";

  return (
    <div className="flex flex-col items-start px-8 w-full">
      <div className="border border-[#e1dde9] flex flex-col gap-6 items-center p-5 rounded-2xl w-full">
        <div className="flex flex-col gap-5 items-center w-full">
          <div className="relative inline-flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.ctaPinLeft} alt="" className="h-[86px] w-[64px] object-cover" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.ctaPinRight} alt="" className="h-[54px] w-[37px] object-cover mt-8 -ml-3" />
          </div>
          <div className="flex flex-col gap-1 items-start w-full text-center">
            <p className="font-bold text-lg leading-7 text-[#403a49] w-full">
              Add a location to get your full ballot.
            </p>
            <p className="text-sm leading-5 text-[#766f81] w-full">
              We&apos;ll only use your address to find the correct ballot. We
              won&apos;t sell your data or send you mail.
            </p>
          </div>
        </div>
        <div className={`flex flex-col gap-2.5 items-center w-full ${isDesktop ? "max-w-[500px]" : ""}`}>
          <AddressField
            ref={triggerRef}
            placeholder="Search location"
            value={selectedAddress}
            onClick={onOpenModal}
          />
          <p className="text-xs leading-5 text-[#766f81] text-center w-full">
            By continuing, you agree to the{" "}
            <span className="text-[#003cd6]">ToS</span> and{" "}
            <span className="text-[#003cd6]">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export function SourceDisclaimer() {
  const { viewMode } = useViewMode();
  const isDesktop = viewMode === "desktop";

  return (
    <div className={`flex items-center justify-center px-8 w-full ${isDesktop ? "" : "border-b border-[#e1dde9] pb-8"}`}>
      <p className="flex-1 text-xs leading-5 text-[#766f81]">
        Info sourced from public filings, verified media, and official campaign
        materials and summarized by AI.{" "}
        {!isDesktop && <br />}
        <span className="text-[#003cd6]">Learn more →</span>
      </p>
    </div>
  );
}

export function VoterGuides() {
  const { viewMode } = useViewMode();
  const isDesktop = viewMode === "desktop";

  const guides = [
    {
      name: "Daniel Joffe",
      image: assets.danielJoffe,
      cover: assets.guideCover1,
      description:
        "A voice for Black voters and their allies, Daniel Joffe centers justice, community, and lived experience.",
    },
    {
      name: "Hoboken Girl",
      image: assets.hobokenGirl,
      cover: assets.guideCover2,
      description:
        "Local insider Jennifer Tripucka shares down-to-earth voter tips written with longtime Jersey City residents in mind.",
    },
    {
      name: "Jersey City Moms",
      image: assets.voterMike,
      cover: assets.guideCover3,
      description:
        "Made by local parents, this guide focuses on what matters to families like good schools and safe neighborhoods",
    },
  ];

  if (isDesktop) {
    return (
      <div className="flex flex-col gap-8 items-start w-full border-t border-[#e1dde9] pt-[60px]">
        <div className="flex items-end justify-between w-full px-8">
          <div className="flex flex-col gap-2 items-start">
            <p className="font-bold text-lg leading-6 text-[#403a49]">
              Voter guides written by locals
            </p>
            <p className="text-sm leading-5 text-[#403a49]">
              Explore the top three voter guides from Jersey City locals who
              share your values and care about your issues.
            </p>
          </div>
          <p className="text-sm leading-5 text-[#0d4dfb] shrink-0 cursor-pointer">
            See all
          </p>
        </div>
        <div className="flex gap-5 items-stretch w-full px-8">
          {guides.map((guide) => (
            <div
              key={guide.name}
              className="flex-1 border border-[#e1dde9] rounded-2xl overflow-hidden flex flex-col gap-5 items-start p-6"
            >
              <div className="w-full h-[132px] overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={guide.cover}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 items-start w-full">
                <div className="flex gap-2.5 items-center">
                  <div className="w-6 h-6 rounded-full overflow-hidden relative shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="absolute w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-bold text-sm leading-5 text-[#403a49]">
                    {guide.name}
                  </p>
                </div>
                <p className="text-sm leading-5 text-[#403a49]">
                  {guide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center px-8 w-full">
      <div className="flex flex-1 flex-col gap-6 items-start rounded-2xl">
        <div className="flex flex-col items-start w-full rounded-t-2xl">
          <div className="flex flex-col gap-2.5 items-start w-full text-[#403a49]">
            <p className="font-bold text-[16px] leading-6 w-full">
              Voter guides written by locals
            </p>
            <p className="text-sm leading-5 w-full">
              Explore the top three voter guides from Jersey City locals who
              share your values and care about your issues.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start w-full">
          {guides.map((guide, i) => (
            <div
              key={guide.name}
              className={`flex items-center py-4 w-full ${
                i < guides.length - 1 ? "border-b border-[#e1dde9]" : ""
              }`}
            >
              <div className="flex gap-2.5 items-center">
                <div className="w-6 h-6 rounded-full overflow-hidden relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={guide.image} alt={guide.name} className="absolute w-full h-full object-cover" />
                </div>
                <p className="font-bold text-sm leading-5 text-[#403a49]">
                  {guide.name}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs leading-5 text-[#0d4dfb] text-right">See all</p>
      </div>
    </div>
  );
}

export function ShareCTA() {
  const { viewMode } = useViewMode();
  const isDesktop = viewMode === "desktop";

  if (isDesktop) {
    return (
      <div className="w-full px-8">
        <div className="bg-[#0d4dfb] flex overflow-hidden rounded-2xl h-[346px] w-full">
          {/* Text */}
          <div className="flex-1 shrink-0 flex flex-col gap-5 items-start justify-center px-[60px] py-[60px]">
            <div className="flex flex-col gap-2.5 items-start w-full text-white">
              <p className="font-bold text-[28px] leading-9 tracking-[-1px] whitespace-nowrap">
                Help a friend not guess
              </p>
              <p className="font-normal text-base leading-6 w-full">
                Every voter who shows up makes a difference. Share this so more
                people are ready to vote.
              </p>
            </div>
            <button className="bg-gradient-to-r from-[#ffdb00] to-[#ffe600] flex gap-1 items-center justify-center px-4 py-3 rounded-lg min-w-[104px]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#403A49"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              <p className="font-bold text-[14px] leading-6 text-[#403a49] text-center">
                Share
              </p>
            </button>
          </div>
          {/* Image — fills remaining space */}
          <div className="w-[45%] shrink-0 pt-[60px] pr-[60px]">
            <div className="w-full h-full overflow-hidden rounded-tl-2xl rounded-tr-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assets.sharePreviewDesktop}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d4dfb] flex gap-8 items-center justify-center w-full">
      <div className="flex flex-1 flex-col gap-8 items-center pl-8 py-8">
        <div className="flex flex-col gap-2.5 items-start w-full text-white">
          <p className="font-bold text-lg leading-6 w-full">
            Help a friend not guess
          </p>
          <p className="text-sm leading-5 w-full">
            Every voter who shows up makes a difference. Share this so more
            people are ready to vote.
          </p>
        </div>
        <button className="bg-gradient-to-r from-[#ffdb00] to-[#ffe600] flex gap-1 items-center justify-center px-4 py-3 rounded-lg w-full min-w-[104px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#403A49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          <p className="font-bold text-sm leading-5 text-[#403a49] text-center">
            Share
          </p>
        </button>
      </div>
      <div className="self-stretch shrink-0 w-[154px] overflow-hidden rounded-tl-lg relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assets.sharePreview2}
          alt=""
          className="absolute inset-0 w-[291px] h-[746px] object-cover rounded-lg top-[30px]"
        />
      </div>
    </div>
  );
}

function ResourceLinks() {
  return (
    <div className="flex flex-wrap gap-x-2.5 gap-y-2 items-start w-full">
      {["USA.gov", "Vote.org", "VOTE411.org"].map((link, i, arr) => (
        <div
          key={link}
          className={`flex gap-1.5 items-center ${
            i < arr.length - 1 ? "border-r border-[#a5b9ff] pr-2.5" : ""
          }`}
        >
          <p className="text-xs font-medium text-[#403a49] text-center">{link}</p>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#403A49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      ))}
    </div>
  );
}

function EmailInput() {
  return (
    <div className="flex items-start w-full">
      <div className="bg-white border-l border-t border-b border-[#766f81] flex flex-1 gap-1 items-center p-3 rounded-tl-lg rounded-bl-lg">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#766f81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <p className="flex-1 text-sm leading-5 text-[rgba(64,58,73,0.4)]">
          Email
        </p>
      </div>
      <button className="bg-[#ffd000] flex flex-col items-center justify-center p-3.5 rounded-tr-lg rounded-br-lg shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#403A49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
  );
}

export function Footer() {
  const { viewMode } = useViewMode();
  const isDesktop = viewMode === "desktop";

  if (isDesktop) {
    return (
      <div className="bg-[#f0f7ff] flex flex-col items-start overflow-hidden w-full">
        {/* Two-column top section — wraps to single column at narrow widths */}
        <div className="flex flex-wrap items-stretch w-full">
          {/* Left column — Election Day */}
          <div className="min-w-[400px] flex-1 border-b border-[#a5b9ff] flex items-start gap-5" style={{ borderRight: "1px solid #a5b9ff" }}>
            <div className="w-[108px] self-stretch overflow-hidden relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={assets.votingBooth} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="flex flex-1 flex-wrap gap-x-8 gap-y-4 items-start pr-8 py-10">
              <p className="font-bold text-2xl leading-8 text-[#403a49] min-w-[160px] max-w-[200px]">
                Get ready to vote on Election Day
              </p>
              <div className="flex flex-1 flex-col gap-6 items-start pt-1 min-w-[180px]">
                <p className="text-base leading-6 text-[#403a49] w-full">
                  Check our resources to help you get ready for Election Day from
                  registering to finding your polling place.
                </p>
                <ResourceLinks />
              </div>
            </div>
          </div>

          {/* Right column — Get back to best matches */}
          <div className="min-w-[400px] flex-1 border-b border-[#a5b9ff] flex items-center gap-5 pl-8">
            <div className="flex flex-1 flex-wrap gap-x-8 gap-y-4 items-start py-10">
              <p className="font-bold text-2xl leading-8 text-[#403a49] min-w-[160px] max-w-[200px]">
                Get back to best matches
              </p>
              <div className="flex flex-1 flex-col gap-5 items-start pt-1 min-w-[180px]">
                <p className="text-base leading-6 text-[#403a49] w-full">
                  Enter your email to save your personalized voter guide and come
                  back to it when you&apos;re ready to vote.
                </p>
                <EmailInput />
              </div>
            </div>
            <div className="w-[108px] self-stretch overflow-hidden relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assets.iVotedStickers}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 px-8 py-10 w-full">
          <p className="text-sm leading-normal text-[#403a49] max-w-[320px]">
            © 2025. Change.org Vote is a non-profit owned PBC operated by
            Change.org. All rights reserved.
          </p>
          <div className="w-12 h-12 overflow-hidden relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.symbolLogo} alt="" className="absolute w-full h-full" />
          </div>
          <div className="flex flex-wrap gap-5 items-center py-3.5 text-sm font-medium text-[#403a49] text-center">
            <p>Report Issue</p>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f0f7ff] flex flex-col items-start overflow-hidden w-full">
      {/* Election Day section */}
      <div className="border-b border-[#a5b9ff] flex gap-5 items-start w-full">
        <div className="w-[120px] self-stretch overflow-hidden relative shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assets.votingBooth} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-5 items-start pr-8 py-8">
          <div className="flex flex-col gap-2.5 items-start w-full text-[#403a49]">
            <p className="font-bold text-lg leading-6 w-full">
              Get ready to vote on Election Day
            </p>
            <p className="text-xs leading-4 w-full">
              Check our resources to help you get ready for Election Day from
              registering to finding your polling place.
            </p>
          </div>
          <ResourceLinks />
        </div>
      </div>

      {/* Feedback section */}
      <div className="border-b border-[#a5b9ff] flex items-start w-full">
        <div className="flex flex-1 flex-col items-start pl-8">
          <div className="flex gap-2.5 items-start w-full">
            <div className="flex flex-col gap-2.5 items-start py-8 w-[212px] text-[#403a49]">
              <p className="font-bold text-lg leading-6 w-full">
                Share your feedback
              </p>
              <p className="text-xs leading-4 w-full">
                Sign up to share feedback on this beta and you could get a $50
                gift card.
              </p>
            </div>
            <div className="w-[121px] h-[130px] overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assets.iVotedStickers}
                alt=""
                className="absolute left-[-10px] top-[-11px] w-[141px] h-[141px] object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 items-start pb-8 pr-8 w-full">
            <EmailInput />
            <p className="text-xs leading-4 text-[#766f81] w-full">
              Participation does not guarantee compensation. Gift cards provided
              only to selected participants.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex flex-col gap-5 items-start p-8 w-full">
        <p className="text-xs leading-4 text-[#403a49] w-[320px]">
          © 2025. Change.vote is a non-profit owned PBC operated by Change.org.
          All rights reserved. Maps from{" "}
          <a href="https://openmaptiles.org/" className="underline">
            © OpenMapTiles
          </a>{" "}
          <a href="https://www.openstreetmap.org/copyright" className="underline">
            © OpenStreetMap contributors
          </a>
          .
        </p>
        <div className="flex items-center justify-between w-full">
          <div className="w-6 h-6 overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.symbolLogo} alt="" className="absolute w-full h-full" />
          </div>
          <div className="flex gap-3 items-center justify-end overflow-hidden py-1 text-xs font-medium text-[#403a49] text-center">
            <p>Report Issue</p>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

type DrawerSource = "address" | "compare" | "recommendation";

export default function BallotPreview() {
  const { viewMode } = useViewMode();
  const isDesktop = viewMode === "desktop";
  const [activeFilters, setActiveFilters] = useState<Set<RaceFilterKey>>(new Set());
  const [partyFilter, setPartyFilter] = useState<PartyFilter>("all");

  const toggleFilter = (key: RaceFilterKey) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const resetAllFilters = () => {
    setActiveFilters(new Set());
    setPartyFilter("all");
  };

  // Unified drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSource, setDrawerSource] = useState<DrawerSource>("address");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [previewAddress, setPreviewAddress] = useState("");
  const [compareRace, setCompareRace] = useState<RaceData | null>(null);
  const [recData, setRecData] = useState<RecommendationData | null>(null);

  const displayAddress = previewAddress || selectedAddress;

  const heroTriggerRef = useRef<HTMLButtonElement>(null);
  const ctaTriggerRef = useRef<HTMLButtonElement>(null);
  const activeTriggerRef = useRef<React.RefObject<HTMLElement | null>>(heroTriggerRef);
  const drawerScrollRef = useRef<HTMLDivElement>(null);

  const [addressDrawerMounted, setAddressDrawerMounted] = useState(false);

  const openAddressDrawer = (triggerRef: React.RefObject<HTMLElement | null>) => {
    activeTriggerRef.current = triggerRef;
    setDrawerSource("address");
    setDrawerOpen(true);
    if (!addressDrawerMounted) setAddressDrawerMounted(true);
  };

  const openCompareDrawer = (race: RaceData) => {
    setCompareRace(race);
    setDrawerSource("compare");
    setDrawerOpen(true);
  };

  const openRecommendationDrawer = (data: RecommendationData) => {
    setRecData(data);
    setDrawerSource("recommendation");
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setPreviewAddress("");
  };

  React.useEffect(() => {
    if (drawerOpen && drawerScrollRef.current) {
      drawerScrollRef.current.scrollTop = 0;
    }
  }, [drawerOpen, drawerSource]);

  React.useEffect(() => {
    if (!isDesktop) return;
    if (drawerSource !== "address") return;
    const triggerEl = activeTriggerRef.current?.current;
    if (!triggerEl) return;

    if (drawerOpen) {
      triggerEl.style.position = "relative";
      triggerEl.style.zIndex = "60";
      triggerEl.style.boxShadow = "0 0 0 4px rgba(13, 77, 251, 0.25)";
      triggerEl.style.borderRadius = "12px";
    } else {
      triggerEl.style.position = "";
      triggerEl.style.zIndex = "";
      triggerEl.style.boxShadow = "";
      triggerEl.style.borderRadius = "";
    }

    return () => {
      triggerEl.style.position = "";
      triggerEl.style.zIndex = "";
      triggerEl.style.boxShadow = "";
      triggerEl.style.borderRadius = "";
    };
  }, [drawerOpen, drawerSource, isDesktop]);

  if (isDesktop) {
    return (
      <div className="flex w-full" style={{ minHeight: "calc(100vh - var(--toolbar-h))" }}>
        {/* Left column — ballot content (shrinks when drawer opens) */}
        <div className="flex-1 min-w-0 bg-white flex flex-col gap-[60px] items-start overflow-y-auto relative max-w-[1800px] mx-auto">
          <HeroSection
            triggerRef={heroTriggerRef}
            selectedAddress={displayAddress}
            onOpenModal={() => openAddressDrawer(heroTriggerRef)}
            isDesktop
          />
          <div className="-mt-5 -mb-5 w-full">
            <BallotFilters activeFilters={activeFilters} onToggleFilter={toggleFilter} partyFilter={partyFilter} onPartyFilterChange={setPartyFilter} onResetAll={resetAllFilters} />
          </div>
          <AllRaces activeFilters={activeFilters} partyFilter={partyFilter} onCompare={openCompareDrawer} compareActiveTitle={drawerOpen && drawerSource === "compare" && compareRace ? compareRace.title : undefined} onRecommendation={openRecommendationDrawer} recActiveCandidateName={drawerOpen && drawerSource === "recommendation" && recData ? recData.candidateName : undefined} />
          <AddLocationCTA
            triggerRef={ctaTriggerRef}
            selectedAddress={displayAddress}
            onOpenModal={() => openAddressDrawer(ctaTriggerRef)}
          />
          <div className="-mt-5 w-full">
            <SourceDisclaimer />
          </div>
          <VoterGuides />
          <ShareCTA />
          <Footer />

          {/* Overlay when drawer is open — click to close */}
          <div
            className={`absolute inset-0 bg-black/15 z-[55] transition-opacity duration-300 ${
              drawerOpen ? "opacity-100 cursor-pointer" : "opacity-0 invisible pointer-events-none"
            }`}
            onClick={closeDrawer}
          />
        </div>

        {/* Right drawer — min(30vw, 600px), pushes content left */}
        <div
          className="shrink-0 sticky overflow-hidden transition-[width] duration-300 ease-in-out z-50 bg-white"
          style={{ top: "var(--toolbar-h)", height: "calc(100vh - var(--toolbar-h))", width: drawerOpen ? "min(30vw, 600px)" : 0 }}
        >
          <div ref={drawerScrollRef} className="h-full overflow-y-auto bg-white flex flex-col" style={{ width: "min(30vw, 600px)" }}>
            {drawerSource === "address" && addressDrawerMounted && (
              <AddressSearchModal
                isOpen={drawerOpen && drawerSource === "address"}
                onClose={closeDrawer}
                onSelect={(address) => { setSelectedAddress(address); setPreviewAddress(""); }}
                onAddressPreview={setPreviewAddress}
                triggerRef={activeTriggerRef.current}
                inline
              />
            )}
            {drawerSource === "compare" && compareRace && compareRace.comparisonCandidates && (
              <CompareModal
                isOpen={drawerOpen && drawerSource === "compare"}
                onClose={closeDrawer}
                raceTitle={compareRace.title}
                roleDescription={compareRace.roleDescription || ""}
                candidateCount={compareRace.candidateCount}
                candidates={compareRace.comparisonCandidates}
                inline
              />
            )}
            {drawerSource === "recommendation" && recData && (
              <RecommendationModal
                isOpen={drawerOpen && drawerSource === "recommendation"}
                onClose={closeDrawer}
                data={recData}
                inline
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Mobile
  return (
    <div className="bg-white flex flex-col gap-8 items-start w-[375px] mx-auto">
      <HeroSection
        triggerRef={heroTriggerRef}
        selectedAddress={displayAddress}
        onOpenModal={() => openAddressDrawer(heroTriggerRef)}
      />
      <BallotFilters activeFilters={activeFilters} onToggleFilter={toggleFilter} partyFilter={partyFilter} onPartyFilterChange={setPartyFilter} onResetAll={resetAllFilters} />
      <AllRaces activeFilters={activeFilters} partyFilter={partyFilter} onCompare={openCompareDrawer} onRecommendation={openRecommendationDrawer} recActiveCandidateName={drawerOpen && drawerSource === "recommendation" && recData ? recData.candidateName : undefined} />
      <AddLocationCTA
        triggerRef={ctaTriggerRef}
        selectedAddress={displayAddress}
        onOpenModal={() => openAddressDrawer(ctaTriggerRef)}
      />
      <SourceDisclaimer />
      <VoterGuides />
      <ShareCTA />
      <div className="-mt-8 w-full">
        <Footer />
      </div>

      {addressDrawerMounted && (
        <AddressSearchModal
          isOpen={drawerOpen && drawerSource === "address"}
          onClose={closeDrawer}
          onSelect={(address) => { setSelectedAddress(address); setPreviewAddress(""); }}
          onAddressPreview={setPreviewAddress}
          triggerRef={activeTriggerRef.current}
        />
      )}

      {compareRace && compareRace.comparisonCandidates && (
        <CompareModal
          isOpen={drawerOpen && drawerSource === "compare"}
          onClose={closeDrawer}
          raceTitle={compareRace.title}
          roleDescription={compareRace.roleDescription || ""}
          candidateCount={compareRace.candidateCount}
          candidates={compareRace.comparisonCandidates}
        />
      )}

      {recData && (
        <RecommendationModal
          isOpen={drawerOpen && drawerSource === "recommendation"}
          onClose={closeDrawer}
          data={recData}
        />
      )}
    </div>
  );
}
