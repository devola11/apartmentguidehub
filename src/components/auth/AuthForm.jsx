// src/components/auth/AuthForm.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 mr-2 inline" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function AuthForm({ mode = "login" }) {
  const { signIn, signUp } = useAuth();
  const navigate            = useNavigate();
  const location            = useLocation();

  const from = location.state?.from?.pathname ?? "/";

  const [fullName,     setFullName]     = useState("");
  const [email,        setEmail]        = useState("");
  const [password,     setPassword]     = useState("");
  const [role,         setRole]         = useState("renter");
  const [showPassword, setShowPassword] = useState(false);

  // Track which fields have been touched for inline validation
  const [touched, setTouched] = useState({ fullName: false, email: false, password: false });

  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";

  // Inline validation errors (only shown after field blur)
  const fieldErrors = {
    fullName: touched.fullName && isRegister && !fullName.trim()
      ? "Full name is required."
      : "",
    email: touched.email && !email.trim()
      ? "Email is required."
      : touched.email && !isValidEmail(email)
      ? "Please enter a valid email address."
      : "",
    password: touched.password && !password
      ? "Password is required."
      : touched.password && password.length < 6
      ? "Password must be at least 6 characters."
      : "",
  };

  function blur(field) {
    setTouched(prev => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Mark all fields touched so errors show
    setTouched({ fullName: true, email: true, password: true });

    if (fieldErrors.email || fieldErrors.password || (isRegister && fieldErrors.fullName)) return;

    setError("");
    setSuccess("");
    setLoading(true);

    if (isRegister) {
      const { data, error: authError } = await signUp(email, password, fullName, role);

      if (authError) {
        setLoading(false);
        setError(authError.message);
        return;
      }

      // Extract first name from the full name field so we can personalise
      // the welcome banner (e.g. "Jane Smith" → "Jane").
      const firstName = fullName.trim().split(" ")[0];

      // ── Path A: email confirmation is DISABLED in the Supabase Dashboard ──
      // signUp() returns a non-null session immediately, meaning the user is
      // already authenticated. onAuthStateChange in AuthContext has already
      // fired and set the user state. Navigate home and pass welcome state
      // so Home.jsx knows to show the banner + onboarding section.
      if (data.session) {
        navigate("/", {
          replace: true,
          state: { welcome: true, firstName },
        });
        return;
      }

      // ── Path B: email confirmation is still ENABLED ────────────────────
      // signUp() returned no session. Try signing in immediately anyway.
      const { error: signInError } = await signIn(email, password);
      setLoading(false);

      if (!signInError) {
        // Signed in successfully — show the welcome experience.
        navigate("/", {
          replace: true,
          state: { welcome: true, firstName },
        });
      } else {
        // Email confirmation is genuinely required. Show the check-email
        // message as a fallback so the user isn't left stranded.
        // TO RE-ENABLE: turn "Enable email confirmations" back on in the
        // Supabase Dashboard (Authentication → Settings).
        setSuccess("Account created! Check your email to confirm, then log in.");
        setTimeout(() => navigate("/login"), 3000);
      }
    } else {
      const { data, error: authError } = await signIn(email, password);
      setLoading(false);
      if (authError) {
        setError(authError.message);
      } else {
        const userRole = data?.user?.user_metadata?.role;
        if (userRole === "landlord") {
          navigate("/", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      }
    }
  }

  const inputBase = "w-full border rounded-lg px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:border-transparent placeholder:text-gray-400 min-h-[44px] transition-colors";
  const inputNormal = `${inputBase} border-gray-300 focus:ring-[#1A73E8]`;
  const inputError  = `${inputBase} border-red-400 focus:ring-red-400 bg-red-50`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 w-full">

      {/* Server error banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-start gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-500 shrink-0 mt-0.5">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          {error}
        </div>
      )}

      {/* Success banner */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg flex items-start gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-500 shrink-0 mt-0.5">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          {success}
        </div>
      )}

      {/* Full Name - register only */}
      {isRegister && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => blur("fullName")}
            className={fieldErrors.fullName ? inputError : inputNormal}
          />
          {fieldErrors.fullName && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.fullName}</p>
          )}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => blur("email")}
          className={fieldErrors.email ? inputError : inputNormal}
        />
        {fieldErrors.email && (
          <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
        )}
      </div>

      {/* Password with show/hide toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            autoComplete={isRegister ? "new-password" : "current-password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => blur("password")}
            className={`${fieldErrors.password ? inputError : inputNormal} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center px-3
                       text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {fieldErrors.password && (
          <p className="text-xs text-red-500 mt-1">{fieldErrors.password}</p>
        )}
      </div>

      {/* Role - register only */}
      {isRegister && (
        <div>
          <label htmlFor="auth-role" className="block text-sm font-medium text-gray-700 mb-1">I am a…</label>
          <select
            id="auth-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-base
                       focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent
                       bg-white text-gray-800 min-h-[44px]"
          >
            <option value="renter">Renter - looking for a place</option>
            <option value="landlord">Landlord - listing a property</option>
          </select>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !!success}
        className="w-full bg-[#1A73E8] text-white py-3 rounded-lg font-semibold
                   hover:bg-[#1557b0] transition-colors duration-150
                   disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2 min-h-[44px]
                   flex items-center justify-center"
      >
        {loading && <Spinner />}
        {loading
          ? (isRegister ? "Creating account…" : "Signing in…")
          : isRegister
          ? "Sign Up"
          : "Log In"}
      </button>
    </form>
  );
}
