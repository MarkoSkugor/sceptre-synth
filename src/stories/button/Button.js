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
    this.timeout = setTimeout(() => {
      this.setState({ active: false });
    }, 50);
  }

  componentWillUnmount () {
    clearTimeout(this.timeout);
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
          {this.props.children}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  onClick: undefined,
};

export { Button };
