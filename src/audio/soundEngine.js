/**
 * AuraFocus Procedural Ambient Audio Synthesizer
 * Built using native Web Audio API nodes.
 * Completely zero-asset, infinite, offline-capable soundscapes.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.currentSound = null;
    this.activeNodes = [];
    this.volume = 0.5;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      const target = muted ? 0 : this.volume;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
  }

  stopCurrent() {
    if (this.activeNodes && this.activeNodes.length > 0) {
      this.activeNodes.forEach(node => {
        try {
          if (node.stop) node.stop();
          if (node.disconnect) node.disconnect();
          if (node.intervalId) clearInterval(node.intervalId);
        } catch (e) {
          // ignore cleanup errors
        }
      });
      this.activeNodes = [];
    }
    this.currentSound = null;
  }

  play(soundType) {
    this.init();
    if (!this.ctx) return;

    if (this.currentSound === soundType) {
      this.stopCurrent();
      return null;
    }

    this.stopCurrent();
    this.currentSound = soundType;

    switch (soundType) {
      case 'Rainfall':
        this.createRainfall();
        break;
      case 'Night Forest':
        this.createNightForest();
        break;
      case 'Cosmic Static':
        this.createDeepSpace();
        break;
      case 'Fire Hearth':
        this.createHearthFire();
        break;
      case 'Ocean Waves':
        this.createOceanWaves();
        break;
      default:
        this.currentSound = null;
        break;
    }

    return this.currentSound;
  }

  // Pink noise generator buffer
  createNoiseBuffer(seconds = 5) {
    const bufferSize = this.ctx.sampleRate * seconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  // 1. Rainfall: Pink noise + filtered hiss + randomized drop taps
  createRainfall() {
    const noiseBuffer = this.createNoiseBuffer(6);
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 850;

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 180;

    const rainGain = this.ctx.createGain();
    rainGain.gain.value = 0.6;

    noiseSource.connect(filter);
    filter.connect(highpass);
    highpass.connect(rainGain);
    rainGain.connect(this.masterGain);

    noiseSource.start();
    this.activeNodes.push(noiseSource, filter, highpass, rainGain);

    // Occasional gentle droplet impacts
    const dropInterval = setInterval(() => {
      if (!this.ctx || this.currentSound !== 'Rainfall') return;
      if (Math.random() > 0.4) {
        const osc = this.ctx.createOscillator();
        const dropGain = this.ctx.createGain();
        osc.type = 'sine';
        const startFreq = 1200 + Math.random() * 800;
        osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.08);

        dropGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

        osc.connect(dropGain);
        dropGain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.09);
      }
    }, 280);

    this.activeNodes.push({ intervalId: dropInterval });
  }

  // 2. Night Forest: Soft ambient breeze + nocturnal cricket chirps
  createNightForest() {
    // Soft wind bed
    const noiseBuffer = this.createNoiseBuffer(5);
    const wind = this.ctx.createBufferSource();
    wind.buffer = noiseBuffer;
    wind.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 400;
    windFilter.Q.value = 1.5;

    const windGain = this.ctx.createGain();
    windGain.gain.value = 0.15;

    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.masterGain);
    wind.start();

    this.activeNodes.push(wind, windFilter, windGain);

    // Cricket chirp pulses
    const cricketInterval = setInterval(() => {
      if (!this.ctx || this.currentSound !== 'Night Forest') return;
      if (Math.random() > 0.3) {
        const chirps = 2 + Math.floor(Math.random() * 3);
        const baseFreq = 4500 + Math.random() * 400;
        let t = this.ctx.currentTime;
        
        for (let i = 0; i < chirps; i++) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(baseFreq, t);

          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.025, t + 0.015);
          gain.gain.linearRampToValueAtTime(0, t + 0.035);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(t);
          osc.stop(t + 0.04);
          t += 0.045;
        }
      }
    }, 450);

    this.activeNodes.push({ intervalId: cricketInterval });
  }

  // 3. Deep Space Drone: Dual resonant sub-bass oscillators + phased slow LFO
  createDeepSpace() {
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();

    osc1.type = 'sine';
    osc1.frequency.value = 73.42; // D2
    osc2.type = 'sine';
    osc2.frequency.value = 74.1; // gentle chorus beat frequency

    subOsc.type = 'triangle';
    subOsc.frequency.value = 36.71; // sub octave

    const spaceGain = this.ctx.createGain();
    spaceGain.gain.value = 0.35;

    // Slow LFO filter sweep
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.08; // 12 second cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 40;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 160;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    subOsc.connect(filter);
    filter.connect(spaceGain);
    spaceGain.connect(this.masterGain);

    osc1.start();
    osc2.start();
    subOsc.start();
    lfo.start();

    this.activeNodes.push(osc1, osc2, subOsc, lfo, lfoGain, filter, spaceGain);
  }

  // 4. Warm Hearth: Soft warm low rumble + randomized fire crackle impulses
  createHearthFire() {
    const noiseBuffer = this.createNoiseBuffer(4);
    const rumble = this.ctx.createBufferSource();
    rumble.buffer = noiseBuffer;
    rumble.loop = true;

    const rumbleFilter = this.ctx.createBiquadFilter();
    rumbleFilter.type = 'lowpass';
    rumbleFilter.frequency.value = 240;

    const rumbleGain = this.ctx.createGain();
    rumbleGain.gain.value = 0.45;

    rumble.connect(rumbleFilter);
    rumbleFilter.connect(rumbleGain);
    rumbleGain.connect(this.masterGain);
    rumble.start();

    this.activeNodes.push(rumble, rumbleFilter, rumbleGain);

    // Procedural snap / crackle pops
    const crackleInterval = setInterval(() => {
      if (!this.ctx || this.currentSound !== 'Fire Hearth') return;
      if (Math.random() > 0.4) {
        const osc = this.ctx.createOscillator();
        const popGain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(200 + Math.random() * 1400, this.ctx.currentTime);

        const duration = 0.005 + Math.random() * 0.015;
        popGain.gain.setValueAtTime(0.03 + Math.random() * 0.04, this.ctx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(popGain);
        popGain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + duration + 0.01);
      }
    }, 120);

    this.activeNodes.push({ intervalId: crackleInterval });
  }

  // 5. Ocean Waves: Sinusoidally modulated pink noise surf
  createOceanWaves() {
    const noiseBuffer = this.createNoiseBuffer(8);
    const surf = this.ctx.createBufferSource();
    surf.buffer = noiseBuffer;
    surf.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 450;

    const waveGain = this.ctx.createGain();
    waveGain.gain.value = 0.1;

    // LFO for tide swells (approx 8 second surge cycle)
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.125;

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.35;

    lfo.connect(lfoGain);
    lfoGain.connect(waveGain.gain);

    surf.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(this.masterGain);

    surf.start();
    lfo.start();

    this.activeNodes.push(surf, filter, waveGain, lfo, lfoGain);
  }
}

export const soundEngine = new SoundEngine();
