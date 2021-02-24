class SynthEngine {
  settings = {
    master: {
      level: 1,
    },
    amp: {
      attack: 0.01,
      release: 1.5,
    },
  };

  constructor() {
    this.initializeAudioContext();
    this.initializeOscillatorNode();
    this.initializeGainNode();

    // connect nodes
    this.oscillatorNode.connect(this.gainNode);
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

  playTone(frequency) {
    const now = this.audioContext.currentTime;

    this.oscillatorNode.frequency.value = frequency;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime( 0.0, now );
    this.gainNode.gain.linearRampToValueAtTime(
      this.settings.master.level,
      now + this.settings.amp.attack,
    );
    this.gainNode.gain.linearRampToValueAtTime(
      0,
      now + this.settings.amp.attack + this.settings.amp.release,
    );
    // this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + 1);
  }
}

export { SynthEngine };
