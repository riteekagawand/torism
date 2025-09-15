'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQItem from '@/components/FAQItem';
import { FAQ } from '@/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFAQs();
  }, []);

  useEffect(() => {
    filterFAQs();
  }, [faqs, searchTerm]);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faqs');
      const data = await response.json();
      setFaqs(data.entries || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterFAQs = () => {
    if (!searchTerm) {
      setFilteredFaqs(faqs);
      return;
    }

    const filtered = faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answers.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredFaqs(filtered);
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about our tours and services</p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="mb-6">
            <p className="text-gray-600 text-center">
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} found for "{searchTerm}"
            </p>
          </div>
        )}

        {/* FAQ List */}
        {filteredFaqs.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {filteredFaqs.map((faq, index) => (
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
            <div className="bg-white rounded-lg shadow-lg p-8">
              <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No FAQs found' : 'No FAQs available'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? 'Try searching with different keywords'
                  : 'Check back later for frequently asked questions'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 bg-blue-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-blue-100 mb-6">
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@travelbooking.com"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Email Support
            </a>
            <a
              href="tel:+15551234567"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
