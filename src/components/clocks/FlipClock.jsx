import React from 'react';

export function FlipClock({ time, settings }) {
  const hours = settings.is24Hour
    ? String(time.getHours()).padStart(2, '0')
    : String(time.getHours() % 12 || 12).padStart(2, '0');

  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  const renderFlapPair = (digits, label, accentColor = '#38e1ff') => (
    <div className="flex flex-col items-center">
      <div className="flex gap-1.5 sm:gap-2.5">
        {digits.split('').map((d, idx) => (
          <div
            key={idx}
            className="relative w-14 h-20 sm:w-20 sm:h-32 md:w-24 md:h-36 lg:w-28 lg:h-40 rounded-xl bg-[#0d0f16]/90 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden border border-white/10"
          >
            <span
              className="flip-digit-val select-none"
              style={{ color: accentColor, textShadow: `0 0 20px ${accentColor}40` }}
            >
              {d}
            </span>
            {/* Split Flap center hairline shadow */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/80 shadow-inner z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/30 pointer-events-none" />
          </div>
        ))}
      </div>
      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#8b95a5] mt-2 sm:mt-3 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6 select-none animate-fade-in">
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        {/* Hours */}
        {renderFlapPair(hours, 'Hours', '#38e1ff')}

        <span className="font-display text-2xl sm:text-4xl text-white/30 -mt-6 font-light">:</span>

        {/* Minutes */}
        {renderFlapPair(minutes, 'Minutes', '#f1f2f6')}

        {settings.showSeconds && (
          <>
            <span className="font-display text-2xl sm:text-4xl text-white/30 -mt-6 font-light">:</span>
            {/* Seconds */}
            {renderFlapPair(seconds, 'Seconds', '#a78bfa')}
          </>
        )}
      </div>

      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ffb347]" />
        <p className="font-mono text-[11px] uppercase tracking-widest text-[#ffe7ce] font-medium">
          Chronometer Mechanical Mode
        </p>
      </div>
    </div>
  );
}
