// Web Audio API procedural atmospheric sound generator
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentMode = 'day';
    this.masterGain = null;
    this.oscillators = [];
    this.timerId = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play(mode = 'day') {
    this.init();
    this.stop();
    this.isPlaying = true;
    this.currentMode = mode;

    if (mode === 'day') {
      this.startDayAmbiance();
    } else {
      this.startNightAmbiance();
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) clearInterval(this.timerId);
    this.oscillators.forEach(o => {
      try { o.stop(); o.disconnect(); } catch (e) {}
    });
    this.oscillators = [];
  }

  toggle(mode = 'day') {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play(mode);
      return true;
    }
  }

  startDayAmbiance() {
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(329.63, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start();
    osc2.start();
    this.oscillators.push(osc1, osc2);

    this.timerId = setInterval(() => {
      if (!this.isPlaying || this.currentMode !== 'day') return;
      this.triggerBirdChirp();
    }, 4500);
  }

  triggerBirdChirp() {
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'sine';
      const now = this.ctx.currentTime;
      const baseFreq = 2400 + Math.random() * 800;
      o.frequency.setValueAtTime(baseFreq, now);
      o.frequency.exponentialRampToValueAtTime(baseFreq + 500, now + 0.08);
      o.frequency.exponentialRampToValueAtTime(baseFreq - 200, now + 0.16);

      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.04, now + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      o.connect(g);
      g.connect(this.masterGain);
      o.start(now);
      o.stop(now + 0.22);
    } catch (e) {}
  }

  startNightAmbiance() {
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(146.83, this.ctx.currentTime);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(220.00, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start();
    osc2.start();
    this.oscillators.push(osc1, osc2);

    this.timerId = setInterval(() => {
      if (!this.isPlaying || this.currentMode !== 'night') return;
      this.triggerCricketChirp();
    }, 1800);
  }

  triggerCricketChirp() {
    try {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'triangle';
      const now = this.ctx.currentTime;
      o.frequency.setValueAtTime(4500, now);
      g.gain.setValueAtTime(0.015, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      o.connect(g);
      g.connect(this.masterGain);
      o.start(now);
      o.stop(now + 0.08);
    } catch (e) {}
  }
}

export const soundEngine = new SoundEngine();