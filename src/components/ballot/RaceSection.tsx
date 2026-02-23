"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { assets } from "./assets";
import { useViewMode } from "../ViewModeContext";

interface RaceSectionProps {
  title: string;
  candidateCount: number;
  children: React.ReactNode;
  onCompare?: () => void;
  compareActive?: boolean;
  hasHighlightedCard?: boolean;
}

function NavChevron({ direction }: { direction: "left" | "right" }) {
  const points = direction === "right" ? "9 18 15 12 9 6" : "15 18 9 12 15 6";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polyline
        points={points}
        stroke="#403A49"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FLOATING_SHADOW =
  "0px 9px 20px 0px rgba(0,0,0,0.1), 0px 37px 37px 0px rgba(0,0,0,0.09), 0px 83px 50px 0px rgba(0,0,0,0.05), 0px 148px 59px 0px rgba(0,0,0,0.01), 0px 231px 65px 0px rgba(0,0,0,0)";

export default function RaceSection({
  title,
  candidateCount,
  children,
  onCompare,
  compareActive = false,
}: RaceSectionProps) {
  const { viewMode } = useViewMode();
  const isDesktop = viewMode === "desktop";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();

    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, [isDesktop, checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 316 + 16;
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  const compareChip = (
    <button
      type="button"
      onClick={(e) => {
        if (compareActive) e.stopPropagation();
        onCompare?.();
      }}
      className={`flex gap-1 items-center cursor-pointer transition-all rounded-lg px-4 py-2 border ${
        compareActive
          ? "bg-white border-[#0d4dfb] relative z-[60] shadow-sm"
          : "border-transparent"
      }`}
    >
      <div className="w-4 h-4 overflow-hidden relative shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assets.multipleStop} alt="" className="absolute inset-[16.67%_12.5%] w-[75%] h-[66.66%]" />
      </div>
      <p className="text-xs leading-5 text-[#0d4dfb] text-right">Compare</p>
      <div className="bg-[#4771ff] flex items-center justify-center px-1.5 rounded-2xl">
        <p className="text-xs leading-5 text-white">{candidateCount}</p>
      </div>
    </button>
  );

  if (!isDesktop) {
    return (
      <div className="flex flex-col gap-6 items-start w-full">
        <div className="flex items-center justify-between w-full">
          <p className="font-bold text-[#403a49] text-[16px] leading-6">{title}</p>
          {compareChip}
        </div>
        {/* Cards bleed off both edges; first card gets left padding via pl-8, last card gets right padding via pr-8 */}
        <div
          className="flex gap-2.5 items-stretch overflow-x-auto hide-scrollbar pb-2"
          style={{ width: "calc(100% + 64px)", marginLeft: "-32px", paddingLeft: "32px", paddingRight: "32px" }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 items-start w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <p className="font-bold text-[#403a49] text-[18px] leading-6">{title}</p>
        {compareChip}
      </div>

      {/* Carousel with overlaid navigation */}
      <div className="relative w-full">
        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 items-stretch w-full overflow-x-auto pb-2 scroll-smooth hide-scrollbar"
        >
          {children}
        </div>

        {/* Left: gradient + floating arrow button */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-2 flex items-center z-10">
            <div
              className="absolute inset-y-0 left-0 w-[84px] pointer-events-none"
              style={{
                background: "linear-gradient(to left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)",
              }}
            />
            <button
              type="button"
              onClick={() => scroll("left")}
              className="relative z-20 -ml-[22px] bg-white border border-[#e1dde9] p-2.5 rounded-full cursor-pointer hover:bg-[#f9fafb] transition-colors"
              style={{ boxShadow: FLOATING_SHADOW }}
              aria-label="Scroll left"
            >
              <NavChevron direction="left" />
            </button>
          </div>
        )}

        {/* Right: gradient + floating arrow button */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-2 flex items-center z-10">
            <div
              className="absolute inset-y-0 right-0 w-[84px] pointer-events-none"
              style={{
                background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)",
              }}
            />
            <button
              type="button"
              onClick={() => scroll("right")}
              className="relative z-20 -mr-[22px] bg-white border border-[#e1dde9] p-2.5 rounded-full cursor-pointer hover:bg-[#f9fafb] transition-colors"
              style={{ boxShadow: FLOATING_SHADOW }}
              aria-label="Scroll right"
            >
              <NavChevron direction="right" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
