import { BASE_CURRENCY_CHANGE, TARGET_CURRENCY_CHANGE } from '../../constants';
import { Currency } from '../../constants/Currency';
import { changeBaseCurrency, changeTargetCurrency } from '../currency';

describe('currency actions', () => {
  const currency = Currency.USD;
  it('should create an action to update base currency', () => {
    const expectedAction = {
      type: BASE_CURRENCY_CHANGE,
      currency
    };
    expect(changeBaseCurrency(currency)).toEqual(expectedAction);
  });

  it('should create an action to update target currency', () => {
    const expectedAction = {
      type: TARGET_CURRENCY_CHANGE,
      currency
    };
    expect(changeTargetCurrency(currency)).toEqual(expectedAction);
  });
});
