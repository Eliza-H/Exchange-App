import exchange from '../exchange';
import { ExchangeOperation } from '../../constants/ExchangeOperation';
import { GET_RATES_ERROR, UPDATE_OPERATION_TYPE, UPDATE_RATES } from '../../constants';

describe('exchange reducer', () => {
  const initialState = {
    operation: ExchangeOperation.Sell,
    rates: null,
    error: null
  };
  const rates = { USD: 1, PLN: 2 };
  const operation = ExchangeOperation.Buy;
  const error = 'error';

  it('should return the initial state', () => {
    expect(exchange(undefined, { type: '', rates, operation, error })).toEqual(initialState);
  });

  it('should handle UPDATE_RATES', () => {
    expect(
      exchange(initialState, {
        type: UPDATE_RATES,
        rates,
        operation,
        error
      })
    ).toEqual({
      ...initialState,
      rates
    });
  });

  it('should handle UPDATE_OPERATION_TYPE', () => {
    expect(
      exchange(initialState, {
        type: UPDATE_OPERATION_TYPE,
        rates,
        operation,
        error
      })
    ).toEqual({
      ...initialState,
      operation
    });
  });

  it('should handle GET_RATES_ERROR', () => {
    expect(
      exchange(initialState, {
        type: GET_RATES_ERROR,
        rates,
        operation,
        error
      })
    ).toEqual({
      ...initialState,
      error
    });
  });
});
