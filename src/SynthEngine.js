class SynthEngine {
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
    this.oscillatorNode.frequency.value = frequency;
    this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
    this.gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      this.audioContext.currentTime + 1,
    );
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + 1);
  }
}

export { SynthEngine };
