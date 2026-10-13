import React, { useEffect, useRef } from 'react';
import { WALLPAPERS } from '../data/wallpapers';

export function BackgroundCanvas({ currentBg, dimPercent, customBgUrl }) {
  const rainCanvasRef = useRef(null);

  // Animated rain effect when Tokyo Rain is selected
  useEffect(() => {
    if (currentBg !== 'bg-rain') return;

    const canvas = rainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const drops = [];
    const dropCount = 75;
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 15 + Math.random() * 20,
        speed: 4 + Math.random() * 6,
        opacity: 0.15 + Math.random() * 0.35,
        width: 1 + Math.random() * 1.5
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#c2f3ff';

      for (let i = 0; i < dropCount; i++) {
        const d = drops[i];
        ctx.beginPath();
        ctx.lineWidth = d.width;
        ctx.globalAlpha = d.opacity;
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1, d.y + d.length);
        ctx.stroke();

        d.y += d.speed;
        d.x -= 0.5;

        if (d.y > canvas.height) {
          d.y = -d.length;
          d.x = Math.random() * canvas.width;
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentBg]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none" id="wallpaper-container">
      {/* 1. Alpine Mountain Stars */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          currentBg === 'bg-alpine' && !customBgUrl ? 'opacity-100 animate-kenburns' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${WALLPAPERS[0].imageUrl})`,
          backgroundColor: '#070c14'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-[#08090c]/40" />
      </div>

      {/* 2. Sahara Sand Dunes */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          currentBg === 'bg-dunes' && !customBgUrl ? 'opacity-100 animate-kenburns' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${WALLPAPERS[1].imageUrl})`,
          backgroundColor: '#1a0d05'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-[#08090c]/40" />
      </div>

      {/* 3. Generative Borealis Aurora */}
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-to-tr from-[#08090c] via-[#09151e] to-[#041d24] transition-opacity duration-1000 ease-in-out ${
          currentBg === 'bg-aurora' && !customBgUrl ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute -top-[20%] -left-[10%] w-[120%] h-[120%] aurora-layer-1"
          style={{
            background: 'radial-gradient(ellipse at 40% 30%, rgba(56, 225, 255, 0.28) 0%, rgba(167, 139, 250, 0.15) 45%, transparent 70%)',
            filter: 'blur(70px)'
          }}
        />
        <div
          className="absolute -bottom-[10%] -right-[10%] w-[110%] h-[110%] aurora-layer-2"
          style={{
            background: 'radial-gradient(ellipse at 70% 60%, rgba(39, 217, 247, 0.22) 0%, rgba(109, 72, 215, 0.18) 40%, transparent 65%)',
            filter: 'blur(90px)'
          }}
        />
      </div>

      {/* 4. Deep Space Nebula */}
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-to-b from-[#090614] via-[#0b0818] to-[#05060d] transition-opacity duration-1000 ease-in-out ${
          currentBg === 'bg-nebula' && !customBgUrl ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 animate-kenburns"
          style={{
            background: 'radial-gradient(circle at 65% 45%, rgba(190, 168, 255, 0.26) 0%, rgba(79, 49, 156, 0.18) 35%, transparent 65%)',
            filter: 'blur(60px)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 25% 75%, rgba(56, 225, 255, 0.12) 0%, transparent 50%)',
            filter: 'blur(50px)'
          }}
        />
      </div>

      {/* 5. Tokyo Nocturnal Rain */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
          currentBg === 'bg-rain' && !customBgUrl ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${WALLPAPERS[4].imageUrl})`,
          backgroundColor: '#0a1017'
        }}
      >
        <canvas ref={rainCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-[#08090c]/50" />
      </div>

      {/* 6. Obsidian Void */}
      <div
        className={`absolute inset-0 w-full h-full bg-[#08090c] transition-opacity duration-1000 ease-in-out ${
          currentBg === 'bg-void' && !customBgUrl ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none animate-cyan-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(56, 225, 255, 0.05) 0%, rgba(167, 139, 250, 0.03) 40%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

      {/* 7. Custom User Wallpaper (if loaded) */}
      {customBgUrl && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 opacity-100 animate-kenburns"
          style={{ backgroundImage: `url(${customBgUrl})` }}
        />
      )}

      {/* Master Dimming & Tint Layer */}
      <div
        className="absolute inset-0 transition-colors duration-300 pointer-events-none"
        style={{
          backgroundColor: `rgba(8, 9, 12, ${dimPercent / 100})`,
          backdropFilter: dimPercent > 50 ? `blur(${((dimPercent - 50) / 10).toFixed(1)}px)` : 'none'
        }}
      />

      {/* Subtle Optical Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8, 9, 12, 0.65) 100%)'
        }}
      />
    </div>
  );
}
