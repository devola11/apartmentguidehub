// src/pages/Home.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useListings } from "../hooks/useListings";
import ListingGrid from "../components/listings/ListingGrid";
import LazyMap from "../components/common/LazyMap";
import SEO from "../components/common/SEO";
import CityAutocomplete from "../components/common/CityAutocomplete";
import WelcomeBanner from "../components/common/WelcomeBanner";
import FindApartmentModal from "../components/common/FindApartmentModal";
import SendMessageModal from "../components/common/SendMessageModal";
import { RecentlyViewedRow } from "../components/listings/RecentlyViewed";

const CITIES = [
  { name: "Manhattan",   state: "New York",    count: 14, img: "/cities/manhattan.webp" },
  { name: "Brooklyn",    state: "New York",    count: 8,  img: "/cities/brooklyn.webp" },
  { name: "Jersey City", state: "New Jersey",  count: 8,  img: "/cities/jersey-city.webp" },
  { name: "Hoboken",     state: "New Jersey",  count: 5,  img: "/cities/hoboken.webp" },
  { name: "Queens",      state: "New York",    count: 5,  img: "/cities/queens.webp" },
  { name: "Newark",      state: "New Jersey",  count: 5,  img: "/cities/newark.webp" },
];

const HOW_IT_WORKS = [
  {
    title: "Search",
    desc: "Find apartments by city, price, and amenities",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: "Compare",
    desc: "View photos, floor plans, and details side by side",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: "Connect",
    desc: "Contact landlords directly and schedule tours",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ApartmentGuideNext",
  url: "https://apartmentguidenext.com",
  description: "Browse verified apartments for rent across New York and New Jersey.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://apartmentguidenext.com/listings?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// Onboarding steps shown below the trust bar after a fresh signup.
// Three cards describing the core features, with a dismiss button.
const ONBOARDING_STEPS = [
  {
    label: "Search apartments",
    desc:  "Filter by city, price, bedrooms, and amenities to find exactly what you need.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    label: "Save your favorites",
    desc:  "Tap the heart icon on any listing to save it and compare later from your profile.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    label: "Contact landlords",
    desc:  "Send a message directly from any listing page to ask questions or schedule a tour.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

export default function Home() {
  const { listings, loading, error } = useListings({ limit: 6 });
  const navigate  = useNavigate();
  const location  = useLocation();

  // ── Welcome state ─────────────────────────────────────────────────────────
  // location.state is set by AuthForm's navigate("/", { state: { welcome, firstName } })
  // call. It lives on exactly one history entry, so it's gone on refresh or
  // when the user navigates away — "show only once" with zero storage.
  const isWelcome = !!location.state?.welcome;
  const firstName = location.state?.firstName ?? "";

  // Each UI piece has its own visibility toggle so they can be dismissed
  // independently (closing the banner doesn't close the onboarding section).
  const [showBanner,       setShowBanner]       = useState(isWelcome);
  const [showOnboarding,   setShowOnboarding]   = useState(isWelcome);
  const [findOpen,         setFindOpen]         = useState(false);
  // selectedListing: the listing whose Send Message modal is open, or null.
  // One modal for all cards on the page — only one can be open at a time.
  const [selectedListing,  setSelectedListing]  = useState(null);

  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    navigate(`/listings?${params.toString()}`);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F9FA" }}>

      {/* Welcome banner — only shown on the first render after signup */}
      {showBanner && (
        <WelcomeBanner
          firstName={firstName}
          onDismiss={() => setShowBanner(false)}
        />
      )}

      {/* No title prop — SEO uses the full default: "ApartmentGuideNext - Find Apartments for Rent in New York & New Jersey" */}
      <SEO
        description="Browse 60+ verified apartments for rent across New York and New Jersey. Filter by city, price, and bedrooms. Find your perfect home with ApartmentGuideNext."
        canonical="/"
        jsonLd={HOME_JSON_LD}
      />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center text-white
                   min-h-[380px] md:min-h-[540px]"
      >
        {/* Hero image — proper <img> so the browser preload scanner discovers it
            immediately (CSS background-images are invisible to the scanner).
            fetchPriority="high" + the <link rel="preload"> in index.html together
            ensure this is the first resource fetched, minimising LCP. */}
        <img
          src="/hero-bg.webp"
          alt="Modern apartment building exterior"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/25" />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-xl mx-auto text-center px-4 py-10 md:py-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 md:mb-8 drop-shadow-lg">
            Find the Perfect Apartment.
          </h1>

          {/*
            DESKTOP (sm+): one unified white pill - input flex-1, button compact inside on the right.
            MOBILE: two separate elements stacked - input is its own white rounded-xl card,
                    button is full-width below it.
          */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col gap-2.5
                       sm:flex-row sm:items-center sm:gap-0
                       sm:bg-white sm:rounded-full sm:shadow-xl sm:p-1.5"
          >
            <CityAutocomplete
              value={query}
              onChange={setQuery}
              onConfirm={(city) => {
                const params = new URLSearchParams();
                if (city) params.set("q", city);
                navigate(`/listings?${params.toString()}`);
              }}
              placeholder="City, neighborhood, or ZIP"
              wrapperClassName="sm:flex-1"
              inputClassName="w-full text-[#202124] text-base placeholder-[#9AA0A6]
                              focus:outline-none
                              bg-white rounded-xl px-4 py-3 shadow-lg
                              sm:bg-transparent sm:rounded-none sm:px-5 sm:py-2.5 sm:shadow-none"
            />
            <button
              type="submit"
              className="w-full bg-[#1A73E8] hover:bg-[#1669D3] text-white font-semibold
                         rounded-full py-3 text-base
                         transition-colors duration-150 min-h-[44px]
                         sm:w-auto sm:shrink-0 sm:py-2.5 sm:px-7 sm:text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-4 sm:gap-8 text-xs text-[#5F6368] flex-wrap">
          <span className="flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#1A73E8">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
            50+ Verified Listings
          </span>
          <span className="text-gray-300 hidden sm:block">|</span>
          <span>New York &amp; New Jersey</span>
          <span className="text-gray-300 hidden sm:block">|</span>
          <span>Updated Daily</span>
        </div>
      </div>

      {/* ── Onboarding section — only shown on first visit after signup ── */}
      {showOnboarding && (
        <section className="bg-[#EBF3FD] border-b border-blue-100 animate-fadeIn">
          <div className="max-w-7xl mx-auto px-4 py-7">

            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-base font-bold text-[#202124]">
                  Get started — here&apos;s what you can do
                </h2>
                <p className="text-xs text-[#5F6368] mt-0.5">
                  Three things to try right now
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowOnboarding(false)}
                aria-label="Dismiss getting started section"
                className="shrink-0 p-1.5 rounded-full text-[#5F6368]
                           hover:bg-blue-100 transition-colors duration-150 mt-0.5"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6"  y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Three feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ONBOARDING_STEPS.map(({ label, desc, icon }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl border border-blue-100
                             px-5 py-4 flex items-start gap-4 shadow-sm"
                >
                  {/* Icon circle */}
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#EBF3FD]
                                  flex items-center justify-center text-[#1A73E8]">
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#202124]">{label}</p>
                    <p className="text-xs text-[#5F6368] mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA nudge */}
            <div className="mt-4 text-center">
              <Link
                to="/listings"
                className="inline-flex items-center gap-1.5 text-sm font-semibold
                           text-[#1A73E8] hover:underline transition-colors"
              >
                Browse all apartments →
              </Link>
            </div>

          </div>
        </section>
      )}

      {/* ── Popular Cities ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-4 md:pt-14 md:pb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#202124]">Popular Cities</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {CITIES.map(({ name, state, count, img }) => (
            <Link
              key={name}
              to={`/listings?q=${encodeURIComponent(name)}`}
              className="group relative rounded-xl overflow-hidden shadow-sm border border-gray-200
                         hover:shadow-md transition-shadow duration-200 aspect-[4/3]"
            >
              <img
                src={img}
                alt={`${name} apartments`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm leading-tight">{name}</p>
                <p className="text-white/80 text-xs">{state}</p>
                <p className="text-white/70 text-xs">{count} listings</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured listings ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#202124]">Featured Listings</h2>
          <Link
            to="/listings"
            className="text-sm font-semibold text-brand-700 hover:text-brand-600 transition-colors"
          >
            View all →
          </Link>
        </div>
        <ListingGrid listings={listings} loading={loading} error={error} onSendMessage={setSelectedListing} />

        <div className="text-center mt-8 md:mt-10">
          <Link
            to="/listings"
            className="inline-flex items-center justify-center bg-brand-600 text-white font-semibold
                       px-8 py-3 rounded-full hover:bg-brand-700
                       transition-colors duration-150 shadow-sm text-sm min-h-[44px]"
          >
            View all listings
          </Link>
        </div>
      </section>

      {/* ── Recently Viewed ─────────────────────────────────────────────── */}
      <RecentlyViewedRow />

      {/* ── Renting Made Easy ──────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#202124] text-center mb-10">
            Renting Made Easy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ title, desc, icon }) => (
              <div key={title} className="flex flex-col items-center text-center p-6
                                          bg-[#F8F9FA] rounded-2xl border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center
                                text-[#1A73E8] mb-4">
                  {icon}
                </div>
                <p className="font-bold text-[#202124] text-base mb-2">{title}</p>
                <p className="text-sm text-[#5F6368] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map preview ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <h2 className="text-xl md:text-2xl font-bold text-[#202124] mb-6">Explore the Map</h2>
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
          <LazyMap listings={listings} className="h-[260px] md:h-[400px]" />
        </div>
      </section>

      {/* ── Need Help CTA ──────────────────────────────────────────────── */}
      <section className="bg-[#e8f0fe] border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-[#202124] mb-2">
            Need Help Finding Your Home?
          </h2>
          <p className="text-sm md:text-base text-[#5F6368] mb-7">
            Talk to our rental experts today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:7188148683"
              className="inline-flex items-center justify-center gap-2
                         bg-[#1A73E8] hover:bg-[#1557b0] text-white
                         font-semibold text-sm px-7 py-3 rounded-full
                         transition-colors duration-150 min-h-[44px] w-full sm:w-auto"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24
                         11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0
                         1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57
                         3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/>
              </svg>
              Call Us
            </a>
            {/*
              "Email Us" — changed from <a href="mailto:"> to a <button> that
              opens FindApartmentModal. The envelope SVG is the email icon shown
              next to the label, rendered in brand blue via currentColor on the
              button's text-[#1A73E8] class.
            */}
            <button
              type="button"
              onClick={() => setFindOpen(true)}
              className="inline-flex items-center justify-center gap-2
                         bg-white hover:bg-gray-50 text-[#1A73E8] border border-[#1A73E8]
                         font-semibold text-sm px-7 py-3 rounded-full
                         transition-colors duration-150 min-h-[44px] w-full sm:w-auto"
            >
              {/* Envelope SVG icon — brand blue from parent's text-[#1A73E8] */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Email Us
            </button>
          </div>
        </div>
      </section>

      {/* "Tell Us What You're Looking For" modal — opened by the Email Us button */}
      <FindApartmentModal
        isOpen={findOpen}
        onClose={() => setFindOpen(false)}
      />

      {/* Single Send Message modal for all listing cards on this page */}
      <SendMessageModal
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        listing={selectedListing}
      />
    </div>
  );
}
