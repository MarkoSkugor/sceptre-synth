import React from 'react';
import PropTypes from 'prop-types';
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";

import './switch.scss';

gsap.registerPlugin(Draggable);

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue,
    };
    this.calculateValue = this.calculateValue.bind(this);
    this.switchRef = React.createRef();
    this.switchThumbRef = React.createRef();
  }

  componentDidMount() {
    Draggable.create(this.switchThumbRef.current, {
      type: 'x',
      // throwProps: true,
      throwProps: false,
      bounds: this.switchRef.current,
      onDrag: this.calculateValue,
    });
    this.draggableInstance = Draggable.get(this.switchThumbRef.current);
    // this.draggableInstance.vars.snap = [this.draggableInstance.minX, this.draggableInstance.maxX];
  }

  calculateValue() {
    this.setState({
      value: (this.draggableInstance.x / (this.draggableInstance.minX + this.draggableInstance.maxX)) > 0.5,
    });
  }

  render() {
    return (
      <div className='switch__container'>
        <span className='switch__label'>
          {this.props.label}
        </span>
        <div
          ref={this.switchRef}
          className={`switch switch--${this.state.value ? 'active' : 'inactive'}`}
        >
          <div ref={this.switchThumbRef} className='switch__thumb'></div>
        </div>
      </div>
    );
  }
}

Switch.propTypes = {
  label: PropTypes.string,
  initialValue: PropTypes.bool,
};

Switch.defaultProps = {
  label: '',
  initialValue: false,
};

export { Switch };
