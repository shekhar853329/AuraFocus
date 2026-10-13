import React, { useState } from 'react';

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  updateSettings,
  customBgUrl,
  setCustomBgUrl
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
      <div className="relative w-full max-w-xl rounded-3xl bg-[#12141a]/95 border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-6 sm:p-8 overflow-hidden max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#38e1ff]/15 flex items-center justify-center text-[#38e1ff]">
              <span className="material-symbols-outlined text-[18px]">tune</span>
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl text-[#f1f2f6] font-medium">
                Canvas Preferences
              </h2>
              <p className="font-body text-xs text-[#8b95a5]">
                Fine-tune display format, screensaver timers, and custom media
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b1f2b] hover:bg-[#252b3b] text-[#8b95a5] hover:text-[#f1f2f6] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Settings Form */}
        <div className="mt-6 flex flex-col gap-6">
          {/* Section 1: Timepiece Format */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#38e1ff] font-semibold">
              Time & Typography
            </h3>

            {/* 12h vs 24h format */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#16181f] border border-white/5">
              <div>
                <span className="font-body text-sm text-[#f1f2f6] font-medium block">
                  24-Hour Time Format
                </span>
                <span className="font-body text-xs text-[#8b95a5]">
                  Display military time (e.g. 21:45 instead of 09:45 PM)
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.is24Hour}
                onChange={(e) => updateSettings({ is24Hour: e.target.checked })}
                className="w-5 h-5 accent-[#38e1ff] cursor-pointer"
              />
            </div>

            {/* Show Seconds */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#16181f] border border-white/5">
              <div>
                <span className="font-body text-sm text-[#f1f2f6] font-medium block">
                  Show Seconds Indicator
                </span>
                <span className="font-body text-xs text-[#8b95a5]">
                  Display active ticking seconds in Digital and Flip views
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.showSeconds}
                onChange={(e) => updateSettings({ showSeconds: e.target.checked })}
                className="w-5 h-5 accent-[#38e1ff] cursor-pointer"
              />
            </div>

            {/* Show Date */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#16181f] border border-white/5">
              <div>
                <span className="font-body text-sm text-[#f1f2f6] font-medium block">
                  Calendar & Timezone Pill
                </span>
                <span className="font-body text-xs text-[#8b95a5]">
                  Display day, date, and local timezone readout
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.showDate}
                onChange={(e) => updateSettings({ showDate: e.target.checked })}
                className="w-5 h-5 accent-[#38e1ff] cursor-pointer"
              />
            </div>

            {/* Show Meditative Quote */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#16181f] border border-white/5">
              <div>
                <span className="font-body text-sm text-[#f1f2f6] font-medium block">
                  Focus & Stillness Quotes
                </span>
                <span className="font-body text-xs text-[#8b95a5]">
                  Ambient inspirational reflections on digital clocks
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.showQuote}
                onChange={(e) => updateSettings({ showQuote: e.target.checked })}
                className="w-5 h-5 accent-[#38e1ff] cursor-pointer"
              />
            </div>
          </div>

          {/* Section 2: Custom Wallpaper */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#38e1ff] font-semibold">
              Custom Wallpaper Source
            </h3>
            <form onSubmit={handleSaveUrl} className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#0d0f16] border border-white/10 text-xs sm:text-sm text-[#f1f2f6] focus:outline-none focus:border-[#38e1ff]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#38e1ff] text-[#00232a] font-semibold text-xs sm:text-sm hover:bg-[#a6eeff] transition-colors"
              >
                Apply
              </button>
              {customBgUrl && (
                <button
                  type="button"
                  onClick={handleClearUrl}
                  className="px-3 py-2.5 rounded-xl bg-[#292c34] text-[#b0b8c2] hover:text-[#f1f2f6] text-xs sm:text-sm transition-colors"
                >
                  Clear
                </button>
              )}
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
