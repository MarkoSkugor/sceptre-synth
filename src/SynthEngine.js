class SynthEngine {
  settings = {
    master: {
      level: 1,
    },
    amp: {
      attack: 0.1,
      release: 1.5,
    },
    filter: {
      cutoff: 350,
      resonance: 0,
      envelope: .25,
      attack: 0.1,
      release: .5,
    }
  };

  constructor() {
    this.initializeAudioContext();
    this.initializeOscillatorNode();
    this.initializeFilterNode();
    this.initializeGainNode();

    // connect nodes
    this.oscillatorNode.connect(this.filterNode1);
    this.filterNode1.connect(this.filterNode2);
    this.filterNode2.connect(this.gainNode);
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
    // this.oscillatorNode.setPeriodicWave(wave);
    this.oscillatorNode.type = 'square';
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
    this.filterNode1 = this.audioContext.createBiquadFilter();
    this.filterNode2 = this.audioContext.createBiquadFilter();
    this.filterNode1.type = 'lowpass';
    this.filterNode2.type = 'lowpass';
  }

  triggerFilterEnvelope() {
    const now = this.audioContext.currentTime;

    this.filterNode1.frequency.cancelScheduledValues(now);
    this.filterNode2.frequency.cancelScheduledValues(now);
    this.filterNode1.frequency.setValueAtTime(this.filterNode1.frequency.value, now);
    this.filterNode2.frequency.setValueAtTime(this.filterNode2.frequency.value, now);
    this.filterNode1.Q.value = this.settings.filter.resonance;
    this.filterNode2.Q.value = this.settings.filter.resonance;
    this.filterNode1.frequency.linearRampToValueAtTime(
      this.settings.filter.cutoff + ((15000 - this.settings.filter.cutoff) * this.settings.filter.envelope),
      now + this.settings.filter.attack,
    );
    this.filterNode2.frequency.linearRampToValueAtTime(
      this.settings.filter.cutoff + ((15000 - this.settings.filter.cutoff) * this.settings.filter.envelope),
      now + this.settings.filter.attack,
    );
    this.filterNode1.frequency.setTargetAtTime(
      this.settings.filter.cutoff,
      now + this.settings.filter.attack,
      this.settings.filter.release / 10,
    );
    this.filterNode2.frequency.setTargetAtTime(
      this.settings.filter.cutoff,
      now + this.settings.filter.attack,
      this.settings.filter.release / 10,
    );
    this.filterNode1.frequency.setValueAtTime(this.settings.filter.cutoff, now + this.settings.filter.attack + this.settings.filter.release);
    this.filterNode2.frequency.setValueAtTime(this.settings.filter.cutoff, now + this.settings.filter.attack + this.settings.filter.release);
  }

  triggerAmpEnvelope() {
    const now = this.audioContext.currentTime;

    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
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

  playTone(frequency) {
    this.oscillatorNode.frequency.value = frequency;

    this.triggerFilterEnvelope();
    this.triggerAmpEnvelope();
  }
}

export { SynthEngine };
