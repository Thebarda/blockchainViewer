import React, { Component } from 'react';
import { Row, Col, Preloader } from 'react-materialize';
import PropTypes from 'prop-types';

export default class Loading extends Component {
  static propTypes = {
    size: PropTypes.string
  };

  render() {
    let sizeLoader = 'big';
    if (this.props.size) {
      sizeLoader = this.props.size;
    }
    return (
      <div className="ui-loading center-align">
        <Row>
          <Col s={6} offset="s3">
            <Preloader flashing size={sizeLoader} />
          </Col>
        </Row>
      </div>
    );
  }
}
