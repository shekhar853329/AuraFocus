import React, { useState, useEffect } from 'react';

export function FocusTimer() {
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentMode, setCurrentMode] = useState('25m'); // '25m', '5m', '15m', '50m'

  useEffect(() => {
    let interval = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      // Play a gentle ambient chime notification using Web Audio
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.2);
        }
      } catch (e) {
        // audio context blocked or not available
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const setTimerMode = (mode, minutes) => {
    setCurrentMode(mode);
    setIsRunning(false);
    const secs = minutes * 60;
    setTotalSeconds(secs);
    setSecondsLeft(secs);
  };

  const toggleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  return (
    <div className="flex flex-col items-center select-none text-center px-4 animate-fade-in max-w-lg">
      {/* Segmented Timer Presets */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0d0f16]/80 backdrop-blur-2xl border border-white/10 mb-6">
        {[
          { label: '25m Focus', mode: '25m', mins: 25 },
          { label: '50m Deep', mode: '50m', mins: 50 },
          { label: '5m Break', mode: '5m', mins: 5 },
          { label: '15m Rest', mode: '15m', mins: 15 }
        ].map((item) => (
          <button
            key={item.mode}
            onClick={() => setTimerMode(item.mode, item.mins)}
            className={`px-3 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all ${
              currentMode === item.mode
                ? 'bg-[#38e1ff] text-[#00232a] font-semibold shadow-[0_0_15px_rgba(56,225,255,0.4)]'
                : 'text-[#8b95a5] hover:text-[#f1f2f6]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Hero Countdown Digits */}
      <div className="flex items-baseline justify-center gap-2">
        <span
          className="clock-hero-digits"
          style={{ textShadow: '0 4px 40px rgba(0, 0, 0, 0.9)' }}
        >
          {String(mins).padStart(2, '0')}
        </span>
        <span
          className="clock-colon animate-pulse"
          style={{ textShadow: '0 0 24px rgba(56, 225, 255, 0.5)' }}
        >
          :
        </span>
        <span
          className="clock-hero-digits"
          style={{ textShadow: '0 4px 40px rgba(0, 0, 0, 0.9)' }}
        >
          {String(secs).padStart(2, '0')}
        </span>
      </div>

      {/* Linear Glow Progress Bar */}
      <div className="w-64 sm:w-80 h-1.5 bg-white/10 rounded-full mt-6 overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#38e1ff] to-[#a78bfa] rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(56,225,255,0.7)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={toggleStartPause}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-body font-semibold text-sm transition-all shadow-lg active:scale-95 ${
            isRunning
              ? 'bg-[#292c34] text-[#f1f2f6] hover:bg-[#343842] border border-white/10'
              : 'bg-[#38e1ff] text-[#00232a] hover:bg-[#a6eeff] shadow-[0_0_20px_rgba(56,225,255,0.4)]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isRunning ? 'pause' : 'play_arrow'}
          </span>
          {isRunning ? 'Pause Focus' : 'Start Focus'}
        </button>

        <button
          onClick={resetTimer}
          className="w-10 h-10 rounded-full bg-[#16181d]/80 hover:bg-[#292c34] text-[#b0b8c2] hover:text-[#f1f2f6] border border-white/10 flex items-center justify-center transition-all active:scale-95"
          title="Reset Timer"
        >
          <span className="material-symbols-outlined text-[18px]">replay</span>
        </button>
      </div>
    </div>
  );
}
