import { expect } from 'chai';

import {
  PROVIDER_ADD_PROVIDER,
} from 'src/features/provider/redux/constants';

import {
  addProvider,
  reducer,
} from 'src/features/provider/redux/addProvider';

describe('provider/redux/addProvider', () => {
  it('returns correct action by addProvider', () => {
    expect(addProvider('')).to.have.property('type', PROVIDER_ADD_PROVIDER);
    expect(addProvider('localhost')).to.have.property('provider', 'localhost');
  });

  it('handles action type ADD_PROVIDER_ADD_PROVIDER correctly', () => {
    const initialState = {
      provider: null,
      pendingConnection: null,
      connectionStatus: null
    };
    const state = reducer(
      initialState,
      {
        type: PROVIDER_ADD_PROVIDER,
        provider: 'localhost',
        payload: 'localhost'
      }
    );
    expect(state).to.not.equal(initialState); // should be immutable
    expect(state.provider).to.equal('localhost');
  });
});
