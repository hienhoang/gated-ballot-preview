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
  onRecommendationClick?: () => void;
  onCardClick?: () => void;
  highlightActive?: boolean;
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
  onRecommendationClick,
  onCardClick,
  highlightActive = false,
}: CandidateCardProps) {
  const hasEndorsers = endorsers.length > 0;
  const footerInteractive = hasEndorsers && onRecommendationClick;

  return (
    <div className={`bg-[#f4f6f9] flex flex-col rounded-2xl overflow-hidden min-w-[181px] max-w-[370px] w-[316px] shrink-0 self-stretch ${
      highlightActive ? "relative z-[56]" : ""
    }`}>
      {/* Card body — candidate info zone */}
      <button
        type="button"
        onClick={onCardClick}
        className="flex flex-col gap-5 items-start p-6 w-full flex-1 text-left rounded-t-2xl border border-transparent transition-colors cursor-pointer hover:bg-[#e2efff] hover:border-[#4771ff] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4771ff] focus-visible:rounded-t-2xl active:bg-[#cddbff] active:border-[#4771ff]"
      >
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
          <span
            role="presentation"
            className="bg-[#f0f7ff] border border-[#a5b9ff] flex items-center justify-between p-3 rounded-lg w-full hover:bg-[#e2efff] transition-colors"
          >
            <span className="text-sm leading-5 text-[#003cd6]">
              Add issues to compare views
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <circle cx="12" cy="12" r="9" stroke="#003cd6" strokeWidth="1.5" />
              <line x1="12" y1="8" x2="12" y2="16" stroke="#003cd6" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="8" y1="12" x2="16" y2="12" stroke="#003cd6" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        )}
      </button>

      {/* Endorsement footer zone */}
      <div
        role={footerInteractive ? "button" : undefined}
        tabIndex={footerInteractive ? 0 : undefined}
        onClick={footerInteractive ? onRecommendationClick : undefined}
        onKeyDown={footerInteractive ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRecommendationClick?.(); } } : undefined}
        className={`flex gap-2.5 items-center px-6 py-5 w-full h-[64px] shrink-0 overflow-hidden transition-colors ${
          highlightActive
            ? "bg-[#e2efff] border border-[#4771ff] rounded-b-2xl"
            : "border-t border-[#e1dde9]"
        } ${
          footerInteractive && !highlightActive
            ? "cursor-pointer hover:bg-[#e2efff] hover:border hover:border-[#4771ff] hover:rounded-b-2xl focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4771ff] focus-visible:rounded-b-2xl active:bg-[#cddbff] active:border active:border-[#4771ff] active:rounded-b-2xl"
            : footerInteractive ? "cursor-pointer" : ""
        }`}
      >
        {hasEndorsers ? (
          <>
            <div className="flex items-center shrink-0 relative pr-1">
              {endorsers.map((endorser, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-[#e1dde9] relative"
                  style={{ marginLeft: i > 0 ? "-12px" : 0, zIndex: endorsers.length - i }}
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
                <div className="absolute w-3 h-3 bg-[#1aa11c] rounded-full p-0.5 -right-0.5 bottom-0 z-10">
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
            <p className="text-xs leading-5 text-[#766f81] truncate min-w-0">{endorsementText}</p>
          </>
        ) : (
          <p className="text-xs leading-5 text-[#766f81]">No recommendations yet.</p>
        )}
      </div>
    </div>
  );
}
