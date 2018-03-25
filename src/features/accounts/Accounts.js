import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Loading from '../ui/Loading';
import ErrorMessage from '../ui/ErrorMessage';
import RenderAccounts from './RenderAccounts';
/* istanbul ignore next */
export class Accounts extends Component {
  static propTypes = {
    accounts: PropTypes.object.isRequired,
    provider: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    noProvider: true,
  }

  componentWillMount() {
    if (this.props.provider.provider) {
      this.startGetAccounts();
      this.setState({ noProvider: false });
    } else {
      this.setState({ noProvider: true });
    }
  }

  startGetAccounts() {
    const { actions, provider } = this.props;
    actions.getAccountsProvider(provider.provider);
  }

  render() {
    const { noProvider } = this.state;
    const { accounts, provider } = this.props;
    let rendered = null;
    if (!noProvider) {
      if (accounts.getAccountsProviderPending) {
        rendered = <Loading />;
      } else if (accounts.getAccountsProviderError) {
        const errorMsg = `Please check your provider configuration or enter a new provider (${accounts.getAccountsProviderError})`;
        rendered = <ErrorMessage errorMsg={errorMsg} />;
      } else {
        rendered = <RenderAccounts provider={provider.provider} />;
      }
    } else {
      rendered = <ErrorMessage errorMsg="Please, specify a provider" />;
    }
    return (
      <div className="accounts-accounts">
        {rendered}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    accounts: state.accounts,
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
)(Accounts);
