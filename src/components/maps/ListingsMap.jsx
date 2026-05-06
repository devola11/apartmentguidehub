// src/components/maps/ListingsMap.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import L from "leaflet";

// Leaflet CSS is bundled with this module so it only loads on routes that
// actually render the map (was previously imported globally in App.jsx).
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DEFAULT_CENTER = [36.5, -100];
const DEFAULT_ZOOM = 4;

function priceLabel(price) {
  if (!price) return "";
  return price >= 1000 ? `$${(price / 1000).toFixed(1)}K` : `$${price}`;
}

function makePriceIcon(price, active) {
  const bg = active ? "#1A73E8" : "#FFFFFF";
  const color = active ? "#FFFFFF" : "#202124";
  const border = "#1A73E8";
  const label = priceLabel(price);
  return L.divIcon({
    className: "",
    html: `<div style="
      background:${bg};
      color:${color};
      border:2px solid ${border};
      border-radius:20px;
      padding:3px 10px;
      font-size:12px;
      font-weight:700;
      white-space:nowrap;
      box-shadow:0 2px 6px rgba(0,0,0,0.25);
      font-family:Inter,sans-serif;
      cursor:pointer;
      transition:all 0.15s;
    ">${label}</div>`,
    iconAnchor: [24, 14],
    popupAnchor: [0, -16],
  });
}

// Fits map bounds to visible listings with coordinates
function BoundsFitter({ listings }) {
  const map = useMap();
  useEffect(() => {
    const pts = listings.filter(l => l.latitude && l.longitude);
    if (pts.length === 0) return;
    if (pts.length === 1) {
      map.setView([pts[0].latitude, pts[0].longitude], 13);
      return;
    }
    const bounds = L.latLngBounds(pts.map(l => [l.latitude, l.longitude]));
    map.fitBounds(bounds, { padding: [40, 40] });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings.length]);
  return null;
}

export default function ListingsMap({ listings = [], className = "h-[420px]", hoveredId }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <BoundsFitter listings={listings} />

        {listings
          .filter(l => l.latitude && l.longitude)
          .map(l => {
            const active = l.id === hoveredId;
            return (
              <Marker
                key={l.id}
                position={[l.latitude, l.longitude]}
                icon={makePriceIcon(l.price, active)}
                zIndexOffset={active ? 1000 : 0}
              >
                <Popup minWidth={200} maxWidth={220}>
                  <div style={{ width: 200, overflow: "hidden", borderRadius: 8 }}>
                    <img
                      src={l.image_url || "https://placehold.co/200x100?text=No+Image"}
                      alt={l.title}
                      loading="lazy"
                      style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }}
                    />
                    <div style={{ padding: "8px 10px" }}>
                      <p style={{ fontWeight: 700, fontSize: 13, color: "#202124", marginBottom: 2, lineHeight: 1.3 }}>
                        {l.title}
                      </p>
                      <p style={{ color: "#1A73E8", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                        ${l.price?.toLocaleString()}/mo
                      </p>
                      <Link
                        to={`/listings/${l.id}`}
                        style={{ color: "#1A73E8", fontSize: 12, textDecoration: "underline" }}
                      >
                        View details →
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}
