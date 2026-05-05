// src/components/common/FindApartmentModal.jsx
// ─────────────────────────────────────────────────────────────────────────────
// "Tell Us What You're Looking For" popup form.
//
// Triggered from the "Can't Find What You're Looking For?" CTA on Listings
// and the "Email Us" button on Home. Collects structured apartment-search
// preferences and submits them via submitInquiry() with form_source = 'help'.
//
// On submit:
//   1. Calls submitInquiry() — saves to Supabase AND Web3Forms in parallel,
//      each in its own try/catch so one failure never blocks the other.
//   2. Shows a success toast via useToast() and immediately closes the modal.
//
// MODAL SHELL:
//  • Fixed full-viewport overlay, z-[9999] — always above Leaflet map
//  • White rounded card, max-w-lg, centered on all screen sizes
//  • Sticky header with X button
//  • Close on: X click, click-outside overlay, Escape key
//  • Body scroll locked while open
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { submitInquiry } from "../../lib/submitInquiry";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

// ── Icon helpers ─────────────────────────────────────────────────────────────

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ── City options ─────────────────────────────────────────────────────────────

const TX_CITIES = [
  "Houston", "Dallas", "Austin", "San Antonio", "Fort Worth",
  "El Paso", "Arlington", "Plano", "Frisco", "Irving",
];

const OK_CITIES = [
  "Oklahoma City", "Tulsa", "Norman", "Edmond", "Broken Arrow",
  "Lawton", "Stillwater", "Moore", "Enid", "Bartlesville",
];

// ── Shared input class ────────────────────────────────────────────────────────
const inputCls =
  "w-full border border-[#E0E0E0] rounded-lg px-3 py-2.5 text-sm text-[#202124] " +
  "placeholder-[#5F6368] focus:outline-none focus:ring-2 focus:ring-[#1A73E8] bg-white";

const DEFAULT_MESSAGE =
  "Hi, I'm looking for an apartment and would love some help finding the right match.";

const SUCCESS_MSG = "Thank you! We'll get back to you within 24 hours.";

// ── Component ─────────────────────────────────────────────────────────────────

export default function FindApartmentModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    fullName:  "",
    email:     "",
    phone:     "",
    city:      "",
    bedrooms:  "",
    budget:    "",
    moveIn:    "",
    message:   DEFAULT_MESSAGE,
  });

  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const overlayRef = useRef(null);

  // ── Reset & pre-fill when modal opens ────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setSubmitError(null);
      setForm({
        fullName: "",
        email:    user?.email ?? "",
        phone:    "",
        city:     "",
        bedrooms: "",
        budget:   "",
        moveIn:   "",
        message:  DEFAULT_MESSAGE,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Lock body scroll while open; restore exact scroll position on close ──
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // ── Close on Escape ───────────────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e) { if (e.key === "Escape") onClose(); }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    const { ok } = await submitInquiry({
      name:               form.fullName,
      email:              form.email,
      phone:              form.phone    || null,
      preferred_city:     form.city     || null,
      preferred_bedrooms: form.bedrooms || null,
      budget_range:       form.budget   || null,
      move_in_date:       form.moveIn   || null,
      message:            form.message  || null,
      listing_id:         null,
      form_source:        "help",
    });

    setSubmitting(false);

    if (!ok) {
      setSubmitError("Something went wrong. Please try again.");
      return;
    }

    showToast(SUCCESS_MSG);
    onClose();
  }

  // ── Render — portal guarantees the overlay is always a direct child of
  // document.body, outside every stacking context in the app tree.
  return createPortal(
    // Fixed overlay — z-[9999] always renders above Leaflet map (highest
    // Leaflet pane is popup at z-index 700).
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 animate-overlayShow"
    >
      {/* White modal card — mx-4 gives 16px breathing room on mobile edges.
          stopPropagation prevents card clicks from bubbling to the overlay
          and accidentally triggering the click-outside-to-close logic. */}
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto animate-fadeIn"
      >

        {/* ── Sticky header ──────────────────────────────────────────── */}
        <div className="sticky top-0 bg-white flex items-center justify-between
                        px-6 py-4 border-b border-[#E0E0E0] rounded-t-2xl z-10">
          <div>
            <h2 className="font-bold text-lg text-[#202124] leading-tight">
              Tell Us What You&apos;re Looking For
            </h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              We&apos;ll help match you with the right apartment.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="shrink-0 text-[#5F6368] hover:text-[#202124] transition-colors
                       p-1 rounded-full hover:bg-gray-100 ml-3"
          >
            <XIcon />
          </button>
        </div>

        {/* ── Form ──────────────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-5 space-y-4">

          {/* 1 — Full Name */}
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            aria-label="Full Name"
            required
            className={inputCls}
          />

          {/* 2 — Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            aria-label="Email"
            required
            className={inputCls}
          />

          {/* 3 — Phone (optional) */}
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone (optional)"
            aria-label="Phone (optional)"
            className={inputCls}
          />

          {/* 4 — Preferred City */}
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            aria-label="Preferred City"
            className={inputCls}
          >
            <option value="">Preferred City</option>
            <optgroup label="Texas">
              {TX_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </optgroup>
            <optgroup label="Oklahoma">
              {OK_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </optgroup>
          </select>

          {/* 5 + 6 — Bedrooms & Budget */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              aria-label="Preferred Bedrooms"
              className={inputCls}
            >
              <option value="">Preferred Bedrooms</option>
              <option value="Studio">Studio</option>
              <option value="1 Bed">1 Bed</option>
              <option value="2 Beds">2 Beds</option>
              <option value="3+ Beds">3+ Beds</option>
            </select>

            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              aria-label="Budget Range"
              className={inputCls}
            >
              <option value="">Budget Range</option>
              <option value="Under $1,500">Under $1,500</option>
              <option value="$1,500–$2,000">$1,500–$2,000</option>
              <option value="$2,000–$3,000">$2,000–$3,000</option>
              <option value="$3,000–$5,000">$3,000–$5,000</option>
              <option value="$5,000+">$5,000+</option>
            </select>
          </div>

          {/* 7 — Move-in Date */}
          <div>
            <label className="text-xs text-[#5F6368] mb-1 block font-medium">
              Move-in Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="moveIn"
                value={form.moveIn}
                onChange={handleChange}
                className={inputCls + " pr-10"}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2
                               text-[#5F6368] pointer-events-none">
                <CalendarIcon />
              </span>
            </div>
          </div>

          {/* 8 — Message */}
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Message"
            aria-label="Message"
            className={inputCls + " resize-none"}
          />

          {/* Error banner */}
          {submitError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200
                          rounded-lg px-3 py-2">
              {submitError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#1A73E8] hover:bg-blue-700 disabled:opacity-60
                       disabled:cursor-not-allowed text-white font-semibold py-3
                       rounded-xl transition-colors text-sm"
          >
            {submitting ? "Submitting…" : "Submit Request"}
          </button>

          <p className="text-xs text-[#5F6368] text-center">
            We&apos;ll get back to you within 24 hours.
          </p>

        </form>
      </div>
    </div>,
    document.body
  );
}
