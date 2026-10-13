import React from 'react';

export function Header({
  isIdle,
  isFullscreen,
  toggleFullscreen,
  openPresets,
  openSettings,
  openShortcuts,
  displayMode,
  setDisplayMode
}) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none p-3 sm:p-5 md:p-8 hud-transition ${
        isIdle ? 'hud-top-hidden' : 'opacity-100'
      }`}
    >
      <div className="h-14 max-w-7xl mx-auto px-4 sm:px-6 rounded-full bg-[#12141a]/70 backdrop-blur-2xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] flex items-center justify-between pointer-events-auto">
        {/* Brand */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          onClick={() => setDisplayMode('blend')}
          title="AuraFocus Living Canvas"
        >
          <div className="w-8 h-8 rounded-full bg-[#1b1f2b] flex items-center justify-center text-[#38e1ff] shadow-inner border border-white/10 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[18px]">blur_on</span>
          </div>
          <span className="font-display font-medium text-lg sm:text-xl tracking-tight text-[#f1f2f6]">
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
            onClick={openPresets}
            className="font-body text-xs sm:text-sm font-medium text-[#8b95a5] hover:text-[#f1f2f6] px-3.5 py-1.5 rounded-full hover:bg-white/[0.04] transition-all"
          >
            Presets
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

          <button
            onClick={openSettings}
            className="font-body text-xs sm:text-sm font-medium text-[#8b95a5] hover:text-[#f1f2f6] px-3.5 py-1.5 rounded-full hover:bg-white/[0.04] transition-all"
          >
            Settings
          </button>
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Keyboard Shortcuts helper */}
          <button
            onClick={openShortcuts}
            aria-label="Keyboard Shortcuts"
            title="Keyboard Shortcuts (Press ?)"
            className="w-9 h-9 rounded-full bg-[#1b1f2b]/70 hover:bg-[#252b3b] text-[#b0b8c2] hover:text-[#f1f2f6] border border-white/10 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-[17px]">keyboard</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            title="Toggle Zen Fullscreen (F)"
            className="w-9 h-9 rounded-full bg-[#1b1f2b]/70 hover:bg-[#252b3b] text-[#b0b8c2] hover:text-[#f1f2f6] border border-white/10 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
            </span>
          </button>

          {/* Settings Drawer Button */}
          <button
            onClick={openSettings}
            aria-label="Settings"
            title="Customization Settings"
            className="w-9 h-9 rounded-full bg-[#1b1f2b]/70 hover:bg-[#252b3b] text-[#b0b8c2] hover:text-[#f1f2f6] border border-white/10 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>

          {/* Zen status avatar badge */}
          <div
            onClick={openPresets}
            className="cursor-pointer w-8 h-8 rounded-full bg-[#38e1ff] flex items-center justify-center ml-1 shadow-[0_0_12px_rgba(56,225,255,0.4)]"
            title="Atmospheric Presets"
          >
            <span className="material-symbols-outlined text-[#00232a] text-[18px] font-bold">
              auto_awesome
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
