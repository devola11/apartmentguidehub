// src/lib/submitInquiry.js
// ─────────────────────────────────────────────────────────────────────────────
// Shared submission helper used by all three contact forms.
//
// HOW IT WORKS:
//   Both channels (Supabase + Web3Forms) run independently inside their own
//   try/catch blocks. A failure in one never prevents the other from running,
//   so a submission is never silently lost just because one service is down.
//
//   Returns { ok: true } if at least one channel succeeded.
//   Returns { ok: false, supabaseError, web3Error } if both failed.
//
// EXPECTED DATA SHAPE:
//   {
//     name, email,
//     phone?,            preferred_city?,   preferred_bedrooms?,
//     budget_range?,     move_in_date?,     message?,
//     listing_id?,       form_source        ('contact' | 'listing' | 'help')
//   }
// ─────────────────────────────────────────────────────────────────────────────
import { supabase } from "./supabase";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export async function submitInquiry(data) {
  let supabaseError = null;
  let web3Error     = null;

  // ── 1. Save to Supabase ────────────────────────────────────────────────────
  // Only insert columns that exist in the inquiries table schema
  // (id, listing_id, name, email, phone, message, created_at). Extra form
  // fields like preferred_city/budget_range still go out via Web3Forms below
  // so the email recipient sees the full submission.
  // Failures are caught and stored; execution continues to channel 2.
  try {
    const { error } = await supabase.from("inquiries").insert({
      name:       data.name,
      email:      data.email,
      phone:      data.phone      || null,
      message:    data.message    || null,
      listing_id: data.listing_id || null,
    });
    if (error) supabaseError = error;
  } catch (e) {
    supabaseError = e;
  }

  // ── 2. Send to Web3Forms ───────────────────────────────────────────────────
  // Web3Forms delivers the submission to the email linked to the access key.
  // Failures are caught independently of Supabase.
  try {
    const res = await fetch(WEB3FORMS_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key:         import.meta.env.VITE_WEB3FORMS_KEY,
        name:               data.name,
        email:              data.email,
        phone:              data.phone              || "",
        preferred_city:     data.preferred_city     || "",
        preferred_bedrooms: data.preferred_bedrooms || "",
        budget_range:       data.budget_range       || "",
        move_in_date:       data.move_in_date       || "",
        message:            data.message            || "",
        listing_id:         data.listing_id         || "",
        form_source:        data.form_source,
      }),
    });
    if (!res.ok) web3Error = new Error(`Web3Forms HTTP ${res.status}`);
  } catch (e) {
    web3Error = e;
  }

  // ── Result ─────────────────────────────────────────────────────────────────
  // Success if at least one channel accepted the submission.
  const ok = !supabaseError || !web3Error;
  return { ok, supabaseError, web3Error };
}
