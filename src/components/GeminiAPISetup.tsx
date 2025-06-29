
import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';

interface GeminiAPISetupProps {
  onApiKeySet: (apiKey: string) => void;
}

export const GeminiAPISetup: React.FC<GeminiAPISetupProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      onApiKeySet(apiKey.trim());
      setIsValid(true);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-[#EEEFE0] to-[#D1D8BE] rounded-lg border border-[#819A91]">
      <div className="flex items-center gap-2 mb-3">
        <Key size={20} className="text-[#819A91]" />
        <h3 className="font-medium text-[#819A91]">Setup Gemini API</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        To enable AI features, please enter your Gemini API key. You can get one from{' '}
        <a 
          href="https://makersuite.google.com/app/apikey" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#819A91] underline hover:text-[#A7C1A8]"
        >
          Google AI Studio
        </a>
      </p>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type={showApiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key..."
            className="w-full p-2 border border-[#D1D8BE] rounded focus:outline-none focus:ring-2 focus:ring-[#A7C1A8] pr-10"
          />
          <button
            onClick={() => setShowApiKey(!showApiKey)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#819A91]"
          >
            {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!apiKey.trim()}
          className="px-4 py-2 bg-[#819A91] text-white rounded hover:bg-[#A7C1A8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save
        </button>
      </div>
      
      {isValid && (
        <p className="text-sm text-green-600 mt-2">✓ API key saved successfully!</p>
      )}
    </div>
  );
};
