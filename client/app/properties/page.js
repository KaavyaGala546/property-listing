// app/properties/page.js
"use client";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import PropertyCard from '../components/properties/PropertyCard';
import PropertySearch from '../components/PropertySearch';
import { properties as localProperties } from '../data/properties';

const ITEMS_PER_PAGE = 10; // Changed from 9 to 10 properties per page

export default function PropertiesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';
  const locationQuery = searchParams.get('location') || '';
  const typeQuery = searchParams.get('type') || '';
  const bedroomsQuery = searchParams.get('bedrooms') || '';
  const minPriceQuery = searchParams.get('minPrice') || '';
  const maxPriceQuery = searchParams.get('maxPrice') || '';

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 20,
    limit: ITEMS_PER_PAGE
  });

  // Fetch properties with pagination and filters
  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: pagination.page,
        limit: ITEMS_PER_PAGE,
        ...(searchQuery && { search: searchQuery }),
        ...(locationQuery && { location: locationQuery }),
        ...(typeQuery && { type: typeQuery }),
        ...(bedroomsQuery && { bedrooms: bedroomsQuery }),
        ...(minPriceQuery && { minPrice: minPriceQuery }),
        ...(maxPriceQuery && { maxPrice: maxPriceQuery })
      });
      setPagination({
        ...pagination,
        page: page
      })

      const response = await fetch(`/api/properties?${params.toString()}`);
      const data = await response.json();
      
      if (data.properties) {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
        setPagination({
          page: data.page,
          total: data.total,
          totalPages: data.totalPages,
          limit: data.limit
        });
      } else {
        // Fallback to local data if API fails
        setProperties(localProperties.slice(pagination.page*pagination.limit, pagination.page*pagination.limit + pagination.limit));
        setFilteredProperties(localProperties.slice(pagination.page*pagination.limit, pagination.page*pagination.limit + pagination.limit));
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Fallback to local data
      setProperties(localProperties.slice(pagination.page*pagination.limit, pagination.page*pagination.limit + pagination.limit));
      setFilteredProperties(localProperties.slice(pagination.page*pagination.limit, pagination.page*pagination.limit + pagination.limit));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page, searchQuery, locationQuery, typeQuery, bedroomsQuery, minPriceQuery, maxPriceQuery]);

  const handleSearchResults = (results, filters = {}) => {
    // Update URL with search parameters
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.location) params.set('location', filters.location);
    if (filters.type) params.set('type', filters.type);
    if (filters.bedrooms) params.set('bedrooms', filters.bedrooms);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    
    // Reset to first page on new search
    params.set('page', '1');
    
    router.push(`/properties?${params.toString()}`);
    setIsSearching(!!filters.search || !!filters.location || !!filters.type || !!filters.bedrooms || !!filters.minPrice || !!filters.maxPrice);
  };

  const handleClearSearch = () => {
    // Reset all search parameters and go to first page
    router.push('/properties?page=1');
    setIsSearching(false);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage);
    router.push(`/properties?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <PropertySearch 
            onResults={handleSearchResults} 
            useLocalData={false} 
            initialValues={{
              search: searchQuery,
              location: locationQuery,
              type: typeQuery,
              bedrooms: bedroomsQuery,
              minPrice: minPriceQuery,
              maxPrice: maxPriceQuery
            }}
          />
          {(isSearching || searchQuery || locationQuery || typeQuery || bedroomsQuery || minPriceQuery || maxPriceQuery) && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-gray-600">
                {isLoading ? 'Loading...' : `Found ${pagination.total} ${pagination.total === 1 ? 'property' : 'properties'}`}
              </p>
              <button
                onClick={handleClearSearch}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id || property._id} property={property} />
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

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8 mb-12">
                <nav className="flex items-center space-x-2" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`px-4 py-2 rounded-md ${pagination.page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    // Show first page, last page, current page, and pages around current page
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.page <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.page >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-md ${
                          pagination.page === pageNum 
                            ? 'bg-blue-600 text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {pagination.totalPages > 5 && pagination.page < pagination.totalPages - 2 && (
                    <span className="px-2">...</span>
                  )}
                  
                  {pagination.totalPages > 5 && pagination.page < pagination.totalPages - 2 && (
                    <button
                      onClick={() => handlePageChange(pagination.totalPages)}
                      className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      {pagination.totalPages}
                    </button>
                  )}
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className={`px-4 py-2 rounded-md ${pagination.page === pagination.totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
}