"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type ViewMode = "mobile" | "desktop";

interface ViewModeContextValue {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isOverridden: boolean;
}

const ViewModeContext = createContext<ViewModeContextValue>({
  viewMode: "mobile",
  setViewMode: () => {},
  isOverridden: false,
});

const DESKTOP_BREAKPOINT = 1024;

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [naturalMode, setNaturalMode] = useState<ViewMode>("mobile");
  const [override, setOverride] = useState<ViewMode | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setNaturalMode(e.matches ? "desktop" : "mobile");
    };
    update(mql);
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const setViewMode = useCallback(
    (mode: ViewMode) => {
      if (mode === naturalMode) {
        setOverride(null);
      } else {
        setOverride(mode);
      }
    },
    [naturalMode]
  );

  const viewMode = override ?? naturalMode;

  return (
    <ViewModeContext.Provider
      value={{ viewMode, setViewMode, isOverridden: override !== null }}
    >
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}
