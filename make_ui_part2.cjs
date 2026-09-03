const fs = require('fs');
const path = require('path');

function write(rel, content) {
  const p = path.join(__dirname, rel);
  const d = path.dirname(p);
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(p, content.trim() + '\n', 'utf8');
  console.log('Wrote ' + rel);
}

// 1. audioSynthesis.js
write('client/src/utils/audioSynthesis.js', `class SoundEngine {
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
    if (mode === 'day') { this.startDayAmbiance(); }
    else { this.startNightAmbiance(); }
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) clearInterval(this.timerId);
    this.oscillators.forEach(o => { try { o.stop(); o.disconnect(); } catch (e) {} });
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
    const o1 = this.ctx.createOscillator();
    const o2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    o1.type = 'sine';
    o1.frequency.setValueAtTime(220, this.ctx.currentTime);
    o2.type = 'triangle';
    o2.frequency.setValueAtTime(329.63, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    o1.connect(filter);
    o2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    o1.start();
    o2.start();
    this.oscillators.push(o1, o2);

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
      oRæg&WVVæ7’æW‡öæVçF–Å&×FõfÇVTEF–ÖR†&6Tg&W²SÂæ÷r²ã‚“°¢õ.frequency.exponentialRampToValueAtTime(baseFreq - 200, now + 0.16);

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
    const o1 = this.ctx.createOscillator();
    const o2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    o1.type = 'sine';
    o1.frequency.setValueAtTime(146.83, this.ctx.currentTime);
    o2.type = 'sine';
    o2.frequency.setValueAtTime(220.00, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);

    o1.connect(filter);
    o2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    o1.start();
    o2.start();
    this.oscillators.push(o1, o2);

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
`);
