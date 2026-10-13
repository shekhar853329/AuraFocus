import React, { useState } from 'react';
import { MEDITATIVE_QUOTES } from '../../data/quotes';

export function DigitalClock({ time, settings }) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const cycleQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MEDITATIVE_QUOTES.length);
  };

  const hours = settings.is24Hour
    ? String(time.getHours()).padStart(2, '0')
    : String(time.getHours() % 12 || 12).padStart(2, '0');

  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

  const dateStr = time.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tzOffset = -time.getTimezoneOffset() / 60;
  const tzFormatted = `UTC${tzOffset >= 0 ? '+' : ''}${tzOffset}:00 • ${tzName.split('/')[1] || tzName}`;

  return (
    <div className="flex flex-col items-center select-none text-center px-4 animate-fade-in">
      {/* Hero Digits Row */}
      <div className="flex items-baseline justify-center gap-1 sm:gap-3 md:gap-4">
        <span
          className="clock-hero-digits"
          style={{ textShadow: '0 4px 40px rgba(0, 0, 0, 0.9), 0 0 20px rgba(194, 243, 255, 0.15)' }}
        >
          {hours}
        </span>

        <span
          className="clock-colon animate-pulse"
          style={{ textShadow: '0 0 24px rgba(56, 225, 255, 0.5)' }}
        >
          :
        </span>

        <span
          className="clock-hero-digits"
          style={{ textShadow: '0 4px 40px rgba(0, 0, 0, 0.9), 0 0 20px rgba(194, 243, 255, 0.15)' }}
        >
          {minutes}
        </span>

        {settings.showSeconds && (
          <span
            className="clock-seconds-digit self-start mt-2 sm:mt-4 ml-1"
            style={{ textShadow: '0 0 16px rgba(56, 225, 255, 0.4)' }}
          >
            {seconds}
          </span>
        )}

        {!settings.is24Hour && (
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#8b95a5] self-end mb-3 sm:mb-6 ml-2 font-medium">
            {ampm}
          </span>
        )}
      </div>

      {/* Date & System Telemetry */}
      {settings.showDate && (
        <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 text-[#b0b8c2]">
          <p className="font-display text-base sm:text-lg md:text-xl text-[#f1f2f6]/95 tracking-wide font-normal">
            {dateStr}
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-[#38e1ff]/70" />
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#38e1ff] font-medium">
            {tzFormatted}
          </p>
        </div>
      )}

      {/* Ambient Contemplative Quote */}
      {settings.showQuote && (
        <div
          onClick={cycleQuote}
          title="Click to cycle quote"
          className="group cursor-pointer mt-5 sm:mt-8 px-4 py-2 rounded-2xl hover:bg-white/[0.04] transition-all max-w-xl text-center"
        >
          <p
            className="font-body text-sm sm:text-base md:text-lg text-[#b0b8c2]/80 italic leading-relaxed font-light"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
          >
            {MEDITATIVE_QUOTES[quoteIndex]}
          </p>
          <span className="font-mono text-[10px] text-[#4e5868] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity mt-1 inline-block">
            Cycle Quote ↻
          </span>
        </div>
      )}
    </div>
  );
}
