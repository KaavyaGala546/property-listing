// app/properties/page.js
"use client";
import { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import PropertyCard from '../components/properties/PropertyCard';
import PropertySearch from '../components/PropertySearch';
import { properties as localProperties } from '../data/properties';

export default function PropertiesPage() {
  const [properties, setProperties] = useState(localProperties);
  const [filteredProperties, setFilteredProperties] = useState(localProperties);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchResults = (results) => {
    if (results && results.length > 0) {
      setFilteredProperties(results);
      setIsSearching(true);
    } else if (isSearching) {
      // If search returned empty, show no results
      setFilteredProperties([]);
    }
  };

  const handleClearSearch = () => {
    setFilteredProperties(localProperties);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 mt-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">Featured Properties</h1>
          <p className="text-xl text-gray-600 mb-8">
            DISCOVER HOMES TAILORED TO YOUR LIFESTYLE AND NEEDS
          </p>
        </div>

        {/* Search Component */}
        <div className="mb-8">
          <PropertySearch onResults={handleSearchResults} useLocalData={true} />
          {isSearching && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-gray-600">
                Found {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
              </p>
              <button
                onClick={handleClearSearch}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">No properties found matching your criteria</p>
            <button
              onClick={handleClearSearch}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Properties
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}