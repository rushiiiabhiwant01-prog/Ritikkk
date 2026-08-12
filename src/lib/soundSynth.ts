// Web Audio API Sound Synthesizer for Chacha's Salone FX

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playScissorSnip() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // First snip
    createSnipSound(ctx, now);
    // Second snip quick double click
    createSnipSound(ctx, now + 0.12);
  } catch (e) {
    console.warn('Audio FX error:', e);
  }
}

function createSnipSound(ctx: AudioContext, startTime: number) {
  // White noise burst for metallic friction
  const bufferSize = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  // Highpass filter for metallic blade click
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(3200, startTime);
  filter.Q.setValueAtTime(4, startTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, startTime);
  gain.gain.exponentialRampToValueAtTime(0.6, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.07);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(startTime);
  noise.stop(startTime + 0.08);

  // Metallic ping tone
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(2400, startTime);
  osc.frequency.exponentialRampToValueAtTime(1200, startTime + 0.05);

  oscGain.gain.setValueAtTime(0.15, startTime);
  oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + 0.06);
}

export function playWaterSpray() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const duration = 0.35;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + duration);
    filter.Q.setValueAtTime(1.5, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  } catch (e) {
    console.warn('Audio FX error:', e);
  }
}

let massageOscillator: OscillatorNode | null = null;
let massageGainNode: GainNode | null = null;

export function startHeadMassageRumble() {
  try {
    const ctx = getAudioContext();
    if (massageOscillator) return;

    const now = ctx.currentTime;
    massageOscillator = ctx.createOscillator();
    massageGainNode = ctx.createGain();

    massageOscillator.type = 'sawtooth';
    massageOscillator.frequency.setValueAtTime(95, now);

    // LFO for vibration pulse
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(18, now); // 18 Hz vibration
    lfoGain.gain.setValueAtTime(25, now);

    lfo.connect(massageOscillator.frequency);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now);

    massageGainNode.gain.setValueAtTime(0.01, now);
    massageGainNode.gain.linearRampToValueAtTime(0.25, now + 0.2);

    massageOscillator.connect(filter);
    filter.connect(massageGainNode);
    massageGainNode.connect(ctx.destination);

    lfo.start(now);
    massageOscillator.start(now);
  } catch (e) {
    console.warn('Audio FX error:', e);
  }
}

export function stopHeadMassageRumble() {
  try {
    if (massageOscillator && massageGainNode && audioCtx) {
      const now = audioCtx.currentTime;
      massageGainNode.gain.linearRampToValueAtTime(0.001, now + 0.2);
      setTimeout(() => {
        if (massageOscillator) {
          massageOscillator.stop();
          massageOscillator.disconnect();
          massageOscillator = null;
          massageGainNode = null;
        }
      }, 220);
    }
  } catch (e) {
    console.warn('Audio FX error:', e);
  }
}

export function playRadioTuningStatic() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 0.4;

    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  } catch (e) {
    console.warn('Audio FX error:', e);
  }
}

export function playChaiSipSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.3);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch (e) {
    console.warn('Audio FX error:', e);
  }
}
