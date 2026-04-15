// src/lib/recentlyViewed.js
// Manages recently viewed listings in localStorage (last 10).

const KEY = "agn_recently_viewed";
const MAX = 10;

export function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(listing) {
  if (!listing?.id) return;
  const items = getRecentlyViewed().filter((l) => l.id !== listing.id);
  items.unshift({
    id: listing.id,
    title: listing.title,
    image_url: listing.image_url,
    price: listing.price,
    city: listing.city,
    state: listing.state,
    bedrooms: listing.bedrooms,
  });
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, MAX)));
}
