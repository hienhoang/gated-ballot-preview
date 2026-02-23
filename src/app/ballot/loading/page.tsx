"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { assets } from "@/components/ballot/assets";
import { useViewMode } from "@/components/ViewModeContext";

function LoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const address = searchParams.get("address") || "";
  const { viewMode } = useViewMode();
  const isDesktop = viewMode === "desktop";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(`/ballot?address=${encodeURIComponent(address)}`);
    }, 4000);
    return () => clearTimeout(timer);
  }, [router, address]);

  const containerWidth = isDesktop ? "w-full max-w-[1080px]" : "w-[375px]";
  const skeletonWidth = isDesktop ? "w-full max-w-[1080px]" : "w-[375px]";
  const overlayHeight = isDesktop ? "min-h-screen" : "h-[846px]";

  return (
    <div className="bg-white flex justify-center" style={{ minHeight: "calc(100vh - var(--toolbar-h))" }}>
      <div className={`${containerWidth} min-h-[846px] bg-white relative overflow-hidden`}>
        {/* Background ballot preview at 50% opacity */}
        <div className={`absolute top-0 left-0 ${skeletonWidth} opacity-50`}>
          {/* Nav */}
          <div className={`flex items-center justify-between bg-white sticky top-0 z-[1] overflow-hidden ${
            isDesktop ? "px-8 py-4" : ""
          }`}>
            <div className="flex items-center px-5 h-full">
              <div className="w-8 h-8 overflow-hidden relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={assets.symbolLogo} alt="" className="absolute w-full h-full" />
              </div>
            </div>
            <div className="flex items-center justify-end">
              {isDesktop && (
                <button className="p-2" aria-label="Share">
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

          {/* Header */}
          <div className="flex flex-col gap-8 pt-0">
            {isDesktop ? (
              <div className="flex items-start gap-8 px-8">
                <div className="flex flex-col gap-4 flex-1">
                  <div className="flex flex-col">
                    <p className="font-bold text-sm leading-5 text-[#403a49]">
                      Fort Worth March 2026 Ballot
                    </p>
                    <p className="font-bold text-[32px] leading-10 text-[#403a49]">
                      Best matches for your ballot
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-2.5 bg-[#d9d9d9] rounded-full w-full" />
                    <div className="h-2.5 bg-[#d9d9d9] rounded-full w-full" />
                    <div className="h-2.5 bg-[#d9d9d9] rounded-full w-[70%]" />
                  </div>
                </div>
                <div className="w-[400px] h-[160px] rounded-2xl overflow-hidden shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={assets.fortWorth} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 px-8">
                <div className="flex flex-col">
                  <p className="font-bold text-sm leading-5 text-[#403a49]">
                    Fort Worth March 2026 Ballot
                  </p>
                  <p className="font-bold text-[24px] leading-8 text-[#403a49]">
                    Your ballot
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-2.5 bg-[#d9d9d9] rounded-full w-full" />
                  <div className="h-2.5 bg-[#d9d9d9] rounded-full w-full" />
                  <div className="h-2.5 bg-[#d9d9d9] rounded-full w-[70%]" />
                </div>
              </div>
            )}

            {/* Filter section */}
            <div className="flex flex-col gap-5 pl-8 overflow-hidden">
              <div className="flex justify-between items-start pr-8">
                <p className="font-bold text-xs leading-5 text-[#403a49]">Filter Ballot</p>
                <p className="text-xs leading-5 text-[rgba(64,58,73,0.4)] text-right">Reset</p>
              </div>
              <div className="flex gap-2.5 overflow-hidden">
                <div className="bg-[#cddbff] px-2 py-1.5 rounded-2xl text-xs font-medium leading-4 text-[#003cd6] whitespace-nowrap shrink-0">All</div>
                {["State", "City", "Mayor", "City Council", "Sheriff", "Judicial", "Measures"].map((label) => (
                  <div key={label} className="bg-white border border-[#e1dde9] px-2 py-1.5 rounded-3xl text-xs font-medium leading-4 text-[#766f81] whitespace-nowrap shrink-0">{label}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Background race cards at 50% opacity */}
        <div className={`absolute top-[364px] left-0 ${skeletonWidth} pl-8 opacity-50 overflow-hidden`}>
          <div className="flex justify-between items-center pr-6 mb-6">
            <p className="font-bold text-[16px] leading-6 text-[#403a49]">Mayor</p>
            <div className="flex gap-1 items-center">
              <p className="text-xs leading-5 text-[#0d4dfb]">Compare</p>
              <div className="bg-[#4771ff] text-white text-xs leading-5 px-1.5 rounded-2xl">6</div>
            </div>
          </div>
          <div className={isDesktop ? "grid grid-cols-3 gap-5 pr-8" : "flex gap-2.5 overflow-hidden"}>
            {(isDesktop ? [0, 1, 2] : [0]).map((i) => (
              <div key={i} className={`bg-[#f9fafb] rounded-2xl overflow-hidden ${isDesktop ? "w-full" : "w-[316px] shrink-0"}`}>
                <div className="p-6 flex flex-col gap-5">
                  <div className="flex gap-5">
                    <div className="w-[67px] h-[67px] rounded-full overflow-hidden shrink-0 bg-[#e5e5e5]" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="h-5 bg-[#d9d9d9] rounded-full w-[120px]" />
                      <div className="flex flex-col gap-1">
                        <div className="h-3 bg-[#d9d9d9] rounded-full w-[100px]" />
                        <div className="h-3 bg-[#d9d9d9] rounded-full w-[140px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-2.5 bg-[#d9d9d9] rounded-full w-full" />
                    <div className="h-2.5 bg-[#d9d9d9] rounded-full w-full" />
                    <div className="h-2.5 bg-[#d9d9d9] rounded-full w-[60%]" />
                  </div>
                </div>
                <div className="border-t border-[#e1dde9] px-6 py-5 flex gap-2.5 items-start">
                  <div className="flex pr-3">
                    <div className="w-6 h-6 rounded-full bg-[#e5e5e5] -mr-3 border border-[#e1dde9]" />
                    <div className="w-6 h-6 rounded-full bg-[#e5e5e5] -mr-3 border border-[#e1dde9]" />
                    <div className="w-6 h-6 rounded-full bg-[#e5e5e5] border border-[#e1dde9]" />
                  </div>
                  <div className="h-4 bg-[#d9d9d9] rounded-full w-[180px] mt-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading overlay */}
        <div
          className={`absolute top-0 left-0 w-full ${overlayHeight} flex flex-col items-center justify-center z-10 pointer-events-none`}
          style={{
            background: "radial-gradient(ellipse 70% 45% at 50% 48%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.7) 55%, rgba(255,255,255,0) 100%)",
          }}
        >
          <div className="flex flex-col items-center gap-4 px-10">
            <div className="w-[120px] h-[120px] flex items-center justify-center mb-2">
              <div className="magnifying-glass-orbit">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/magnifying-glass.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className="font-bold text-[24px] leading-8 text-[#403a49] text-center">
              Finding your ballot...
            </p>
            <p className="text-sm leading-5 text-[#403a49] text-center max-w-[400px]">
              We&apos;re matching your location with official election data to show the correct races and measures.
            </p>
          </div>
        </div>

        <style jsx>{`
          .magnifying-glass-orbit {
            width: 88px;
            height: 88px;
            offset-path: circle(32px);
            animation: orbit 3.5s linear infinite;
            offset-rotate: 0deg;
          }
          @keyframes orbit {
            0% { offset-distance: 0%; }
            100% { offset-distance: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
}

export default function BallotLoadingPage() {
  return (
    <Suspense>
      <LoadingContent />
    </Suspense>
  );
}
