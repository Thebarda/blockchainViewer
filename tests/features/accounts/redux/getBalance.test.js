import nock from 'nock';
import { expect } from 'chai';
import Web3 from 'web3';

import {
  ACCOUNTS_GET_BALANCE_BEGIN,
  ACCOUNTS_GET_BALANCE_SUCCESS,
  ACCOUNTS_GET_BALANCE_FAILURE,
  ACCOUNTS_GET_BALANCE_DISMISS_ERROR,
} from 'src/features/accounts/redux/constants';

import {
  dismissGetBalanceError,
  reducer,
} from 'src/features/accounts/redux/getBalance';

describe('accounts/redux/getBalance', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('returns correct action by dismissGetBalanceError', () => {
    const expectedAction = {
      type: ACCOUNTS_GET_BALANCE_DISMISS_ERROR,
    };
    expect(dismissGetBalanceError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNTS_GET_BALANCE_BEGIN correctly', () => {
    const prevState = { getBalancePending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_GET_BALANCE_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getBalancePending).to.be.true;
  });

  it('handles action type ACCOUNTS_GET_BALANCE_SUCCESS correctly', () => {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://vps409515.ovh.net:8545'));
    const prevState = {
      accounts: [{ account: '0xB5440CD797557923AEfaB4BcbA7a707A4e43F1D3', balance: '0' }, { account: '0x0A5fC82c8a1BabE607591F6159832523B207D0E8', balance: '0' }],
      getAccountsProviderPending: true,
      getAccountsProviderError: null,
      getBalancePending: false,
      getBalanceError: null,
    };
    const state = reducer(
      prevState,
      {
        type: ACCOUNTS_GET_BALANCE_SUCCESS,
        balance: web3.utils.fromWei('10000000000000000000', 'ether'),
        accAddr: '0xB5440CD797557923AEfaB4BcbA7a707A4e43F1D3'
      }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getBalancePending).to.be.false;
    expect(state.accounts.filter(account => account.account === '0xB5440CD797557923AEfaB4BcbA7a707A4e43F1D3')[0].balance).to.not.equal('0');
  });

  it('handles action type ACCOUNTS_GET_BALANCE_FAILURE correctly', () => {
    const prevState = { getBalancePending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_GET_BALANCE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getBalancePending).to.be.false;
    expect(state.getBalanceError).to.not.equal(null);
  });

  it('handles action type ACCOUNTS_GET_BALANCE_DISMISS_ERROR correctly', () => {
    const prevState = { getBalanceError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_GET_BALANCE_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getBalanceError).to.be.null;
  });
});
