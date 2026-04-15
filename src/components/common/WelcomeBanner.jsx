// src/components/common/WelcomeBanner.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Full-width brand-blue banner that appears at the top of the page right after
// a new user signs up and is redirected to the homepage.
//
// HOW "SHOW ONLY ONCE" WORKS
// ─────────────────────────────────────────────────────────────────────────────
// This component is never stored in localStorage. The parent (Home.jsx) only
// renders it when React Router's `location.state.welcome` is truthy. That
// state is attached to ONE history entry — the navigate() call in AuthForm.
//
//   • Navigating away:  new history entry, state gone → banner never re-shows.
//   • Page refresh:     browser discards navigation state → banner gone.
//   • Clicking back:    different history entry, no state → no banner.
//
// No cleanup, no flags, no storage. The browser handles it for free.
//
// FADE-OUT ANIMATION
// ─────────────────────────────────────────────────────────────────────────────
// Tailwind's `transition-opacity duration-500` handles the CSS transition.
// A `fading` boolean in state toggles between `opacity-100` and `opacity-0`.
//
// Timeline:
//   0ms   → banner enters with animate-slideDown (0.18s, defined in tailwind.config.js)
//   6000ms → setFading(true) → CSS opacity transition begins (500ms)
//   6500ms → onDismiss() → parent sets showBanner=false → element removed from DOM
//
// If the user clicks X, the same 500ms fade plays before removal.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6"  y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function WelcomeBanner({ firstName, onDismiss }) {
  const [fading, setFading] = useState(false);

  // Start fading after 6 seconds, then remove from DOM after the
  // 500ms CSS transition completes.
  useEffect(() => {
    const fadeTimer   = setTimeout(() => setFading(true),  6000);
    const removeTimer = setTimeout(() => onDismiss(),       6500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  // onDismiss is a stable setState setter — safe in deps
  }, [onDismiss]);

  function handleClose() {
    setFading(true);
    setTimeout(onDismiss, 500);
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "w-full bg-[#1A73E8] text-white",
        "animate-slideDown",                 // entry: slides down from above (0.18s)
        "transition-opacity duration-500",   // exit: opacity fade (500ms)
        fading ? "opacity-0" : "opacity-100",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-4 py-3
                      flex items-center justify-between gap-4">

        {/* Message */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl shrink-0" aria-hidden="true">👋</span>
          <p className="text-sm font-medium leading-snug">
            Welcome to ApartmentGuideNext
            {firstName ? `, ${firstName}` : ""}!{" "}
            Start exploring apartments across New York &amp; New Jersey.
          </p>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Dismiss welcome message"
          className="shrink-0 p-1.5 rounded-full
                     hover:bg-white/20 active:bg-white/30
                     transition-colors duration-150"
        >
          <XIcon />
        </button>

      </div>
    </div>
  );
}
