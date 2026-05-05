// src/components/common/SEO.jsx
// Drop this into any page to set per-page <head> tags.
// Uses react-helmet-async so tags are injected safely in the document head.
//
// Props:
//   title       - page title (will be appended with " | ApartmentGuideHub")
//   description - meta description (max ~155 chars for best results)
//   canonical   - canonical URL for this page
//   image       - OG image URL (optional, falls back to default hero)
//   imageAlt    - alt text for the OG image
//   ogType      - og:type value (default "website", use "article" for detail pages)
//   noindex     - set true to prevent indexing (login, register, profile, etc.)
//   jsonLd      - plain JS object to emit as application/ld+json structured data

import { Helmet } from "react-helmet-async";

const SITE_NAME = "ApartmentGuideHub";
const SITE_URL = "https://apartmentguidehub.com";
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_IMAGE_ALT = "Modern apartment building exterior";

export default function SEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  imageAlt = DEFAULT_IMAGE_ALT,
  ogType = "website",
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Find Apartments for Rent in Texas & Oklahoma`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
