// src/components/filters/FilterBar.jsx
//
// RESPONSIVE BEHAVIOUR:
//   Mobile (< md / 768px):
//     Shows a single "Filters" button with an active-count badge.
//     Clicking it opens a slide-up modal overlay with all filters stacked
//     vertically in a scrollable panel. "Apply" closes the panel; "Reset"
//     clears all values.
//
//   Tablet / Desktop (md+ / 768px+):
//     Shows the original horizontal flex-wrap filter bar - all controls
//     visible inline at the top of the listings panel.
//
// WHY a separate mobile panel rather than collapsing in place?
//   The filter bar has 6 controls. On a 375px screen they can't all fit
//   horizontally. A slide-up panel gives each filter full width and avoids
//   horizontal scroll. This is the pattern used by Zillow and Apartments.com.

import { useState } from "react";
import CityAutocomplete from "../common/CityAutocomplete";

const PRICE_RANGES = [
  { label: "Any Price",       min: "",     max: ""     },
  { label: "Under $1,500",   min: "",     max: "1500" },
  { label: "$1,500-$2,000",  min: "1500", max: "2000" },
  { label: "$2,000-$3,000",  min: "2000", max: "3000" },
  { label: "$3,000-$5,000",  min: "3000", max: "5000" },
  { label: "$5,000+",        min: "5000", max: ""     },
];

const inputCls = "border border-[#E0E0E0] rounded-lg px-3 py-2 text-sm text-[#202124] focus:outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white";

// CloseIcon for the mobile panel header
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6"  y1="6" x2="18" y2="18" />
    </svg>
  );
}

