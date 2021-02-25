import React from 'react';
import PropTypes from 'prop-types';

import './keyboard.scss';

const KEY_MAP = {
  a: 'c',
  w: 'cSharp',
  s: 'd',
  e: 'dSharp',
  d: 'e',
  f: 'f',
  t: 'fSharp',
  g: 'g',
  y: 'gSharp',
  h: 'a',
  u: 'aSharp',
  j: 'b',
  k: 'c',
  o: 'cSharp',
  l: 'd',
  p: 'dSharp',
};

class Keyboard extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', ({ key }) => {
      if (KEY_MAP[key]) {
        let octave = this.props.startingOctave;
        if ('kolp'.indexOf(key) !== -1) octave += 1;
        this.props.onKeyPressed(octave, KEY_MAP[key])
        this.triggerKeyPressActiveState(key, octave);
      }
    });
  }

  triggerKeyPressActiveState(key, octave) {
    const keyElement = document.getElementById(`${KEY_MAP[key]}${octave}`);

    if (keyElement) {
      keyElement.classList.add('active');
      setTimeout(() => {
        keyElement.classList.remove('active');
      }, 100);
    }
  }

  renderKeyboardOctave(octave) {
    return (
      <div key={octave} className='keyboard__octave'>
        <button id={`c${octave}`} onClick={() => this.props.onKeyPressed(octave, 'c')}></button>
        <button id={`cSharp${octave}`} onClick={() => this.props.onKeyPressed(octave, 'cSharp')}></button>
        <button id={`d${octave}`} onClick={() => this.props.onKeyPressed(octave, 'd')}></button>
        <button id={`dSharp${octave}`} onClick={() => this.props.onKeyPressed(octave, 'dSharp')}></button>
        <button id={`e${octave}`} onClick={() => this.props.onKeyPressed(octave, 'e')}></button>
        <button id={`f${octave}`} onClick={() => this.props.onKeyPressed(octave, 'f')}></button>
        <button id={`fSharp${octave}`} onClick={() => this.props.onKeyPressed(octave, 'fSharp')}></button>
        <button id={`g${octave}`} onClick={() => this.props.onKeyPressed(octave, 'g')}></button>
        <button id={`gSharp${octave}`} onClick={() => this.props.onKeyPressed(octave, 'gSharp')}></button>
        <button id={`a${octave}`} onClick={() => this.props.onKeyPressed(octave, 'a')}></button>
        <button id={`aSharp${octave}`} onClick={() => this.props.onKeyPressed(octave, 'aSharp')}></button>
        <button id={`b${octave}`} onClick={() => this.props.onKeyPressed(octave, 'b')}></button>
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
  onKeyPressed: PropTypes.func.isRequired,
};

Keyboard.defaultProps = {
  numOctaves: 1,
  startingOctave: 1,
};

export { Keyboard };
