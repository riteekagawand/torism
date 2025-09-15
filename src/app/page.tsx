'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SDKChatBot from '@/components/SDKChatBot';
import TourCard from '@/components/TourCard';
import FAQItem from '@/components/FAQItem';
import BookingForm from '@/components/BookingForm';
import ConfigCheck from '@/components/ConfigCheck';
import { Tour, FAQ, BookingFormData } from '@/types';
import { MagnifyingGlassIcon, GlobeAltIcon, ShieldCheckIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [toursResponse, faqsResponse] = await Promise.all([
        fetch('/api/tours'),
        fetch('/api/faqs')
      ]);

      if (!toursResponse.ok || !faqsResponse.ok) {
        throw new Error('Failed to fetch data from Contentstack');
      }

      const toursData = await toursResponse.json();
      const faqsData = await faqsResponse.json();

      setTours(toursData.entries || []);
      setFaqs(faqsData.entries || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Show user-friendly error message
      alert('Failed to load data. Please check your Contentstack configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookTour = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = (data: BookingFormData) => {
    // Here you would typically send the booking data to your backend
    console.log('Booking submitted:', data);
    alert('Booking submitted successfully! We will contact you soon.');
    setIsBookingOpen(false);
    setSelectedTour(null);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

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
      <SDKChatBot 
           contentstackApiKey="blt354ba6a0b8b7e140"
           contentstackToken="cs7f1c6103726d54fe1978f31f"
           contentstackEnvironment="development"
           title="Travel Assistant"
           placeholder="Ask me about tours and travel..."
           position="bottom-right"
           theme="light"
         />
      {/* Configuration Check */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ConfigCheck />
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing
              <span className="block text-yellow-400">Destinations</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Book unforgettable tours and create memories that last a lifetime
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Explore Tours
              </button>
              <button
                onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">Experience the best in travel with our premium services</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GlobeAltIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Destinations</h3>
              <p className="text-gray-600">Explore amazing destinations around the world</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Your safety and security are our top priorities</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Guides</h3>
              <p className="text-gray-600">Professional guides with local expertise</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlassIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing with no hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section id="tours" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Tours</h2>
            <p className="text-xl text-gray-600">Discover our most popular travel experiences</p>
          </div>
          
          {tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.slice(0, 3).map((tour) => (
                <TourCard key={tour.uid} tour={tour} onBook={handleBookTour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No tours available at the moment.</p>
            </div>
          )}
          
          {tours.length > 3 && (
            <div className="text-center mt-8">
              <a
                href="/tours"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                View All Tours
              </a>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to common questions about our tours</p>
          </div>
          
          {faqs.length > 0 ? (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={faq.uid}
                  faq={faq}
                  isOpen={openFAQ === index}
                  onToggle={() => toggleFAQ(index)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No FAQs available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Book your dream tour today and create unforgettable memories
          </p>
          <button
            onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Book Now
          </button>
        </div>
      </section>

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