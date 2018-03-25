import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import ErrorMessage from '../ui/ErrorMessage';
/* istanbul ignore next */
export class DefaultPage extends Component {
  static propTypes = {
    provider: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { provider } = this.props;
    let providerRender = null;
    if (provider.provider === null) {
      providerRender = <ErrorMessage errorMsg="Please, specify a provider" />;
    } else {
      providerRender = <p>Dashboard</p>;
    }
    return (
      <div className="home-default-page">
        {providerRender}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
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
)(DefaultPage);
