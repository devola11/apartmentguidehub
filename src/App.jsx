// src/App.jsx
// ------------------------------------------------------------------
// ROOT of the component tree.
//
// Pages are lazy-loaded with React.lazy() so each route's code is only
// fetched when the user navigates to it. Combined with Vite's manualChunks
// in vite.config.js, this splits the bundle into:
//   vendor-react    — React core (rarely changes)
//   vendor-leaflet  — Leaflet/react-leaflet (heavy, map pages only)
//   vendor-supabase — Supabase client
//   + one small chunk per page
//
// Suspense wraps the Routes so React shows a minimal fallback while the
// page chunk downloads, rather than a blank screen or crash.
// ------------------------------------------------------------------
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CompareProvider } from "./context/CompareContext";
import CompareBar from "./components/listings/CompareBar";

// Layout components — always needed, not lazy-loaded
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";
import BackToTop from "./components/common/BackToTop";

// Pages — lazy-loaded: each becomes its own JS chunk
const Home          = lazy(() => import("./pages/Home"));
const Listings      = lazy(() => import("./pages/Listings"));
const ListingDetail = lazy(() => import("./pages/ListingDetail"));
const Login         = lazy(() => import("./pages/Login"));
const Register      = lazy(() => import("./pages/Register"));
const Profile       = lazy(() => import("./pages/Profile"));
const Favorites     = lazy(() => import("./pages/Favorites"));
const NotFound      = lazy(() => import("./pages/NotFound"));
const AuthCallback  = lazy(() => import("./pages/AuthCallback"));

// Leaflet CSS - must be imported globally so map tiles render correctly
import "leaflet/dist/leaflet.css";

// Minimal loading fallback — matches the app background so there's no
// colour flash while a page chunk downloads (typically < 100 ms on fast
// connections because vendor chunks are already cached).
function PageFallback() {
  return <div className="flex-1 min-h-screen bg-[#F8F9FA]" />;
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <CompareProvider>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />

          <main className="flex-1">
            {/* Suspense catches the lazy-load promise for any child route */}
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/listings/texas" element={<Listings stateFilter="Texas" />} />
                <Route path="/listings/oklahoma" element={<Listings stateFilter="Oklahoma" />} />
                <Route path="/listings/:id" element={<ListingDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auth/callback" element={<AuthCallback />} />

                {/* Protected routes */}
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
          <BackToTop />
          <CompareBar />
        </div>
        </CompareProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
