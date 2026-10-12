import React from 'react';

export default function Gauge({ score = 88, max = 100, label = 'Good Standing', scanning = false }) {
  const radius = 85;
  const arcLength = Math.PI * radius;
  const percentage = Math.min(score / max, 1);
  const dashOffset = scanning ? arcLength : arcLength * (1 - percentage);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[280px]">
        <svg viewBox="0 0 200 118" className="w-full">
          <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="#dfe6ef" strokeWidth="14" strokeLinecap="round" />
          <path
            d="M 15 100 A 85 85 0 0 1 185 100"
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-out"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,177,252,0.25))' }}
          />
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00b1fc" />
              <stop offset="100%" stopColor="#4caf50" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center">
          <span className="text-6xl text-[#1a2b45] leading-none" style={{ fontFamily: "'Staatliches', cursive" }}>
            {scanning ? '··' : score}
          </span>
          <span className="text-sm text-slate-400 -mt-0.5">/ {max}</span>
        </div>
      </div>
      <span
        className="mt-3 px-5 py-1.5 rounded-full text-sm font-bold"
        style={{ backgroundColor: 'rgba(76,175,80,0.14)', color: '#3d9140' }}
      >
        {label}
      </span>
    </div>
  );
}
