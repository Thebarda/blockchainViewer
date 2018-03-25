import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavItem, Icon } from 'react-materialize';
import ReactTooltip from 'react-tooltip';
import Provider from '../provider/Provider';
import DefaultPage from './DefaultPage';
import Accounts from '../accounts/Accounts';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
/* istanbul ignore next */
export default class App extends Component {
  state = {
    menuChoose: 'home'
  }

  handleChangeMenu(item) {
    if (this.state.menuChoose !== item) {
      this.setState({ menuChoose: item });
    }
  }

  render() {
    let renderedComponent = null;
    switch (this.state.menuChoose) {
      case 'provider':
        renderedComponent = <Provider />;
        break;
      case 'accounts':
        renderedComponent = <Accounts />;
        break;
      default:
        renderedComponent = <DefaultPage />;
    }
    return (
      <div className="home-app">
        <Navbar id="homeClick" className="grey darken-3" brand="Blockchain Viewer" right>
          <NavItem className="waves-effect waves-light" href="#" onClick={() => this.handleChangeMenu('home')}><div data-tip data-for="home"><Icon large>home</Icon></div></NavItem>
          <ReactTooltip id="home" effect="solid">
            <span>Home</span>
          </ReactTooltip>
          <NavItem id="providerClick" className="waves-effect waves-light" href="#" onClick={() => this.handleChangeMenu('provider')}><div data-tip data-for="provider"><Icon large>laptop</Icon></div></NavItem>
          <ReactTooltip id="provider" effect="solid">
            <span>Provider</span>
          </ReactTooltip>
          <NavItem id="accountsClick" className="waves-effect waves-light" href="#" onClick={() => this.handleChangeMenu('accounts')}><div data-tip data-for="accounts"><Icon large>account_box</Icon></div></NavItem>
          <ReactTooltip id="accounts" effect="solid">
            <span>Accounts</span>
          </ReactTooltip>
          <NavItem className="waves-effect waves-light" href="#" onClick={() => this.handleChangeMenu('blocks')}><div data-tip data-for="blocks"><Icon large>apps</Icon></div></NavItem>
          <ReactTooltip id="blocks" effect="solid">
            <span>Blocks</span>
          </ReactTooltip>
          <NavItem className="waves-effect waves-light" href="#" onClick={() => this.handleChangeMenu('transactions')}><div data-tip data-for="transactions"><Icon large>import_export</Icon></div></NavItem>
          <ReactTooltip id="transactions" effect="solid">
            <span>Transactions</span>
          </ReactTooltip>
          <NavItem className="waves-effect waves-light" href="#" onClick={() => this.handleChangeMenu('logs')}><div data-tip data-for="logs"><Icon large>subject</Icon></div></NavItem>
        </Navbar>
        <ReactTooltip id="logs" effect="solid">
          <span>Logs</span>
        </ReactTooltip>
        {renderedComponent}
      </div>
    );
  }
}
