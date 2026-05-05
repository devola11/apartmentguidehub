// src/pages/Listings.jsx
//
// RESPONSIVE LAYOUT:
//
//   Mobile (< md / 768px):
//     - Normal page scroll (no fixed height).
//     - Map is hidden by default. A "Show Map" toggle button at the top
//       reveals the map full-width above the listings when clicked.
//     - Listing cards use vertical layout (image on top) via ListingRow.
//     - Filter controls collapse into the FilterBar's mobile "Filters" button.
//     - Sort dropdown stays visible in the top bar.
//
//   Tablet (md / 768px):
//     - Fixed-height split layout: listings on the left, map on the right.
//     - 50/50 split (md:w-1/2) instead of the original 55/45.
//     - FilterBar shows inline horizontal controls.
//
//   Desktop (lg+ / 1024px+):
//     - Same split layout as tablet.
//
// KEY TECHNIQUE - avoiding duplicated JSX:
//   Instead of two separate DOM trees (one for mobile, one for desktop),
//   we use Tailwind prefixes on the SAME elements so they adapt in place:
//     - Outer wrapper: `md:flex md:h-[calc(100vh-64px)]`
//       → Mobile: block, normal page height
//       → md+:    flex row, fixed viewport height
//     - Listings column: `md:overflow-y-auto md:flex-1 md:border-r`
//       → Mobile: normal block, page scrolls
//       → md+:    only this column scrolls internally
//     - Map column: `hidden md:block md:w-1/2`
//       → Mobile: hidden (shown/hidden by JS state instead)
//       → md+:    always visible, takes up 50% of width

import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useListings } from "../hooks/useListings";
import ListingRow from "../components/listings/ListingRow";
import ListingsMap from "../components/maps/ListingsMap";
import FilterBar from "../components/filters/FilterBar";
import SEO from "../components/common/SEO";
import SendMessageModal from "../components/common/SendMessageModal";
import FindApartmentModal from "../components/common/FindApartmentModal";

const ITEMS_PER_PAGE = 10;

const SEO_CONFIG = {
  "Texas": {
    title: "Apartments for Rent in Texas",
    description: "Find apartments for rent across Texas - Houston, Dallas, Austin, San Antonio, and more.",
    canonical: "/listings/texas",
  },
  "Oklahoma": {
    title: "Apartments for Rent in Oklahoma",
    description: "Find apartments for rent across Oklahoma - Oklahoma City, Tulsa, Norman, Edmond, and more.",
    canonical: "/listings/oklahoma",
  },
  default: {
    title: "All Apartments for Rent",
    description: "Browse all verified apartment listings across Texas and Oklahoma.",
    canonical: "/listings",
  },
};

// MapIcon for the mobile "Show/Hide Map" toggle button
function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}

