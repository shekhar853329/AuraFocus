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
  return (
    <aside
      className={`fixed bottom-14 sm:bottom-16 left-0 right-0 z-40 px-3 sm:px-6 md:px-12 pointer-events-none hud-transition ${
        isIdle ? 'hud-hidden' : 'opacity-100'
      }`}
      id="floating-customizer-dock"
    >
      <div className="max-w-5xl mx-auto rounded-3xl bg-[#12141a]/85 backdrop-blur-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.75)] p-3.5 sm:p-5 md:p-6 pointer-events-auto">
        {/* Dock Header Bar with Collapse Button */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#38e1ff] text-[18px]">
              tune
            </span>
            <span className="font-display text-xs sm:text-sm uppercase tracking-wider text-[#f1f2f6] font-medium">
              Atmospheric Control Hub
            </span>
          </div>

          <button
            onClick={() => setDockExpanded(!dockExpanded)}
            className="flex items-center gap-1 font-mono text-[11px] text-[#8b95a5] hover:text-[#38e1ff] transition-colors"
          >
            <span>{dockExpanded ? 'Compact View' : 'Expand View'}</span>
            <span className="material-symbols-outlined text-[16px]">
              {dockExpanded ? 'expand_more' : 'expand_less'}
            </span>
          </button>
        </div>

        {/* Top Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
          {/* 1. Mode Segmented Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#090b0f]/80 rounded-full border border-white/5 overflow-x-auto max-w-full">
            {[
              { id: 'blend', label: 'Blend Mode' },
              { id: 'clock', label: 'Clock Focus' },
              { id: 'wallpaper', label: 'Art Canvas' },
              { id: 'timer', label: 'Pomodoro' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setDisplayMode(m.id)}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-body text-xs sm:text-sm transition-all whitespace-nowrap ${
                  displayMode === m.id
                    ? 'bg-[#38e1ff] text-[#00232a] font-semibold shadow-md'
                    : 'text-[#8b95a5] hover:text-[#f1f2f6]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* 2. Clock Style Switcher (only relevant when not in pure wallpaper mode) */}
          {displayMode !== 'wallpaper' && (
            <div className="flex items-center gap-1 p-1 bg-[#090b0f]/80 rounded-full border border-white/5 overflow-x-auto">
              {[
                { id: 'digital', label: 'Digital' },
                { id: 'flip', label: 'Flip Clock' },
                { id: 'analog', label: 'Zen Dial' },
                { id: 'words', label: 'Verbal' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setClockStyle(style.id)}
                  className={`px-2.5 sm:px-3.5 py-1.5 rounded-full font-body text-xs sm:text-sm transition-all whitespace-nowrap ${
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
          <div className="flex items-center gap-2 bg-[#090b0f]/70 px-3 py-1.5 rounded-full border border-white/5">
            <span className="material-symbols-outlined text-[16px] text-[#8b95a5]">opacity</span>
            <span className="font-mono text-xs uppercase text-[#8b95a5] hidden sm:inline">Dim</span>
            <input
              type="range"
              min="0"
              max="90"
              value={dimPercent}
              onChange={(e) => setDimPercent(Number(e.target.value))}
              className="w-16 sm:w-24 accent-[#38e1ff] cursor-pointer h-1.5 rounded-lg bg-[#292c34]"
            />
            <span className="font-mono text-xs text-[#38e1ff] w-8 text-right font-medium">
              {dimPercent}%
            </span>
          </div>
        </div>

        {/* Expandable Bottom Row: Wallpaper Carousel & Soundscape Grid */}
        {dockExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 mt-3 border-t border-white/5 items-start">
            {/* Sceneries Thumbnails (Col 8) */}
            <div className="md:col-span-8 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#8b95a5] font-semibold">
                  Atmospheric Sceneries
                </span>
                <span className="font-mono text-xs text-[#38e1ff]">
                  {WALLPAPERS.length} Ultra HD Canvases
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {WALLPAPERS.map((wp) => {
                  const isActive = currentBg === wp.id;
                  return (
                    <button
                      key={wp.id}
                      onClick={() => setCurrentBg(wp.id)}
                      className={`relative h-16 sm:h-20 rounded-xl overflow-hidden group transition-all text-left ${
                        isActive
                          ? 'ring-2 ring-[#38e1ff] shadow-[0_0_15px_rgba(56,225,255,0.4)] opacity-100 scale-[1.02]'
                          : 'opacity-70 hover:opacity-100 hover:scale-[1.01]'
                      }`}
                    >
                      {/* Background Thumbnail Image or Gradient */}
                      {wp.thumbUrl ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
                          style={{ backgroundImage: `url(${wp.thumbUrl})` }}
                        />
                      ) : (
                        <div
                          className="absolute inset-0 transition-transform group-hover:scale-105"
                          style={{ background: wp.fallbackGrad }}
                        />
                      )}
                      {/* Dark gradient overlay for title legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/90 via-[#08090c]/30 to-transparent" />
                      <span className="absolute bottom-1.5 inset-x-0 text-center font-mono text-[10px] sm:text-[11px] tracking-tight text-[#f1f2f6] truncate px-1 font-medium">
                        {wp.title.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Soundscapes Grid (Col 4) */}
            <div className="md:col-span-4 flex flex-col gap-2 pl-0 md:pl-4 border-l-0 md:border-l border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-[#8b95a5] font-semibold">
                  Ambient Audio
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="font-mono text-xs text-[#38e1ff] hover:underline"
                  >
                    {isMuted ? 'Unmute' : 'Mute'}
                  </button>
                </div>
              </div>

              {/* Sound Chips */}
              <div className="grid grid-cols-2 gap-1.5">
                {SOUNDSCAPES.map((snd) => {
                  const isPlaying = activeSound === snd.id && !isMuted;
                  return (
                    <button
                      key={snd.id}
                      onClick={() => toggleSound(snd.id)}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-xl transition-all text-left border ${
                        isPlaying
                          ? 'bg-[#38e1ff]/15 border-[#38e1ff] shadow-[0_0_12px_rgba(56,225,255,0.3)]'
                          : 'bg-[#090b0f]/70 border-white/5 hover:bg-[#1f222d]'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ color: snd.color }}
                      >
                        {snd.icon}
                      </span>
                      <span className="font-body text-[11px] text-[#f1f2f6] truncate font-medium">
                        {snd.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 mt-1 px-1">
                <span className="material-symbols-outlined text-[15px] text-[#8b95a5]">
                  {volume === 0 || isMuted ? 'volume_off' : volume < 0.5 ? 'volume_down' : 'volume_up'}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-[#38e1ff] cursor-pointer h-1 rounded-lg bg-[#292c34]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
