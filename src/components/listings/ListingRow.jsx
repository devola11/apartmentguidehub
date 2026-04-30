// src/components/listings/ListingRow.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Horizontal listing card on tablet/desktop, vertical card on mobile.
//
// RESPONSIVE LAYOUT:
//   Mobile (< sm / 640px):
//     flex-col - image on top (full width, fixed 180px height),
//     content below. Same visual as ListingCard for visual consistency.
//
//   Tablet / Desktop (sm+ / 640px+):
//     flex-row - image fixed 192px wide on the left, content on the right.
//     This is the original desktop layout.
//
// WHY sm (640px)?
//  At 640px the card is wide enough for the side-by-side layout to look good.
//  Below that (phones) the image would be too narrow and text would feel cramped.
// ─────────────────────────────────────────────────────────────────────────────
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { useAuth } from "../../context/AuthContext";
import { PetBadgesSmall } from "./PetBadges";

function getPhone() {
  return "(718) 814-8683";
}

function BedIcon()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>; }
function BathIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-2h-4V9h4zm-4 7H4V5h11v4h3v7z"/></svg>; }
function SqftIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>; }
function PhoneIcon(){ return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>; }

function HeartIcon({ filled }) {
  return filled
    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}

// onSendMessage(listing) — called when the Send Message button is clicked.
// The parent page holds the single modal instance and passes this callback down.
export default function ListingRow({ listing, isActive, onMouseEnter, onMouseLeave, onSendMessage }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user }                        = useAuth();
  const navigate                        = useNavigate();
  const saved                           = isFavorite(listing.id);

  function handleFav(e) {
    e.preventDefault();    // prevent <a> navigation
    e.stopPropagation();
    if (!user) { navigate("/login"); return; }
    toggleFavorite(listing.id);
  }

  function handleSendMessage(e) {
    e.preventDefault();    // prevent <a> navigation
    e.stopPropagation();
    onSendMessage?.(listing);
  }

  const imageUrl  = listing.image_url || "https://placehold.co/320x200?text=No+Image";
  const amenities = listing.amenities?.slice(0, 3) ?? [];
  const phone     = getPhone();

  return (
      <Link
        to={`/listings/${listing.id}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`flex flex-col sm:flex-row bg-white rounded-xl border overflow-hidden shadow-sm
                    hover:shadow-md transition-all duration-150 group
                    ${isActive ? "border-[#1A73E8] shadow-md" : "border-[#E0E0E0]"}`}
      >

        {/* ── Image ─────────────────────────────────────────────────────── */}
        {/*
          Mobile:  w-full + h-48 = full-width image with fixed 192px height on top.
          sm+:     w-48 + h-auto = 192px-wide column, fills the card height.
          shrink-0 prevents the image from compressing on desktop.
        */}
        <div className="relative w-full h-48 sm:w-48 sm:h-auto shrink-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={`${listing.title} in ${listing.city}, ${listing.state}`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* State badge */}
          <span className="absolute top-2 left-2 bg-[#1A73E8] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {listing.state === "New York" ? "NY" : listing.state === "New Jersey" ? "NJ" : listing.state}
          </span>
          {/* Favorite button - min 44px tap target */}
          <button
            type="button"
            onClick={handleFav}
            aria-label={saved ? "Remove from favorites" : "Save to favorites"}
            className={`absolute top-2 right-2 p-2 rounded-full shadow transition-colors
              ${saved ? "bg-red-500 text-white" : "bg-white/90 text-[#5F6368] hover:text-red-500"}`}
          >
            <HeartIcon filled={saved} />
          </button>
        </div>

        {/* ── Content column ─────────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 p-4 min-w-0">

          {/* Title + price header */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#202124] text-sm leading-snug truncate">
                {listing.title}
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold
                               text-[#1A73E8] mt-0.5">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Verified
              </span>
            </div>
            <p className="text-[#1A73E8] font-extrabold text-lg leading-tight shrink-0">
              ${listing.price?.toLocaleString()}
              <span className="text-xs font-normal text-[#5F6368]">/mo</span>
            </p>
          </div>

          {/* Address */}
          <p className="text-xs text-[#5F6368] mb-2 truncate">
            {listing.address}, {listing.city}, {listing.state} {listing.zip}
          </p>

          {/* Beds / Baths / Sqft */}
          <div className="flex items-center gap-2 text-xs text-[#5F6368] mb-2">
            <span className="flex items-center gap-1"><BedIcon />{listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms ?? "-"} bd`}</span>
            <span className="text-[#E0E0E0]">|</span>
            <span className="flex items-center gap-1"><BathIcon />{listing.bathrooms ?? "-"} ba</span>
            <span className="text-[#E0E0E0]">|</span>
            <span className="flex items-center gap-1"><SqftIcon />{listing.sqft?.toLocaleString() ?? "-"} sqft</span>
          </div>

          {/* Phone */}
          <p className="flex items-center gap-1.5 text-xs text-[#1A73E8] font-medium mb-2">
            <PhoneIcon />{phone}
          </p>

          {/* Amenity tags */}
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {amenities.map(tag => (
                <span key={tag} className="bg-blue-50 text-[#1A73E8] text-xs font-medium px-2 py-0.5 rounded-full border border-blue-100">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Pet badges */}
          <div className="mb-3">
            <PetBadgesSmall amenities={listing.amenities} />
          </div>

          {/* Send Message - min-h-[44px] for touch target */}
          <button
            type="button"
            onClick={handleSendMessage}
            className="mt-auto w-full bg-[#1A73E8] hover:bg-blue-700
                       text-white font-semibold py-2.5 rounded-lg
                       transition-colors text-sm min-h-[44px]"
          >
            Send Message
          </button>
        </div>
      </Link>
  );
}
