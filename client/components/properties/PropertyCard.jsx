// app/components/properties/PropertyCard.jsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

import { api } from '../../services/api';

export default function PropertyCard({ property, inCart = false, onCartChange }) {
  const [isInCart, setIsInCart] = useState(inCart);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkCartStatus = async () => {
      try {
        const data = await api.checkInCart(property._id || property.id);
        if (data && typeof data.inCart === 'boolean') {
          setIsInCart(data.inCart);
        }
      } catch (err) {
        console.error('Failed to check cart status', err);
      }
    };

    checkCartStatus();
  }, [property._id, property.id]);

  const toggleCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      window.location.href = '/auth?next=/properties';
      return;
    }

    setLoading(true);
    try {
      if (isInCart) {
        const res = await api.removeFromCart(property._id || property.id);
        if (res && !res.message?.includes('error')) {
          setIsInCart(false);
          if (onCartChange) onCartChange(property, false);
          window.dispatchEvent(new Event('cartUpdated'));
        }
      } else {
        const data = await api.addToCart(property._id || property.id);

        if (data && !data.message?.includes('error')) {
          setIsInCart(true);
          if (onCartChange) onCartChange(property, true);
          window.dispatchEvent(new Event('cartUpdated'));
        } else if (data.message === 'Already in your cart') {
          setIsInCart(true);
        } else {
          console.error('Failed to add to cart:', data.message);
        }
      }
    } catch (err) {
      console.error('Cart action failed', err);
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
            title={isInCart ? 'Remove from cart' : 'Add to cart'}
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
