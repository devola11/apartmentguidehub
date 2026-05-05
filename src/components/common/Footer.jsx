// src/components/common/Footer.jsx
import { Link } from "react-router-dom";

const AG_URL = "https://www.apartmentguide.com/";

// ── Social icons ──────────────────────────────────────────────────────────────
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

// ── App Store Badge ────────────────────────────────────────────────────────────
// Official-style recreation: black rounded rect + Apple logo + typeset text.
//
// Apple logo path: MDI apple-ios icon (24×24 source viewBox, public domain).
// Bounding box: x 2.94-20.09, y 2-22 → ~17×20 px.
// transform="translate(6.06, 8)" places it at (9,10)-(26,30) inside the badge.
function AppStoreBadge() {
  return (
    <a
      href="https://apps.apple.com/us/app/apartment-guide-home-rentals/id292234839"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on the App Store"
      className="inline-block hover:opacity-90 transition-opacity duration-150 shrink-0"
    >
      <svg
        width="140" height="44"
        viewBox="0 0 140 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        {/* Black background with rounded corners and subtle border */}
        <rect width="140" height="44" rx="7" fill="#000"/>
        <rect x="0.75" y="0.75" width="138.5" height="42.5" rx="6.25"
          stroke="white" strokeOpacity="0.2" strokeWidth="1.5"/>

        {/* Apple logo
            Source viewBox: 24×24, bounding box ~(2.94,2)→(20.09,22)
            Scale: 1×  (source units ≈ target px at this size)
            translate(6.06, 11) → icon sits at (9,13)→(26,33), vertically centered */}
        <path
          transform="translate(6.06, 11)"
          fill="white"
          d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79
             -1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7
             9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0
             2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15
             3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83z
             M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04
             3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
        />

        {/* "Download on the" — small caption line */}
        <text
          x="34" y="18"
          fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
          fontSize="9"
          fill="white"
          fillOpacity="0.8"
        >
          Download on the
        </text>

        {/* "App Store" — large primary line */}
        <text
          x="34" y="33"
          fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
          fontSize="16"
          fontWeight="600"
          fill="white"
          letterSpacing="-0.4"
        >
          App Store
        </text>
      </svg>
    </a>
  );
}

// ── Google Play Badge ──────────────────────────────────────────────────────────
// Official-style recreation: black rounded rect + 4-color play triangle + text.
//
// Icon geometry: main triangle (0,0)→(0,26)→(22,13).
// Split into 4 sub-triangles via centroid (7.33, 13) ≈ (7, 13):
//   - Teal  (#4FC3F7): upper-left  — (0,0)  (0,13) (7,13)
//   - Green (#6EC543): upper-right — (0,0)  (22,13)(7,13)
//   - Gold  (#FFD740): lower-left  — (0,13) (0,26) (7,13)
//   - Red   (#F44336): lower-right — (0,26) (22,13)(7,13)
// transform="translate(9, 9)" places the icon at (9,9)→(31,35), 22×26 px.
function GooglePlayBadge() {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.primedia.apartmentguide"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get it on Google Play"
      className="inline-block hover:opacity-90 transition-opacity duration-150 shrink-0"
    >
      <svg
        width="140" height="44"
        viewBox="0 0 140 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        {/* Black background */}
        <rect width="140" height="44" rx="7" fill="#000"/>
        <rect x="0.75" y="0.75" width="138.5" height="42.5" rx="6.25"
          stroke="white" strokeOpacity="0.2" strokeWidth="1.5"/>

        {/* 4-color Google Play triangle icon */}
        <g transform="translate(9, 9)">
          {/* Teal — upper-left sub-triangle */}
          <path d="M0,0 L0,13 L7,13 Z"  fill="#4FC3F7"/>
          {/* Green — upper-right sub-triangle */}
          <path d="M0,0 L22,13 L7,13 Z" fill="#6EC543"/>
          {/* Gold — lower-left sub-triangle */}
          <path d="M0,13 L0,26 L7,13 Z" fill="#FFD740"/>
          {/* Red — lower-right sub-triangle */}
          <path d="M0,26 L22,13 L7,13 Z" fill="#F44336"/>
        </g>

        {/* "GET IT ON" — small caption line */}
        <text
          x="36" y="18"
          fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
          fontSize="8"
          fill="white"
          fillOpacity="0.8"
          letterSpacing="0.8"
        >
          GET IT ON
        </text>

        {/* "Google Play" — large primary line */}
        <text
          x="36" y="33"
          fontFamily="Helvetica Neue, Helvetica, Arial, sans-serif"
          fontSize="15.5"
          fontWeight="500"
          fill="white"
          letterSpacing="-0.2"
        >
          Google Play
        </text>
      </svg>
    </a>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#202124" }} className="text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          {/* Brand column */}
          <div>
            <p className="text-white font-bold text-lg mb-2">
              ApartmentGuide<span className="text-brand-500">Hub</span>
            </p>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              Find verified apartment listings across Texas and Oklahoma. Real homes, real prices.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/apartmentguide" target="_blank" rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white
                           hover:bg-gray-200 transition-colors duration-150 text-gray-800">
                <FacebookIcon />
              </a>
              <a href="https://x.com/apartmentguide" target="_blank" rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white
                           hover:bg-gray-200 transition-colors duration-150 text-gray-800">
                <TwitterIcon />
              </a>
              <a href="https://www.instagram.com/apartmentguide" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white
                           hover:bg-gray-200 transition-colors duration-150 text-gray-800">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Browse column */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Browse</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/listings/texas" className="hover:text-white transition-colors duration-150">
                  Texas
                </Link>
              </li>
              <li>
                <Link to="/listings/oklahoma" className="hover:text-white transition-colors duration-150">
                  Oklahoma
                </Link>
              </li>
              <li>
                <Link to="/listings" className="hover:text-white transition-colors duration-150">
                  All Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Account column */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Account</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="hover:text-white transition-colors duration-150">
                  Log in
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors duration-150">
                  Sign up
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-white transition-colors duration-150">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App column — badges side by side, wrap on narrow columns */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Download Our App
            </p>
            <div className="flex flex-row flex-wrap gap-3">
              <AppStoreBadge />
              <GooglePlayBadge />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row
                        items-center justify-between gap-2 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} ApartmentGuideHub. All rights reserved.</p>
          <p>
            ApartmentGuideHub is powered by{" "}
            <a href={AG_URL} target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-white underline transition-colors duration-150">
              ApartmentGuide.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
