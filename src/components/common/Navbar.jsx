// src/components/common/Navbar.jsx
//
// RESPONSIVE BEHAVIOUR:
//  - Mobile (< 768px / md):  Logo left, hamburger icon right.
//    Clicking hamburger opens a full-width dropdown with all nav links
//    and auth buttons stacked vertically.
//  - Tablet (md+):           Logo left, center nav links visible with
//    tighter gap-6 spacing, auth buttons on the right.
//  - Desktop (lg+):          Same as tablet but with more padding.
//
// WHY md (768px) not sm (640px)?
//  Tailwind's `md` breakpoint = 768px, which matches the "tablet" spec.
//  Using `md:` means: "apply this style at 768px and above".
//  Everything without a prefix is the mobile-first (375px) default.

import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Hamburger → X icon that animates between two states
function MenuIcon({ open }) {
  return open ? (
    // X (close) icon when menu is open
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ) : (
    // Hamburger (3 lines) when menu is closed
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate           = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 4); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSignOut() {
    await signOut();
    navigate("/");
    setMenuOpen(false); // close the mobile menu after signing out
  }

  // Desktop link class - used for the horizontal nav strip (md+)
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-brand-600 font-semibold"
      : "text-[#5F6368] hover:text-brand-600 transition-colors duration-150";

  // Mobile link class - used inside the dropdown drawer
  // Each link is block-level with a bottom border for visual separation.
  // min-h-[44px] ensures the tap target is at least 44px tall (accessibility).
  const mobileLinkClass = ({ isActive }) =>
    `flex items-center px-4 min-h-[44px] text-base font-medium border-b border-gray-100 ${
      isActive ? "text-brand-600" : "text-[#5F6368]"
    }`;

  return (
    <nav className={`bg-white border-b border-gray-200 sticky top-0 z-[100] transition-shadow duration-200 ${scrolled ? "shadow-md" : ""}`}>
      {/* ── Main bar ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo - always visible on the left at every breakpoint */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 shrink-0"
        >
          <span className="text-brand-600" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9.5L12 3l9 6.5V21H3V9.5zm2 1.25V19h4v-4h6v4h4V10.75L12 5.3 5 10.75zM10 19h4v-3h-4v3z"/>
            </svg>
          </span>
          <span className="text-xl font-bold text-[#202124] tracking-tight">
            Apmt<span className="text-brand-600">Guide</span>
          </span>
        </Link>

        {/* Center nav links - hidden below md (768px), flex on tablet+ */}
        {/* gap-6 is tighter than the original gap-8, matching the tablet spec */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink to="/listings"            className={linkClass}>Search</NavLink>
          <NavLink to="/listings/new-york"    className={linkClass}>New York</NavLink>
          <NavLink to="/listings/new-jersey" className={linkClass}>New Jersey</NavLink>
        </div>

        {/* Right side - desktop auth (hidden on mobile) + hamburger (mobile only) */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Desktop auth buttons - hidden below md */}
          {user ? (
            <>
              <NavLink to="/favorites" className={({ isActive }) => `${linkClass({ isActive })} hidden md:block text-sm font-medium`}>
                Favorites
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => `${linkClass({ isActive })} hidden md:block text-sm font-medium`}>
                Profile
              </NavLink>
              <span className="hidden md:block text-sm text-[#202124] font-medium truncate max-w-[120px]">
                {user.user_metadata?.full_name || user.email?.split("@")[0]}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="hidden md:block text-sm font-medium text-[#5F6368] border border-gray-300 px-4 py-1.5 rounded-full hover:border-brand-600 hover:text-brand-600 transition-colors duration-150"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="hidden md:block text-sm font-medium text-[#5F6368] hover:text-brand-600 transition-colors duration-150"
              >
                Log in
              </NavLink>
              <Link
                to="/register"
                className="hidden md:block text-sm font-semibold bg-brand-600 text-white px-5 py-2 rounded-full hover:bg-brand-700 transition-colors duration-150 shadow-sm"
              >
                Sign up
              </Link>
            </>
          )}

          {/* Hamburger button - only visible below md (mobile) */}
          {/* w-10 h-10 = 40px × 40px, close to the 44px tap-target minimum.
              The -mr-1 nudges it flush with the right edge padding. */}
          <button
            type="button"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center w-11 h-11 -mr-1
                       rounded-lg text-[#202124] hover:bg-gray-100 transition-colors"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ─────────────────────────────────── */}
      {/* Conditionally rendered - appears below the main bar when open.
          md:hidden ensures it's invisible on tablet/desktop even if menuOpen
          somehow stays true (e.g. window resize).
          Shadow gives depth so it feels like an overlay above the content. */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-xl animate-slideDown">

          {/* Navigation links - full-width rows with 44px+ tap targets */}
          <NavLink to="/listings"            className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Search</NavLink>
          <NavLink to="/listings/new-york"    className={mobileLinkClass} onClick={() => setMenuOpen(false)}>New York</NavLink>
          <NavLink to="/listings/new-jersey" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>New Jersey</NavLink>

          {/* Auth section - adapts based on signed-in state */}
          {user ? (
            <>
              <NavLink to="/favorites" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Favorites</NavLink>
              <NavLink to="/profile"   className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Profile</NavLink>
              <div className="px-4 py-4 space-y-3 border-t border-gray-100">
                <p className="text-sm text-[#5F6368]">
                  Signed in as{" "}
                  <span className="font-semibold text-[#202124]">
                    {user.user_metadata?.full_name || user.email?.split("@")[0]}
                  </span>
                </p>
                {/* py-3 = 12px top + 12px bottom + ~20px text ≈ 44px tap target */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full text-sm font-medium text-[#5F6368] border border-gray-300
                             px-4 py-3 rounded-full hover:border-brand-600 hover:text-brand-600
                             transition-colors duration-150 min-h-[44px]"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <div className="px-4 py-4 space-y-3">
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-full text-sm font-medium
                           text-[#5F6368] border border-gray-300 px-4 py-3 rounded-full
                           hover:text-brand-600 hover:border-brand-600 transition-colors
                           min-h-[44px]"
              >
                Log in
              </NavLink>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center w-full text-sm font-semibold
                           bg-brand-600 text-white px-5 py-3 rounded-full
                           hover:bg-brand-700 transition-colors duration-150 shadow-sm
                           min-h-[44px]"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
