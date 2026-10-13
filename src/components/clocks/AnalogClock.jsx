import React from 'react';

export function AnalogClock({ time }) {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secDeg = (seconds / 60) * 360;
  const minDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hrDeg = (hours / 12) * 360 + (minutes / 60) * 30;

  return (
    <div className="flex flex-col items-center select-none animate-fade-in">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-[#0a0c12]/60 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.85)] border border-white/10 flex items-center justify-center p-4">
        {/* Ambient Dial Rim Glow */}
        <div className="absolute inset-0 rounded-full border border-[#38e1ff]/20 pointer-events-none" />

        {/* 12, 03, 06, 09 Hour Numbers */}
        <div className="absolute inset-3 rounded-full flex items-center justify-center pointer-events-none">
          <span className="absolute top-3 font-mono text-xs sm:text-sm text-[#8b95a5] font-semibold">12</span>
          <span className="absolute right-4 font-mono text-xs sm:text-sm text-[#8b95a5] font-semibold">03</span>
          <span className="absolute bottom-3 font-mono text-xs sm:text-sm text-[#8b95a5] font-semibold">06</span>
          <span className="absolute left-4 font-mono text-xs sm:text-sm text-[#8b95a5] font-semibold">09</span>

          {/* Center Pivot Point */}
          <div className="w-3 h-3 rounded-full bg-[#38e1ff] z-40 shadow-[0_0_12px_rgba(56,225,255,0.8)] border-2 border-[#08090c]" />
        </div>

        {/* Hour Hand */}
        <div
          className="absolute w-1.5 sm:w-2 h-16 sm:h-24 md:h-28 bg-[#f1f2f6] rounded-full origin-bottom bottom-1/2 z-20 shadow-lg"
          style={{
            transform: `rotate(${hrDeg}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
          }}
        />

        {/* Minute Hand */}
        <div
          className="absolute w-1 sm:w-1.5 h-24 sm:h-32 md:h-36 bg-[#c2f3ff] rounded-full origin-bottom bottom-1/2 z-30 shadow-md"
          style={{
            transform: `rotate(${minDeg}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
          }}
        />

        {/* Second Hand with Cyan Glowing Tip */}
        <div
          className="absolute w-0.5 h-28 sm:h-36 md:h-42 bg-[#38e1ff] rounded-full origin-bottom bottom-1/2 z-35"
          style={{
            transform: `rotate(${secDeg}deg)`,
            transition: 'transform 0.15s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
            boxShadow: '0 0 10px rgba(56, 225, 255, 0.9)'
          }}
        />
      </div>

      <div className="mt-6 text-center">
        <p className="font-mono text-xs sm:text-sm tracking-widest text-[#8b95a5] uppercase">
          Zen Chronos Balance
        </p>
      </div>
    </div>
  );
}
