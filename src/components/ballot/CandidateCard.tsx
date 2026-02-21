"use client";

import { assets } from "./assets";

interface Endorser {
  image: string;
  verified?: boolean;
}

interface CandidateCardProps {
  name: string;
  photo: string;
  party: string;
  title: string;
  description: string;
  endorsers: Endorser[];
  endorsementText: string;
  showAddIssues?: boolean;
}

export default function CandidateCard({
  name,
  photo,
  party,
  title,
  description,
  endorsers,
  endorsementText,
  showAddIssues = false,
}: CandidateCardProps) {
  return (
    <div className="bg-[#f9fafb] flex flex-col items-start min-w-[181px] max-w-[370px] w-[316px] rounded-2xl overflow-hidden shrink-0">
      <div className="flex flex-col gap-5 items-start p-6 w-full">
        <div className="flex gap-5 items-start w-full">
          <div className="w-[67px] h-[67px] rounded-full overflow-hidden shrink-0 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-center">
              <p className="font-bold text-[16px] leading-5 text-[#403a49] tracking-[-0.16px]">
                {name}
              </p>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#403A49"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 ml-0.5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5 text-xs leading-4 text-[#766f81]">
              <p>{party}</p>
              <p>{title}</p>
            </div>
          </div>
        </div>
        <p className="text-sm leading-5 text-[#403a49] w-full">
          {description}
        </p>
        {showAddIssues && (
          <button
            type="button"
            className="bg-[#f0f7ff] border border-[#a5b9ff] flex items-center justify-between p-3 rounded-lg w-full cursor-pointer hover:bg-[#e2efff] transition-colors"
          >
            <span className="text-sm leading-5 text-[#003cd6]">
              Add issues to compare views
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <circle cx="12" cy="12" r="9" stroke="#003cd6" strokeWidth="1.5" />
              <line x1="12" y1="8" x2="12" y2="16" stroke="#003cd6" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="8" y1="12" x2="16" y2="12" stroke="#003cd6" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <div className="border-t border-[#e1dde9] flex gap-2.5 items-start px-6 py-5 w-full">
        <div className="flex items-start pr-3 relative">
          {endorsers.map((endorser, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-[#e1dde9] relative"
              style={{ marginRight: i < endorsers.length - 1 ? "-12px" : 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={endorser.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover rounded-full"
              />
            </div>
          ))}
          {endorsers.some((e) => e.verified) && (
            <div className="absolute w-3 h-3 bg-[#1aa11c] rounded-full p-0.5 left-[34px] top-3">
              <div className="w-[9px] h-[9px] overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assets.checkGreen}
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
        <p className="text-xs leading-5 text-[#766f81]">{endorsementText}</p>
      </div>
    </div>
  );
}
