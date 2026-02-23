"use client";

import { ViewModeProvider } from "./ViewModeContext";
import ViewSwitcher from "./ViewSwitcher";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewModeProvider>
      {children}
      <ViewSwitcher />
    </ViewModeProvider>
  );
}