// FilterIcon for the mobile trigger button
function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="4"  y1="6"  x2="20" y2="6"  />
      <line x1="8"  y1="12" x2="20" y2="12" />
      <line x1="12" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export default function FilterBar({ onFilter }) {
  const [city,        setCity]        = useState("");
  const [bedrooms,    setBedrooms]    = useState("");
  const [bathrooms,   setBathrooms]   = useState("");
  const [priceKey,    setPriceKey]    = useState("0");
  const [petFriendly, setPetFriendly] = useState(false);

  // Controls the mobile slide-up panel
  const [panelOpen, setPanelOpen] = useState(false);

  function emit(overrides = {}) {
    const pr = PRICE_RANGES[Number(overrides.priceKey ?? priceKey)];
    onFilter({
      city:        overrides.city        ?? city,
      bedrooms:    overrides.bedrooms    ?? bedrooms,
      bathrooms:   overrides.bathrooms   ?? bathrooms,
      minPrice:    pr.min,
      maxPrice:    pr.max,
      petFriendly: overrides.petFriendly ?? petFriendly,
    });
  }

  function handleCity(v)    { setCity(v);       emit({ city: v }); }
  function handleBeds(v)    { setBedrooms(v);   emit({ bedrooms: v }); }
  function handleBaths(v)   { setBathrooms(v);  emit({ bathrooms: v }); }
  function handlePrice(idx) { setPriceKey(idx); emit({ priceKey: idx }); }
  function handlePet(v)     { setPetFriendly(v); emit({ petFriendly: v }); }

  function handleReset() {
    setCity(""); setBedrooms(""); setBathrooms("");
    setPriceKey("0"); setPetFriendly(false);
    onFilter({ city: "", bedrooms: "", bathrooms: "", minPrice: "", maxPrice: "", petFriendly: false });
  }

  // Count how many filters are actively set so we can show a badge on the button
  const activeCount = [
    city !== "",
    bedrooms !== "",
    bathrooms !== "",
    priceKey !== "0",
    petFriendly,
  ].filter(Boolean).length;

  // ── renderFilters(fullWidth) ─────────────────────────────────────
  // Returns filter control JSX for both the desktop bar (fullWidth=false)
  // and the mobile panel (fullWidth=true).
  //
  // IMPORTANT: This is a plain function that returns JSX, NOT a React component.
  // It's called as {renderFilters(true)} not <RenderFilters />.
  // This is intentional: if it were a component, React would see a new function
  // reference on every render and unmount/remount it, losing input focus mid-type.
  // As a plain render helper, no component boundary is created.
  function renderFilters(fullWidth) {
    const wCity  = fullWidth ? "w-full" : "w-36";
    const wPrice = fullWidth ? "w-full" : "w-44";
    const wSel   = fullWidth ? "w-full" : "";

    return (
      <>
        {/* City / Zip */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide">City or Zip</label>
          <CityAutocomplete
            value={city}
            onChange={handleCity}
            placeholder="e.g. Houston, Dallas, Austin, Oklahoma City"
            wrapperClassName={wCity}
            inputClassName={`${inputCls} w-full min-h-[44px]`}
          />
        </div>

        {/* Beds */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide">Beds</label>
          <select value={bedrooms} onChange={e => handleBeds(e.target.value)} className={`${inputCls} ${wSel} min-h-[44px]`}>
            <option value="">Any</option>
            <option value="0">Studio</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>

        {/* Baths */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide">Baths</label>
          <select value={bathrooms} onChange={e => handleBaths(e.target.value)} className={`${inputCls} ${wSel} min-h-[44px]`}>
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide">Price Range</label>
          <select value={priceKey} onChange={e => handlePrice(e.target.value)} className={`${inputCls} ${wPrice} min-h-[44px]`}>
            {PRICE_RANGES.map((r, i) => (
              <option key={i} value={i}>{r.label}</option>
            ))}
          </select>
        </div>

        {/* Pet Friendly */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#5F6368] uppercase tracking-wide">Pet Friendly</label>
          <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <div
              onClick={() => handlePet(!petFriendly)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${petFriendly ? "bg-[#1A73E8]" : "bg-gray-300"}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${petFriendly ? "translate-x-5" : ""}`} />
            </div>
            <span className="text-sm text-[#202124]">{petFriendly ? "Yes" : "Any"}</span>
          </label>
        </div>
      </>
    );
  }

  return (
    <>
      {/* ── MOBILE: "Filters" trigger button ──────────────────────────── */}
      {/*
        Only shown below md (768px). The button is 44px tall (min-h-[44px])
        to meet the touch-target spec. A blue badge shows the active filter count
        so users know filters are applied even when the panel is closed.
      */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E0E0] rounded-lg
                     bg-white text-sm font-medium text-[#202124]
                     hover:border-[#1A73E8] transition-colors min-h-[44px]"
        >
          <FilterIcon />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 bg-[#1A73E8] text-white text-xs font-bold
                             rounded-full w-5 h-5 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
        {/* Show Reset inline next to the button when filters are active */}
        {activeCount > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-[#1A73E8] underline min-h-[44px]"
          >
            Reset
          </button>
        )}
      </div>

      {/* ── DESKTOP: horizontal filter bar ────────────────────────────── */}
      {/*
        hidden md:flex - invisible on mobile, flex-wrap on tablet/desktop.
        This is the original inline filter bar layout.
      */}
      <div className="hidden md:flex flex-wrap gap-3 items-end">
        {renderFilters(false)}
        <button
          type="button"
          onClick={handleReset}
          className="text-sm text-[#5F6368] hover:text-[#1A73E8] underline self-end pb-2 ml-2"
        >
          Reset
        </button>
      </div>

      {/* ── MOBILE: slide-up filter panel (modal) ─────────────────────── */}
      {/*
        fixed inset-0: covers the entire viewport.
        flex flex-col justify-end: panel slides up from the bottom.
        z-50: above the sticky header and map.
        Only rendered when panelOpen is true, and hidden on desktop via md:hidden.

        Structure:
          - Backdrop (semi-transparent black) - clicking it closes the panel
          - White panel - slides up from the bottom, max 85vh so it doesn't
            cover the entire screen, overflow-y-auto for long filter lists
      */}
      {panelOpen && (
        <div className="fixed inset-0 z-[120] flex flex-col justify-end md:hidden">
          {/* Backdrop - tap to dismiss */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setPanelOpen(false)}
          />

          {/* Panel - flex column so only the middle content area scrolls.
              This prevents overflow:hidden from clipping the autocomplete dropdown. */}
          <div className="relative bg-white rounded-t-2xl shadow-2xl
                          max-h-[85vh] flex flex-col">
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
              <h3 className="font-bold text-[#202124] text-base">Filters</h3>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Close filters"
                className="text-[#5F6368] p-1 hover:text-[#202124] transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Filter controls - this inner div scrolls; content above/below stays fixed */}
            <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">
              {renderFilters(true)}
            </div>

            {/* Action buttons */}
            <div className="px-5 pb-6 pt-2 flex gap-3 border-t border-gray-100 shrink-0">
              <button
                type="button"
                onClick={() => { handleReset(); }}
                className="flex-1 border border-gray-300 py-3 rounded-xl text-sm
                           font-medium text-[#5F6368] hover:border-[#1A73E8]
                           transition-colors min-h-[44px]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="flex-1 bg-[#1A73E8] text-white py-3 rounded-xl text-sm
                           font-semibold hover:bg-blue-700 transition-colors min-h-[44px]"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
