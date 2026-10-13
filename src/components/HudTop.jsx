import React from 'react';

export function HudTop({
  isIdle,
  displayMode,
  activeSound,
  idleTimeoutLabel,
  cycleIdleTimeout,
  toggleFullscreen
}) {
  const getModeLabel = () => {
    switch (displayMode) {
      case 'blend': return 'Combined Blend';
      case 'clock': return 'Clock Focus';
      case 'wallpaper': return 'Art Canvas';
      case 'timer': return 'Focus Pomodoro';
      default: return 'Screensaver';
    }
  };

  return (
    <div
      className={`absolute top-16 sm:top-24 md:top-28 left-0 right-0 z-30 flex items-center justify-between px-3 sm:px-6 md:px-12 pointer-events-auto hud-transition ${
        isIdle ? 'hud-top-hidden' : 'opacity-100'
      }`}
      id="hud-top"
    >
      {/* HUD Telemetry Pill */}
      <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 rounded-full bg-[#12141a]/70 backdrop-blur-2xl border border-white/10 shadow-lg select-none max-w-[60%] sm:max-w-none overflow-hidden">
        <span className="inline-block w-2 h-2 rounded-full bg-[#38e1ff] animate-ping shrink-0" />
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#b0b8c2] font-medium truncate">
          {getModeLabel()}
        </span>
        <span className="text-white/20 shrink-0">•</span>
        <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#38e1ff] font-medium truncate">
          {activeSound ? (
            <>
              {/* Mini equalizer bars */}
              <div className="flex items-end gap-0.5 h-3 shrink-0">
                <span className="w-0.5 bg-[#38e1ff] rounded-full eq-bar-1" />
                <span className="w-0.5 bg-[#38e1ff] rounded-full eq-bar-2" />
                <span className="w-0.5 bg-[#38e1ff] rounded-full eq-bar-3" />
              </div>
              <span className="truncate">{activeSound}</span>
            </>
          ) : (
            <span>Silence</span>
          )}
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Auto-Idle Timeout Toggle */}
        <button
          onClick={cycleIdleTimeout}
          title="Change idle auto-hide delay"
          className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-full bg-[#12141a]/75 hover:bg-[#1f222d] text-[#f1f2f6] backdrop-blur-2xl border border-white/10 transition-all shadow-md group text-xs sm:text-sm active:scale-95"
        >
          <span className="material-symbols-outlined text-[15px] sm:text-[17px] text-[#38e1ff] group-hover:scale-110 transition-transform">
            screen_lock_landscape
          </span>
          <span className="font-body text-[#b0b8c2] group-hover:text-[#f1f2f6] text-[11px] sm:text-xs">
            <span className="hidden sm:inline">Auto-Idle: </span>
            <span className="sm:hidden">Idle: </span>
            <span className="text-[#38e1ff] font-medium">{idleTimeoutLabel}</span>
          </span>
        </button>

        {/* Zen Immersion Fullscreen Button (Desktop & Tablet) */}
        <button
          onClick={toggleFullscreen}
          title="Toggle Zen Immersion Fullscreen (F)"
          className="hidden sm:flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#38e1ff] hover:bg-[#a6eeff] text-[#00232a] font-body font-semibold text-xs sm:text-sm transition-all shadow-[0_0_24px_rgba(56,225,255,0.4)] active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">fullscreen</span>
          <span>Zen Immersion</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-black/20 uppercase font-semibold">
            F
          </span>
        </button>
      </div>
    </div>
  );
}
