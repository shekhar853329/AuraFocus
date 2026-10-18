import React from 'react';

export function Header({
  isIdle,
  isFullscreen,
  toggleFullscreen,
  openPresets,
  openSettings,
  openShortcuts,
  openAbout,
  displayMode,
  setDisplayMode
}) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none p-2 sm:p-5 md:p-8 hud-transition ${
        isIdle ? 'hud-top-hidden' : 'opacity-100'
      }`}
    >
      <div className="h-12 sm:h-14 max-w-7xl mx-auto px-3 sm:px-6 rounded-full bg-[#12141a]/70 backdrop-blur-2xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex items-center justify-between pointer-events-auto">
        {/* Brand */}
        <div
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group"
          onClick={() => setDisplayMode('blend')}
          title="AuraFocus Living Canvas"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1b1f2b] flex items-center justify-center text-[#38e1ff] shadow-inner border border-white/10 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">blur_on</span>
          </div>
          <span className="font-display font-medium text-base sm:text-xl tracking-tight text-[#f1f2f6]">
            AuraFocus
          </span>
        </div>

        {/* Center Nav Pills */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-[#090b0f]/60 rounded-full border border-white/5">
          <button
            onClick={() => setDisplayMode('blend')}
            className={`font-body text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all ${
              displayMode === 'blend'
                ? 'bg-[#38e1ff] text-[#00232a] font-semibold shadow-[0_0_15px_rgba(56,225,255,0.35)]'
                : 'text-[#8b95a5] hover:text-[#f1f2f6]'
            }`}
          >
            Canvas
          </button>

          <button
            onClick={() => setDisplayMode('timer')}
            className={`font-body text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all ${
              displayMode === 'timer'
                ? 'bg-[#38e1ff] text-[#00232a] font-semibold shadow-[0_0_15px_rgba(56,225,255,0.35)]'
                : 'text-[#8b95a5] hover:text-[#f1f2f6]'
            }`}
          >
            Focus Timer
          </button>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* About & Guide (SEO/AEO/GEO Help) */}
          <button
            onClick={openAbout}
            aria-label="About AuraFocus and FAQ Guide"
            title="About & Guide / FAQ"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1b1f2b]/70 hover:bg-[#252b3b] text-[#b0b8c2] hover:text-[#f1f2f6] border border-white/10 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">info</span>
          </button>

          {/* Keyboard Shortcuts helper (Desktop only) */}
          <button
            onClick={openShortcuts}
            aria-label="Keyboard Shortcuts"
            title="Keyboard Shortcuts (Press ?)"
            className="hidden sm:flex w-9 h-9 rounded-full bg-[#1b1f2b]/70 hover:bg-[#252b3b] text-[#b0b8c2] hover:text-[#f1f2f6] border border-white/10 items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-[17px]">keyboard</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            title="Toggle Zen Fullscreen (F)"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1b1f2b]/70 hover:bg-[#252b3b] text-[#b0b8c2] hover:text-[#f1f2f6] border border-white/10 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
              {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
            </span>
          </button>

          {/* Settings Drawer Button */}
          <button
            onClick={openSettings}
            aria-label="Settings"
            title="Customization Settings"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1b1f2b]/70 hover:bg-[#252b3b] text-[#b0b8c2] hover:text-[#f1f2f6] border border-white/10 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">tune</span>
          </button>

          {/* Zen status avatar badge */}
          <div
            onClick={openPresets}
            className="cursor-pointer w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#38e1ff] flex items-center justify-center ml-0.5 sm:ml-1 shadow-[0_0_12px_rgba(56,225,255,0.4)]"
            title="Atmospheric Presets"
          >
            <span className="material-symbols-outlined text-[#00232a] text-[16px] sm:text-[18px] font-bold">
              auto_awesome
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
