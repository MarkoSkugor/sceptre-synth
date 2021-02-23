import React from 'react';
import PropTypes from 'prop-types';

import './keyboard.scss';

class Octave{
  constructor(a){
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

// const keyMap = {
//   C1: 32.70320,
//   Csharp1: 34.64783,
//   D1: 36.70810,
//   Dsharp1: 38.89087,
//   E1: 41.20344,
//   F1: 43.65353,
//   Fsharp1: 46.24930,
// };

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    const A4 = 440;
    this.scale = []

    for(let i = -4; i < 4; i++){
      let a = A4 * Math.pow(2, i);
      let octave = new Octave(a);
      this.scale.push(octave);
    }
  }

  renderKeyboardOctave(octave) {
    return (
      <div key={octave} className='keyboard__octave'>
        <div id={`C${octave}`}></div>
        <div id={`C#${octave}`}></div>
        <div id={`D${octave}`}></div>
        <div id={`D#${octave}`}></div>
        <div id={`E${octave}`}></div>
        <div id={`F${octave}`}></div>
        <div id={`F#${octave}`}></div>
        <div id={`G${octave}`}></div>
        <div id={`G#${octave}`}></div>
        <div id={`A${octave}`}></div>
        <div id={`A#${octave}`}></div>
        <div id={`B${octave}`}></div>
      </div>
    );
  }

  render() {
    const keyboardOctaves = [];
    for (let i = 0; i < this.props.numOctaves; i++) {
      keyboardOctaves.push(this.renderKeyboardOctave(i + this.props.startingOctave));
    }
    return (
      <div className="keyboard__container">
        {keyboardOctaves}
      </div>
    );
  }
}

Keyboard.propTypes = {
  numOctaves: PropTypes.number,
  startingOctave: PropTypes.number,
};

Keyboard.defaultProps = {
  numOctaves: 1,
  startingOctave: 1,
};

export { Keyboard };
