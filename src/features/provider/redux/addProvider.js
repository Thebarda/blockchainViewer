// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da
import {
  PROVIDER_ADD_PROVIDER,
} from './constants';

export function addProvider(address) {
  return {
    type: PROVIDER_ADD_PROVIDER,
    provider: address,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PROVIDER_ADD_PROVIDER:
      return {
        ...state,
        provider: action.provider,
        pendingConnection: true,
        connectionStatus: false
      };

    default:
      return state;
  }
}
