
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
            <stop offset="0%" stopColor="#819A91" />
            <stop offset="25%" stopColor="#A7C1A8" />
            <stop offset="50%" stopColor="#D1D8BE" />
            <stop offset="75%" stopColor="#819A91" />
            <stop offset="100%" stopColor="#A7C1A8" />
          </linearGradient>
          <radialGradient id="gemini-radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D1D8BE" />
            <stop offset="100%" stopColor="#819A91" />
          </radialGradient>
        </defs>
        
        {/* Gemini twin stars design */}
        <g transform="translate(2, 2)">
          {/* First star */}
          <path
            d="M6 1L7.5 4.5L11 6L7.5 7.5L6 11L4.5 7.5L1 6L4.5 4.5Z"
            fill="url(#gemini-gradient)"
            className="animate-pulse"
            style={{ animationDelay: '0s' }}
          />
          
          {/* Second star */}
          <path
            d="M14 9L15.5 12.5L19 14L15.5 15.5L14 19L12.5 15.5L9 14L12.5 12.5Z"
            fill="url(#gemini-radial)"
            className="animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
          
          {/* Connecting constellation lines */}
          <line
            x1="6"
            y1="6"
            x2="14"
            y2="14"
            stroke="#A7C1A8"
            strokeWidth="1"
            opacity="0.6"
            className="animate-pulse"
            style={{ animationDelay: '0.25s' }}
          />
          
          {/* Center glow */}
          <circle
            cx="10"
            cy="10"
            r="2"
            fill="#D1D8BE"
            opacity="0.8"
            className="animate-pulse"
            style={{ animationDelay: '0.75s' }}
          />
        </g>
      </svg>
    </div>
  );
};
