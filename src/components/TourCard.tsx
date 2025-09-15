'use client';

import { Tour, TourCardProps } from '@/types';
import { MapPinIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function TourCard({ tour, onBook }: TourCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-center">
          <h3 className="text-2xl font-bold mb-2">{tour.country}</h3>
          <p className="text-blue-100">Adventure Awaits</p>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">{tour.title}</h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {tour.description.replace(/<[^>]*>/g, '')}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <ClockIcon className="h-5 w-5 mr-1" />
            <span className="text-sm">{tour.duration}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-1" />
            <span className="text-sm">{tour.country}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-green-600">
            <CurrencyDollarIcon className="h-6 w-6 mr-1" />
            <span className="text-2xl font-bold">${tour.price}</span>
          </div>
        </div>
        
        <button
          onClick={() => onBook(tour)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
