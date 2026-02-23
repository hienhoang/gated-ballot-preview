"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { assets } from "./assets";
import { useViewMode } from "../ViewModeContext";
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
import AddressField from "./AddressField";
import CompareModal from "./CompareModal";
import RecommendationModal, { type RecommendationData } from "./RecommendationModal";

function FullBallotHero({ address, isDesktop }: { address: string; isDesktop: boolean }) {
  return (
    <div className="flex flex-col gap-8 items-start w-full">
      {/* Navigation */}
      <div className={`bg-white flex items-center justify-between overflow-hidden sticky top-0 w-full z-30 ${
        isDesktop ? "px-8 py-4" : ""
      }`}>
        <div className="flex items-center px-5">
          <div className="w-8 h-8 overflow-hidden relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.symbolLogo} alt="change.vote" className="absolute w-full h-full" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          {isDesktop && (
            <div className="bg-[#6366f1] flex gap-1 items-center justify-center px-4 py-2 rounded-full cursor-pointer">
              <span className="text-sm font-bold text-white">Guided View</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          )}
          {!isDesktop && (
            <div className="bg-[#403a49] flex gap-1 items-center justify-center pl-2.5 pr-1 py-0.5 rounded-full">
              <span className="text-xs leading-5 text-white">✨</span>
              <span className="text-xs leading-5 text-white">Guided View</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          )}
          {isDesktop && (
            <button className="p-2 cursor-pointer" aria-label="Share">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#403A49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>
          )}
          <div className="p-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#403A49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hero section */}
      {isDesktop ? (
        <div className="flex flex-col items-start w-full">
          <div className="flex items-start w-full gap-8 px-8">
            <div className="flex flex-col gap-4 items-start flex-1">
              <div className="flex flex-col items-start w-full">
                <p className="font-bold text-sm leading-5 text-[#403a49]">
                  Fort Worth March 2026 Ballot
                </p>
                <p className="font-bold text-[32px] leading-10 text-[#403a49] tracking-[-1px]">
                  Your ballot
                </p>
              </div>
              <p className="text-[16px] leading-6 text-[#403a49] max-w-[420px]">
                Your vote on March 3rd will shape funding for
                affordable housing, rail lines, seawalls, and
                neighborhood safety.
              </p>
            </div>
            <div className="w-[400px] h-[160px] rounded-2xl overflow-hidden shrink-0 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assets.fortWorth}
                alt="Fort Worth"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}

function DesktopAddLocationCTA() {
  return (
    <div className="flex flex-col items-center px-8 w-full py-4">
      <div className="border border-[#e1dde9] flex flex-col gap-4 items-center p-8 rounded-2xl w-full max-w-[600px]">
        <div className="flex flex-col gap-2 items-center w-full text-center">
          <p className="font-bold text-lg leading-7 text-[#403a49]">
            Add a location to get your full ballot.
          </p>
          <p className="text-sm leading-5 text-[#766f81]">
            We&apos;ll only use your address to find the correct ballot. We
            won&apos;t sell your data or send you mail.
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center w-full max-w-[400px]">
          <AddressField placeholder="Search location" />
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

export default function FullBallotView({ address }: { address: string }) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const router = useRouter();
  const { viewMode } = useViewMode();
  const isDesktop = viewMode === "desktop";

  type DrawerSource = "compare" | "recommendation";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSource, setDrawerSource] = useState<DrawerSource>("compare");

  const [compareRace, setCompareRace] = useState<{
    title: string;
    roleDescription: string;
    candidateCount: number;
    candidates: { name: string; photo: string; stance: string }[];
  } | null>(null);

  const [recData, setRecData] = useState<RecommendationData | null>(null);
  const drawerScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drawerOpen && drawerScrollRef.current) {
      drawerScrollRef.current.scrollTop = 0;
    }
  }, [drawerOpen, drawerSource]);

  const openCompare = (race: { title: string; roleDescription?: string; candidateCount: number; comparisonCandidates?: { name: string; photo: string; stance: string }[] }) => {
    if (!race.comparisonCandidates) return;
    setCompareRace({
      title: race.title,
      roleDescription: race.roleDescription || "",
      candidateCount: race.candidateCount,
      candidates: race.comparisonCandidates,
    });
    setDrawerSource("compare");
    setDrawerOpen(true);
  };

  const openRecommendation = (data: RecommendationData) => {
    setRecData(data);
    setDrawerSource("recommendation");
    setDrawerOpen(true);
  };

  const closeDrawer = () => setDrawerOpen(false);

  if (isDesktop) {
    return (
      <>
        <div className="flex w-full" style={{ minHeight: "calc(100vh - var(--toolbar-h))" }}>
          <div className={`flex-1 min-w-0 bg-white flex flex-col gap-8 items-start mx-auto overflow-y-auto relative ${
            drawerOpen ? "max-w-[1800px]" : "max-w-[1280px]"
          }`}>
            <FullBallotHero address={address} isDesktop={isDesktop} />
            <BallotFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            <AllRaces activeFilter={activeFilter} showAddIssues onCompare={openCompare} compareActiveTitle={drawerOpen && drawerSource === "compare" && compareRace ? compareRace.title : undefined} onRecommendation={openRecommendation} recActiveCandidateName={drawerOpen && drawerSource === "recommendation" && recData ? recData.candidateName : undefined} />
            <DesktopAddLocationCTA />
            <SourceDisclaimer />
            <VoterGuides />
            <ShareCTA />
            <Footer />

            <div
              className={`absolute inset-0 bg-black/15 z-[55] transition-opacity duration-300 ${
                drawerOpen ? "opacity-100 cursor-pointer" : "opacity-0 invisible pointer-events-none"
              }`}
              onClick={closeDrawer}
            />
          </div>

          <div
            className="shrink-0 sticky overflow-hidden transition-[width] duration-300 ease-in-out z-50 bg-white"
            style={{ top: "var(--toolbar-h)", height: "calc(100vh - var(--toolbar-h))", width: drawerOpen ? "min(30vw, 600px)" : 0 }}
          >
            <div ref={drawerScrollRef} className="h-full overflow-y-auto bg-white flex flex-col" style={{ width: "min(30vw, 600px)" }}>
              {drawerSource === "compare" && compareRace && (
                <CompareModal
                  isOpen={drawerOpen && drawerSource === "compare"}
                  onClose={closeDrawer}
                  raceTitle={compareRace.title}
                  roleDescription={compareRace.roleDescription}
                  candidateCount={compareRace.candidateCount}
                  candidates={compareRace.candidates}
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

  return (
    <>
      <div className="bg-white flex flex-col gap-8 items-start w-[375px] mx-auto">
        <FullBallotHero address={address} isDesktop={isDesktop} />
        <BallotFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <AllRaces activeFilter={activeFilter} showAddIssues onCompare={openCompare} onRecommendation={openRecommendation} recActiveCandidateName={drawerOpen && drawerSource === "recommendation" && recData ? recData.candidateName : undefined} />
        <SourceDisclaimer />
        <VoterGuides />
        <ShareCTA />
        <Footer />
      </div>

      {compareRace && (
        <CompareModal
          isOpen={drawerOpen && drawerSource === "compare"}
          onClose={closeDrawer}
          raceTitle={compareRace.title}
          roleDescription={compareRace.roleDescription}
          candidateCount={compareRace.candidateCount}
          candidates={compareRace.candidates}
        />
      )}

      {recData && (
        <RecommendationModal
          isOpen={drawerOpen && drawerSource === "recommendation"}
          onClose={closeDrawer}
          data={recData}
        />
      )}

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
