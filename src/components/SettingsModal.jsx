import React, { useState } from 'react';

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  updateSettings,
  customBgUrl,
  setCustomBgUrl,
  idleOptions,
  idleDelayIndex,
  setIdleDelayIndex
}) {
  const [urlInput, setUrlInput] = useState(customBgUrl || '');

  if (!isOpen) return null;

  const handleSaveUrl = (e) => {
    e.preventDefault();
    setCustomBgUrl(urlInput.trim());
  };

  const handleClearUrl = () => {
    setUrlInput('');
    setCustomBgUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#12141a]/95 border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-4 sm:p-8 overflow-hidden max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#38e1ff]/15 flex items-center justify-center text-[#38e1ff] shrink-0">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <div>
              <h2 className="font-display text-base sm:text-xl text-[#f1f2f6] font-medium">
                Canvas Preferences
              </h2>
              <p className="font-body text-[11px] sm:text-xs text-[#8b95a5]">
                Fine-tune display format, screensaver timers, and custom media
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

        {/* Settings Form */}
        <div className="mt-5 sm:mt-6 flex flex-col gap-5 sm:gap-6">
          {/* Section 1: Timepiece Format */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#38e1ff] font-semibold">
              Time & Typography
            </h3>

            {/* 12h vs 24h format */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#16181f] border border-white/5">
              <div className="flex flex-col gap-0.5">
                <span className="font-body text-xs sm:text-sm text-[#f1f2f6] font-medium block">
                  24-Hour Time Format
                </span>
                <span className="font-body text-[11px] sm:text-xs text-[#8b95a5] block">
                  Display military time (e.g. 21:45 instead of 09:45 PM)
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.is24Hour}
                onChange={(e) => updateSettings({ is24Hour: e.target.checked })}
                className="w-5 h-5 accent-[#38e1ff] cursor-pointer shrink-0 ml-2"
              />
            </div>

            {/* Show Seconds */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#16181f] border border-white/5">
              <div className="flex flex-col gap-0.5">
                <span className="font-body text-xs sm:text-sm text-[#f1f2f6] font-medium block">
                  Show Seconds Indicator
                </span>
                <span className="font-body text-[11px] sm:text-xs text-[#8b95a5] block">
                  Display active ticking seconds in Digital and Flip views
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.showSeconds}
                onChange={(e) => updateSettings({ showSeconds: e.target.checked })}
                className="w-5 h-5 accent-[#38e1ff] cursor-pointer shrink-0 ml-2"
              />
            </div>

            {/* Show Date */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#16181f] border border-white/5">
              <div className="flex flex-col gap-0.5">
                <span className="font-body text-xs sm:text-sm text-[#f1f2f6] font-medium block">
                  Calendar & Timezone Pill
                </span>
                <span className="font-body text-[11px] sm:text-xs text-[#8b95a5] block">
                  Display day, date, and local timezone readout
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.showDate}
                onChange={(e) => updateSettings({ showDate: e.target.checked })}
                className="w-5 h-5 accent-[#38e1ff] cursor-pointer shrink-0 ml-2"
              />
            </div>

            {/* Show Meditative Quote */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#16181f] border border-white/5">
              <div className="flex flex-col gap-0.5">
                <span className="font-body text-xs sm:text-sm text-[#f1f2f6] font-medium block">
                  Focus & Stillness Quotes
                </span>
                <span className="font-body text-[11px] sm:text-xs text-[#8b95a5] block">
                  Ambient inspirational reflections on digital clocks
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.showQuote}
                onChange={(e) => updateSettings({ showQuote: e.target.checked })}
                className="w-5 h-5 accent-[#38e1ff] cursor-pointer shrink-0 ml-2"
              />
            </div>
          </div>

          {/* Section 2: Screensaver Auto-Idle Inactivity */}
          {idleOptions && (
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#38e1ff] font-semibold">
                Screensaver Immersion Timeout
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-2xl bg-[#16181f] border border-white/5">
                <div>
                  <span className="font-body text-xs sm:text-sm text-[#f1f2f6] font-medium block">
                    Auto-Hide HUD Controls
                  </span>
                  <span className="font-body text-[11px] sm:text-xs text-[#8b95a5]">
                    Fade away interface into total scenic immersion after inactivity
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-[#090b0f] p-1 rounded-xl border border-white/5 overflow-x-auto no-scrollbar shrink-0">
                  {idleOptions.map((opt, idx) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setIdleDelayIndex(idx)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-xs transition-all ${
                        idleDelayIndex === idx
                          ? 'bg-[#38e1ff] text-[#00232a] font-semibold shadow-sm'
                          : 'text-[#8b95a5] hover:text-[#f1f2f6]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Custom Wallpaper */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#38e1ff] font-semibold">
              Custom Wallpaper Source
            </h3>
            <form onSubmit={handleSaveUrl} className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#0d0f16] border border-white/10 text-xs sm:text-sm text-[#f1f2f6] focus:outline-none focus:border-[#38e1ff]"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-4 py-2 sm:py-2.5 rounded-xl bg-[#38e1ff] text-[#00232a] font-semibold text-xs sm:text-sm hover:bg-[#a6eeff] transition-colors"
                >
                  Apply
                </button>
                {customBgUrl && (
                  <button
                    type="button"
                    onClick={handleClearUrl}
                    className="px-3 py-2 sm:py-2.5 rounded-xl bg-[#292c34] text-[#b0b8c2] hover:text-[#f1f2f6] text-xs sm:text-sm transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
            {customBgUrl && (
              <span className="font-mono text-[11px] text-[#27d9f7]">
                ✓ Active custom wallpaper URL loaded
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
