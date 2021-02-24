import React from 'react';
import PropTypes from 'prop-types';

import './keyboard.scss';

class Keyboard extends React.Component {
  createKeyPressedCallback(octave, note) {
    return () => {
      this.props.onKeyPressed(octave, note)
    };
  }

  renderKeyboardOctave(octave) {
    return (
      <div key={octave} className='keyboard__octave'>
        <button onClick={this.createKeyPressedCallback(octave, 'c')}></button>
        <button onClick={this.createKeyPressedCallback(octave, 'cSharp')}></button>
        <button onClick={this.createKeyPressedCallback(octave, 'd')}></button>
        <button onClick={this.createKeyPressedCallback(octave, 'dSharp')}></button>
        <button onClick={this.createKeyPressedCallback(octave, 'e')}></button>
        <button onClick={this.createKeyPressedCallback(octave, 'f')}></button>
        <button onClick={this.createKeyPressedCallback(octave, 'fSharp')}></button>
        <button onClick={this.createKeyPressedCallback(octave, 'g')}></button>
        <button onClick={this.createKeyPressedCallback(octave, 'gSharp')}></button>
        <button onClick={this.createKeyPressedCallback(octave, 'a')}></button>
        <button onClick={this.createKeyPressedCallback(octave, 'aSharp')}></button>
        <button onClick={this.createKeyPressedCallback(octave, 'b')}></button>
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
