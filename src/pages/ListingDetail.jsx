// src/pages/ListingDetail.jsx
//
// RESPONSIVE CHANGES:
//
//   Breadcrumb:
//     Mobile:  Show only "← Back to listings" (simple back link).
//     md+:     Full breadcrumb trail (Home > State > City > Title).
//
//   Photo gallery:
//     Mobile:  Main image full width, auto height (aspect ratio preserved).
//              Thumbnail 2×2 grid hidden.
//              "View All Photos" button overlaid on the main image.
//     md+:     Original side-by-side gallery (65% main + 35% thumbnails), fixed 420px height.
//
//   Two-column layout (info + contact card):
//     Mobile:  flex-col - everything stacks vertically. Contact card flows
//              below the property info (not sticky).
//     lg+:     flex-row - 63% info column on the left, 37% sticky contact
//              card on the right.
//     We use lg (1024px) rather than md (768px) because at 768px the side-by-side
//     columns are too narrow for the contact card to display comfortably.
//
//   Stats row (Price / Beds / Baths / Sqft):
//     Mobile:  2×2 grid (grid-cols-2) instead of 4-in-a-row, so each cell
//              has room to breathe on narrow screens.
//     md+:     Original 4-column row (flex with divide-x).
//
//   Contact card:
//     Mobile:  Not sticky - flows naturally after the property info.
//     lg+:     sticky top-20 (original behaviour).

import { useState, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useListing } from "../hooks/useListing";
import { useListings } from "../hooks/useListings";
import { usePropertyImages } from "../hooks/usePropertyImages";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import ListingsMap from "../components/maps/ListingsMap";
import NeighborhoodInfo from "../components/listings/NeighborhoodInfo";
import { PetPolicySection } from "../components/listings/PetBadges";
import { RecentlyViewedSidebar } from "../components/listings/RecentlyViewed";
import { addRecentlyViewed } from "../lib/recentlyViewed";
import ListingCard from "../components/listings/ListingCard";
import PhotoGallery from "../components/listings/PhotoGallery";
import SEO from "../components/common/SEO";
import SendMessageModal from "../components/common/SendMessageModal";

// Old PhotoLightbox and THUMB_CROPS removed — replaced by PhotoGallery component.

function getPhone() {
  return "(718) 814-8683";
}

function PinIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>; }
function BedIcon()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>; }
function BathIcon()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 9V7h-2V5a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-2h-4V9h4zm-4 7H4V5h11v4h3v7z"/></svg>; }
function SqftIcon()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>; }
function PhoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>; }
function ChevronIcon() { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>; }
function HeartIcon({ filled }) {
  return filled
    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="#EF4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}

// Amenity icons - matched by keyword in amenity name
const AMENITY_ICONS = {
  pool:        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 12c1.1 0 1.5-.5 2.5-.5S6.4 12 7.5 12s1.5-.5 2.5-.5 1.5.5 2.5.5 1.5-.5 2.5-.5 1.5.5 2.5.5v2c-1.1 0-1.5-.5-2.5-.5s-1.5.5-2.5.5-1.5-.5-2.5-.5-1.5.5-2.5.5-1.5-.5-2.5-.5S3.1 14 2 14v-2zm0 4c1.1 0 1.5-.5 2.5-.5s1.5.5 2.5.5 1.5-.5 2.5-.5 1.5.5 2.5.5 1.5-.5 2.5-.5 1.5.5 2.5.5v2c-1.1 0-1.5-.5-2.5-.5s-1.5.5-2.5.5-1.5-.5-2.5-.5-1.5.5-2.5.5-1.5-.5-2.5-.5S3.1 20 2 20v-4zM15.5 4.5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5.5 7h-4V8.5c0-1.1-.9-2-2-2s-2 .9-2 2V14H11V8c0-2.2 1.8-4 4-4 .7 0 1.3.2 1.9.5L21 8v3.5z"/></svg>,
  gym:         <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/></svg>,
  parking:     <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"/></svg>,
  pet:         <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1-5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm3 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.5 1.5c-2.33 0-7 1.17-7 3.5V18h14v-2c0-2.33-4.67-3.5-7-3.5z"/></svg>,
  ac:          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z"/></svg>,
  laundry:     <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.17 16.83a4 4 0 0 0 5.66 0 4 4 0 0 0 0-5.66l-5.66 5.66zM18 2.01L6 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-1.99-2-1.99zM10 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM7 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>,
  wifi:        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>,
  balcony:     <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/></svg>,
  doorman:     <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2zm-5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>,
  elevator:    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l-4 4h3v3h2V8h3L7 4zm10 12h-3v-3h-2v3H9l4 4 4-4zM3 20h18v2H3zM3 2h18v2H3z"/></svg>,
  concierge:   <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>,
  rooftop:     <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  storage:     <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.53 15.47 1 12 1S6 2.53 6 4.65c0 .47.1.91.18 1.35H4c-1.11 0-2 .89-2 2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-8-3c1.96 0 4 .56 4 1.65 0 1.08-2.04 1.95-4 1.95S8 5.73 8 4.65C8 3.56 10.04 3 12 3z"/></svg>,
  security:    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>,
  dishwasher:  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2.01L6 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-1.99-2-1.99zM10 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM7 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>,
  default:     <svg viewBox="0 0 24 24" fill="none" stroke="#1A73E8" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
};

function getAmenityIcon(amenity) {
  const lower = amenity.toLowerCase();
  for (const [key, icon] of Object.entries(AMENITY_ICONS)) {
    if (key !== "default" && lower.includes(key)) return icon;
  }
  return AMENITY_ICONS.default;
}

export default function ListingDetail() {
  const { id } = useParams();
  const { listing, loading, error } = useListing(id);
  const { images: propertyImages } = usePropertyImages(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();

  const { listings: similar } = useListings({
    state: listing?.state,
    limit: 4,
    skip: !listing,
  });
  const similarListings = similar.filter(l => l.id !== id).slice(0, 3);

  // selectedListing: which listing's modal is open (the detail listing itself,
  // or a similar-listing card). null = modal closed.
  const [selectedListing, setSelectedListing] = useState(null);
  const [linkCopied, setLinkCopied]     = useState(false);

  const listingUrl = typeof window !== "undefined"
    ? `${window.location.origin}/listings/${id}`
    : `/listings/${id}`;

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(listingUrl).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }).catch(() => {});
  }, [listingUrl]);

  // Track recently viewed
  useEffect(() => {
    if (listing) addRecentlyViewed(listing);
  }, [listing]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 animate-pulse space-y-6">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-[260px] md:h-[420px] bg-gray-200 rounded-2xl" />
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>
            <div className="w-full lg:w-[37%] h-64 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl font-bold text-[#202124]">Listing not found</p>
        <Link to="/listings" className="text-[#1A73E8] underline mt-4 inline-block">← Back to listings</Link>
      </div>
    );
  }

  const saved    = isFavorite(listing.id);
  const imageUrl = propertyImages[0]?.image_url || listing.image_url || "https://placehold.co/800x450?text=No+Image";
  const phone    = getPhone();

  const parts = [
    listing.bedrooms === 0 ? "studio" : listing.bedrooms != null ? `${listing.bedrooms}-bedroom` : null,
    listing.bathrooms != null && `${listing.bathrooms}-bath`,
    "apartment",
    listing.city  && `in ${listing.city}`,
    listing.state,
  ].filter(Boolean);
  const pricePart   = listing.price  != null ? `$${listing.price.toLocaleString()}/mo` : null;
  const sqftPart    = listing.sqft   != null ? `${listing.sqft.toLocaleString()} sq ft` : null;
  const amenityPart = listing.amenities?.length > 0 ? listing.amenities.slice(0, 3).join(", ") : null;
  const seoDescription = (
    parts.join(" ") +
    (pricePart  ? ` - ${pricePart}` : "") +
    (sqftPart   ? `, ${sqftPart}`   : "") +
    (amenityPart ? `. ${amenityPart}.` : ".")
  ) || listing.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    description: listing.description || seoDescription,
    url: `https://apartmentguidenext.com/listings/${listing.id}`,
    image: imageUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip,
      addressCountry: "US",
    },
    ...(listing.price != null && {
      offers: {
        "@type": "Offer",
        price: listing.price,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: listing.price,
          priceCurrency: "USD",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        },
      },
    }),
    ...(listing.latitude && listing.longitude && {
      geo: { "@type": "GeoCoordinates", latitude: listing.latitude, longitude: listing.longitude },
    }),
    numberOfRooms: listing.bedrooms,
    numberOfBathroomsTotal: listing.bathrooms,
    floorSize: listing.sqft ? { "@type": "QuantitativeValue", value: listing.sqft, unitCode: "FTK" } : undefined,
    amenityFeature: listing.amenities?.map(a => ({
      "@type": "LocationFeatureSpecification", name: a, value: true,
    })),
  };

  const stateSlug = listing.state?.toLowerCase().replace(/\s+/g, "");

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      <SEO
        title={`${listing.title} - ${listing.city}, ${listing.state}`}
        description={seoDescription}
        canonical={`/listings/${listing.id}`}
        image={listing.image_url || undefined}
        imageAlt={`${listing.title} in ${listing.city}, ${listing.state}`}
        ogType="article"
        jsonLd={jsonLd}
      />

      <div className="max-w-7xl mx-auto px-4">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        {/*
          Mobile: show only a simple "← Back" link (hidden md:flex hides the full trail).
          md+:    show the full breadcrumb (flex items-center gap-1.5 ...).
          This avoids long multi-item breadcrumbs wrapping awkwardly on small screens.
        */}

        {/* Simple back link - mobile only */}
        <div className="md:hidden py-4">
          <Link
            to="/listings"
            className="inline-flex items-center gap-1 text-sm text-[#1A73E8] font-medium"
          >
            ← Back to listings
          </Link>
        </div>

        {/* Full breadcrumb - tablet/desktop only */}
        <nav aria-label="Breadcrumb"
          className="hidden md:flex items-center gap-1.5 text-xs text-[#5F6368] py-4 flex-wrap">
          <Link to="/" className="hover:text-[#1A73E8] transition-colors">Home</Link>
          <ChevronIcon />
          <Link to="/listings" className="hover:text-[#1A73E8] transition-colors">Rentals</Link>
          <ChevronIcon />
          <Link to={`/listings/${stateSlug}`} className="hover:text-[#1A73E8] transition-colors">{listing.state}</Link>
          <ChevronIcon />
          <span className="text-[#202124] font-medium truncate max-w-[100px] sm:max-w-[160px] md:max-w-[220px]">{listing.title}</span>
        </nav>

        {/* ── Photo gallery (ApartmentGuide-style) ────────────────────── */}
        <PhotoGallery
          images={propertyImages}
          title={listing.title}
          fallbackUrl={listing.image_url}
        />

        {/* ── Two-column layout: info (left) + contact card (right) ────── */}
        {/*
          Mobile:  flex-col - everything stacks. Contact card flows below info.
          lg+:     flex-row - original two-column side-by-side layout.
          We use lg (1024px) because at md (768px) the columns are too narrow.
          gap-6 on mobile, gap-8 on lg+.
        */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start pb-16">

          {/* ── LEFT column - property info ─────────────────────────── */}
          {/* w-full on mobile; on lg+ flex takes it to 63% (the remaining after right col) */}
          <div className="w-full lg:flex-1 min-w-0">

            {/* Title & address */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#202124] mb-2 leading-tight">
              {listing.title}
            </h1>
            <div className="flex items-center gap-1.5 text-[#5F6368] text-sm mb-5 flex-wrap">
              <PinIcon />
              <span>{listing.address}, {listing.city}, {listing.state} {listing.zip}</span>
            </div>

            {/* ── Stats row: Price / Beds / Baths / Sqft ──────────── */}
            {/*
              Mobile:  grid-cols-2 - 2×2 grid so each cell is wide enough.
              md+:     flex with divide-x - original 4-in-a-row layout.
              We achieve this by having two separate elements with responsive visibility:
                - Grid version:  block md:hidden
                - Flex version:  hidden md:flex
            */}

            {/* Mobile: 2×2 grid */}
            <div className="grid grid-cols-2 md:hidden border border-[#E0E0E0] rounded-xl overflow-hidden mb-8 bg-white divide-y divide-[#E0E0E0]">
              <div className="flex flex-col items-center px-4 py-4 border-r border-[#E0E0E0]">
                <p className="text-xl font-extrabold text-[#1A73E8]">${listing.price?.toLocaleString()}</p>
                <p className="text-xs text-[#5F6368] mt-0.5">per month</p>
              </div>
              <div className="flex flex-col items-center px-4 py-4">
                <div className="text-[#202124] mb-1"><BedIcon /></div>
                <p className="font-bold text-[#202124]">{listing.bedrooms === 0 ? "Studio" : listing.bedrooms ?? "-"}</p>
                <p className="text-xs text-[#5F6368]">{listing.bedrooms === 0 ? "\u00A0" : "Bedrooms"}</p>
              </div>
              <div className="flex flex-col items-center px-4 py-4 border-r border-[#E0E0E0]">
                <div className="text-[#202124] mb-1"><BathIcon /></div>
                <p className="font-bold text-[#202124]">{listing.bathrooms ?? "-"}</p>
                <p className="text-xs text-[#5F6368]">Bathrooms</p>
              </div>
              <div className="flex flex-col items-center px-4 py-4">
                <div className="text-[#202124] mb-1"><SqftIcon /></div>
                <p className="font-bold text-[#202124]">{listing.sqft?.toLocaleString() ?? "-"}</p>
                <p className="text-xs text-[#5F6368]">Sq Ft</p>
              </div>
            </div>

            {/* Desktop: 4-in-a-row flex (original layout) */}
            <div className="hidden md:flex items-center gap-0 border border-[#E0E0E0] rounded-xl overflow-hidden mb-8 bg-white divide-x divide-[#E0E0E0]">
              <div className="flex flex-col items-center px-5 py-4 flex-1">
                <p className="text-2xl font-extrabold text-[#1A73E8]">${listing.price?.toLocaleString()}</p>
                <p className="text-xs text-[#5F6368] mt-0.5">per month</p>
              </div>
              <div className="flex flex-col items-center px-5 py-4 flex-1">
                <div className="text-[#202124] mb-1"><BedIcon /></div>
                <p className="font-bold text-[#202124]">{listing.bedrooms === 0 ? "Studio" : listing.bedrooms ?? "-"}</p>
                <p className="text-xs text-[#5F6368]">{listing.bedrooms === 0 ? "\u00A0" : "Bedrooms"}</p>
              </div>
              <div className="flex flex-col items-center px-5 py-4 flex-1">
                <div className="text-[#202124] mb-1"><BathIcon /></div>
                <p className="font-bold text-[#202124]">{listing.bathrooms ?? "-"}</p>
                <p className="text-xs text-[#5F6368]">Bathrooms</p>
              </div>
              <div className="flex flex-col items-center px-5 py-4 flex-1">
                <div className="text-[#202124] mb-1"><SqftIcon /></div>
                <p className="font-bold text-[#202124]">{listing.sqft?.toLocaleString() ?? "-"}</p>
                <p className="text-xs text-[#5F6368]">Sq Ft</p>
              </div>
            </div>

            {/* About This Property */}
            {listing.description && (
              <section className="mb-8">
                <h2 className="text-lg font-bold text-[#202124] mb-3">About This Property</h2>
                <p className="text-[#5F6368] leading-relaxed">{listing.description}</p>
              </section>
            )}

            {/* ── Contact card — mobile / tablet only (below lg) ─────────── */}
            {/*
              The right column is hidden on mobile/tablet (hidden lg:block below).
              This copy appears immediately after the description so the CTAs are
              reachable without scrolling past amenities, map, and similar listings.
              At lg+ this div is hidden and the sticky right-column card takes over.
            */}
            <div className="lg:hidden mb-8">
              <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-lg p-5">
                <button
                  type="button"
                  onClick={() => setSelectedListing(listing)}
                  className="w-full bg-[#1A73E8] hover:bg-blue-700 text-white font-semibold
                             py-3 rounded-lg mb-3 transition-colors min-h-[44px]"
                >
                  Request Info
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedListing(listing)}
                  className="w-full border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-blue-50
                             font-semibold py-3 rounded-lg mb-2 transition-colors min-h-[44px]"
                >
                  Schedule Tour
                </button>
                <div className="mt-4 pt-4 border-t border-[#E0E0E0] flex items-center gap-2
                                text-[#1A73E8] font-semibold text-sm">
                  <PhoneIcon />
                  <span>{phone}</span>
                </div>
              </div>
            </div>

            {/* Amenities & Features */}
            {listing.amenities?.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-bold text-[#202124] mb-4">Amenities &amp; Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {listing.amenities.map(a => (
                    <div key={a} className="flex items-center gap-2.5 bg-white border border-[#E0E0E0]
                                             rounded-xl px-3 py-2.5 text-sm text-[#202124]">
                      <span className="w-5 h-5 text-[#1A73E8] shrink-0 [&>svg]:w-full [&>svg]:h-full">
                        {getAmenityIcon(a)}
                      </span>
                      <span className="leading-tight">{a}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Location map */}
            {listing.latitude && listing.longitude && (
              <section className="mb-8">
                <h2 className="text-lg font-bold text-[#202124] mb-3">Location</h2>
                <ListingsMap listings={[listing]} className="h-[200px] sm:h-[260px] rounded-xl" />
                <p className="text-sm text-[#5F6368] mt-2 flex items-center gap-1.5 flex-wrap">
                  <PinIcon />
                  {listing.address}, {listing.city}, {listing.state} {listing.zip}
                </p>
              </section>
            )}

            {/* Pet Policy */}
            <PetPolicySection amenities={listing.amenities} />

            {/* Neighborhood */}
            {listing.city && <NeighborhoodInfo city={listing.city} />}

            {/* Similar Listings */}
            {similarListings.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-bold text-[#202124] mb-4">Similar Listings</h2>
                {/*
                  Mobile:  1 column (grid-cols-1) - cards are full width.
                  sm+:     up to 3 columns (sm:grid-cols-3).
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {similarListings.map(l => (
                    <ListingCard key={l.id} listing={l} onSendMessage={setSelectedListing} />
                  ))}
                </div>
              </section>
            )}

            {/* Share This Listing */}
            <section className="mb-6">
              <h2 className="text-sm font-semibold text-[#5F6368] uppercase tracking-wide mb-3">
                Share This Listing
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(listingUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E0E0E0]
                             bg-white text-sm text-[#202124] hover:border-[#1A73E8] hover:text-[#1A73E8]
                             transition-colors duration-150"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  Facebook
                </a>
                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(listingUrl)}&text=${encodeURIComponent(listing.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E0E0E0]
                             bg-white text-sm text-[#202124] hover:border-[#1A73E8] hover:text-[#1A73E8]
                             transition-colors duration-150"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter
                </a>
                {/* Copy Link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E0E0E0]
                             bg-white text-sm text-[#202124] hover:border-[#1A73E8] hover:text-[#1A73E8]
                             transition-colors duration-150"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  {linkCopied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </section>

            {/* Report This Listing */}
            <p className="text-xs text-[#9AA0A6] pb-4">
              Something wrong with this listing?{" "}
              <a
                href="https://www.apartmentguide.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#5F6368] transition-colors"
              >
                Report this listing
              </a>
            </p>
          </div>

          {/* ── RIGHT column - contact card (desktop only) ───────────── */}
          {/*
            hidden:    not rendered on mobile/tablet — the lg:hidden copy above
                       handles those breakpoints.
            lg:block:  becomes a block element at 1024px+, restoring the original
                       sticky right-column layout.
            Everything below lg sees the inline card inserted after the description.
          */}
          <div className="hidden lg:block lg:w-[37%] lg:sticky lg:top-24 lg:self-start shrink-0">
            <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-lg p-5 sm:p-6">

              <h3 className="font-bold text-[#202124] text-base leading-snug mb-1 line-clamp-2">
                {listing.title}
              </h3>
              <p className="text-2xl font-extrabold text-[#1A73E8] mb-6">
                ${listing.price?.toLocaleString()}
                <span className="text-sm font-normal text-[#5F6368]">/mo</span>
              </p>

              {/* CTA buttons - min-h-[44px] for touch targets */}
              <button
                type="button"
                onClick={() => setSelectedListing(listing)}
                className="w-full bg-[#1A73E8] hover:bg-blue-700 text-white font-semibold
                           py-3 rounded-lg mb-3 transition-colors min-h-[44px]"
              >
                Request Info
              </button>
              <button
                type="button"
                onClick={() => setSelectedListing(listing)}
                className="w-full border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-blue-50
                           font-semibold py-3 rounded-lg mb-2 transition-colors min-h-[44px]"
              >
                Schedule Tour
              </button>

              <div className="mt-5 pt-4 border-t border-[#E0E0E0] flex items-center gap-2 text-[#1A73E8] font-semibold text-sm">
                <PhoneIcon />
                <span>{phone}</span>
              </div>

              <RecentlyViewedSidebar excludeId={listing.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Single modal — covers both the detail page contact card and
          any similar-listing card on this page */}
      <SendMessageModal
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        listing={selectedListing}
        formSource={selectedListing?.id === listing?.id ? "contact" : "listing"}
      />

    </div>
  );
}
