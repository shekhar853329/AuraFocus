import React from 'react';

const NUMBERS_WORDS = [
  'ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE',
  'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'QUARTER', 'SIXTEEN', 'SEVENTEEN',
  'EIGHTEEN', 'NINETEEN', 'TWENTY'
];

export function WordsClock({ time }) {
  const rawHours = time.getHours();
  const minutes = time.getMinutes();
  let hours = rawHours % 12 || 12;

  const periodStr = rawHours < 12 ? 'MORNING' : rawHours < 17 ? 'AFTERNOON' : 'EVENING';

  let text = 'IT IS ';
  if (minutes === 0) {
    text += `${NUMBERS_WORDS[hours]} O'CLOCK IN THE ${periodStr}`;
  } else if (minutes === 15) {
    text += `QUARTER PAST ${NUMBERS_WORDS[hours]} IN THE ${periodStr}`;
  } else if (minutes === 30) {
    text += `HALF PAST ${NUMBERS_WORDS[hours]} IN THE ${periodStr}`;
  } else if (minutes === 45) {
    const nextH = (hours % 12) + 1;
    text += `QUARTER TO ${NUMBERS_WORDS[nextH]} IN THE ${periodStr}`;
  } else if (minutes < 30) {
    const mWord = minutes <= 20 ? NUMBERS_WORDS[minutes] : `TWENTY-${NUMBERS_WORDS[minutes - 20]}`;
    text += `${mWord} ${minutes === 1 ? 'MINUTE' : 'MINUTES'} PAST ${NUMBERS_WORDS[hours]} IN THE ${periodStr}`;
  } else {
    const remain = 60 - minutes;
    const nextH = (hours % 12) + 1;
    const mWord = remain <= 20 ? NUMBERS_WORDS[remain] : `TWENTY-${NUMBERS_WORDS[remain - 20]}`;
    text += `${mWord} ${remain === 1 ? 'MINUTE' : 'MINUTES'} TO ${NUMBERS_WORDS[nextH]} IN THE ${periodStr}`;
  }

  return (
    <div className="flex flex-col items-center text-center select-none max-w-3xl px-4 animate-fade-in">
      <div className="px-6 sm:px-10 py-8 sm:py-12 rounded-3xl bg-[#0d0f16]/60 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] border border-white/10">
        <p className="font-mono text-xs uppercase tracking-widest text-[#38e1ff] mb-4 font-semibold">
          Natural Language Time
        </p>

        <h2
          className="word-clock-heading text-[#f1f2f6] uppercase"
          style={{ textShadow: '0 4px 30px rgba(0, 0, 0, 0.9)' }}
        >
          {text}
        </h2>

        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffb347] animate-ping" />
          <p className="font-mono text-xs uppercase tracking-wider text-[#ffe7ce] font-medium">
            Silent Meridian Observation
          </p>
        </div>
      </div>
    </div>
  );
}
