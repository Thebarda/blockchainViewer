import Web3 from 'web3';
import {
  ACCOUNTS_GET_BALANCE_BEGIN,
  ACCOUNTS_GET_BALANCE_SUCCESS,
  ACCOUNTS_GET_BALANCE_FAILURE,
  ACCOUNTS_GET_BALANCE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getBalance(provider, account) {
  const web3 = new Web3(new Web3.providers.HttpProvider(provider));
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ACCOUNTS_GET_BALANCE_BEGIN,
    });

    web3.eth.getBalance(account).then((balanceRes) => {
      dispatch({
        type: ACCOUNTS_GET_BALANCE_SUCCESS,
        balance: web3.utils.fromWei(balanceRes, 'ether'),
        accAddr: account
      });
    }).catch((error) => {
      dispatch({
        type: ACCOUNTS_GET_BALANCE_FAILURE,
        err: error,
      });
    });
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetBalanceError() {
  return {
    type: ACCOUNTS_GET_BALANCE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCOUNTS_GET_BALANCE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getBalancePending: true,
        getBalanceError: null,
      };

    case ACCOUNTS_GET_BALANCE_SUCCESS:
      // The request is success
      state.accounts.map((acc) => {
        if (action.accAddr === acc.account) {
          acc.balance = action.balance;
        }
      });
      return {
        ...state,
        getBalancePending: false,
        getBalanceError: null,
        accounts: state.accounts
      };

    case ACCOUNTS_GET_BALANCE_FAILURE:
      // The request is failed
      return {
        ...state,
        getBalancePending: false,
        getBalanceError: action.err,
      };

    case ACCOUNTS_GET_BALANCE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getBalanceError: null,
      };

    default:
      return state;
  }
}
