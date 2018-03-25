import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Loading from '../ui/Loading';
/* istanbul ignore next */
export class RenderAccount extends Component {
  static propTypes = {
    accounts: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    provider: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired
  };

  componentWillMount() {
    this.props.actions.getBalance(this.props.provider, this.props.account);
  }

  render() {
    const account = this.props.accounts.accounts.filter(acc => acc.account === this.props.account)[0];
    let balance = null;
    if (this.props.accounts.getBalancePending) {
      balance = <Loading size="small" />;
    } else {
      balance = account.balance;
    }
    return (
      <tr>
        <td>{this.props.account}</td>
        <td>{balance}</td>
      </tr>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    accounts: state.accounts,
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
)(RenderAccount);
