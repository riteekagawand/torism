'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TourCard from '@/components/TourCard';
import BookingForm from '@/components/BookingForm';
import { Tour, BookingFormData } from '@/types';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    filterTours();
  }, [tours, searchTerm, selectedCountry, priceRange, sortBy]);

  const fetchTours = async () => {
    try {
      const response = await fetch('/api/tours');
      const data = await response.json();
      setTours(data.entries || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTours = () => {
    let filtered = [...tours];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Country filter
    if (selectedCountry) {
      filtered = filtered.filter(tour => tour.country === selectedCountry);
    }

    // Price range filter
    filtered = filtered.filter(tour => 
      tour.price >= priceRange.min && tour.price <= priceRange.max
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'country':
          return a.country.localeCompare(b.country);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredTours(filtered);
  };

  const handleBookTour = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = (data: BookingFormData) => {
    console.log('Booking submitted:', data);
    alert('Booking submitted successfully! We will contact you soon.');
    setIsBookingOpen(false);
    setSelectedTour(null);
  };

  const countries = [...new Set(tours.map(tour => tour.country))];
  const maxPrice = Math.max(...tours.map(tour => tour.price), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Tours</h1>
          <p className="text-xl text-gray-600">Discover amazing destinations around the world</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Country Filter */}
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min Price"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max Price"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || maxPrice }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="title">Sort by Title</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration</option>
              <option value="country">Country</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredTours.length} of {tours.length} tours
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCountry('');
              setPriceRange({ min: 0, max: maxPrice });
              setSortBy('title');
            }}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FunnelIcon className="h-4 w-4 mr-1" />
            Clear Filters
          </button>
        </div>

        {/* Tours Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <TourCard key={tour.uid} tour={tour} onBook={handleBookTour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCountry('');
                  setPriceRange({ min: 0, max: maxPrice });
                  setSortBy('title');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* Booking Modal */}
      {isBookingOpen && selectedTour && (
        <BookingForm
          tour={selectedTour}
          onSubmit={handleBookingSubmit}
          isLoading={false}
        />
      )}
    </div>
  );
}
