import React from 'react';
import { DigitalClock } from './clocks/DigitalClock';
import { FlipClock } from './clocks/FlipClock';
import { AnalogClock } from './clocks/AnalogClock';
import { WordsClock } from './clocks/WordsClock';
import { FocusTimer } from './clocks/FocusTimer';

export function ClockStage({
  time,
  clockStyle,
  displayMode,
  settings
}) {
  const isHidden = displayMode === 'wallpaper';

  return (
    <div
      className={`relative z-20 flex flex-col items-center justify-center text-center transition-all duration-700 ease-out max-w-5xl px-4 ${
        isHidden ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      id="clock-display-stage"
    >
      {displayMode === 'timer' ? (
        <FocusTimer />
      ) : (
        <>
          {clockStyle === 'digital' && <DigitalClock time={time} settings={settings} />}
          {clockStyle === 'flip' && <FlipClock time={time} settings={settings} />}
          {clockStyle === 'analog' && <AnalogClock time={time} />}
          {clockStyle === 'words' && <WordsClock time={time} />}
        </>
      )}
    </div>
  );
}
