"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { Search, MapPin, Home, Bed, DollarSign } from "lucide-react";
import { properties as localProperties } from '../data/properties';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function PropertySearch({ onResults, useLocalData = false }) {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    type: "",
    bedrooms: "",
    minPrice: "",
    maxPrice: ""
  });
  const [loading, setLoading] = useState(false);
  const searchTimeoutRef = useRef(null);

  const filterLocalProperties = () => {
    let filtered = [...localProperties];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(locationLower)
      );
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type);
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
    }

    // Price range filter
    if (filters.minPrice || filters.maxPrice) {
      filtered = filtered.filter(p => {
        const price = parseInt(p.price.replace(/[$,]/g, ''));
        const min = filters.minPrice ? parseInt(filters.minPrice) : 0;
        const max = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
        return price >= min && price <= max;
      });
    }

    return filtered;
  };

  const handleSearch = useCallback(async (e) => {
    e?.preventDefault();
    
    // Clear any pending timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    setLoading(true);
    
    try {
      if (useLocalData) {
        // Use local filtering
        const filtered = filterLocalProperties();
        if (onResults) onResults(filtered);
      } else {
        // Use API
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
        
        const res = await fetch(`${API_BASE}/api/properties?${params.toString()}`);
        
        if (res.ok) {
          const data = await res.json();
          if (onResults) onResults(data);
        } else {
          // Fallback to local filtering if API fails
          const filtered = filterLocalProperties();
          if (onResults) onResults(filtered);
        }
      }
    } catch (err) {
      console.error("Search failed, using local filtering", err);
      // Fallback to local filtering
      const filtered = filterLocalProperties();
      if (onResults) onResults(filtered);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, useLocalData]);

  // Debounced search trigger
  const triggerSearch = useCallback(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch();
    }, 500); // 500ms debounce
  }, [handleSearch]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Auto-trigger search when filters change
  useEffect(() => {
    // Only trigger if at least one filter has a value
    const hasFilters = Object.values(filters).some(val => val !== "");
    if (hasFilters) {
      triggerSearch();
    } else if (onResults) {
      // If all filters are cleared, show all properties
      onResults(localProperties);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 -mt-8 relative z-10">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Search by title, location or description..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Filters grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              placeholder="Location"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filters.type}
              onChange={(e) => updateFilter('type', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white"
            >
              <option value="">All Types</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
              <option value="For Investment">For Investment</option>
            </select>
          </div>

          <div className="relative">
            <Bed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filters.bedrooms}
              onChange={(e) => updateFilter('bedrooms', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white"
            >
              <option value="">Any Beds</option>
              <option value="1">1+ Bed</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-60 text-sm font-medium"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Price range */}
        <div className="flex items-center gap-3">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Price Range:</span>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            placeholder="Min"
            className="w-28 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <span className="text-gray-400">—</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            placeholder="Max"
            className="w-28 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </form>
    </div>
  );
}
