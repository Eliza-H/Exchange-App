import { Currency } from '../../constants/Currency';
import { BASE_CURRENCY_CHANGE, TARGET_CURRENCY_CHANGE } from '../../constants';
import currency from '../currency';

describe('currency reducer', () => {
  const initialState = {
    baseCurrency: Currency.USD,
    targetCurrency: Currency.EUR
  };
  const actionCurrency = Currency.PLN;

  it('should return the initial state', () => {
    expect(currency(undefined, { type: '', currency: actionCurrency })).toEqual(initialState);
  });

  it('should handle BASE_CURRENCY_CHANGE', () => {
    expect(
      currency(initialState, {
        type: BASE_CURRENCY_CHANGE,
        currency: actionCurrency
      })
    ).toEqual({
      ...initialState,
      rates: null,
      baseCurrency: actionCurrency
    });
  });

  it('should handle TARGET_CURRENCY_CHANGE', () => {
    expect(
      currency(initialState, {
        type: TARGET_CURRENCY_CHANGE,
        currency: actionCurrency
      })
    ).toEqual({
      ...initialState,
      targetCurrency: actionCurrency
    });
  });
});
