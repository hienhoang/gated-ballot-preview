"use client";

import React, { useState, useMemo, useRef } from "react";
import { assets } from "./assets";
import AddressField from "./AddressField";
import AddressSearchModal from "./AddressSearchModal";
import SectionHeader from "./SectionHeader";
import RaceSection from "./RaceSection";
import CandidateCard from "./CandidateCard";
import MeasureCard from "./MeasureCard";

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
}

function HeroSection({ triggerRef, selectedAddress, onOpenModal }: HeroSectionProps) {
  return (
    <div className="flex flex-col gap-8 items-start w-full">
      <div className="flex flex-col gap-3 items-start w-full">
        <div className="flex flex-col items-center py-5 w-full">
          <div className="bg-white flex items-center justify-center w-full overflow-hidden sticky top-0">
            <Logo />
          </div>
        </div>
        <div className="flex flex-col gap-2.5 items-center px-8 w-full">
          <p className="text-xs leading-5 text-[#403a49]">
            <span className="font-bold">Primary Election</span>
            <span className="text-[rgba(64,58,73,0.4)]"> | </span>
            <span className="font-bold"> March 3, 2026</span>
          </p>
          <div className="flex flex-col items-start w-full">
            <p className="font-bold text-[32px] leading-10 text-[#403a49] text-center tracking-[-0.32px] w-full">
              What&apos;s on the ballot for Fort Worth.
            </p>
          </div>
          <p className="text-[16px] leading-6 text-[#403a49] text-center max-w-[311px]">
            See the candidates and measures <br />
            you&apos;ll vote on without partisan bias.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 items-start px-8 w-full">
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
        <div className="h-[84px] overflow-hidden relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assets.fortWorth}
            alt="Fort Worth"
            className="absolute left-0 top-[-10px] w-full h-[94px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export type FilterKey = "all" | "senate" | "house" | "governor" | "lt_governor";

interface BallotFiltersProps {
  activeFilter: FilterKey;
  onFilterChange: (filter: FilterKey) => void;
}

export function BallotFilters({ activeFilter, onFilterChange }: BallotFiltersProps) {
  const filters: { key: FilterKey; label: string }[] = [
    { key: "senate", label: "Senate" },
    { key: "house", label: "House" },
    { key: "governor", label: "Governor" },
    { key: "lt_governor", label: "Lieutenant Governor" },
  ];

  return (
    <div className="flex flex-col gap-3 items-start pl-8 w-full overflow-hidden">
      <div className="flex items-start justify-between pr-8 w-full">
        <p className="font-bold text-xs leading-5 text-[#403a49]">
          Filter Ballot
        </p>
        <button
          type="button"
          onClick={() => onFilterChange("all")}
          className={`text-xs leading-5 text-right cursor-pointer ${
            activeFilter === "all"
              ? "text-[rgba(64,58,73,0.4)]"
              : "text-[#0d4dfb]"
          }`}
        >
          Reset
        </button>
      </div>
      <div className="flex gap-3 items-center w-full overflow-x-auto">
        <div className="bg-white border border-[#e1dde9] flex gap-2 items-center px-4 py-2 rounded-3xl shrink-0">
          <div className="w-3 h-3 relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.layerIcon} alt="" className="w-full h-full" />
          </div>
          <p className="text-xs leading-5 text-[#766f81]">All Primaries</p>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#766f81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        <div className="w-px h-[20px] bg-[#e1dde9] shrink-0" />
        <div className="flex gap-1 items-center">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                type="button"
                key={filter.key}
                onClick={() => onFilterChange(isActive ? "all" : filter.key)}
                className={`flex items-center px-4 py-2 rounded-3xl shrink-0 cursor-pointer border transition-colors ${
                  isActive
                    ? "bg-[#403a49] border-[#403a49] text-white"
                    : "bg-white border-[#e1dde9] text-[#766f81]"
                }`}
              >
                <p className="text-xs leading-4">{filter.label}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface RaceData {
  title: string;
  candidateCount: number;
  filterKey: FilterKey;
  section: "federal" | "state" | "local";
  type: "candidate" | "measure" | "board";
  candidates: React.ReactNode;
}

export function AllRaces({ activeFilter, showAddIssues = false }: { activeFilter: FilterKey; showAddIssues?: boolean }) {
  const e1 = assets.endorser1;
  const e2 = assets.endorser2;
  const e3 = assets.endorser3;
  const e4 = assets.endorser4;
  const e5 = assets.endorser5;
  const e7 = assets.endorser7;
  const eJ = assets.endorserJoyce;

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    federal: true,
    state: true,
    local: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const races: RaceData[] = useMemo(
    () => [
      {
        title: "U.S. Senate Texas",
        candidateCount: 6,
        filterKey: "senate" as FilterKey,
        section: "federal",
        type: "candidate",
        candidates: (
          <>
            <CandidateCard name="John Cornyn" photo={assets.johnCornyn} party="Republican Party" title="Attorney" description="Ali is focused on local economic development and neighborhood infrastructure. His platform emphasizes zoning updates, fiscal transparency, and improving street and sidewalk maintenance." endorsers={[{ image: e1 }, { image: e2, verified: true }, { image: e3 }]} endorsementText="Recommended by Ro Khanna & 8 more" />
            <CandidateCard name="James Solomon" photo={assets.jamesSolomon} party="Democratic Party" title="City Councilmember, Ward D" description="A strong progressive advocate for renters, public transit improvements, and environmental protections, with a solid track record in Jersey City." endorsers={[{ image: e1 }, { image: e2, verified: true }, { image: e4 }]} endorsementText="Recommended by CIR/SEIU & 10 others" />
            <CandidateCard name="Bill O'Dea" photo={assets.billOdea} party="Democratic Party" title="Hudson County Commissioner" description="Supports affordable housing initiatives and promotes safer, greener transportation, offering experienced and pragmatic leadership." endorsers={[{ image: e1 }, { image: e2, verified: true }, { image: e5 }]} endorsementText="Recommended by 32BJ SEIU & 6 more" />
          </>
        ),
      },
      {
        title: "U.S. House Texas District 12",
        candidateCount: 8,
        filterKey: "house" as FilterKey,
        section: "federal",
        type: "candidate",
        candidates: (
          <>
            <CandidateCard name="Craig Goldman" photo={assets.craigGoldman} party="Republican Party" title="Business Owner" description="A devoted community organizer and tech executive who has worked on housing stability and workforce development in Springfield." endorsers={[{ image: eJ, verified: true }]} endorsementText="Recommended by Joyce Watterman" />
            <CandidateCard name="Patrick Ambrossi" photo={assets.patrickAmbrossi} party="Democratic Party" title="Principal Fiscal Analyst" description="Wants to strengthen rent stabilization, expand bus and bike access, and push for sustainable development that serves existing residents." endorsers={[{ image: e7, verified: true }]} endorsementText="Recommended by Mussab Ali" />
            <CandidateCard name="Catherine Healy" photo={assets.catherineHealy} party="Democratic Party" title="Attorney" description="Centers housing justice and legal advocacy, with a focus on keeping renters in their homes and expanding access to affordable housing." endorsers={[]} endorsementText="" />
          </>
        ),
      },
      {
        title: "Governor of Texas",
        candidateCount: 6,
        filterKey: "governor" as FilterKey,
        section: "state",
        type: "candidate",
        candidates: (
          <>
            <CandidateCard name="Greg Abbott" photo={assets.gregAbbott} party="Republican Party" title="Attorney" description="Ali is focused on local economic development and neighborhood infrastructure. His platform emphasizes zoning updates, fiscal transparency, and improving street and sidewalk maintenance." endorsers={[{ image: e1 }, { image: e2, verified: true }, { image: e3 }]} endorsementText="Recommended by Ro Khanna & 8 more" />
            <CandidateCard name="James Solomon" photo={assets.jamesSolomon} party="Democratic Party" title="City Councilmember, Ward D" description="A strong progressive advocate for renters, public transit improvements, and environmental protections, with a solid track record in Jersey City." endorsers={[{ image: e1 }, { image: e2, verified: true }, { image: e4 }]} endorsementText="Recommended by CIR/SEIU & 10 others" />
            <CandidateCard name="Bill O'Dea" photo={assets.billOdea} party="Democratic Party" title="Hudson County Commissioner" description="Supports affordable housing initiatives and promotes safer, greener transportation, offering experienced and pragmatic leadership." endorsers={[{ image: e1 }, { image: e2, verified: true }, { image: e5 }]} endorsementText="Recommended by 32BJ SEIU & 6 more" />
          </>
        ),
      },
      {
        title: "Lieutenant Governor of Texas",
        candidateCount: 8,
        filterKey: "lt_governor" as FilterKey,
        section: "state",
        type: "candidate",
        candidates: (
          <>
            <CandidateCard name="Dan Patrick" photo={assets.danPatrick} party="Republican Party" title="Business Owner" description="A devoted community organizer and tech executive who has worked on housing stability and workforce development in Springfield." endorsers={[{ image: eJ, verified: true }]} endorsementText="Recommended by Joyce Watterman" />
            <CandidateCard name="Patrick Ambrossi" photo={assets.patrickAmbrossi} party="Democratic Party" title="Principal Fiscal Analyst" description="Wants to strengthen rent stabilization, expand bus and bike access, and push for sustainable development that serves existing residents." endorsers={[{ image: e7, verified: true }]} endorsementText="Recommended by Mussab Ali" />
            <CandidateCard name="Catherine Healy" photo={assets.catherineHealy} party="Democratic Party" title="Attorney" description="Centers housing justice and legal advocacy, with a focus on keeping renters in their homes and expanding access to affordable housing." endorsers={[]} endorsementText="" />
          </>
        ),
      },
      {
        title: "Mayor",
        candidateCount: 6,
        filterKey: "all" as FilterKey,
        section: "local",
        type: "candidate",
        candidates: (
          <>
            <CandidateCard name="Mussab Ali" photo={assets.mussabAli} party="Democratic Party" title="Board of Education, President" description="Ali is focused on local economic development and neighborhood infrastructure. His platform emphasizes zoning updates, fiscal transparency, and improving street and sidewalk maintenance." endorsers={[{ image: e1 }, { image: e2, verified: true }, { image: e3 }]} endorsementText="Recommended by Ro Khanna & 8 more" />
            <CandidateCard name="James Solomon" photo={assets.jamesSolomon} party="Democratic Party" title="City Councilmember, Ward D" description="A strong progressive advocate for renters, public transit improvements, and environmental protections, with a solid track record in Jersey City." endorsers={[{ image: e1 }, { image: e2, verified: true }, { image: e4 }]} endorsementText="Recommended by CIR/SEIU & 10 others" />
            <CandidateCard name="Bill O'Dea" photo={assets.billOdea} party="Democratic Party" title="Hudson County Commissioner" description="Supports affordable housing initiatives and promotes safer, greener transportation, offering experienced and pragmatic leadership." endorsers={[{ image: e1 }, { image: e2, verified: true }, { image: e5 }]} endorsementText="Recommended by 32BJ SEIU & 6 more" />
          </>
        ),
      },
      {
        title: "City Council, Ward D",
        candidateCount: 8,
        filterKey: "all" as FilterKey,
        section: "local",
        type: "candidate",
        candidates: (
          <>
            <CandidateCard name="Jeff Justice Williams" photo={assets.jeffWilliams} party="Democratic Party" title="Customer Success Executive" description="A devoted community organizer and tech executive who has worked on housing stability and workforce development in Springfield." endorsers={[{ image: eJ, verified: true }]} endorsementText="Recommended by Joyce Watterman" />
            <CandidateCard name="Patrick Ambrossi" photo={assets.patrickAmbrossi} party="Democratic Party" title="Principal Fiscal Analyst" description="Wants to strengthen rent stabilization, expand bus and bike access, and push for sustainable development that serves existing residents." endorsers={[{ image: e7, verified: true }]} endorsementText="Recommended by Mussab Ali" />
            <CandidateCard name="Catherine Healy" photo={assets.catherineHealy} party="Democratic Party" title="Attorney" description="Centers housing justice and legal advocacy, with a focus on keeping renters in their homes and expanding access to affordable housing." endorsers={[]} endorsementText="" />
          </>
        ),
      },
      {
        title: "Board of Education",
        candidateCount: 12,
        filterKey: "all" as FilterKey,
        section: "local",
        type: "board",
        candidates: (
          <>
            <div className="flex flex-col items-start pt-2.5 pb-2 relative shrink-0">
              <CandidateCard name="Natalia Ioffe" photo={assets.nataliaIoffe} party="Nonpartisan" title="Mortgage Processor" description="A finance professional who has worked with the Springfield School District on budgeting and facilities planning." endorsers={[{ image: e1 }, { image: e2, verified: true }, { image: assets.endorserDistrict }]} endorsementText="Recommended by Elect Wome... & 2 more" />
              <div className="absolute bg-[#403a49] flex flex-col items-start px-2 py-1 rounded-full top-0 left-6">
                <p className="text-xs font-medium leading-[10px] text-white whitespace-nowrap">1 of 3 seats</p>
              </div>
            </div>
            <div className="flex flex-col items-start pt-2.5 pb-2 relative shrink-0">
              <CandidateCard name="Ahmed Kheir" photo={assets.ahmedKheir} party="Nonpartisan" title="System Integration Specialist" description="Calls for equitable funding, inclusive curriculum, and safe, accessible schools while advocating for better public accountability." endorsers={[{ image: e1 }, { image: e2, verified: true }, { image: assets.endorserFW }]} endorsementText="Recommended by Education M...& 3 more" />
              <div className="absolute bg-[#403a49] flex items-center justify-center px-2 py-1 rounded-full top-0 left-6">
                <p className="text-xs font-medium leading-[10px] text-white whitespace-nowrap">2 of 3 seats</p>
              </div>
            </div>
            <div className="flex flex-col items-start pt-2.5 pb-2 relative shrink-0">
              <CandidateCard name="Melany Cruz Burgos" photo={assets.melanyCruz} party="Nonpartisan" title="Attorney" description="Emphasizes transparency, community input, and a more progressive district vision grounded in equity, mental health support, and closing opportunity gaps." endorsers={[{ image: e1 }, { image: e2, verified: true }, { image: assets.endorser8 }]} endorsementText="Recommended by Jersey City E...& 3 more" />
              <div className="absolute bg-[#403a49] flex items-center justify-center px-2 py-1 rounded-full top-0 left-6">
                <p className="text-xs font-medium leading-[10px] text-white whitespace-nowrap">3 of 3 seats</p>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Municipal Question 1",
        candidateCount: 2,
        filterKey: "all" as FilterKey,
        section: "local",
        type: "measure",
        candidates: (
          <>
            <MeasureCard position="Yes" title="Short-Term Rental Property Regulations and Permit Requirements" description="A yes vote helps keep more homes available for renters by stopping landlords from turning rent-controlled apartments into Airbnbs." endorsementText="Recommended by NJ Working... & 15 more" endorserImage={assets.endorser9} />
            <MeasureCard position="No" title="Short-Term Rental Property Regulations and Permit Requirements" description="Tightening rental rules may reduce flexible housing options and raise prices for long-term tenants. Voting no supports maintaining access and affordability." endorsementText="Recommended by Jersey City Short Term..." endorserImage={assets.endorser10} />
          </>
        ),
      },
    ],
    [e1, e2, e3, e4, e5, e7, eJ]
  );

  const sections: { key: string; label: string; sectionKey: "federal" | "state" | "local" }[] = [
    { key: "federal", label: "Federal Races", sectionKey: "federal" },
    { key: "state", label: "State Races", sectionKey: "state" },
    { key: "local", label: "Local Races", sectionKey: "local" },
  ];

  return (
    <div className="flex flex-col gap-6 items-start w-full">
      {sections.map((section) => {
        const sectionRaces = races.filter((r) => {
          if (r.section !== section.sectionKey) return false;
          if (activeFilter === "all") return true;
          return r.filterKey === activeFilter || r.filterKey === "all";
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
              className={`flex flex-col gap-10 items-start overflow-hidden pl-8 w-full transition-all duration-300 ${
                isOpen ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {sectionRaces.map((race) => (
                <RaceSection
                  key={race.title}
                  title={race.title}
                  candidateCount={race.candidateCount}
                >
                  {showAddIssues
                    ? React.Children.map(race.candidates, (child) => {
                        if (React.isValidElement(child) && child.type === CandidateCard) {
                          return React.cloneElement(child as React.ReactElement<{ showAddIssues?: boolean }>, { showAddIssues: true });
                        }
                        if (React.isValidElement(child) && (child.props as Record<string, unknown>)?.children) {
                          const inner = (child.props as { children?: React.ReactNode }).children;
                          const cloned = React.Children.map(inner, (c) => {
                            if (React.isValidElement(c) && c.type === CandidateCard) {
                              return React.cloneElement(c as React.ReactElement<{ showAddIssues?: boolean }>, { showAddIssues: true });
                            }
                            return c;
                          });
                          return React.cloneElement(child as React.ReactElement, {}, cloned);
                        }
                        return child;
                      })
                    : race.candidates}
                </RaceSection>
              ))}
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
        <div className="flex flex-col gap-2.5 items-start w-full">
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
  return (
    <div className="border-b border-[#e1dde9] flex items-center justify-center pb-8 px-8 w-full">
      <p className="flex-1 text-xs leading-5 text-[#766f81]">
        Info sourced from public filings, verified media, and official campaign
        materials and summarized by AI.{" "}
        <br />
        <span className="text-[#003cd6]">Learn more →</span>
      </p>
    </div>
  );
}

export function VoterGuides() {
  const guides = [
    { name: "Daniel Joffe", image: assets.danielJoffe },
    { name: "Hoboken Girl", image: assets.hobokenGirl },
    { name: "Pissed Off Voter Mike", image: assets.voterMike },
  ];

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

export function Footer() {
  return (
    <div className="bg-[#f0f7ff] flex flex-col items-start overflow-hidden w-full max-w-[1500px]">
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
          <div className="flex flex-wrap gap-x-2.5 gap-y-2 items-start h-[38px] w-full">
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
            <div className="flex flex-col items-center w-full">
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
            </div>
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

export default function BallotPreview() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const heroTriggerRef = useRef<HTMLButtonElement>(null);
  const ctaTriggerRef = useRef<HTMLButtonElement>(null);
  const activeTriggerRef = useRef<React.RefObject<HTMLElement | null>>(heroTriggerRef);

  const openModal = (triggerRef: React.RefObject<HTMLElement | null>) => {
    activeTriggerRef.current = triggerRef;
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white flex flex-col gap-8 items-start w-[375px] mx-auto">
      <HeroSection
        triggerRef={heroTriggerRef}
        selectedAddress={selectedAddress}
        onOpenModal={() => openModal(heroTriggerRef)}
      />
      <BallotFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <AllRaces activeFilter={activeFilter} />
      <AddLocationCTA
        triggerRef={ctaTriggerRef}
        selectedAddress={selectedAddress}
        onOpenModal={() => openModal(ctaTriggerRef)}
      />
      <SourceDisclaimer />
      <VoterGuides />
      <ShareCTA />
      <Footer />

      <AddressSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={(address) => setSelectedAddress(address)}
        triggerRef={activeTriggerRef.current}
      />
    </div>
  );
}
