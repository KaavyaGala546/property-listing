"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Calendar, LogOut, Settings, Home, Heart, Trash2 } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("saved"); // "saved" | "info"

  useEffect(() => {
    fetchUser();
    fetchSavedProperties();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        router.push("/auth?next=/profile");
        return;
      }

      const res = await fetch(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Session expired");
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load profile");
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      setTimeout(() => router.push("/auth?next=/profile"), 1500);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedProperties = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_BASE}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setSavedProperties(data);
      }
    } catch (err) {
      console.error("Failed to fetch saved properties", err);
    }
  };

  const handleRemoveProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      // Extract the actual property ID from the saved item
      const itemToRemove = savedProperties.find(item => {
        const id = item.propertyId?._id || item.propertyId?.id || item.propertyId;
        return String(id) === String(propertyId);
      });

      if (!itemToRemove) return;

      const actualPropertyId = itemToRemove.propertyId?._id || itemToRemove.propertyId?.id || itemToRemove.propertyId;

      const res = await fetch(`${API_BASE}/api/cart/${actualPropertyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setSavedProperties(prev => prev.filter(item => {
          const id = item.propertyId?._id || item.propertyId?.id || item.propertyId;
          return String(id) !== String(actualPropertyId);
        }));
        // Trigger storage event to update cart count in navbar
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (err) {
      console.error("Failed to remove property", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 px-8 md:px-12 lg:px-16 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="logo flex items-center cursor-pointer">
            <div className="mr-2">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold">ESTATES</h1>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
            <Home className="w-4 h-4"/> Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-6">
                <div className="flex flex-col items-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <h2 className="mt-4 text-xl font-bold">{user?.name || "User"}</h2>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3"/>
                    Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => setActiveTab("saved")}
                    className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left text-sm ${activeTab === "saved" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}
                  >
                    <Heart className="w-4 h-4"/> Saved Properties ({savedProperties.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left text-sm ${activeTab === "info" ? "bg-gray-100 font-medium" : "hover:bg-gray-50"}`}
                  >
                    <User className="w-4 h-4"/> Account Details
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-left text-sm">
                    <Settings className="w-4 h-4"/> Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 text-left text-sm"
                  >
                    <LogOut className="w-4 h-4"/> Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === "saved" ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Saved Properties for Investment</h3>
                  {savedProperties.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">No saved properties yet.</p>
                      <p className="text-gray-500 text-sm mt-2">Browse properties and save your favorites for investment.</p>
                      <Link href="/properties" className="inline-block mt-4 px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-900 transition-colors">
                        Browse Properties
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedProperties.map((item) => {
                        const property = item.propertyId;
                        if (!property) return null;
                        
                        return (
                          <div key={item._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative group">
                            <Link href={`/properties/${property._id || property.id}`}>
                              <div className="relative h-40">
                                <Image
                                  src={property.images?.[0] || "/assets/heroimg.avif"}
                                  alt={property.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-semibold">
                                  {property.type}
                                </div>
                              </div>
                              <div className="p-4">
                                <h4 className="font-bold text-sm mb-1">{property.title}</h4>
                                <p className="text-xs text-gray-600 mb-2">{property.location}</p>
                                <div className="flex justify-between text-xs text-gray-500 mb-2">
                                  <span>{property.bedrooms} Beds</span>
                                  <span>{property.bathrooms} Baths</span>
                                  <span>{property.area}</span>
                                </div>
                                <p className="text-lg font-bold text-blue-600">{property.price}</p>
                              </div>
                            </Link>
                            <button
                              onClick={() => handleRemoveProperty(property._id || property.id)}
                              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                              title="Remove from saved"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Profile Info */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={user?.name || ""}
                          readOnly
                          className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={user?.email || ""}
                          readOnly
                          className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Member Since</label>
                        <input
                          type="text"
                          value={new Date(user?.createdAt || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          readOnly
                          className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Security</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Password</p>
                        <p className="text-xs text-gray-600">Last updated: {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                        Change Password
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
