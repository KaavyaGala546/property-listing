'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import PropertyCard from '../../components/properties/PropertyCard';
import { properties as defaultProperties } from '../../data/properties';

export default function PropertyListings({ searchResults }) {
  const [properties, setProperties] = useState(defaultProperties);

  useEffect(() => {
    if (searchResults) {
      setProperties(searchResults);
    } else {
      setProperties(defaultProperties);
    }
  }, [searchResults]);

  const displayedProperties = properties.slice(0, 6);

  return (
    <section id='properties' className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-md border border-1 inline px-4 py-2 rounded rounded-full font-bold mb-4">
                {searchResults ? `Search Results (${properties.length})` : 'Featured Properties'}
              </h2>
              <p className="text-lg text-gray-600 mt-8">
                DISCOVER HOMES TAILORED TO YOUR LIFESTYLE AND NEEDS
              </p>
            </div>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No properties found matching your criteria.</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters or browse all properties.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProperties.map((property) => (
              <PropertyCard key={property.id || property._id} property={property} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link 
            href="/properties" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}