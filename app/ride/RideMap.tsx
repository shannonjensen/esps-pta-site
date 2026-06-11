"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Polyline, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  route: [number, number][];
  trail: [number, number][];
  latest: { lat: number; lng: number } | null;
};

const GREEN = "#234A3A";
const ORANGE = "#E0713E";

// Leaflet map showing the planned route (dashed green), the ridden trail
// (solid orange) and a pulsing live-position dot. Leaflet touches `window`,
// so everything is loaded inside useEffect (client only).
export function RideMap({ route, trail, latest }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const trailRef = useRef<Polyline | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const didInitialFitRef = useRef(false);

  // Create the map once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false, // don't hijack page scroll
      });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const routeLine = L.polyline(route, {
        color: GREEN,
        weight: 3,
        opacity: 0.7,
        dashArray: "6 8",
      }).addTo(map);
      map.fitBounds(routeLine.getBounds(), { padding: [24, 24] });

      // Start / finish markers
      const endIcon = (label: string) =>
        L.divIcon({
          className: "",
          html: `<div style="background:${GREEN};color:#fff;font:700 11px/1 DM Sans,sans-serif;padding:4px 8px;border-radius:999px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.3);transform:translate(-50%,-50%)">${label}</div>`,
          iconSize: [0, 0],
        });
      L.marker(route[0], { icon: endIcon("London") }).addTo(map);
      L.marker(route[route.length - 1], { icon: endIcon("Amsterdam") }).addTo(map);

      trailRef.current = L.polyline([], {
        color: ORANGE,
        weight: 4,
        opacity: 0.95,
      }).addTo(map);

      mapRef.current = map;
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      didInitialFitRef.current = false;
    };
    // The route is static for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update trail + live marker whenever new data arrives.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    (async () => {
      const L = (await import("leaflet")).default;
      if (!mapRef.current) return;

      trailRef.current?.setLatLngs(trail);

      if (latest) {
        if (!markerRef.current) {
          const icon = L.divIcon({
            className: "",
            html: `<div class="ride-live-dot"></div>`,
            iconSize: [18, 18],
            iconAnchor: [9, 9],
          });
          markerRef.current = L.marker([latest.lat, latest.lng], {
            icon,
            zIndexOffset: 1000,
          }).addTo(map);
        } else {
          markerRef.current.setLatLng([latest.lat, latest.lng]);
        }
        // On the first fix, zoom in on the riders once; after that leave the
        // viewer's pan/zoom alone.
        if (!didInitialFitRef.current) {
          didInitialFitRef.current = true;
          map.setView([latest.lat, latest.lng], 11);
        }
      }
    })();
  }, [trail, latest]);

  return (
    <>
      <style>{`
        .ride-live-dot {
          width: 18px; height: 18px; border-radius: 50%;
          background: ${ORANGE}; border: 3px solid #fff;
          box-shadow: 0 0 0 0 rgba(224, 113, 62, 0.55);
          animation: ride-pulse 2s infinite;
        }
        @keyframes ride-pulse {
          0% { box-shadow: 0 0 0 0 rgba(224, 113, 62, 0.55); }
          70% { box-shadow: 0 0 0 16px rgba(224, 113, 62, 0); }
          100% { box-shadow: 0 0 0 0 rgba(224, 113, 62, 0); }
        }
      `}</style>
      <div
        ref={containerRef}
        className="w-full rounded-3xl overflow-hidden"
        style={{ height: "min(60vh, 520px)", boxShadow: "0 12px 32px rgba(0,0,0,0.18)" }}
      />
    </>
  );
}
