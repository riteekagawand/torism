'use client';

import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ConfigCheck() {
  const [configStatus, setConfigStatus] = useState<'checking' | 'configured' | 'missing'>('checking');

  useEffect(() => {
    checkConfiguration();
  }, []);

  const checkConfiguration = async () => {
    try {
      const response = await fetch('/api/tours');
      if (response.ok) {
        setConfigStatus('configured');
      } else {
        setConfigStatus('missing');
      }
    } catch (error) {
      setConfigStatus('missing');
    }
  };

  if (configStatus === 'checking') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600 mr-3"></div>
          <p className="text-yellow-800">Checking Contentstack configuration...</p>
        </div>
      </div>
    );
  }

  if (configStatus === 'missing') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <div className="flex items-start">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Contentstack Configuration Required
            </h3>
            <p className="text-red-700 mb-4">
              Please configure your Contentstack credentials to load data.
            </p>
            <div className="bg-red-100 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-red-800 mb-2">Required Environment Variables:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• <code className="bg-red-200 px-1 rounded">CONTENTSTACK_API_KEY</code></li>
                <li>• <code className="bg-red-200 px-1 rounded">CONTENTSTACK_DELIVERY_TOKEN</code></li>
                <li>• <code className="bg-red-200 px-1 rounded">CONTENTSTACK_ENVIRONMENT</code></li>
                <li>• <code className="bg-red-200 px-1 rounded">CONTENTSTACK_REGION</code> (optional, defaults to 'us')</li>
              </ul>
            </div>
            <div className="bg-red-100 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Setup Steps:</h4>
              <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
                <li>Create a <code className="bg-red-200 px-1 rounded">.env.local</code> file in the project root</li>
                <li>Add your Contentstack credentials to the file</li>
                <li>Restart the development server</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
        <p className="text-green-800 font-medium">
          Contentstack configuration verified! Data is loading from your CMS.
        </p>
      </div>
    </div>
  );
}
