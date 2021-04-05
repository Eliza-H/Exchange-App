import BigNumber from 'bignumber.js';

import { AnyAction, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { UPDATE_BALANCE } from '../constants';
import { exchangeMockAPI, getBalance } from '../mock/serverMock';
import { Currency } from '../constants/Currency';
import { ExchangeOperation } from '../constants/ExchangeOperation';
import { Balance } from '../types/types';
import { RootState } from '../reducers';

export function updateBalance(balance: Balance) {
  return {
    type: UPDATE_BALANCE,
    balance
  };
}

export function loadBalance(): ThunkAction<void, RootState, unknown, AnyAction> {
  return async (dispatch: Dispatch) => {
    const balance = await getBalance();
    dispatch(updateBalance(balance));
  };
}

export function exchange(
  operation: ExchangeOperation,
  amount: BigNumber,
  base: Currency,
  target: Currency
) {
  return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    await exchangeMockAPI(operation, amount, base, target);
    dispatch(loadBalance());
  };
}
