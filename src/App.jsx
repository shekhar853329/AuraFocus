import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { ClockStage } from './components/ClockStage';
import { Header } from './components/Header';
import { HudTop } from './components/HudTop';
import { Dock } from './components/Dock';
import { Footer } from './components/Footer';
import { MobileCanvasView } from './components/MobileCanvasView';
import { PresetsModal } from './components/PresetsModal';
import { SettingsModal } from './components/SettingsModal';
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
import { AboutModal } from './components/AboutModal';
import { WALLPAPERS } from './data/wallpapers';
import { soundEngine } from './audio/soundEngine';

export function App() {
  // Real-Time Clock
  const [time, setTime] = useState(new Date());

  // Screensaver Display Modes: 'blend' | 'clock' | 'wallpaper' | 'timer'
  const [displayMode, setDisplayMode] = useState('blend');

  // Clock Style: 'digital' | 'flip' | 'analog' | 'words'
  const [clockStyle, setClockStyle] = useState('digital');

  // Scenery & Wallpaper state
  const [currentBg, setCurrentBg] = useState('bg-alpine');
  const [dimPercent, setDimPercent] = useState(40);
  const [customBgUrl, setCustomBgUrl] = useState('');

  // Audio State
  const [activeSound, setActiveSound] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  // Fullscreen State
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-Idle Inactivity State
  const [isIdle, setIsIdle] = useState(false);
  const [idleDelayIndex, setIdleDelayIndex] = useState(0); // default '5s'
  const idleOptions = [
    { label: '5s', ms: 5 * 1000 },
    { label: '30s', ms: 30 * 1000 },
    { label: '1m', ms: 60 * 1000 },
    { label: '3m', ms: 3 * 60 * 1000 },
    { label: 'Off', ms: null }
  ];

  // Dock Collapsed / Expanded state (compact by default for unobstructed view)
  const [dockExpanded, setDockExpanded] = useState(false);

  // Modals
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Settings
  const [settings, setSettings] = useState({
    is24Hour: false,
    showSeconds: true,
    showDate: true,
    showQuote: true
  });

  const idleTimerRef = useRef(null);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync Audio Engine Volume
  useEffect(() => {
    soundEngine.setVolume(volume);
  }, [volume]);

  // Sync Audio Engine Mute
  useEffect(() => {
    soundEngine.setMuted(isMuted);
  }, [isMuted]);

  // Sound toggle handler
  const toggleSound = (soundId) => {
    if (activeSound === soundId) {
      soundEngine.stopCurrent();
      setActiveSound(null);
    } else {
      const started = soundEngine.play(soundId);
      setActiveSound(started);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Fullscreen controller
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn('Native fullscreen request blocked:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Inactivity auto-fade reset
  const resetInactivity = useCallback(() => {
    setIsIdle(false);
    clearTimeout(idleTimerRef.current);

    const currentTimeout = idleOptions[idleDelayIndex].ms;
    if (currentTimeout) {
      idleTimerRef.current = setTimeout(() => {
        // Do not auto-hide if a modal is open
        if (!isPresetsOpen && !isSettingsOpen && !isShortcutsOpen && !isAboutOpen) {
          setIsIdle(true);
        }
      }, currentTimeout);
    }
  }, [idleDelayIndex, isPresetsOpen, isSettingsOpen, isShortcutsOpen, isAboutOpen]);

  // Cycle Auto-Idle timeout
  const cycleIdleTimeout = () => {
    setIdleDelayIndex((prev) => (prev + 1) % idleOptions.length);
  };

  // Cycle Clock styles
  const cycleClockStyle = useCallback(() => {
    const styles = ['digital', 'flip', 'analog', 'words'];
    setClockStyle((prev) => {
      const idx = styles.indexOf(prev);
      return styles[(idx + 1) % styles.length];
    });
  }, []);

  // Cycle Wallpapers
  const cycleWallpaper = useCallback(() => {
    setCurrentBg((prev) => {
      const idx = WALLPAPERS.findIndex((w) => w.id === prev);
      const nextIdx = (idx + 1) % WALLPAPERS.length;
      return WALLPAPERS[nextIdx].id;
    });
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore key events if typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      resetInactivity();

      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'Space') {
        e.preventDefault();
        if (activeSound) {
          toggleSound(activeSound);
        } else {
          toggleSound('Rainfall');
        }
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        cycleClockStyle();
      } else if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        cycleWallpaper();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        setIsIdle((prev) => !prev);
      } else if (e.key === 'i' || e.key === 'I') {
        e.preventDefault();
        setIsAboutOpen((prev) => !prev);
      } else if (e.key === '?') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsPresetsOpen(false);
        setIsSettingsOpen(false);
        setIsShortcutsOpen(false);
        setIsAboutOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', resetInactivity);
    window.addEventListener('click', resetInactivity);

    resetInactivity();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', resetInactivity);
      window.removeEventListener('click', resetInactivity);
      clearTimeout(idleTimerRef.current);
    };
  }, [resetInactivity, toggleFullscreen, cycleClockStyle, cycleWallpaper, activeSound]);

  // Apply curated presets
  const applyPreset = (preset) => {
    setCurrentBg(preset.bg);
    setClockStyle(preset.clockStyle);
    setDimPercent(preset.dim);
    if (preset.sound) {
      soundEngine.play(preset.sound);
      setActiveSound(preset.sound);
    }
  };

  const updateSettings = (partial) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#08090c] text-[#f1f2f6] overflow-hidden select-none font-body">
      {/* Dynamic Atmospheric Canvas Background */}
      <BackgroundCanvas
        currentBg={currentBg}
        dimPercent={dimPercent}
        customBgUrl={customBgUrl}
      />

      {/* Mobile Canvas View (Stitch Mobile Reference Layout) */}
      <MobileCanvasView
        time={time}
        isIdle={isIdle}
        setIsIdle={setIsIdle}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        clockStyle={clockStyle}
        settings={settings}
        currentBg={currentBg}
        setCurrentBg={setCurrentBg}
        activeSound={activeSound}
        toggleSound={toggleSound}
        isMuted={isMuted}
        toggleMute={toggleMute}
        volume={volume}
        setVolume={setVolume}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        openPresets={() => setIsPresetsOpen(true)}
        openSettings={() => setIsSettingsOpen(true)}
        openShortcuts={() => setIsShortcutsOpen(true)}
        openAbout={() => setIsAboutOpen(true)}
      />

      {/* Desktop Experience (Screen >= 768px) */}
      <div className="desktop-only flex-col w-full h-full min-h-screen">
        {/* Top Header Navigation */}
        <Header
          isIdle={isIdle}
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
          openPresets={() => setIsPresetsOpen(true)}
          openSettings={() => setIsSettingsOpen(true)}
          openShortcuts={() => setIsShortcutsOpen(true)}
          openAbout={() => setIsAboutOpen(true)}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
        />

        {/* Top HUD Telemetry Pill & Actions */}
        <HudTop
          isIdle={isIdle}
          displayMode={displayMode}
          activeSound={activeSound}
          idleTimeoutLabel={idleOptions[idleDelayIndex].label}
          cycleIdleTimeout={cycleIdleTimeout}
          toggleFullscreen={toggleFullscreen}
        />

        {/* Main Screensaver Center Stage */}
        <main
          className={`relative w-full h-full min-h-[100dvh] overflow-hidden flex items-center justify-center pt-14 sm:pt-16 transition-all duration-500 ${
            dockExpanded && !isIdle ? 'pb-48 sm:pb-72 md:pb-80' : 'pb-14 sm:pb-16'
          }`}
        >
          <ClockStage
            time={time}
            clockStyle={clockStyle}
            displayMode={displayMode}
            settings={settings}
          />
        </main>

        {/* Ambient Customizer Glass Dock Drawer */}
        <Dock
          isIdle={isIdle}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
          clockStyle={clockStyle}
          setClockStyle={setClockStyle}
          dimPercent={dimPercent}
          setDimPercent={setDimPercent}
          currentBg={currentBg}
          setCurrentBg={setCurrentBg}
          activeSound={activeSound}
          toggleSound={toggleSound}
          isMuted={isMuted}
          toggleMute={toggleMute}
          volume={volume}
          setVolume={setVolume}
          dockExpanded={dockExpanded}
          setDockExpanded={setDockExpanded}
        />

        {/* Floating Bottom Quick Pill Footer */}
        <Footer
          isIdle={isIdle}
          toggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
          cycleClockStyle={cycleClockStyle}
          cycleWallpaper={cycleWallpaper}
          toggleDockExpanded={() => setDockExpanded(!dockExpanded)}
          dockExpanded={dockExpanded}
        />
      </div>

      {/* Interactive Modals */}
      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onApplyPreset={applyPreset}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        updateSettings={updateSettings}
        customBgUrl={customBgUrl}
        setCustomBgUrl={setCustomBgUrl}
        idleOptions={idleOptions}
        idleDelayIndex={idleDelayIndex}
        setIdleDelayIndex={setIdleDelayIndex}
      />

      <KeyboardShortcutsHelp
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}

export default App;
