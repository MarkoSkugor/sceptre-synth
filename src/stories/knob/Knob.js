import React from 'react';
import PropTypes from 'prop-types';
import { gsap, TweenLite } from "gsap";
import Draggable from "gsap/Draggable";

import './knob.scss';

gsap.registerPlugin(Draggable);

class Knob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue.toFixed(props.precision),
    };
    this.calculateRotation = this.calculateRotation.bind(this);
    this.calculateValue = this.calculateValue.bind(this);
    this.knobRef = React.createRef();
  }

  componentDidMount() {
    TweenLite.set(this.knobRef.current, {
      rotation: this.calculateRotation()
    });

    Draggable.create(this.knobRef.current, {
      type: 'rotation',
      throwProps: false,
      edgeResistance: 0.85,
      onDrag: this.calculateValue,
      bounds: {
        minRotation: -150,
        maxRotation: 150
      }
    });
    this.draggableInstance = Draggable.get(this.knobRef.current);
  }

  calculateValue() {
    const range = Math.abs(this.props.minValue - this.props.maxValue)
    let rotation = this.draggableInstance.rotation / 300 + .5;
    let value;

    if (rotation <= 0) {
        rotation = 0;
    }

    if (rotation >= 1) {
        rotation = 1;
    }

    value = ((rotation * parseFloat(range)) + this.props.minValue).toFixed(this.props.precision);

    this.setState({ value });
    this.props.valueChanged(parseFloat(value));
  }

  calculateRotation() {
    const range = Math.abs(this.props.minValue - this.props.maxValue);
    const rotation = ((this.state.value - this.props.minValue)/range - .5) * 300;

    return rotation;
  }

  render() {
    return (
      <div className='knob__container'>
        <span className='knob__label'>
          {this.props.label}
        </span>
        <div
          ref={this.knobRef}
          className='knob'
        ></div>
        <span className='knob__value'>
          {this.state.value}{this.props.units}
        </span>
      </div>
    );
  }
}

Knob.propTypes = {
  label: PropTypes.string,
  units: PropTypes.string,
  precision: PropTypes.number,
  initialValue: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  valueChanged: PropTypes.func.isRequired,
};

Knob.defaultProps = {
  label: '',
  units: '',
  precision: 2,
  initialValue: 0,
  minValue: 0,
  maxValue: 1,
};

export { Knob };
