"use client";

import { assets } from "./assets";

interface RaceSectionProps {
  title: string;
  candidateCount: number;
  children: React.ReactNode;
}

export default function RaceSection({
  title,
  candidateCount,
  children,
}: RaceSectionProps) {
  return (
    <div className="flex flex-col gap-6 items-start w-full">
      <div className="flex items-center justify-between pr-6 w-full">
        <p className="font-bold text-[16px] leading-6 text-[#403a49]">
          {title}
        </p>
        <div className="flex gap-1 items-center">
          <div className="w-4 h-4 overflow-hidden relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assets.multipleStop}
              alt=""
              className="absolute inset-[16.67%_12.5%] w-[75%] h-[66.66%]"
            />
          </div>
          <p className="text-xs leading-5 text-[#0d4dfb] text-right">
            Compare
          </p>
          <div className="bg-[#4771ff] flex items-center justify-center px-1.5 rounded-2xl">
            <p className="text-xs leading-5 text-white">{candidateCount}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2.5 items-start overflow-x-auto w-full pb-2">
        {children}
      </div>
    </div>
  );
}
