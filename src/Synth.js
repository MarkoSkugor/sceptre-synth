import React from 'react';
import './Synth.scss';

import {
  Button,
  Knob,
  Keyboard,
} from './stories';

import { SynthEngine } from './SynthEngine';

class Octave {
  constructor(a) {
    this.b      = a *  Math.pow(2, 2/12);
    this.aSharp = a *  Math.pow(2, 1/12);
    this.a = a;
    this.gSharp = a *  Math.pow(2, -1/12);
    this.g      = a *  Math.pow(2, -2/12);
    this.fSharp = a *  Math.pow(2, -3/12);
    this.f      = a *  Math.pow(2, -4/12);
    this.e      = a *  Math.pow(2, -5/12);
    this.dSharp = a *  Math.pow(2, -6/12);
    this.d      = a *  Math.pow(2, -7/12);
    this.cSharp = a *  Math.pow(2, -8/12);
    this.c      = a *  Math.pow(2, -9/12);
  }
}

class Synth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      waveForm: 'square',
      startingOctave: 3,
    };
    this.initializeScale();
    this.start = this.start.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.setReverb = this.setReverb.bind(this);
    this.setAmpAttack = this.setAmpAttack.bind(this);
    this.setAmpRelease = this.setAmpRelease.bind(this);
    this.setFilterCutoff = this.setFilterCutoff.bind(this);
    this.setFilterResonance = this.setFilterResonance.bind(this);
    this.setFilterEnvelope = this.setFilterEnvelope.bind(this);
    this.setFilterAttack = this.setFilterAttack.bind(this);
    this.setFilterRelease = this.setFilterRelease.bind(this);
    this.setWaveForm = this.setWaveForm.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }

  start() {
    this.setState({ started: true });
    this.synthEngine = new SynthEngine();
  }

  initializeScale() {
    const A4 = 440;
    this.scale = [];

    for (let i = -4; i < 4; i++) {
      let a = A4 * Math.pow(2, i);
      let octave = new Octave(a);
      this.scale.push(octave);
    }
  }

  setLevel(value) {
    this.synthEngine.setLevel(value);
  }

  setReverb(value) {
    this.synthEngine.setReverb(value);
  }

  setAmpAttack(value) {
    this.synthEngine.setAmpAttack(value);
  }

  setAmpRelease(value) {
    this.synthEngine.setAmpRelease(value);
  }

  setFilterCutoff(value) {
    this.synthEngine.setFilterCutoff(value);
  }

  setFilterResonance(value) {
    this.synthEngine.setFilterResonance(value);
  }

  setFilterEnvelope(value) {
    this.synthEngine.setFilterEnvelope(value);
  }

  setFilterAttack(value) {
    this.synthEngine.setFilterAttack(value);
  }

  setFilterRelease(value) {
    this.synthEngine.setFilterRelease(value);
  }

  setWaveForm(waveForm) {
    this.setState({ waveForm });
    this.synthEngine.setWaveForm(waveForm);
  }

  onKeyPressed(octave, note) {
    this.synthEngine.playTone(this.scale[octave][note]);
  }

  setStartingOctave(octave) {
    this.setState({ startingOctave: octave });
  }

  render() {
    if (!this.state.started) {
      return (
        <Button onClick={this.start}>Click To Begin</Button>
      );
    }

    return (
      <div className='synth'>
        <div className='flex justify-center'>
          <div className='synth__controls'>
            <div className='flex justify-center'>
              <div className='section section__octave-buttons'>
                <span className='section__label'>Octave</span>
                <Button
                  disabled={this.state.startingOctave === 7}
                  onClick={() => this.setStartingOctave(this.state.startingOctave + 1)}
                  aria-label='up'
                >
                  &#9651;
                </Button>
                <Button
                  disabled={this.state.startingOctave === 0}
                  onClick={() => this.setStartingOctave(this.state.startingOctave - 1)}
                  aria-label='down'
                >
                  &#9661;
                </Button>
              </div>
              <div className='section'>
                <span className='section__label'>Master</span>
                <Knob
                  label='Level'
                  precision={2}
                  initialValue={1}
                  minValue={0}
                  maxValue={1}
                  valueChanged={this.setLevel}
                ></Knob>
                <Knob
                  label='Reverb'
                  precision={2}
                  initialValue={.25}
                  minValue={0}
                  maxValue={1}
                  valueChanged={this.setReverb}
                ></Knob>
              </div>
              <div className='section'>
                <span className='section__label'>Amp Envelope</span>
                <Knob
                  label='Attack'
                  units='s'
                  precision={2}
                  initialValue={0.1}
                  minValue={0.01}
                  maxValue={10}
                  valueChanged={this.setAmpAttack}
                ></Knob>
                <Knob
                  label='Release'
                  units='s'
                  precision={2}
                  initialValue={1.5}
                  minValue={0.1}
                  maxValue={10}
                  valueChanged={this.setAmpRelease}
                ></Knob>
              </div>
            </div>
            <div className='flex justify-center'>
              <div className='section'>
                <span className='section__label'>Filter Envelope</span>
                <Knob
                  label='Attack'
                  units='s'
                  precision={2}
                  initialValue={0.1}
                  minValue={0.01}
                  maxValue={10}
                  valueChanged={this.setFilterAttack}
                ></Knob>
                <Knob
                  label='Release'
                  units='s'
                  precision={2}
                  initialValue={.5}
                  minValue={0.01}
                  maxValue={10}
                  valueChanged={this.setFilterRelease}
                ></Knob>
              </div>
              <div className='section'>
                <span className='section__label'>Filter</span>
                <Knob
                  label='Cutoff'
                  units='Hz'
                  precision={0}
                  initialValue={350}
                  minValue={20}
                  maxValue={15000}
                  valueChanged={this.setFilterCutoff}
                ></Knob>
                <Knob
                  label='Resonance'
                  precision={2}
                  initialValue={0}
                  minValue={0}
                  maxValue={10}
                  valueChanged={this.setFilterResonance}
                ></Knob>
                <Knob
                  label='Envelope'
                  precision={2}
                  initialValue={.25}
                  minValue={0}
                  maxValue={1}
                  valueChanged={this.setFilterEnvelope}
                ></Knob>
              </div>
            </div>
          </div>
          <div className='section'>
            <span className='section__label'>Waveform</span>
            <Button
              disabled={this.state.waveForm === 'sine'}
              onClick={() => this.setWaveForm('sine')}
            >
              Sine
            </Button>
            <Button
              disabled={this.state.waveForm === 'square'}
              onClick={() => this.setWaveForm('square')}
            >
              Square
            </Button>
            <Button
              disabled={this.state.waveForm === 'triangle'}
              onClick={() => this.setWaveForm('triangle')}
            >
              Triangle
            </Button>
            <Button
              disabled={this.state.waveForm === 'sawtooth'}
              onClick={() => this.setWaveForm('sawtooth')}
            >
              Sawtooth
            </Button>
          </div>
        </div>
        <Keyboard
          numOctaves={2}
          startingOctave={this.state.startingOctave}
          onKeyPressed={this.onKeyPressed}
        >
        </Keyboard>
      </div>
    );
  }
}

export { Synth };
