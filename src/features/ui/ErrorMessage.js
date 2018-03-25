import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorMessage extends Component {
  static propTypes = {
    errorMsg: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="ui-error-message">
        <h4 className="red-text center-align">{this.props.errorMsg}</h4>
      </div>
    );
  }
}
