// app/components/properties/PropertyCard.jsx
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function PropertyCard({ property, inCart = false, onCartChange }) {
  const [isInCart, setIsInCart] = useState(inCart);
  const [loading, setLoading] = useState(false);

  // Check cart status on mount
  useEffect(() => {
    const checkCartStatus = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/api/cart/check/${property._id || property.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setIsInCart(data.inCart);
        }
      } catch (err) {
        console.error("Failed to check cart status", err);
      }
    };

    checkCartStatus();
  }, [property._id, property.id]);

  const toggleCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth?next=/properties";
      return;
    }

    setLoading(true);
    try {
      if (isInCart) {
        const res = await fetch(`${API_BASE}/api/cart/${property._id || property.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setIsInCart(false);
          if (onCartChange) onCartChange(property, false);
          // Trigger storage event to update cart count in navbar
          window.dispatchEvent(new Event('cartUpdated'));
        }
      } else {
        const res = await fetch(`${API_BASE}/api/cart`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify({ propertyId: property._id || property.id }),
        });
        
        const data = await res.json();
        
        if (res.ok) {
          setIsInCart(true);
          if (onCartChange) onCartChange(property, true);
          // Trigger storage event to update cart count in navbar
          window.dispatchEvent(new Event('cartUpdated'));
        } else if (res.status === 400 && data.message === 'Already in your cart') {
          // Property is already in cart, just update UI
          setIsInCart(true);
        } else {
          console.error("Failed to add to cart:", data.message);
        }
      }
    } catch (err) {
      console.error("Cart action failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/properties/${property._id || property.id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
        <div className="relative h-48">
          <Image 
            src={property.images[0]} 
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
            {property.type}
          </div>
          <button
            onClick={toggleCart}
            disabled={loading}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all cursor-pointer ${
              isInCart 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isInCart ? "Remove from cart" : "Add to cart"}
          >
            <Heart className={`w-5 h-5 ${isInCart ? 'fill-current' : ''}`} />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{property.title}</h3>
          <p className="text-gray-600 mb-4">{property.location}</p>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>{property.bedrooms} Beds</span>
            <span>{property.bathrooms} Baths</span>
            <span>{property.area}</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{property.price}</p>
        </div>
      </div>
    </Link>
  );
}