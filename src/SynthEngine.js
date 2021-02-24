class SynthEngine {
  settings = {
    master: {
      level: 1,
    },
    amp: {
      attack: 0.01,
      release: 1.5,
    },
    filter: {
      cutoff: 350,
      resonance: 0,
      envelope: .5,
      attack: 0,
      release: 1.5,
    }
  };

  constructor() {
    this.initializeAudioContext();
    this.initializeOscillatorNode();
    this.initializeFilterNode();
    this.initializeGainNode();

    // connect nodes
    this.oscillatorNode.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    // start oscillator
    this.oscillatorNode.start();
  }

  setLevel(value) {
    this.settings.master.level = value;
  }

  setAmpAttack(value) {
    this.settings.amp.attack = value + .01;
  }

  setAmpRelease(value) {
    this.settings.amp.release = value;
  }

  setFilterCutoff(value) {
    this.settings.filter.cutoff = value;
  }

  setFilterResonance(value) {
    this.settings.filter.resonance = value;
  }

  setFilterEnvelope(value) {
    this.settings.filter.envelope = value;
  }

  setFilterAttack(value) {
    this.settings.filter.attack = value;
  }

  setFilterRelease(value) {
    this.settings.filter.release = value;
  }

  initializeAudioContext() {
    // create web audio api context
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  initializeOscillatorNode() {
    const real = new Float32Array(2);
    const imag = new Float32Array(2);

    real[0] = 0;
    imag[0] = 0;
    real[1] = 1;
    imag[1] = 0;

    // create custom waveform
    const wave = this.audioContext.createPeriodicWave(real, imag, { disableNormalization: true });
    // create Oscillator node
    this.oscillatorNode = this.audioContext.createOscillator();
    // set custom wave type
    this.oscillatorNode.setPeriodicWave(wave);
    // set frequency value in hertz
    this.oscillatorNode.frequency.value = 440;
  }

  initializeGainNode() {
    // create Gain node
    this.gainNode = this.audioContext.createGain();
    // set gain to 0 (no output)
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
  }

  initializeFilterNode() {
    this.filterNode = this.audioContext.createBiquadFilter();
    this.filterNode.type = 'lowpass';
  }

  playTone(frequency) {
    const now = this.audioContext.currentTime;

    this.oscillatorNode.frequency.value = frequency;

    // filter setup and envelope
    this.filterNode.detune.cancelScheduledValues(now);
    this.filterNode.frequency.value = this.settings.filter.cutoff;
    this.filterNode.Q.value = this.settings.filter.resonance;
    this.filterNode.detune.setValueAtTime(0, now);
    this.filterNode.detune.linearRampToValueAtTime(
      this.settings.filter.envelope * 7200,
      now + this.settings.filter.attack,
    );
    this.filterNode.detune.setTargetAtTime(
      0,
      now + this.settings.filter.attack,
      this.settings.filter.release / 10,
    );
    this.filterNode.detune.setValueAtTime(0, now + this.settings.filter.attack + this.settings.filter.release);

    // amp setup and envelope
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.value = 0.0;
    this.gainNode.gain.setValueAtTime(0.0, now);
    this.gainNode.gain.linearRampToValueAtTime(
      this.settings.master.level,
      now + this.settings.amp.attack,
    );
    this.gainNode.gain.setTargetAtTime(
      0.0,
      now + this.settings.amp.attack,
      this.settings.amp.release / 10,
    );
    this.gainNode.gain.setValueAtTime(0, now + this.settings.amp.attack + this.settings.amp.release);


  }
}

export { SynthEngine };
