import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick($event) {
    this.props.onClick($event);
    this.setState({ active: true });
    setTimeout(() => {
      this.setState({ active: false });
    }, 50);
  }

  render() {
    return (
      <div className='button__container'>
        <button
          disabled={this.props.disabled}
          type="button"
          className={`button ${this.state.active ? 'active' : ''}`}
          onClick={this.handleButtonClick}
        >
          {this.props.label}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  onClick: undefined,
};

export { Button };
