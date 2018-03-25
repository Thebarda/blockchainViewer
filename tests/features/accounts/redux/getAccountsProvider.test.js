import nock from 'nock';
import { expect } from 'chai';

import {
  ACCOUNTS_GET_ACCOUNTS_PROVIDER_BEGIN,
  ACCOUNTS_GET_ACCOUNTS_PROVIDER_SUCCESS,
  ACCOUNTS_GET_ACCOUNTS_PROVIDER_FAILURE,
  ACCOUNTS_GET_ACCOUNTS_PROVIDER_DISMISS_ERROR,
} from 'src/features/accounts/redux/constants';

import {
  dismissGetAccountsProviderError,
  reducer,
} from 'src/features/accounts/redux/getAccountsProvider';

describe('accounts/redux/getAccountsProvider', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('returns correct action by dismissGetAccountsProviderError', () => {
    const expectedAction = {
      type: ACCOUNTS_GET_ACCOUNTS_PROVIDER_DISMISS_ERROR,
    };
    expect(dismissGetAccountsProviderError()).to.deep.equal(expectedAction);
  });

  it('handles action type ACCOUNTS_GET_ACCOUNTS_PROVIDER_BEGIN correctly', () => {
    const prevState = { getAccountsProviderPending: false };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_GET_ACCOUNTS_PROVIDER_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountsProviderPending).to.be.true;
  });

  it('handles action type ACCOUNTS_GET_ACCOUNTS_PROVIDER_SUCCESS correctly', () => {
    const prevState = { getAccountsProviderPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_GET_ACCOUNTS_PROVIDER_SUCCESS, data: ['0xB5440CD797557923AEfaB4BcbA7a707A4e43F1D3', '0x0A5fC82c8a1BabE607591F6159832523B207D0E8'] }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountsProviderPending).to.be.false;
    expect(state.accounts.length).to.be.equal(2);
    expect(state.accounts[0].account).to.be.equal('0xB5440CD797557923AEfaB4BcbA7a707A4e43F1D3');
    expect(state.accounts[0].balance).to.be.equal(0);
  });

  it('handles action type ACCOUNTS_GET_ACCOUNTS_PROVIDER_FAILURE correctly', () => {
    const prevState = { getAccountsProviderPending: true };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_GET_ACCOUNTS_PROVIDER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountsProviderPending).to.be.false;
    expect(state.getAccountsProviderError).to.exist;
  });

  it('handles action type ACCOUNTS_GET_ACCOUNTS_PROVIDER_DISMISS_ERROR correctly', () => {
    const prevState = { getAccountsProviderError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCOUNTS_GET_ACCOUNTS_PROVIDER_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getAccountsProviderError).to.be.null;
  });
});
