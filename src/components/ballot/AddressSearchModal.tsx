"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { APIProvider, Map, AdvancedMarker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#766f81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#403A49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="10" fill="#c4c0ca" />
      <line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="shrink-0">
      <path d="M8 0C3.58 0 0 3.58 0 8C0 13.54 7.36 19.59 7.67 19.84C7.77 19.93 7.88 19.97 8 19.97C8.12 19.97 8.23 19.93 8.33 19.84C8.64 19.59 16 13.54 16 8C16 3.58 12.42 0 8 0ZM8 11C6.34 11 5 9.66 5 8C5 6.34 6.34 5 8 5C9.66 5 11 6.34 11 8C11 9.66 9.66 11 8 11Z" fill="#766f81" />
    </svg>
  );
}

function ArrowOutwardIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="#403A49" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

interface Prediction {
  placeId: string;
  text: string;
}

const FORT_WORTH_CENTER = { lat: 32.7555, lng: -97.3308 };

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface AddressSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (address: string) => void;
  onAddressPreview?: (address: string) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  inline?: boolean;
}

export default function AddressSearchModal(props: AddressSearchModalProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  return (
    <APIProvider
      apiKey={apiKey}
      libraries={["places"]}
      authReferrerPolicy="origin"
    >
      <AddressSearchModalInner {...props} />
    </APIProvider>
  );
}

