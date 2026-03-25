'use client';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import PropertyCard from '../properties/PropertyCard';
import { Sparkles } from 'lucide-react';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await api.getRecommendations();
        if (Array.isArray(data)) {
          setRecommendations(data);
        }
      } catch (err) {
        console.error('Failed to fetch recommendations', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading || recommendations.length === 0) return null;

  return (
    <section className="py-8 bg-blue-50/50 rounded-3xl px-6 mb-12 border border-blue-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-600 text-white rounded-lg">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
          <p className="text-sm text-gray-500">Based on your preferences and trending properties</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.slice(0, 3).map((property) => (
          <div key={property._id || property.id} className="relative group">
            <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
              SMART CHOICE
            </div>
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </section>
  );
}
