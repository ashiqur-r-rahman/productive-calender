
import React from 'react';

interface GeminiIconProps {
  size?: number;
  className?: string;
}

export const GeminiIcon: React.FC<GeminiIconProps> = ({ size = 24, className = "" }) => {
  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin-slow"
        style={{ animation: 'spin 8s linear infinite' }}
      >
        <defs>
          <linearGradient id="gemini-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="25%" stopColor="#EA4335" />
            <stop offset="50%" stopColor="#FBBC05" />
            <stop offset="75%" stopColor="#34A853" />
            <stop offset="100%" stopColor="#9C27B0" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L15.09 8.26L22 9L17 14.74L18.18 21.02L12 17.77L5.82 21.02L7 14.74L2 9L8.91 8.26L12 2Z"
          fill="url(#gemini-gradient)"
          className="animate-pulse"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          fill="white"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};
