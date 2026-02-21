"use client";

import { assets } from "./assets";

interface MeasureCardProps {
  position: "Yes" | "No";
  title: string;
  description: string;
  endorsementText: string;
  endorserImage: string;
}

export default function MeasureCard({
  position,
  title,
  description,
  endorsementText,
  endorserImage,
}: MeasureCardProps) {
  const isYes = position === "Yes";

  return (
    <div className="bg-[#f9fafb] flex flex-col items-start min-w-[181px] max-w-[370px] w-[316px] rounded-2xl overflow-hidden shrink-0">
      <div className="flex flex-col gap-5 items-start p-6 w-full">
        <div className="flex gap-5 items-start w-full">
          <div
            className={`w-[68px] h-[68px] rounded-[12.96px] flex flex-col items-center px-4 py-2.5 shrink-0 ${
              isYes ? "bg-[#1aa11c]" : "bg-[#766f81]"
            }`}
          >
            <p className="font-bold text-[16px] leading-4 text-white text-center">
              {position}
            </p>
            <div className="w-[36px] h-[36px] overflow-hidden shrink-0">
              {isYes ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={assets.checkWhite}
                  alt=""
                  className="w-full h-full"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={assets.xIcon} alt="" className="w-5 h-5 mt-2 mx-auto" />
              )}
            </div>
          </div>
          <div className="flex items-end flex-1">
            <p className="font-bold text-sm leading-5 text-[#403a49] w-[180px]">
              {title}
            </p>
          </div>
        </div>
        <p className="text-sm leading-5 text-[#403a49] w-full">{description}</p>
      </div>
      <div className="border-t border-[#e1dde9] flex gap-2.5 items-start px-6 py-5 w-full relative">
        <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-[#e1dde9] relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={endorserImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute w-3 h-3 bg-[#1aa11c] rounded-full p-0.5 left-[42px] top-[31px]">
          <div className="w-[9px] h-[9px] overflow-hidden rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={assets.checkGreen} alt="" className="w-full h-full" />
          </div>
        </div>
        <p className="text-xs leading-5 text-[#766f81]">{endorsementText}</p>
      </div>
    </div>
  );
}
