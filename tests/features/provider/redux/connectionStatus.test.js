import nock from 'nock';
import { expect } from 'chai';

import {
  PROVIDER_CONNECTION_STATUS_BEGIN,
  PROVIDER_CONNECTION_STATUS_SUCCESS,
  PROVIDER_CONNECTION_STATUS_FAILURE,
  PROVIDER_CONNECTION_STATUS_DISMISS_ERROR,
} from 'src/features/provider/redux/constants';

import { dismissConnectionStatusError, reducer } from 'src/features/provider/redux/connectionStatus';


describe('provider/redux/connectionStatus', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('returns correct action by dismissConnectionStatusError', () => {
    const expectedAction = {
      type: PROVIDER_CONNECTION_STATUS_DISMISS_ERROR,
    };
    expect(dismissConnectionStatusError()).to.deep.equal(expectedAction);
  });

  it('handles action type PROVIDER_CONNECTION_STATUS_BEGIN correctly', () => {
    const prevState = { connectionStatusPending: false };
    const state = reducer(prevState, { type: PROVIDER_CONNECTION_STATUS_BEGIN });
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.connectionStatusPending).to.be.true;
  });

  it('handles action type PROVIDER_CONNECTION_STATUS_SUCCESS correctly', () => {
    const prevState = { connectionStatusPending: true };
    const state = reducer(prevState, { type: PROVIDER_CONNECTION_STATUS_SUCCESS, data: {} });
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.connectionStatusPending).to.be.false;
    expect(state.connectionStatus).to.exist;
    expect(state.connectionStatus).to.be.equal('status');
  });

  it('handles action type PROVIDER_CONNECTION_STATUS_FAILURE correctly', () => {
    const prevState = { connectionStatusPending: true };
    const state = reducer(prevState, {
      type: PROVIDER_CONNECTION_STATUS_FAILURE,
      data: { error: new Error('some error') },
    });
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.connectionStatusPending).to.be.false;
    expect(state.connectionStatusError).to.exist;
    expect(state.connectionStatus).to.exist;
    expect(state.connectionStatus).to.be.equal('status');
  });

  it('handles action type PROVIDER_CONNECTION_STATUS_DISMISS_ERROR correctly', () => {
    const prevState = { connectionStatusError: new Error('some error') };
    const state = reducer(prevState, { type: PROVIDER_CONNECTION_STATUS_DISMISS_ERROR });
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.connectionStatusError).to.be.null;
  });
});
