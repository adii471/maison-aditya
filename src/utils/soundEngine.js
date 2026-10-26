/**
 * Web Audio API Ambient Sound Generator
 * Synthesizes warm roastery fireplace crackle & gentle highland wind.
 * 100% self-contained — zero audio file dependencies.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.noiseNode = null;
    this.filterNode = null;
    this.crackleTimer = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    // Master Gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    // Warm Low-Pass Filter
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(450, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(2.5, this.ctx.currentTime);
    this.filterNode.connect(this.gainNode);

    // Pink / Brown Noise Buffer for wind & flame breath
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;
    this.noiseNode.connect(this.filterNode);
    this.noiseNode.start(0);
  }

  playPop() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const osc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400 + Math.random() * 800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.04);

      popGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      popGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(popGain);
      popGain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignored
    }
  }

  toggle() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      // Fade out
      this.gainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
      clearInterval(this.crackleTimer);
      this.isPlaying = false;
      return false;
    } else {
      // Fade in
      this.gainNode.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.8);
      this.isPlaying = true;

      // Random gentle crackles (wood hearth & roasting pop)
      this.crackleTimer = setInterval(() => {
        if (Math.random() > 0.4) {
          this.playPop();
        }
      }, 350);

      return true;
    }
  }

  playChime() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.08 + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + i * 0.08);
      osc.stop(this.ctx.currentTime + i * 0.08 + 0.9);
    });
  }
}

export const soundEngine = new SoundEngine();
