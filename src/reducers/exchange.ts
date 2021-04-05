import { GET_RATES_ERROR, UPDATE_OPERATION_TYPE, UPDATE_RATES } from '../constants';
import { ExchangeAction, Rates } from '../types/types';
import { ExchangeOperation } from '../constants/ExchangeOperation';

export interface ExchangeState {
  operation: ExchangeOperation;
  rates: Rates | null;
  error: string | null;
}

const initialState: ExchangeState = {
  operation: ExchangeOperation.Sell,
  rates: null,
  error: null
};

const exchange = (state: ExchangeState = initialState, action: ExchangeAction) => {
  switch (action.type) {
    case UPDATE_RATES:
      return {
        ...state,
        rates: action.rates,
        error: null
      };
    case UPDATE_OPERATION_TYPE:
      return {
        ...state,
        operation: action.operation
      };
    case GET_RATES_ERROR:
      return {
        ...state,
        error: action.error
      };
  }

  return state;
};

export default exchange;