function AddressSearchModalInner({
  isOpen,
  onClose,
  onSelect,
  onAddressPreview,
  triggerRef,
  inline = false,
}: AddressSearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [phase, setPhase] = useState<"closed" | "entering" | "open" | "leaving">("closed");
  const [markerPos, setMarkerPos] = useState<google.maps.LatLngLiteral>(FORT_WORTH_CENTER);
  const [inputFocused, setInputFocused] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  const [addressConfirmed, setAddressConfirmed] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipAutocompleteRef = useRef(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const map = useMap("address-map");
  const placesLib = useMapsLibrary("places");
  const geocodingLib = useMapsLibrary("geocoding");

  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

  useEffect(() => {
    if (placesLib && !sessionTokenRef.current) {
      sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
    }
  }, [placesLib]);

  useEffect(() => {
    if (geocodingLib && !geocoderRef.current) {
      geocoderRef.current = new geocodingLib.Geocoder();
    }
  }, [geocodingLib]);

  const showBottomBar = addressConfirmed && predictions.length === 0;
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // ------- Shift zoom controls with the bottom bar -------
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const applyShift = () => {
      const ctrl = container.querySelector<HTMLElement>('.gm-bundled-control, .gm-control-active')?.closest<HTMLElement>('[class*="gm"]');
      const wrapper = container.querySelector<HTMLElement>('.gmnoprint[style*="right"]');
      const targets = [ctrl, wrapper].filter(Boolean) as HTMLElement[];

      if (targets.length === 0) {
        const allGmControls = container.querySelectorAll<HTMLElement>('.gmnoprint');
        allGmControls.forEach((el) => {
          const style = el.getAttribute('style') || '';
          if (style.includes('right') && style.includes('bottom')) {
            targets.push(el);
          }
        });
      }

      targets.forEach((el) => {
        el.style.transition = 'transform 300ms ease-out';
        el.style.transform = showBottomBar ? 'translateY(-100px)' : 'translateY(0)';
      });
    };

    applyShift();

    const observer = new MutationObserver(() => applyShift());
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [showBottomBar]);

  // ------- Autocomplete predictions (new API) -------
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (skipAutocompleteRef.current) {
      skipAutocompleteRef.current = false;
      return;
    }

    if (!query || query.length < 2 || !placesLib) {
      setPredictions([]);
      setActiveIndex(-1);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const request: google.maps.places.AutocompleteRequest = {
          input: query,
          locationBias: {
            center: FORT_WORTH_CENTER,
            radius: 50000,
          } as google.maps.places.LocationBias,
          sessionToken: sessionTokenRef.current ?? undefined,
        };

        const { suggestions } =
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

        setPredictions(
          suggestions
            .filter((s) => s.placePrediction)
            .map((s) => ({
              placeId: s.placePrediction!.placeId,
              text: s.placePrediction!.text.text,
            }))
        );
      } catch {
        setPredictions([]);
      }
      setActiveIndex(-1);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, placesLib]);

  // ------- Phase state machine -------
  // Re-center map after the drawer width transition completes (desktop inline)
  useEffect(() => {
    if (!inline || !isOpen || !map) return;
    const timer = setTimeout(() => {
      map.setCenter(FORT_WORTH_CENTER);
      map.setZoom(12);
      google.maps.event.trigger(map, "resize");
    }, 350);
    return () => clearTimeout(timer);
  }, [inline, isOpen, map]);

  useEffect(() => {
    if (inline) {
      // Inline mode: reset state when opened/closed, but skip phase animation
      if (isOpen) {
        setMarkerPos(FORT_WORTH_CENTER);
        setMapKey((k) => k + 1);
        setQuery("");
        setPredictions([]);
        setActiveIndex(-1);
        setAddressConfirmed(false);
        setPhase("open");
        setTimeout(() => inputRef.current?.focus(), 100);
      } else {
        setPhase("open"); // Keep "open" so content stays rendered inside the 0-width wrapper
        setQuery("");
        setPredictions([]);
        setActiveIndex(-1);
        setMarkerPos(FORT_WORTH_CENTER);
        setInputFocused(false);
        setAddressConfirmed(false);
      }
      return;
    }

    if (isOpen && (phase === "closed" || phase === "leaving")) {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
      setMarkerPos(FORT_WORTH_CENTER);
      setMapKey((k) => k + 1);
      setQuery("");
      setPredictions([]);
      setActiveIndex(-1);
      setAddressConfirmed(false);
      setPhase("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("open"));
      });
      setTimeout(() => inputRef.current?.focus(), 300);
    } else if (!isOpen && (phase === "open" || phase === "entering")) {
      setPhase("leaving");
      leaveTimerRef.current = setTimeout(() => {
        leaveTimerRef.current = null;
        setPhase("closed");
        setQuery("");
        setPredictions([]);
        setActiveIndex(-1);
        setMarkerPos(FORT_WORTH_CENTER);
        setInputFocused(false);
        setAddressConfirmed(false);
        triggerRef.current?.focus();
      }, 250);
    }
  }, [isOpen, phase, triggerRef, inline]);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const handleClose = useCallback(() => onClose(), [onClose]);

  const handleConfirm = useCallback(() => {
    onSelect(query);
    onClose();
    router.push(`/ballot/loading?address=${encodeURIComponent(query)}`);
  }, [query, onSelect, onClose, router]);

  const handleSelect = useCallback(
    async (prediction: Prediction) => {
      try {
        const place = new google.maps.places.Place({ id: prediction.placeId });
        await place.fetchFields({
          fields: ["location", "formattedAddress"],
        });

        if (place.location) {
          const pos = {
            lat: place.location.lat(),
            lng: place.location.lng(),
          };
          setMarkerPos(pos);
          map?.panTo(pos);
          map?.setZoom(15);
          const addr = place.formattedAddress || prediction.text;
          skipAutocompleteRef.current = true;
          setQuery(addr);
          onAddressPreview?.(addr);
        } else {
          skipAutocompleteRef.current = true;
          setQuery(prediction.text);
          onAddressPreview?.(prediction.text);
        }
      } catch {
        skipAutocompleteRef.current = true;
        setQuery(prediction.text);
        onAddressPreview?.(prediction.text);
      }

      setPredictions([]);
      setAddressConfirmed(true);

      // Reset session token after selection (per Google best practices)
      if (placesLib) {
        sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
      }
    },
    [map, placesLib, onAddressPreview]
  );

  const handleMapClick = useCallback(
    (e: { detail: { latLng: google.maps.LatLngLiteral | null } }) => {
      const latLng = e.detail.latLng;
      if (!latLng) return;

      setMarkerPos(latLng);
      map?.panTo(latLng);

      if (!geocoderRef.current) return;

      geocoderRef.current.geocode({ location: latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
          const addr = results[0].formatted_address;
          skipAutocompleteRef.current = true;
          setQuery(addr);
          setPredictions([]);
          setAddressConfirmed(true);
          onAddressPreview?.(addr);
        }
      });
    },
    [map, onAddressPreview]
  );

  // ------- Keyboard navigation -------
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev < predictions.length - 1 ? prev + 1 : 0));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : predictions.length - 1));
        return;
      }
      if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        handleSelect(predictions[activeIndex]);
        return;
      }
      if (e.key === "Tab") {
        const modal = modalRef.current;
        if (!modal) return;
        const focusable = modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, predictions, activeIndex, handleClose, handleSelect]);

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      (items[activeIndex] as HTMLElement)?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  if (!inline && phase === "closed") return null;

  const show = phase === "open";

  // Shared content panel (used by both inline and modal)
  const panelContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0 bg-white border-b border-[#e8e5ed]">
        <p className="font-bold text-sm leading-5 text-[#403a49]">
          Get full ballot
        </p>
        <button
          type="button"
          onClick={handleClose}
          className="p-0 cursor-pointer focus:outline-2 focus:outline-[#0d4dfb] focus:outline-offset-2 rounded"
          aria-label="Close address search"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Content area — map flush to header, search bar floats over it */}
      <div className="flex-1 min-h-0 relative">
        {/* Map */}
        <div ref={mapContainerRef} className="absolute inset-0 z-0">
          <Map
            key={mapKey}
            id="address-map"
            defaultCenter={FORT_WORTH_CENTER}
            defaultZoom={12}
            gestureHandling="greedy"
            disableDefaultUI
            zoomControl
            mapTypeControl={false}
            streetViewControl={false}
            fullscreenControl={false}
            onClick={handleMapClick}
            mapId="address-search-map"
            style={{ width: "100%", height: "100%" }}
          >
            <AdvancedMarker position={markerPos} />
          </Map>
        </div>

        {/* Search input — floats over the map */}
        <div className="absolute top-3 left-4 right-4 z-20">
          <div
            className={`relative rounded-lg w-full ${
              inputFocused ? "shadow-[0_0_0_4px_rgba(13,77,251,0.2)]" : "shadow-sm"
            }`}
          >
            <div className={`bg-white flex gap-2 items-center px-3 py-2.5 rounded-lg w-full border ${
              inputFocused ? "border-[#0d4dfb]" : "border-[#766f81]"
            }`}>
              <label htmlFor="address-search-input" className="sr-only">
                Search address
              </label>
              <SearchIcon />
              <input
                ref={inputRef}
                id="address-search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="Search address or location"
                className="flex-1 text-[15px] leading-5 text-[#403a49] placeholder:text-[rgba(64,58,73,0.35)] outline-none bg-transparent"
                autoComplete="off"
                role="combobox"
                aria-expanded={predictions.length > 0}
                aria-controls="address-suggestions-list"
                aria-activedescendant={
                  activeIndex >= 0 ? `suggestion-${predictions[activeIndex]?.placeId}` : undefined
                }
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setPredictions([]);
                    setAddressConfirmed(false);
                    onAddressPreview?.("");
                    inputRef.current?.focus();
                  }}
                  className="cursor-pointer rounded"
                  aria-label="Clear search"
                >
                  <ClearIcon />
                </button>
              ) : (
                <div className="w-5 h-5 shrink-0" />
              )}
            </div>
          </div>
        </div>

        {/* Suggestions overlay */}
        {predictions.length > 0 && (
          <div
            className="absolute inset-0 z-10 bg-white overflow-y-auto pt-14"
            aria-live="polite"
          >
            <ul
              ref={listRef}
              id="address-suggestions-list"
              role="listbox"
              aria-label="Address suggestions"
              className="flex flex-col"
            >
              {predictions.map((prediction, index) => (
                <li
                  key={prediction.placeId}
                  id={`suggestion-${prediction.placeId}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  onClick={() => handleSelect(prediction)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex gap-3 items-center px-6 py-3.5 cursor-pointer border-b border-[#e8e5ed] transition-colors ${
                    index === activeIndex ? "bg-[#f5f3f7]" : "bg-white"
                  } focus:outline-2 focus:outline-[#0d4dfb] focus:outline-offset-[-2px]`}
                  tabIndex={-1}
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <LocationIcon />
                  </div>
                  <p className="flex-1 text-sm leading-5 text-[#403a49] truncate">
                    {prediction.text}
                  </p>
                  <div className="w-4 h-4 flex items-center justify-center shrink-0">
                    <ArrowOutwardIcon />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* "Find ballot" button bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-20 flex items-center justify-end px-6 pt-16 pb-5 transition-transform duration-300 ease-out ${
            showBottomBar ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ background: "linear-gradient(to top, white 55%, rgba(255,255,255,0.9) 70%, rgba(255,255,255,0.6) 82%, rgba(255,255,255,0.2) 92%, transparent 100%)" }}
          aria-hidden={!showBottomBar}
        >
          <button
            type="button"
            onClick={handleConfirm}
            tabIndex={showBottomBar ? 0 : -1}
            className="flex gap-2.5 items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-[#ffdb00] to-[#ffe600] text-[#403a49] font-bold text-base leading-6 cursor-pointer hover:from-[#e6b800] hover:to-[#e6b800] transition-colors focus:outline-2 focus:outline-[#0d4dfb] focus:outline-offset-2"
          >
            Find ballot
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#403A49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );

  // --- Inline mode (desktop side panel) ---
  if (inline) {
    return (
      <div
        ref={modalRef}
        className="flex flex-col h-full bg-white border-l border-[#e8e5ed]"
        aria-label="Address search"
      >
        {panelContent}
      </div>
    );
  }

  // --- Modal mode (mobile) ---
  return (
    <div className="fixed inset-0 z-50" aria-hidden={!isOpen}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-250 ease-out ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Address search"
        className={`absolute left-1/2 -translate-x-1/2 w-[375px] bottom-0 bg-white rounded-t-2xl flex flex-col shadow-[0px_-2px_16px_0px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-250 ease-out ${
          show
            ? "top-[60px] opacity-100 translate-y-0"
            : "top-[60px] opacity-0 translate-y-[40px]"
        }`}
      >
        {panelContent}
      </div>
    </div>
  );
}
