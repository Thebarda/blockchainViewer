import Web3 from 'web3';
import {
  ACCOUNTS_GET_ACCOUNTS_PROVIDER_BEGIN,
  ACCOUNTS_GET_ACCOUNTS_PROVIDER_SUCCESS,
  ACCOUNTS_GET_ACCOUNTS_PROVIDER_FAILURE,
  ACCOUNTS_GET_ACCOUNTS_PROVIDER_DISMISS_ERROR,
} from './constants';

let accountsArrObj = [];

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getAccountsProvider(provider) {
  const web3 = new Web3(new Web3.providers.HttpProvider(provider));
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNTS_GET_ACCOUNTS_PROVIDER_BEGIN,
    });

    web3.eth.getAccounts().then((accounts) => {
      dispatch({
        type: ACCOUNTS_GET_ACCOUNTS_PROVIDER_SUCCESS,
        data: accounts,
      });
    }).catch((error) => {
      dispatch({
        type: ACCOUNTS_GET_ACCOUNTS_PROVIDER_FAILURE,
        data: error,
      });
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetAccountsProviderError() {
  return {
    type: ACCOUNTS_GET_ACCOUNTS_PROVIDER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNTS_GET_ACCOUNTS_PROVIDER_BEGIN:
      // Just after a request is sent
      accountsArrObj = [];
      return {
        ...state,
        getAccountsProviderPending: true,
        getAccountsProviderError: null,
      };

    case ACCOUNTS_GET_ACCOUNTS_PROVIDER_SUCCESS:
      // The request is success
      action.data.map((acc) => {
        accountsArrObj.push({ account: acc, balance: 0 });
        return 0;
      });
      return {
        ...state,
        getAccountsProviderPending: false,
        getAccountsProviderError: null,
        accounts: accountsArrObj
      };

    case ACCOUNTS_GET_ACCOUNTS_PROVIDER_FAILURE:
      // The request is failed
      return {
        ...state,
        getAccountsProviderPending: false,
        getAccountsProviderError: action.data.toString(),
      };

    case ACCOUNTS_GET_ACCOUNTS_PROVIDER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getAccountsProviderError: null,
      };

    default:
      return state;
  }
}
