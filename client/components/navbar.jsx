"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, User, LogOut, ChevronDown, Heart } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const Navbar = () => {
    const router = useRouter();
    const [hoveredNav, setHoveredNav] = useState(null);
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Services", href: "#services" },
        { name: "Properties", href: "/properties" },
        { name: "About", href: "#about" },
        { name: "Agents", href: "#agent" },
    ];

    useEffect(() => {
        checkAuth();
        
        // Listen for cart updates
        const handleCartUpdate = () => {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (token) fetchCartCount(token);
        };
        
        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) return;

            const res = await fetch(`${API_BASE}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
                fetchCartCount(token);
            } else {
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
            }
        } catch (err) {
            console.error("Auth check failed", err);
        }
    };

    const fetchCartCount = async (token) => {
        try {
            const res = await fetch(`${API_BASE}/api/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setCartCount(data.length);
            }
        } catch (err) {
            console.error("Failed to fetch cart", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setUser(null);
        setCartCount(0);
        setShowDropdown(false);
        router.push("/");
    };

    return (
        <nav className="flex items-center justify-between py-3 px-8 md:px-12 lg:px-16">
            {/* Logo */}
            <Link href="/" className="logo flex items-center cursor-pointer">
                <div className="mr-2">
                    <svg
                        className="w-8 h-8"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9 22V12H15V22"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <h1 className="text-xl font-bold">ESTATES</h1>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`text-sm font-medium ${hoveredNav === index ? "text-black" : "text-gray-500"
                            } hover:text-black transition-colors`}
                        onMouseEnter={() => setHoveredNav(index)}
                        onMouseLeave={() => setHoveredNav(null)}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-4">
                {user && (
                    <Link
                        href="/profile"
                        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title="Saved Properties"
                    >
                        <Heart className="w-5 h-5 text-gray-700" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                )}

                {user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
                        >
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                            <span className="text-sm font-medium hidden sm:inline">{user.name || "User"}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-semibold">{user.name || "User"}</p>
                                    <p className="text-xs text-gray-600 truncate">{user.email}</p>
                                </div>
                                <div className="py-1">
                                    <Link
                                        href="/profile"
                                        onClick={() => setShowDropdown(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                                    >
                                        <User className="w-4 h-4" />
                                        My Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href="/auth"
                        aria-label="Contact us — sign in or sign up"
                        title="Contact us"
                        className="group relative inline-flex items-center bg-black text-white px-6 py-3 rounded-full text-sm transition-all hover:bg-gray-900 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black active:translate-y-px"
                    >
                        <span className="mr-2 flex items-center">
                            <span className="relative mr-2 inline-flex">
                                <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400"></span>
                            </span>
                            Contact Us Now
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
