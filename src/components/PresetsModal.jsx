import React from 'react';

const PRESETS = [
  {
    id: 'midnight-deep-work',
    title: 'Midnight Deep Work',
    subtitle: 'Absolute focus and distraction-free dark void',
    bg: 'bg-void',
    clockStyle: 'digital',
    sound: 'Cosmic Static',
    dim: 60,
    accent: '#a78bfa',
    badge: 'Deep Focus'
  },
  {
    id: 'cozy-rainy-evening',
    title: 'Cozy Rainy Evening',
    subtitle: 'Tokyo rain bokeh paired with rhythmic rain on glass',
    bg: 'bg-rain',
    clockStyle: 'words',
    sound: 'Rainfall',
    dim: 35,
    accent: '#38e1ff',
    badge: 'Atmospheric'
  },
  {
    id: 'alpine-solitude',
    title: 'Alpine Starry Mirror',
    subtitle: 'Milky Way over calm mountain lake with flip mechanical chronometer',
    bg: 'bg-alpine',
    clockStyle: 'flip',
    sound: 'Cosmic Static',
    dim: 40,
    accent: '#27d9f7',
    badge: 'Celestial'
  },
  {
    id: 'golden-sunset-meditate',
    title: 'Sahara Golden Hour',
    subtitle: 'Warm sand dunes and fireplace crackle with Zen Dial',
    bg: 'bg-dunes',
    clockStyle: 'analog',
    sound: 'Fire Hearth',
    dim: 30,
    accent: '#ffb347',
    badge: 'Circadian Warmth'
  },
  {
    id: 'borealis-tranquility',
    title: 'Borealis Aurora',
    subtitle: 'Flowing cyan and violet plasma waves with forest night breezes',
    bg: 'bg-aurora',
    clockStyle: 'digital',
    sound: 'Night Forest',
    dim: 25,
    accent: '#38e1ff',
    badge: 'Meditative'
  }
];

export function PresetsModal({ isOpen, onClose, onApplyPreset }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#12141a]/95 border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-4 sm:p-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#38e1ff]/15 flex items-center justify-center text-[#38e1ff] shrink-0">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            </div>
            <div>
              <h2 className="font-display text-base sm:text-xl text-[#f1f2f6] font-medium">
                Atmospheric Presets
              </h2>
              <p className="font-body text-[11px] sm:text-xs text-[#8b95a5]">
                Curated audiovisual sceneries tailored for deep focus and serenity
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b1f2b] hover:bg-[#252b3b] text-[#8b95a5] hover:text-[#f1f2f6] flex items-center justify-center transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Presets List */}
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3 mt-4 sm:mt-6 max-h-[60vh] overflow-y-auto pr-1">
          {PRESETS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => {
                onApplyPreset(preset);
                onClose();
              }}
              className="group cursor-pointer p-3 sm:p-4 rounded-2xl bg-[#16181f]/80 hover:bg-[#1f222d] border border-white/5 hover:border-[#38e1ff]/40 transition-all flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-inner shrink-0"
                  style={{ backgroundColor: `${preset.accent}20`, color: preset.accent }}
                >
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                    {preset.bg === 'bg-rain' ? 'rainy' : preset.bg === 'bg-dunes' ? 'wb_sunny' : preset.bg === 'bg-alpine' ? 'landscape' : preset.bg === 'bg-aurora' ? 'flare' : 'dark_mode'}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h3 className="font-display text-xs sm:text-base text-[#f1f2f6] font-medium group-hover:text-[#38e1ff] transition-colors">
                      {preset.title}
                    </h3>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#8b95a5]">
                      {preset.badge}
                    </span>
                  </div>
                  <p className="font-body text-xs text-[#8b95a5] mt-0.5">
                    {preset.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8b95a5] group-hover:text-[#38e1ff] group-hover:translate-x-1 transition-all text-[20px]">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
