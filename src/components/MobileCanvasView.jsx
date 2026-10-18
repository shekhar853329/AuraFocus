import React, { useState, useEffect } from 'react';
import { WALLPAPERS } from '../data/wallpapers';
import { SOUNDSCAPES } from '../data/soundscapes';
import { MEDITATIVE_QUOTES } from '../data/quotes';

export function MobileCanvasView({
  time,
  isIdle,
  setIsIdle,
  displayMode,
  setDisplayMode,
  clockStyle: _clockStyle,
  settings,
  currentBg,
  setCurrentBg,
  activeSound,
  toggleSound,
  isMuted,
  toggleMute,
  volume,
  setVolume,
  isFullscreen,
  toggleFullscreen,
  openPresets,
  openSettings,
  _openShortcuts,
  openAbout
}) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [mobileTab, setMobileTab] = useState('canvas'); // 'canvas', 'presets', 'audio', 'config'

  // Format Time respecting 24-hour setting
  const is24Hr = settings?.is24Hour;
  const hoursNum = is24Hr ? time.getHours() : (time.getHours() % 12 || 12);
  const hours = String(hoursNum).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const showSeconds = settings?.showSeconds !== false;

  const dateStr = time.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tzOffset = -time.getTimezoneOffset() / 60;
  const tzFormatted = `UTC${tzOffset >= 0 ? '+' : ''}${tzOffset}:00 • ${tzName.split('/')[1] || tzName}`.toUpperCase();

  // Find active sound details
  const activeSndObj = SOUNDSCAPES.find((s) => s.id === activeSound) || SOUNDSCAPES[0];
  const isPlaying = Boolean(activeSound && !isMuted);

  // Double tap handler on canvas for immersion
  useEffect(() => {
    let lastTap = 0;
    const handleTouchEnd = (e) => {
      // Don't trigger if tapped on an interactive button or input
      if (e.target.closest('button, input, a, .mobile-preset-card, .mobile-sound-tune-chip')) return;
      const now = Date.now();
      if (now - lastTap < 350 && now - lastTap > 0) {
        setIsIdle((prev) => !prev);
      }
      lastTap = now;
    };
    window.addEventListener('touchend', handleTouchEnd);
    return () => window.removeEventListener('touchend', handleTouchEnd);
  }, [setIsIdle]);

  return (
    <div
      className="mobile-only mobile-canvas-container"
      onClick={() => {
        if (isIdle) setIsIdle(false);
      }}
    >
      {/* 1. Mobile Fixed Top Header */}
      <header
        className={`mobile-top-bar ${
          isIdle ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100'
        }`}
      >
        {/* Brand with Cyan Pulse Dot */}
        <div className="mobile-header-brand">
          <span className="mobile-header-dot" />
          <span className="mobile-header-title">Canvas</span>
        </div>

        {/* Right Header Actions */}
        <div className="mobile-header-actions">
          {openAbout && (
            <button
              onClick={openAbout}
              aria-label="About & Guide"
              title="About & Guide / FAQ"
              className="mobile-header-icon-btn"
            >
              <span className="material-symbols-outlined text-[19px]">info</span>
            </button>
          )}

          <button
            onClick={openPresets}
            aria-label="Quick Presets"
            className="mobile-header-icon-btn"
          >
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
          </button>

          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="mobile-header-icon-btn"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
            </span>
          </button>

          {/* Profile / Badge Avatar with Light Cyan Fill */}
          <div
            onClick={openSettings}
            className="mobile-header-avatar"
            title="Account & Settings"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </header>

      {/* 2. Permanent Hero Clock Section (ALWAYS ON SCREEN — NEVER REMOVED ON IDLE OR SCROLL!) */}
      <section
        className={`mobile-clock-hero-wrapper ${
          isIdle ? 'is-idle' : ''
        }`}
      >
        <div className="mobile-clock-center">
          {/* Ambient Backlight Glow for Clock */}
          <div className="mobile-clock-glow" />

          {/* Timezone Exploration Badge */}
          <div className="mobile-timezone-pill">
            <span className="material-symbols-outlined text-[12px] text-[#38e1ff]">explore</span>
            <span>{tzFormatted}</span>
          </div>

          {/* Grand Clock Typography with Glowing Cyan Seconds Badge */}
          <div className="mobile-clock-digits-row">
            <span className="mobile-clock-digits">
              {hours}:{minutes}
            </span>
            {showSeconds && (
              <span className="mobile-clock-seconds">
                {seconds}
              </span>
            )}
          </div>

          {/* Gregorian Date */}
          <div className="mobile-date-text">
            {dateStr}
          </div>

          {/* Meditative Whisper Quote */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setQuoteIndex((prev) => (prev + 1) % MEDITATIVE_QUOTES.length);
            }}
            className="mobile-quote-text"
          >
            {MEDITATIVE_QUOTES[quoteIndex]}
          </div>
        </div>
      </section>

      {/* 3. Interactive Canvas Content (Scrollable Container beneath clock) */}
      <main
        className={`mobile-scroll-body ${
          isIdle ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Top HUD Row */}
        <div className="mobile-hud-row">
          {/* Zen Sync Telemetry */}
          <div className="mobile-zen-sync-pill">
            <span className="mobile-sync-dot" />
            <span className="mobile-sync-label">ZEN SYNC</span>
            <span className="mobile-sync-sep">|</span>
            <span className="mobile-sync-bolt">
              <span className="material-symbols-outlined text-[13px] text-[#ffb95a]">bolt</span>
              98%
            </span>
          </div>

          {/* Quick HUD Actions */}
          <div className="mobile-hud-actions-right">
            {/* Zen Timer Trigger */}
            <button
              onClick={() => setDisplayMode(displayMode === 'timer' ? 'blend' : 'timer')}
              aria-label="Zen timer"
              className={`mobile-hud-circle-btn ${displayMode === 'timer' ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined text-[17px]">bedtime</span>
            </button>

            {/* Pure Immersion Mode Action */}
            <button
              onClick={() => setIsIdle(true)}
              aria-label="Pure Immersion Mode"
              className="mobile-hud-immersion-btn"
            >
              <span className="material-symbols-outlined text-[15px] text-[#38e1ff]">visibility_off</span>
              <span>IMMERSION</span>
            </button>
          </div>
        </div>

        {/* Mode Selector Segmented Pill */}
        <div className="mobile-mode-pill-bar">
          <button
            onClick={() => setDisplayMode('blend')}
            className={`mobile-mode-pill-btn ${displayMode === 'blend' ? 'active' : ''}`}
          >
            CANVAS
          </button>
          <button
            onClick={() => setDisplayMode('clock')}
            className={`mobile-mode-pill-btn ${displayMode === 'clock' ? 'active' : ''}`}
          >
            CLOCK ONLY
          </button>
          <button
            onClick={() => setDisplayMode('wallpaper')}
            className={`mobile-mode-pill-btn ${displayMode === 'wallpaper' ? 'active' : ''}`}
          >
            ZEN AMBIENT
          </button>
        </div>

        {/* Widgets visible in Blend and Ambient modes (hidden in CLOCK ONLY for pure focus) */}
        {displayMode !== 'clock' && (
          <>
            {/* Soundscape Audio Widget Card */}
        <div className="mobile-soundscape-card">
          <div className="mobile-sound-top">
            <div className="mobile-sound-info">
              {/* Animated Audio Visualizer Node */}
              <div className="mobile-sound-visualizer">
                <span className="material-symbols-outlined text-[20px] relative z-10">graphic_eq</span>
                {isPlaying && (
                  <div className="absolute inset-0 bg-[#38e1ff]/20 animate-pulse" />
                )}
              </div>
              <div className="flex flex-col text-left">
                <div className="mobile-sound-name-row">
                  <span className="mobile-sound-name">
                    {activeSound ? activeSndObj.name : 'Ambient Soundscape'}
                  </span>
                  {isPlaying && (
                    <span className="mobile-sound-dot" />
                  )}
                </div>
                <span className="mobile-sound-sub">
                  {isPlaying ? 'NOW PLAYING • 432HZ' : isMuted ? 'AUDIO MUTED' : 'TAP TUNE TO PLAY'}
                </span>
              </div>
            </div>

            {/* Quick Mute Toggle Pill */}
            <button
              onClick={toggleMute}
              aria-label="Toggle Mute"
              className={`px-2.5 py-1 rounded-full font-mono text-[10px] sm:text-[11px] flex items-center gap-1 transition-all ${
                isMuted
                  ? 'bg-[#ff6b8b]/15 text-[#ff6b8b] border border-[#ff6b8b]/30'
                  : isPlaying
                  ? 'bg-[#38e1ff]/15 text-[#38e1ff] border border-[#38e1ff]/30'
                  : 'bg-white/5 text-[#bbc9cd] border border-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[13px] sm:text-[14px]">
                {isMuted ? 'volume_off' : isPlaying ? 'volume_up' : 'volume_mute'}
              </span>
              <span>{isMuted ? 'MUTED' : isPlaying ? 'LIVE' : 'IDLE'}</span>
            </button>
          </div>

          {/* Audio Tune Options in a Row */}
          <div className="mobile-sound-tunes-row no-scrollbar">
            {SOUNDSCAPES.map((snd) => {
              const isSelected = activeSound === snd.id;
              const isTunePlaying = isSelected && !isMuted;
              return (
                <button
                  key={snd.id}
                  onClick={() => toggleSound(snd.id)}
                  className={`mobile-sound-tune-chip ${
                    isTunePlaying ? 'active' : isSelected ? 'selected' : ''
                  }`}
                  title={snd.name}
                >
                  <span
                    className="material-symbols-outlined text-[15px] shrink-0"
                    style={{ color: snd.color }}
                  >
                    {snd.icon}
                  </span>
                  <span className="whitespace-nowrap">
                    {snd.name}
                  </span>
                  {isTunePlaying && (
                    <span className="mobile-sound-tune-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mini Live Equalizer Waveform & Volume Slider */}
          <div className="mobile-sound-bottom">
            {/* 10 Equalizer Bars */}
            <div className="mobile-eq-container">
              <span className="mobile-eq-bar eq-bar-1 h-3" />
              <span className="mobile-eq-bar eq-bar-2 h-5" />
              <span className="mobile-eq-bar eq-bar-3 h-4" />
              <span className="mobile-eq-bar eq-bar-1 h-6" />
              <span className="mobile-eq-bar lavender eq-bar-2 h-3" />
              <span className="mobile-eq-bar eq-bar-3 h-5" />
              <span className="mobile-eq-bar eq-bar-1 h-2" />
              <span className="mobile-eq-bar lavender eq-bar-2 h-4" />
              <span className="mobile-eq-bar eq-bar-3 h-5" />
              <span className="mobile-eq-bar eq-bar-1 h-3" />
            </div>

            {/* Volume Slider Control */}
            <div className="mobile-sound-volume-group">
              <button
                onClick={toggleMute}
                className="text-[#bbc9cd] hover:text-[#38e1ff] flex items-center"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isMuted || volume === 0 ? 'volume_off' : 'volume_down'}
                </span>
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-[#38e1ff] cursor-pointer h-1 rounded-lg bg-[#292c34]"
              />
              <span className="font-mono text-[10px] text-[#bbc9cd] w-6 text-right">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Ambient Preset Showcase (Wallpaper Drawer Horizontal Scroller) */}
        <div className="w-full flex flex-col mb-3">
          <div className="mobile-presets-header">
            <div className="mobile-presets-title-group">
              <span className="mobile-presets-title">
                Canvas Presets
              </span>
              <span className="mobile-presets-badge">
                4 LIVE
              </span>
            </div>
            <button
              onClick={openPresets}
              className="mobile-presets-gallery-btn"
            >
              GALLERY <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          {/* Horizontal Scrollable Scroller */}
          <div className="mobile-presets-carousel">
            {WALLPAPERS.map((wp) => {
              const isActive = currentBg === wp.id;
              return (
                <div
                  key={wp.id}
                  onClick={() => setCurrentBg(wp.id)}
                  className={`mobile-preset-card ${isActive ? 'active' : ''}`}
                >
                  {/* Thumbnail Image or Gradient */}
                  {wp.thumbUrl ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${wp.thumbUrl})` }}
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ background: wp.fallbackGrad }}
                    />
                  )}

                  {/* Dark vignette gradient overlay */}
                  <div className="mobile-preset-card-overlay" />

                  {/* Active Checkmark Pill in Top Right */}
                  {isActive && (
                    <div className="mobile-preset-badge-active">
                      <span className="material-symbols-outlined text-[12px] font-bold">
                        check
                      </span>
                    </div>
                  )}

                  {/* Bottom Title & Subtitle Badge */}
                  <div className="mobile-preset-card-content">
                    <span className="mobile-preset-card-title">
                      {wp.title}
                    </span>
                    <span className="mobile-preset-card-sub">
                      4K 60FPS • 432Hz
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    )}

        {/* Fullscreen Immersion Double-Tap Prompt */}
        <div
          onClick={() => setIsIdle(true)}
          className="mobile-double-tap-prompt"
        >
          <span className="material-symbols-outlined text-[14px] text-[#38e1ff]">
            touch_app
          </span>
          <span className="font-mono text-[10px] text-[#bbc9cd] text-center">
            Double tap anywhere for pure immersion
          </span>
        </div>
      </main>

      {/* 3. Pure Immersion Floating Pill (Appears when UI is auto-dimmed) */}
      <div
        className={`mobile-restore-pill ${
          isIdle ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setIsIdle(false)}
          className="mobile-restore-pill-btn"
        >
          <span className="mobile-sync-dot" />
          TAP TO RESTORE CONTROLS
        </button>
      </div>

      {/* 4. Fixed Bottom Floating Navigation Bar */}
      <div
        className={`mobile-bottom-nav-bar ${
          isIdle ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'
        }`}
      >
        <nav className="mobile-bottom-nav-capsule">
          {/* 1. Canvas */}
          <button
            onClick={() => {
              setMobileTab('canvas');
              setDisplayMode('blend');
            }}
            className={`mobile-bottom-nav-item ${
              mobileTab === 'canvas' ? 'active' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">blur_on</span>
            <span className="font-mono text-[9px] tracking-wider mt-0.5">CANVAS</span>
          </button>

          {/* 2. Presets */}
          <button
            onClick={() => {
              setMobileTab('presets');
              openPresets();
            }}
            className={`mobile-bottom-nav-item ${
              mobileTab === 'presets' ? 'active' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">palette</span>
            <span className="font-mono text-[9px] tracking-wider mt-0.5">PRESETS</span>
          </button>

          {/* 3. Audio */}
          <button
            onClick={() => {
              setMobileTab('audio');
              toggleSound(activeSndObj.id);
            }}
            className={`mobile-bottom-nav-item ${
              mobileTab === 'audio' ? 'active' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">graphic_eq</span>
            <span className="font-mono text-[9px] tracking-wider mt-0.5">AUDIO</span>
          </button>

          {/* 4. Config */}
          <button
            onClick={() => {
              setMobileTab('config');
              openSettings();
            }}
            className={`mobile-bottom-nav-item ${
              mobileTab === 'config' ? 'active' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">tune</span>
            <span className="font-mono text-[9px] tracking-wider mt-0.5">CONFIG</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default MobileCanvasView;