export default function Listings({ stateFilter }) {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    city:        searchParams.get("q") || "",
    bedrooms:    searchParams.get("bedrooms") || "",
    bathrooms:   "",
    minPrice:    "",
    maxPrice:    "",
    petFriendly: false,
  });
  const [sort,      setSort]      = useState("newest");
  const [page,      setPage]      = useState(1);
  const [hoveredId,       setHoveredId]       = useState(null);
  // selectedListing: the listing whose Send Message modal is open, or null.
  const [selectedListing, setSelectedListing] = useState(null);
  const [findOpen,        setFindOpen]        = useState(false);

  // Controls the mobile "Show Map" toggle
  // Default: map hidden on mobile (false), always visible on desktop via CSS
  const [showMobileMap, setShowMobileMap] = useState(false);

  // Sync the city filter whenever the URL ?q= param changes (e.g. navigating
  // from the home page search bar while already on /listings).
  useEffect(() => {
    setFilters(prev => ({ ...prev, city: searchParams.get("q") || "" }));
  }, [searchParams]);

  // Reset to page 1 whenever filters/sort/state change
  useEffect(() => { setPage(1); }, [filters, sort, stateFilter]);

  const { listings, loading, error, total } = useListings({
    state:       stateFilter || undefined,
    city:        filters.city,
    minPrice:    filters.minPrice,
    maxPrice:    filters.maxPrice,
    bedrooms:    filters.bedrooms,
    bathrooms:   filters.bathrooms,
    petFriendly: filters.petFriendly,
    sort,
    page,
    pageSize:    ITEMS_PER_PAGE,
  });

  // listings is already the current page from Supabase .range()
  const pagedListings = listings;
  const totalPages    = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  const currentPage   = Math.min(page, totalPages);

  const seo           = SEO_CONFIG[stateFilter] || SEO_CONFIG.default;
  const locationLabel = stateFilter || "Texas & Oklahoma";
  const countLabel    = loading
    ? "Loading…"
    : `${total} Apartment${total !== 1 ? "s" : ""} for Rent in ${locationLabel}`;

  function handleFilter(f) { setFilters(f); }
  function goPage(p)        { setPage(p); }

  function pageNumbers() {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <>
      <SEO title={seo.title} description={seo.description} canonical={seo.canonical} />

      {/*
        OUTER WRAPPER
        ─────────────
        Mobile:  block (no flex, no fixed height) - page scrolls normally.
        md+:     flex + fixed viewport height - creates the split panel layout.

        The `md:` prefix means "apply at 768px and above".
        Without a prefix, it's the mobile-first default (block).
      */}
      <div className="md:flex md:h-[calc(100vh-64px)]">

        {/* ── LEFT PANEL: listings ──────────────────────────────────────── */}
        {/*
          Mobile:  normal block flow, no overflow restriction.
          md+:     flex-1 (fills remaining space after 50% map), overflow-y-auto
                   so only this column scrolls. border-r separates it from the map.
          min-w-0: prevents flex children from overflowing their container.
        */}
        <div className="md:overflow-y-auto md:flex-1 md:border-r md:border-[#E0E0E0] min-w-0">

          {/* ── Sticky header (top bar + filters) ───────────────────── */}
          {/*
            sticky top-0: sticks to the top of its scrolling container.
            On mobile, that's the page. On desktop, that's the overflow-y-auto column.
            Both work correctly with sticky top-0.
          */}
          <div className="sticky top-0 z-10 bg-white border-b border-[#E0E0E0]">

            {/* Top bar - count label + sort */}
            <div className="px-4 sm:px-5 py-3 flex items-center justify-between gap-2 border-b border-[#E0E0E0]">
              {/* Count label - truncates on very small screens */}
              <p className="font-semibold text-[#202124] text-xs sm:text-sm truncate">
                {countLabel}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <label className="text-xs text-[#5F6368] hidden sm:block">Sort:</label>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="text-sm border border-[#E0E0E0] rounded-lg px-2 sm:px-3 py-1.5
                             text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]
                             bg-white min-h-[44px]"
                >
                  <option value="newest">Relevance</option>
                  <option value="price_asc">Price: Low-High</option>
                  <option value="price_desc">Price: High-Low</option>
                </select>
              </div>
            </div>

            {/* Filter bar + mobile map toggle */}
            <div className="px-4 sm:px-5 py-3 bg-[#F8F9FA] flex items-start gap-3 flex-wrap">
              <FilterBar onFilter={handleFilter} />

              {/*
                "Show/Hide Map" button - only rendered on mobile (md:hidden).
                On desktop the map is always visible in the right panel.
                Placed next to the filter button so both controls are in one row.
              */}
              <button
                type="button"
                onClick={() => setShowMobileMap(v => !v)}
                className="md:hidden flex items-center gap-2 px-4 py-2.5 border border-[#E0E0E0]
                           rounded-lg bg-white text-sm font-medium text-[#202124]
                           hover:border-[#1A73E8] transition-colors min-h-[44px]"
              >
                <MapIcon />
                {showMobileMap ? "Hide Map" : "Show Map"}
              </button>
            </div>
          </div>

          {/* ── Mobile map (toggled) ─────────────────────────────────── */}
          {/*
            md:hidden: this block only exists in the DOM on mobile.
            On desktop, the map is in the separate right panel (always visible).
            Height 260px on mobile - tall enough to be useful, not so tall it
            crowds out the listing cards.
            The conditional {showMobileMap && ...} means it's unmounted when
            hidden, which also unmounts the Leaflet map instance (no memory leak).
          */}
          {showMobileMap && (
            <div className="md:hidden">
              <ListingsMap
                listings={listings}
                hoveredId={hoveredId}
                className="h-[260px] rounded-none"
              />
            </div>
          )}

          {/* ── Listing rows ────────────────────────────────────────── */}
          <div className="px-4 sm:px-5 py-4 space-y-3">
            {error ? (
              <div className="text-center py-20">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                  className="text-red-300 mx-auto mb-4">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p className="text-lg font-semibold text-[#202124]">Could not load listings</p>
                <p className="text-sm text-[#5F6368] mt-2 mb-6">
                  Check your connection and try again.
                </p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center bg-[#1A73E8] text-white
                             font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-[#1669D3]
                             transition-colors duration-150 min-h-[44px]"
                >
                  Retry
                </button>
              </div>
            ) : loading ? (
              // Loading skeleton - flex-col on mobile matches vertical card layout
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col sm:flex-row bg-white rounded-xl
                                        border border-[#E0E0E0] overflow-hidden animate-pulse">
                  <div className="w-full h-40 sm:w-48 sm:h-auto shrink-0 bg-gray-200" />
                  <div className="flex-1 p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))
            ) : pagedListings.length === 0 ? (
              <div className="text-center py-20">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                  className="text-gray-300 mx-auto mb-4">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <p className="text-lg font-semibold text-[#202124]">No apartments match your search</p>
                <p className="text-sm text-[#5F6368] mt-2 mb-6">
                  Try adjusting your filters or browsing all listings.
                </p>
                <Link
                  to="/listings"
                  className="inline-flex items-center justify-center bg-[#1A73E8] text-white
                             font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-[#1669D3]
                             transition-colors duration-150 min-h-[44px]"
                >
                  View All Listings
                </Link>
              </div>
            ) : (
              pagedListings.map(l => (
                <ListingRow
                  key={l.id}
                  listing={l}
                  isActive={hoveredId === l.id}
                  onMouseEnter={() => setHoveredId(l.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onSendMessage={setSelectedListing}
                />
              ))
            )}
          </div>

          {/* ── Pagination ─────────────────────────────────────────── */}
          {!loading && totalPages > 1 && (
            <div className="px-4 sm:px-5 pb-8 flex justify-center items-center gap-0.5 sm:gap-1 flex-wrap">
              <button
                type="button"
                onClick={() => goPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E0E0E0]
                           text-[#202124] hover:bg-gray-50
                           disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
              >
                ← Prev
              </button>
              {pageNumbers().map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-1 sm:px-2 text-[#5F6368]">…</span>
                ) : (
                  <button
                    type="button"
                    key={p}
                    onClick={() => goPage(p)}
                    className={`w-9 h-9 sm:w-11 sm:h-11 text-xs sm:text-sm rounded-lg border font-medium transition-colors ${
                      p === currentPage
                        ? "bg-[#1A73E8] text-white border-[#1A73E8]"
                        : "border-[#E0E0E0] text-[#202124] hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                type="button"
                onClick={() => goPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-2 sm:px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#E0E0E0]
                           text-[#202124] hover:bg-gray-50
                           disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
              >
                Next →
              </button>
            </div>
          )}
          {/* ── Can't Find section ──────────────────────────────────── */}
          {!loading && (
            <div className="mx-4 sm:mx-5 mb-8 mt-2 rounded-2xl border border-[#E0E0E0]
                            bg-white px-6 py-7 text-center">
              <div className="w-12 h-12 rounded-full bg-[#e8f0fe] flex items-center justify-center
                              mx-auto mb-4 text-[#1A73E8]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#202124] text-base mb-1">
                Can&apos;t find your perfect apartment?
              </h3>
              <p className="text-sm text-[#5F6368] leading-relaxed mb-5 max-w-xs mx-auto">
                Our team can help you find the right home. Get in touch and
                we&apos;ll match you with available listings.
              </p>

              {/* Contact details */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
                <a
                  href="tel:7138148683"
                  className="flex items-center gap-2 text-sm text-[#202124]
                             hover:text-[#1A73E8] transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"
                    className="text-[#1A73E8] shrink-0">
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24
                             11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0
                             1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57
                             3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  (713) 814-8683
                </a>
                <span className="hidden sm:block text-[#E0E0E0]">|</span>
                {/*
                  Email address row — clicking the envelope icon OR the address
                  text opens the FindApartmentModal instead of mailto:.
                  Using a <button> (not <a href="mailto:">) keeps the intent
                  clear: we want the user to fill in the structured form.
                */}
                <button
                  type="button"
                  onClick={() => setFindOpen(true)}
                  className="flex items-center gap-2 text-sm text-[#202124]
                             hover:text-[#1A73E8] transition-colors"
                >
                  {/* Envelope icon in brand blue — acts as a visual email cue */}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    className="text-[#1A73E8] shrink-0">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1
                             0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  info@apartmentguidehub.com
                </button>
              </div>

              {/*
                "Contact Us" CTA — now opens FindApartmentModal so the user
                can submit structured preferences instead of a generic mailto.
              */}
              <button
                type="button"
                onClick={() => setFindOpen(true)}
                className="inline-flex items-center justify-center bg-[#1A73E8] hover:bg-[#1557b0]
                           text-white font-semibold text-sm px-6 py-2.5 rounded-full
                           transition-colors duration-150 min-h-[44px]"
              >
                Contact Us
              </button>
            </div>
          )}
        </div>

        {/* ── RIGHT PANEL: map (desktop always, mobile hidden) ─────────── */}
        {/*
          hidden: hidden on mobile (the toggled map above handles mobile).
          md:block: visible on tablet/desktop.
          md:w-1/2: takes exactly 50% of the flex parent width (tablet 50/50 spec).
          shrink-0: prevents the map from shrinking as listing content grows.
        */}
        <div className="hidden md:block md:w-1/2 shrink-0">
          <ListingsMap
            listings={listings}
            hoveredId={hoveredId}
            className="h-full rounded-none"
          />
        </div>
      </div>

      {/* Single Send Message modal for all listing rows on this page */}
      <SendMessageModal
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        listing={selectedListing}
      />

      {/* "Tell Us What You're Looking For" modal — opened by the email icon,
          email address text, and "Contact Us" button in the Can't Find section */}
      <FindApartmentModal
        isOpen={findOpen}
        onClose={() => setFindOpen(false)}
      />
    </>
  );
}
