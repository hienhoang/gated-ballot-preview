"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FullBallotView from "@/components/ballot/FullBallotView";

function BallotContent() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address") || "";

  return (
    <main className="bg-gray-100" style={{ minHeight: "calc(100vh - var(--toolbar-h))" }}>
      <FullBallotView address={address} />
    </main>
  );
}

export default function BallotPage() {
  return (
    <Suspense>
      <BallotContent />
    </Suspense>
  );
}
