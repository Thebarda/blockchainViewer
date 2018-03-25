import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'react-materialize';
import * as actions from './redux/actions';
import RenderAccount from './RenderAccount';
/* istanbul ignore next */
export class RenderAccounts extends Component {
  static propTypes = {
    accounts: PropTypes.object.isRequired,
    provider: PropTypes.string.isRequired
  };

  render() {
    const tableBody = (this.props.accounts.accounts.map((account, idx) => {
      return <RenderAccount key={idx.toString()} account={account.account} provider={this.props.provider} />;
    }));
    
    return (
      <div className="accounts-render-accounts center-align">
        <Row>
          <Col s={6} offset="s3">
            <h4>Wallets</h4>
            <Table striped hoverable>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Ether</th>
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
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
)(RenderAccounts);
