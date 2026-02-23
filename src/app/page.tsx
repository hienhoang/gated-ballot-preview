import BallotPreview from "@/components/ballot/BallotPreview";

export default function Home() {
  return (
    <main className="bg-gray-100" style={{ minHeight: "calc(100vh - var(--toolbar-h))" }}>
      <BallotPreview />
    </main>
  );
}
