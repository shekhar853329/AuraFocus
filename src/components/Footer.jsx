import React from 'react';

export function Footer({
  isIdle,
  toggleFullscreen,
  isFullscreen,
  cycleClockStyle,
  cycleWallpaper,
  toggleDockExpanded,
  dockExpanded
}) {
  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-3 sm:pb-5 px-4 hud-transition ${
        isIdle ? 'hud-hidden' : 'opacity-100'
      }`}
    >
      <div className="max-w-fit mx-auto px-4 py-1.5 rounded-full bg-[#12141a]/80 backdrop-blur-2xl border border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex items-center gap-3 sm:gap-4 pointer-events-auto select-none">
        {/* Toggle Customizer Drawer */}
        <button
          onClick={toggleDockExpanded}
          aria-label="Toggle Customizer Dock"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[#8b95a5] hover:bg-white/[0.06] hover:text-[#f1f2f6] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">
            {dockExpanded ? 'vertical_align_bottom' : 'tune'}
          </span>
          <span className="font-body text-xs hidden sm:inline">
            {dockExpanded ? 'Hide Dock' : 'Customize'}
          </span>
        </button>

        <div className="w-[1px] h-4 bg-white/10" />

        {/* Canvases Cycle */}
        <button
          onClick={cycleWallpaper}
          aria-label="Next Canvas Scenery"
          title="Cycle Scenery Wallpaper (B)"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[#8b95a5] hover:bg-white/[0.06] hover:text-[#f1f2f6] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">wallpaper</span>
          <span className="font-body text-xs hidden sm:inline">Next Canvas</span>
        </button>

        <div className="w-[1px] h-4 bg-white/10" />

        {/* Clock Style Cycle */}
        <button
          onClick={cycleClockStyle}
          aria-label="Cycle Clock Style"
          title="Cycle Clock Style (C)"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[#8b95a5] hover:bg-white/[0.06] hover:text-[#f1f2f6] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">schedule</span>
          <span className="font-body text-xs hidden sm:inline">Clock Style</span>
        </button>

        <div className="w-[1px] h-4 bg-white/10" />

        {/* Maximize Zen Immersion */}
        <button
          onClick={toggleFullscreen}
          aria-label="Toggle Fullscreen"
          title="Toggle Zen Immersion Fullscreen (F)"
          className="w-7 h-7 rounded-full bg-[#1b1f2b] hover:bg-[#38e1ff] text-[#38e1ff] hover:text-[#00232a] flex items-center justify-center transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isFullscreen ? 'fullscreen_exit' : 'fit_screen'}
          </span>
        </button>
      </div>
    </footer>
  );
}
