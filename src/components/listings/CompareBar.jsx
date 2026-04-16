// src/components/listings/CompareBar.jsx
// Floating bar at bottom of screen when 2-3 listings are selected for comparison.
// Clicking opens a full-width comparison modal.

import { useState } from "react";
import { createPortal } from "react-dom";
import { useCompare } from "../../context/CompareContext";

function CompareModal({ onClose }) {
  const { compared, removeCompare, clearCompare } = useCompare();

  // Collect all unique amenities across compared listings
  const allAmenities = [...new Set(compared.flatMap((l) => l.amenities || []))].sort();

  return createPortal(
    <div className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center bg-black/60">
      <div
        className="bg-white w-full max-w-5xl max-h-[90vh] overflow-auto rounded-t-2xl sm:rounded-2xl
                   shadow-2xl mx-0 sm:mx-4"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E0E0E0] px-5 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-[#202124]">Compare Listings</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearCompare}
              className="text-xs text-[#5F6368] hover:text-red-500 transition-colors"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close comparison"
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Comparison grid */}
        <div className="p-5">
          <div className={`grid gap-4 ${compared.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
            {compared.map((l) => (
              <div key={l.id} className="border border-[#E0E0E0] rounded-xl overflow-hidden">
                {/* Remove button */}
                <div className="relative">
                  <img
                    src={l.image_url || "https://placehold.co/300x200?text=No+Image"}
                    alt={l.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-32 sm:h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeCompare(l.id)}
                    aria-label={`Remove ${l.title}`}
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white
                               rounded-full p-1 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className="p-3 space-y-2">
                  <p className="font-bold text-sm text-[#202124] truncate">{l.title}</p>
                  <p className="text-xs text-[#5F6368] truncate">{l.address}, {l.city}</p>

                  {/* Stats */}
                  <div className="space-y-1.5 text-xs">
                    <Row label="Price" value={`$${l.price?.toLocaleString()}/mo`} />
                    <Row label="Beds" value={l.bedrooms === 0 ? "Studio" : `${l.bedrooms}`} />
                    <Row label="Baths" value={l.bathrooms} />
                    <Row label="Sqft" value={l.sqft?.toLocaleString()} />
                    <Row
                      label="Pets"
                      value={l.amenities?.some((a) => a.toLowerCase().includes("pet")) ? "Yes" : "No"}
                      highlight
                    />
                  </div>

                  {/* Amenities */}
                  <div className="pt-2 border-t border-[#E0E0E0]">
                    <p className="text-[10px] font-semibold text-[#5F6368] uppercase mb-1">Amenities</p>
                    <div className="flex flex-wrap gap-1">
                      {allAmenities.map((a) => {
                        const has = l.amenities?.includes(a);
                        return (
                          <span
                            key={a}
                            className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              has
                                ? "bg-blue-50 text-[#1A73E8] font-medium"
                                : "bg-gray-50 text-gray-300 line-through"
                            }`}
                          >
                            {a}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#5F6368]">{label}</span>
      <span className={`font-semibold ${highlight ? "text-emerald-600" : "text-[#202124]"}`}>
        {value ?? "-"}
      </span>
    </div>
  );
}

export default function CompareBar() {
  const { compared, clearCompare } = useCompare();
  const [modalOpen, setModalOpen] = useState(false);

  if (compared.length < 2) return null;

  return (
    <>
      {/* Floating bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9990]
                       bg-[#202124] text-white rounded-full shadow-2xl
                       flex items-center gap-3 px-5 py-3 animate-slideUp">
        <span className="text-sm font-semibold">
          Compare ({compared.length})
        </span>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="bg-[#1A73E8] hover:bg-[#1557b0] text-white text-sm font-semibold
                     px-4 py-1.5 rounded-full transition-colors"
        >
          View
        </button>
        <button
          type="button"
          onClick={clearCompare}
          aria-label="Clear comparison"
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {modalOpen && <CompareModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
