import React from 'react';

const SHORTCUTS = [
  { key: 'F', action: 'Toggle Fullscreen Zen Immersion' },
  { key: 'Space', action: 'Play / Stop Ambient Soundscape' },
  { key: 'C', action: 'Cycle Clock Presentations (Digital, Flip, Zen, Verbal)' },
  { key: 'B', action: 'Cycle Living Canvases & Sceneries' },
  { key: 'M', action: 'Mute / Unmute Audio' },
  { key: 'H', action: 'Immediately Hide / Reveal HUD Controls' },
  { key: '?', action: 'Open / Close Keyboard Shortcuts' },
  { key: 'Esc', action: 'Exit Fullscreen or Close Dialogs' }
];

export function KeyboardShortcutsHelp({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#12141a]/95 border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-4 sm:p-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#38e1ff]/15 flex items-center justify-center text-[#38e1ff]">
              <span className="material-symbols-outlined text-[18px]">keyboard</span>
            </div>
            <div>
              <h2 className="font-display text-lg text-[#f1f2f6] font-medium">
                Keyboard Controls
              </h2>
              <p className="font-body text-xs text-[#8b95a5]">
                Quick keys for seamless ambient control
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

        {/* Shortcuts list */}
        <div className="flex flex-col gap-2.5 mt-5">
          {SHORTCUTS.map((sc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#16181f] border border-white/5"
            >
              <span className="font-body text-xs text-[#b0b8c2]">{sc.action}</span>
              <kbd className="font-mono text-xs font-semibold px-2 py-1 rounded-md bg-[#292c34] text-[#38e1ff] border border-white/10 shadow-sm">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
