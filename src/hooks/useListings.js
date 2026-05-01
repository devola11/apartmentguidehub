// src/hooks/useListings.js
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

// Columns needed for list/grid/map views.
// `description` is intentionally excluded — it can be long and is only
// needed on the detail page (useListing fetches select("*")).
const LIST_COLUMNS = [
  "id", "title", "address", "city", "state", "zip",
  "price", "bedrooms", "bathrooms", "sqft",
  "latitude", "longitude", "image_url", "amenities", "created_at",
].join(",");

export function useListings(filters = {}) {
  const [listings, setListings] = useState([]);
  const [total,    setTotal]    = useState(0);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    if (filters.skip) {
      setListings([]);
      setTotal(0);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchListings() {
      setLoading(true);
      setError(null);

      // Request an exact row count alongside the data so callers can
      // render accurate pagination controls without a second query.
      let query = supabase
        .from("listings")
        .select(LIST_COLUMNS, { count: "exact" });

      // ── Filters (all applied server-side) ──────────────────────────
      if (filters.state)    query = query.eq("state", filters.state);
      if (filters.city)     query = query.ilike("city", `%${filters.city}%`);
      if (filters.minPrice) query = query.gte("price", Number(filters.minPrice));
      if (filters.maxPrice) query = query.lte("price", Number(filters.maxPrice));

      // bedrooms: "0" = studio (exact match), "1"/"2"/"3" = 1+/2+/3+ (gte)
      if (filters.bedrooms === "0") {
        query = query.eq("bedrooms", 0);
      } else if (filters.bedrooms) {
        query = query.gte("bedrooms", Number(filters.bedrooms));
      }

      if (filters.bathrooms) query = query.gte("bathrooms", Number(filters.bathrooms));

      // petFriendly: cast amenities array to text and search for "pet"
      // This matches values like "Pet Friendly", "Pets Allowed", etc.
      if (filters.petFriendly) {
        query = query.filter("amenities::text", "ilike", "%pet%");
      }

      // ── Sorting ────────────────────────────────────────────────────
      if (filters.sort === "price_asc") {
        query = query.order("price", { ascending: true });
      } else if (filters.sort === "price_desc") {
        query = query.order("price", { ascending: false });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      // ── Pagination ─────────────────────────────────────────────────
      // Two modes:
      //   page + pageSize  → server-side pagination via .range()
      //   limit            → simple "give me N rows" (used on Home page)
      if (filters.page && filters.pageSize) {
        const start = (filters.page - 1) * filters.pageSize;
        const end   = start + filters.pageSize - 1;
        query = query.range(start, end);
      } else if (filters.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error: err, count } = await query;

      if (!cancelled) {
        if (err) {
          setError(err.message);
        } else {
          setListings(data ?? []);
          setTotal(count ?? 0);
        }
        setLoading(false);
      }
    }

    fetchListings();
    return () => { cancelled = true; };
  }, [
    filters.skip,
    filters.state,
    filters.city,
    filters.minPrice,
    filters.maxPrice,
    filters.bedrooms,
    filters.bathrooms,
    filters.petFriendly,
    filters.sort,
    filters.limit,
    filters.page,
    filters.pageSize,
  ]);

  return { listings, loading, error, total };
}
