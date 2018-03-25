import Web3 from 'web3';
import {
  PROVIDER_CONNECTION_STATUS_BEGIN,
  PROVIDER_CONNECTION_STATUS_SUCCESS,
  PROVIDER_CONNECTION_STATUS_FAILURE,
  PROVIDER_CONNECTION_STATUS_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function connectionStatus(provider) {
  const web3 = new Web3(new Web3.providers.HttpProvider(provider));
  return (dispatch) => {
    web3.eth.getCoinbase().then(() => {
      dispatch({
        type: PROVIDER_CONNECTION_STATUS_SUCCESS,
      });
    }).catch((error) => {
      dispatch({
        type: PROVIDER_CONNECTION_STATUS_FAILURE,
        data: error
      });
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissConnectionStatusError() {
  return {
    type: PROVIDER_CONNECTION_STATUS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PROVIDER_CONNECTION_STATUS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        connectionStatusPending: true,
        connectionStatusError: null,
      };

    case PROVIDER_CONNECTION_STATUS_SUCCESS:
      // The request is success
      return {
        ...state,
        connectionStatusPending: false,
        connectionStatusError: null,
        connectionStatus: 'status'
      };

    case PROVIDER_CONNECTION_STATUS_FAILURE:
      // The request is failed
      return {
        ...state,
        connectionStatusPending: false,
        connectionStatusError: action.data.toString(),
        connectionStatus: 'status'
      };

    case PROVIDER_CONNECTION_STATUS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        connectionStatusError: null,
      };

    default:
      return state;
  }
}
