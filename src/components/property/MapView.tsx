"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import type { Property } from "@/types";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

export function MapView({
  properties,
  center,
  zoom = 12,
  className,
  activeSlug,
}: {
  properties: Pick<Property, "slug" | "title" | "price" | "listingType" | "lat" | "lng" | "locality">[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  activeSlug?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      mapRef.current?.remove();
      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      }).setView(center ?? [28.5355, 77.391], zoom);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const bounds: [number, number][] = [];

      properties.forEach((property) => {
        const active = property.slug === activeSlug;
        const price = property.listingType === "rent" ? `${formatINR(property.price)}/mo` : formatINR(property.price);
        const icon = L.divIcon({
          html: `<span class="price-pin${active ? " is-active" : ""}">${price}</span>`,
          className: "map-pin-label",
          iconSize: [0, 0],
          iconAnchor: [34, 18],
        });

        const marker = L.marker([property.lat, property.lng], { icon }).addTo(map);
        marker.bindPopup(
          `<div style="font-family:Manrope,sans-serif">
            <div style="padding:12px 14px">
              <p style="font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#b8863b;margin:0 0 4px">${property.locality}</p>
              <p style="font-size:13px;font-weight:700;color:#16211c;line-height:1.35;margin:0">${property.title}</p>
              <p style="font-size:12px;font-weight:800;color:#1e3a31;margin:8px 0 0">${price}</p>
              <a href="/properties/${property.slug}" style="display:inline-block;margin-top:8px;font-size:11px;font-weight:700;color:#b8863b;text-decoration:none">View property →</a>
            </div>
          </div>`,
        );
        bounds.push([property.lat, property.lng]);
      });

      if (bounds.length > 1) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
      }

      setTimeout(() => map.invalidateSize(), 150);
    }

    init();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [properties, center, zoom, activeSlug]);

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-line bg-sand", className)}>
      <div ref={containerRef} className="h-full w-full" aria-label="Map of properties" />
    </div>
  );
}
