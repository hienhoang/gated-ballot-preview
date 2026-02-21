"use client";

import { APIProvider, Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";

interface MapViewProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: { lat: number; lng: number; label?: string }[];
  className?: string;
}

const DEFAULT_CENTER = { lat: 37.7749, lng: -122.4194 };
const DEFAULT_ZOOM = 12;

export default function MapView({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  markers = [],
  className = "w-full h-[500px]",
}: MapViewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === "your_api_key_here") {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600`}>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Set <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in <code className="font-mono bg-gray-200 dark:bg-gray-700 px-1 rounded">.env.local</code>
        </p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className={className}>
        <GoogleMap defaultCenter={center} defaultZoom={zoom} gestureHandling="greedy">
          {markers.map((marker, i) => (
            <Marker key={i} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
      </div>
    </APIProvider>
  );
}
