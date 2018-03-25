import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Button, Input } from 'react-materialize';
import * as actions from './redux/actions';
import Loading from '../ui/Loading';
import ErrorMessage from '../ui/ErrorMessage';
/* istanbul ignore next */
export class Provider extends Component {
  static propTypes = {
    provider: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state={
    providerAddress: '',
    errorText: '',
    successText: ''
  }

  handleInputProvider(event) {
    this.setState({ providerAddress: event.target.value });
    this.setState({ errorText: '' });
    this.setState({ successText: '' });
  }

  handleSubmit() {
    if (this.state.providerAddress.length > 0) {
      if (this.state.providerAddress.substr(0, 7) === 'http://' || this.state.providerAddress.substr(0, 8) === 'https://') {
        this.props.actions.addProvider(this.state.providerAddress);
        this.props.actions.connectionStatus(this.state.providerAddress);
      } else {
        this.props.actions.addProvider(`http://${this.state.providerAddress}`);
        this.props.actions.connectionStatus(`http://${this.state.providerAddress}`);
      }
      this.setState({ successText: 'Provider registered' });
      this.setState({ errorText: '' });
      this.setState({ providerAddress: '' });
    } else {
      this.setState({ successText: '' });
      this.setState({ errorText: 'You have to enter a provider address' });
    }
  }

  render() {
    const { provider } = this.props;
    let renderConnectionStatus = null;
    if (provider) {
      if (provider.connectionStatusPending) {
        renderConnectionStatus = <Loading />;
      } else if (typeof provider.connectionStatusError === 'string') {
        const errorMsg = `Please check your provider configuration or enter a new provider (${provider.connectionStatusError})`;
        renderConnectionStatus = <ErrorMessage errorMsg={errorMsg} />;
      } else if (!provider.connectionStatusError && provider.connectionStatus) {
        renderConnectionStatus = <h5 className="center-align green-text">Your provider is correctly setted up</h5>;
      }
    }
    return (
      <div className="provider-provider">
        <h4 className="center-align">Add your provider</h4>
        <div style={{ width: '30%', marginLeft: '35.5%' }}>
          <Row className="center-align">
            <Input s={12} value={this.state.providerAddress} label="Provider address (domain name or ip address)" onChange={event => this.handleInputProvider(event)} />
            <br />
            <Button waves="light" className="orange" s={12} onClick={() => this.handleSubmit()}>Submit</Button>
            <p className="red-text">{this.state.errorText}</p>
            <p className="green-text">{this.state.successText}</p>
            {renderConnectionStatus}
          </Row>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    provider: state.provider,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}
/* istanbul ignore next */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Provider);
