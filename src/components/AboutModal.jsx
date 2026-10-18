import React, { useState } from 'react';

const FAQS = [
  {
    q: 'What is AuraFocus?',
    a: 'AuraFocus is an aesthetic fullscreen screensaver, living digital canvas, and Pomodoro focus timer. It combines procedural ambient soundscapes (rain, fire, ocean, deep space) with customizable retro flip, digital, analog, and words clocks to eliminate distractions and promote deep work.'
  },
  {
    q: 'How does ambient sound in AuraFocus improve concentration?',
    a: 'AuraFocus uses procedural acoustic noise masking. Ambient sounds like rain, pink noise, and fire crackles smooth out sudden environmental conversational noises, preventing disruption to working memory and lowering cognitive fatigue.'
  },
  {
    q: 'What clock styles are available in AuraFocus?',
    a: 'AuraFocus provides four distinct clock styles: a clean modernist Digital Clock, a mechanical 3D Retro Flip Clock, a minimalist Quartz Analog Dial, and an English Typographic Words Clock, along with an interactive Pomodoro Focus Timer.'
  },
  {
    q: 'Can AuraFocus be used as a dedicated full-screen desk clock or screensaver?',
    a: 'Yes. Press the F key on your keyboard or tap the fullscreen icon to launch Zen Fullscreen mode. AuraFocus features intelligent auto-idle detection that automatically fades UI controls after inactivity, leaving only the tranquil living canvas.'
  },
  {
    q: 'Is AuraFocus free, and does it require an account?',
    a: 'AuraFocus is 100% free and open-source. It does not require any account creation, login, or installation, and all procedural audio and settings operate privately in your browser.'
  }
];

export function AboutModal({ isOpen, onClose }) {
  const [expandedFaq, setExpandedFaq] = useState(null);

  if (!isOpen) return null;

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl bg-[#12141a]/95 border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-4 sm:p-7 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 sticky top-0 bg-[#12141a]/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#38e1ff]/15 flex items-center justify-center text-[#38e1ff] shrink-0">
              <span className="material-symbols-outlined text-[18px]">info</span>
            </div>
            <div>
              <h2 id="about-modal-title" className="font-display text-base sm:text-xl text-[#f1f2f6] font-medium">
                About AuraFocus &amp; Guide
              </h2>
              <p className="font-body text-[11px] sm:text-xs text-[#8b95a5]">
                Living Canvas, Ambient Audio &amp; Deep Work Hub
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close About Dialog"
            className="w-8 h-8 rounded-full bg-[#1b1f2b] hover:bg-[#252b3b] text-[#8b95a5] hover:text-[#f1f2f6] flex items-center justify-center transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-4 sm:mt-5 space-y-5 text-left font-body text-xs sm:text-sm text-[#b0b8c2]">
          {/* Mission & Overview */}
          <section className="p-3.5 sm:p-4 rounded-2xl bg-[#161821] border border-white/5 space-y-2">
            <h3 className="font-display text-sm sm:text-base text-[#f1f2f6] font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[#38e1ff] text-[18px]">self_improvement</span>
              Atmospheric Sanctuary for Flow State
            </h3>
            <p className="leading-relaxed text-[#9aa4b2]">
              AuraFocus transforms any browser window, secondary monitor, or tablet into a minimalist, zero-distraction focus station. Whether you are coding, studying, writing, or reading, AuraFocus merges serene visual aesthetics with procedural audio synthesis to eliminate cognitive friction.
            </p>
          </section>

          {/* Scientific Foundation */}
          <section className="p-3.5 sm:p-4 rounded-2xl bg-[#161821] border border-white/5 space-y-2">
            <h3 className="font-display text-sm sm:text-base text-[#f1f2f6] font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffc478] text-[18px]">psychology</span>
              The Science of Focus &amp; Auditory Masking
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-[#9aa4b2] text-xs leading-relaxed">
              <li>
                <strong className="text-[#f1f2f6]">Psychoacoustic Masking:</strong> Continuous procedural ambient noise (such as rain or hearth embers) attenuates sudden speech peaks, reducing context-switching disruption.
              </li>
              <li>
                <strong className="text-[#f1f2f6]">Ultradian Attention Rhythms:</strong> Integrated Pomodoro intervals (25m Focus / 5m Rest, 50m Deep / 15m Rest) match biological energy cycles to avoid cognitive exhaustion.
              </li>
              <li>
                <strong className="text-[#f1f2f6]">OLED &amp; Eye Ergonomics:</strong> Custom dimming and auto-idle controls lower blue-light intensity during late-night productivity sessions.
              </li>
            </ul>
          </section>

          {/* FAQ Accordion */}
          <section className="space-y-2.5">
            <h3 className="font-display text-sm sm:text-base text-[#f1f2f6] font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[#a78bfa] text-[18px]">quiz</span>
              Frequently Asked Questions
            </h3>

            <div className="space-y-2">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-[#161821] border border-white/5 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-3 sm:p-3.5 text-left flex items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                    aria-expanded={expandedFaq === idx}
                  >
                    <span className="font-display text-xs sm:text-sm text-[#f1f2f6] font-medium">
                      {faq.q}
                    </span>
                    <span className="material-symbols-outlined text-[#8b95a5] text-[18px] shrink-0 transition-transform duration-200">
                      {expandedFaq === idx ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-3 sm:px-3.5 pb-3 sm:pb-3.5 pt-0 text-xs text-[#9aa4b2] leading-relaxed border-t border-white/5 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Privacy & Open Source */}
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#586274]">
            <span>100% Client-Side • Zero Tracking • Free &amp; Open Source</span>
            <span className="font-mono text-[#38e1ff]">v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
