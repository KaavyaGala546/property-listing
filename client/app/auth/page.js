"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Mail, Lock, User, Star, Chrome, Apple } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function isValidEmail(email = "") {
  return /.+@.+\..+/.test(email);
}

function getPasswordStrength(pw = "") {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-gray-300", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-600"];
  return { score, label: labels[score], color: colors[score] };
}

function AuthPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params?.get("next") || "/properties";

  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  useEffect(() => { setMounted(true); }, []);

  const canSubmit = useMemo(() => {
    if (!isValidEmail(form.email)) return false;
    if (!form.password || form.password.length < 6) return false;
    if (mode === "signup") {
      if (!form.name) return false;
      if (!form.confirm || form.confirm !== form.password) return false;
    }
    return true;
  }, [form, mode]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: mode === "signup" ? form.name : undefined,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Request failed");

      // Save token
      if (data.token) {
        try {
          if (remember) localStorage.setItem("token", data.token);
          else sessionStorage.setItem("token", data.token);
        } catch {}
      }
      setSuccess(mode === "login" ? "Logged in successfully" : "Account created successfully");
      setTimeout(() => router.push(next), 500);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <nav className="flex items-center justify-between py-3 px-8 md:px-12 lg:px-16">
        <Link href="/" className="logo flex items-center cursor-pointer">
          <div className="mr-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold">ESTATES</h1>
        </Link>
        <Link href="/properties" className="text-sm text-gray-500 hover:text-black">Browse Properties</Link>
      </nav>

      {/* Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
        {/* Left: form card */}
        <div className="flex items-center justify-center px-6 md:px-12 lg:px-16 py-10">
          <div className={`w-full max-w-lg bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {/* Toggle */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setMode("login")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${mode === "login" ? "bg-black text-white" : "text-gray-700 hover:text-black"}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${mode === "signup" ? "bg-black text-white" : "text-gray-700 hover:text-black"}`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
              <p className="text-gray-600 mt-1">Sign {mode === "login" ? "in" : "up"} to continue your property journey.</p>
            </div>

            {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>}
            {success && <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">{success}</div>}

            <form onSubmit={onSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><User className="w-4 h-4"/></span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Your name"
                      className="w-full border border-gray-300 rounded px-4 py-2 pl-9 focus:outline-none focus:ring-2 focus:ring-black"
                      required={mode === "signup"}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Mail className="w-4 h-4"/></span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    className={`w-full border rounded px-4 py-2 pl-9 focus:outline-none focus:ring-2 ${isValidEmail(form.email) ? "border-gray-300 focus:ring-black" : "border-red-300 focus:ring-red-500"}`}
                    required
                  />
                </div>
                {!isValidEmail(form.email) && form.email && (
                  <p className="text-xs text-red-600 mt-1">Enter a valid email address.</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Lock className="w-4 h-4"/></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full border border-gray-300 rounded px-4 py-2 pl-9 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Strength</span>
                      <span>{getPasswordStrength(form.password).label}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[0,1,2,3].map((i) => (
                        <div key={i} className={`h-1.5 rounded ${getPasswordStrength(form.password).score > i ? getPasswordStrength(form.password).color : 'bg-gray-200'}`}/>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {mode === "signup" && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Lock className="w-4 h-4"/></span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirm"
                      value={form.confirm}
                      onChange={onChange}
                      placeholder="••••••••"
                      minLength={6}
                      className={`w-full border rounded px-4 py-2 pl-9 pr-10 focus:outline-none focus:ring-2 ${form.confirm && form.confirm !== form.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-black'}`}
                      required={mode === "signup"}
                    />
                  </div>
                  {form.confirm && form.confirm !== form.password && (
                    <p className="text-xs text-red-600 mt-1">Passwords do not match.</p>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 text-gray-700">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-gray-300"/>
                  Remember me
                </label>
                <span className="text-gray-500">Forgot password?</span>
              </div>

              <button
                type="submit"
                disabled={loading || !canSubmit}
                className="w-full mt-2 bg-black text-white py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-60 shadow hover:shadow-md transition-shadow"
              >
                <span>{loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2">
                <div className="h-px bg-gray-200 flex-1"/>
                <span className="text-xs text-gray-500">or continue with</span>
                <div className="h-px bg-gray-200 flex-1"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" disabled className="border border-gray-300 rounded-lg py-2 text-sm text-gray-700 disabled:opacity-70 flex items-center justify-center gap-2">
                  <Chrome className="w-4 h-4"/> Google
                </button>
                <button type="button" disabled className="border border-gray-300 rounded-lg py-2 text-sm text-gray-700 disabled:opacity-70 flex items-center justify-center gap-2">
                  <Apple className="w-4 h-4"/> Apple
                </button>
              </div>

              <p className="text-[11px] text-gray-500 mt-3">By continuing, you agree to our <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>.</p>

              <p className="text-center text-sm text-gray-600 mt-4">
                {mode === "login" ? (
                  <>Don&apos;t have an account? <button type="button" onClick={() => setMode("signup")} className="text-black underline">Sign up</button></>
                ) : (
                  <>Already have an account? <button type="button" onClick={() => setMode("login")} className="text-black underline">Login</button></>
                )}
              </p>
            </form>
          </div>
        </div>

        {/* Right: image panel */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0">
            <Image src="/assets/heroimg.avif" alt="Modern home interior" fill priority className="object-cover"/>
          </div>
          <div className="relative h-full w-full">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-12">
              <div className="inline-block bg-white/90 text-black px-4 py-2 rounded-full text-sm mb-4 border">Your next move</div>
              <h3 className="text-3xl font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">Find your dream home</h3>
              <p className="text-white/90 mt-2 max-w-md">Discover homes tailored to your lifestyle and needs. Join ESTATES to unlock personalized recommendations.</p>
            </div>

            {/* Floating trust badge */}
            <div className={`absolute top-8 right-8 bg-white/90 backdrop-blur border border-gray-200 rounded-xl shadow p-4 w-56 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <span className="inline-flex h-6 w-6 rounded-full bg-gray-200 border"/>
                  <span className="inline-flex h-6 w-6 rounded-full bg-gray-300 border"/>
                  <span className="inline-flex h-6 w-6 rounded-full bg-gray-400 border"/>
                </div>
                <div className="flex items-center text-yellow-500">
                  {[0,1,2,3,4].map(i => <Star key={i} className="w-4 h-4 fill-yellow-500"/>) }
                </div>
              </div>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">Trusted by <span className="font-semibold">5,000+ buyers</span> and investors. Rated <span className="font-semibold">4.9/5</span>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  // Wrap the client component that uses useSearchParams in a Suspense boundary
  // to satisfy Next.js requirement for CSR bailout during prerender.
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}> 
      <AuthPageInner />
    </Suspense>
  );
}
