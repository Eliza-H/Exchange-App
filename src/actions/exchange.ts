import { Dispatch } from 'redux';
import { Currency } from '../constants/Currency';
import { GET_RATES_ERROR, UPDATE_OPERATION_TYPE, UPDATE_RATES } from '../constants';
import { exchangeApi } from '../api/exchange/exchange';
import { Rates } from '../types/types';
import { ExchangeOperation } from '../constants/ExchangeOperation';

export function updateRates(rates: Rates | null) {
  return {
    type: UPDATE_RATES,
    rates
  };
}

export function changeOperation(operation: ExchangeOperation) {
  return {
    type: UPDATE_OPERATION_TYPE,
    operation
  };
}

export function loadRates(base: Currency) {
  return async (dispatch: Dispatch) => {
    dispatch(updateRates(null));

    try {
      const exchange = await exchangeApi.getLatest(base);

      dispatch(updateRates(exchange.rates));
    } catch (err) {
      dispatch({
        type: GET_RATES_ERROR,
        error: `LOADING RATES ERROR: ${err.response || err.toJSON().message}`
      });
    }
  };
}
