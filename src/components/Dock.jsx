import React from 'react';
import { WALLPAPERS } from '../data/wallpapers';
import { SOUNDSCAPES } from '../data/soundscapes';

export function Dock({
  isIdle,
  displayMode,
  setDisplayMode,
  clockStyle,
  setClockStyle,
  dimPercent,
  setDimPercent,
  currentBg,
  setCurrentBg,
  activeSound,
  toggleSound,
  isMuted,
  toggleMute,
  volume,
  setVolume,
  dockExpanded,
  setDockExpanded
}) {
  const currentWp = WALLPAPERS.find((w) => w.id === currentBg);
  const activeSoundObj = SOUNDSCAPES.find((s) => s.id === activeSound);

  return (
    <aside
      className={`fixed bottom-12 sm:bottom-16 left-0 right-0 z-40 px-2 sm:px-6 md:px-12 pointer-events-none hud-transition ${
        isIdle ? 'hud-hidden' : 'opacity-100'
      }`}
      id="floating-customizer-dock"
    >
      <div className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl control-hub-card p-2.5 sm:p-5 md:p-6 pointer-events-auto">
        {/* Dock Header Bar with Collapse Button */}
        <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-white/10">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="material-symbols-outlined text-[#38e1ff] text-[16px] sm:text-[18px]">
              tune
            </span>
            <span className="font-display text-[11px] sm:text-sm uppercase tracking-wider text-[#f1f2f6] font-medium">
              Atmospheric Control Hub
            </span>
          </div>

          <button
            onClick={() => setDockExpanded(!dockExpanded)}
            className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-[#8b95a5] hover:text-[#38e1ff] transition-colors"
          >
            <span>{dockExpanded ? 'Compact' : 'Expand'}</span>
            <span className="material-symbols-outlined text-[15px] sm:text-[16px]">
              {dockExpanded ? 'expand_more' : 'expand_less'}
            </span>
          </button>
        </div>

        {/* Top Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 pt-2 sm:pt-3">
          {/* 1. Mode Segmented Switcher */}
          <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 control-hub-subpill rounded-full overflow-x-auto no-scrollbar max-w-full">
            {[
              { id: 'blend', short: 'Blend', full: 'Blend Mode' },
              { id: 'clock', short: 'Clock', full: 'Clock Focus' },
              { id: 'wallpaper', short: 'Art', full: 'Art Canvas' },
              { id: 'timer', short: 'Timer', full: 'Pomodoro' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setDisplayMode(m.id)}
                className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full font-body text-[11px] sm:text-sm transition-all whitespace-nowrap ${
                  displayMode === m.id
                    ? 'bg-[#38e1ff] text-[#00232a] font-semibold shadow-md'
                    : 'text-[#8b95a5] hover:text-[#f1f2f6]'
                }`}
              >
                <span className="sm:hidden">{m.short}</span>
                <span className="hidden sm:inline">{m.full}</span>
              </button>
            ))}
          </div>

          {/* 2. Clock Style Switcher (only relevant when not in pure wallpaper mode) */}
          {displayMode !== 'wallpaper' && (
            <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 control-hub-subpill rounded-full overflow-x-auto no-scrollbar">
              {[
                { id: 'digital', label: 'Digital' },
                { id: 'flip', label: 'Flip Clock' },
                { id: 'analog', label: 'Zen Dial' },
                { id: 'words', label: 'Verbal' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setClockStyle(style.id)}
                  className={`px-2 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-body text-[11px] sm:text-sm transition-all whitespace-nowrap ${
                    clockStyle === style.id
                      ? 'bg-[#292c34] text-[#38e1ff] font-medium border border-white/10'
                      : 'text-[#8b95a5] hover:text-[#f1f2f6]'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          )}

          {/* 3. Backdrop Dimming Intensity Slider */}
          <div className="flex items-center gap-1.5 sm:gap-2 control-hub-subpill px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
            <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#8b95a5]">opacity</span>
            <span className="font-mono text-[11px] uppercase text-[#8b95a5] hidden sm:inline">Dim</span>
            <input
              type="range"
              min="0"
              max="90"
              value={dimPercent}
              onChange={(e) => setDimPercent(Number(e.target.value))}
              className="w-14 sm:w-24 accent-[#38e1ff] cursor-pointer h-1.5 rounded-lg bg-[#292c34]"
            />
            <span className="font-mono text-[11px] sm:text-xs text-[#38e1ff] w-7 sm:w-8 text-right font-medium">
              {dimPercent}%
            </span>
          </div>
        </div>

        {/* Expandable Content: Row 1 Sceneries, Row 2 Ambient Audio */}
        {dockExpanded && (
          <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto no-scrollbar pt-3 sm:pt-4 mt-2 sm:mt-3 border-t border-white/10 flex flex-col gap-3.5 sm:gap-4">
            {/* ROW 1: Atmospheric Sceneries */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="material-symbols-outlined text-[#38e1ff] text-[15px] sm:text-[16px]">
                    landscape
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#8b95a5] font-semibold">
                    Atmospheric Sceneries
                  </span>
                  {currentWp && (
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#38e1ff]/10 text-[#38e1ff] border border-[#38e1ff]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38e1ff] animate-pulse" />
                      {currentWp.title}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[11px] sm:text-xs text-[#8b95a5]">
                  <span className="text-[#38e1ff] font-medium">{WALLPAPERS.length}</span> Ultra HD Canvases
                </span>
              </div>

              {/* Sceneries 6-Column Grid Row */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
                {WALLPAPERS.map((wp) => {
                  const isActive = currentBg === wp.id;
                  return (
                    <button
                      key={wp.id}
                      onClick={() => setCurrentBg(wp.id)}
                      className={`relative h-16 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden group transition-all text-left ${
                        isActive
                          ? 'ring-2 ring-[#38e1ff] shadow-[0_0_15px_rgba(56,225,255,0.4)] opacity-100 scale-[1.02]'
                          : 'opacity-70 hover:opacity-100 hover:scale-[1.01]'
                      }`}
                    >
                      {/* Background Thumbnail Image or Gradient */}
                      {wp.thumbUrl ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundImage: `url(${wp.thumbUrl})` }}
                        />
                      ) : (
                        <div
                          className="absolute inset-0 transition-transform duration-300 group-hover:scale-110"
                          style={{ background: wp.fallbackGrad }}
                        />
                      )}
                      {/* Dark gradient overlay for title legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/90 via-[#08090c]/30 to-transparent" />

                      {isActive && (
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#38e1ff] shadow-[0_0_6px_#38e1ff]" />
                      )}

                      <span className="absolute bottom-1.5 inset-x-0 text-center font-mono text-[9px] sm:text-[11px] tracking-tight text-[#f1f2f6] truncate px-1.5 font-medium">
                        {wp.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ROW 2: Ambient Audio */}
            <div className="flex flex-col gap-2 pt-3 sm:pt-3.5 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="material-symbols-outlined text-[#38e1ff] text-[15px] sm:text-[16px]">
                    graphic_eq
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#8b95a5] font-semibold">
                    Ambient Audio
                  </span>
                  {activeSound && !isMuted && (
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#38e1ff]/10 text-[#38e1ff] border border-[#38e1ff]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38e1ff] animate-pulse" />
                      Playing: {activeSoundObj?.name || activeSound}
                    </span>
                  )}
                </div>

                {/* Audio Master Controls: Mute + Volume */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={toggleMute}
                    className={`flex items-center gap-1 font-mono text-[11px] sm:text-xs transition-colors ${
                      isMuted ? 'text-[#ff6b8b] hover:text-[#ff8ca5]' : 'text-[#38e1ff] hover:text-[#7ae8ff]'
                    }`}
                    title={isMuted ? 'Unmute soundscape' : 'Mute soundscape'}
                  >
                    <span className="material-symbols-outlined text-[14px] sm:text-[15px]">
                      {isMuted ? 'volume_off' : 'volume_up'}
                    </span>
                    <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                  </button>

                  <div className="flex items-center gap-1.5 control-hub-subpill px-2.5 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[13px] sm:text-[14px] text-[#8b95a5]">
                      {volume === 0 || isMuted ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-16 sm:w-24 accent-[#38e1ff] cursor-pointer h-1.5 rounded-lg bg-[#292c34]"
                      aria-label="Audio Volume"
                    />
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#38e1ff] w-6 sm:w-7 text-right">
                      {Math.round((isMuted ? 0 : volume) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Soundscape Chips Row (5 items) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2">
                {SOUNDSCAPES.map((snd) => {
                  const isPlaying = activeSound === snd.id && !isMuted;
                  return (
                    <button
                      key={snd.id}
                      onClick={() => toggleSound(snd.id)}
                      className={`flex items-center justify-between gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl transition-all text-left ${
                        isPlaying
                          ? 'control-hub-sound-chip-active'
                          : 'control-hub-sound-chip'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <span
                          className="material-symbols-outlined text-[15px] sm:text-[16px] shrink-0"
                          style={{ color: snd.color }}
                        >
                          {snd.icon}
                        </span>
                        <span className="font-body text-[10px] sm:text-[11px] text-[#f1f2f6] truncate font-medium">
                          {snd.name}
                        </span>
                      </div>
                      {isPlaying ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38e1ff] animate-ping shrink-0" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
