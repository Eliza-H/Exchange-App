import { BASE_CURRENCY_CHANGE, TARGET_CURRENCY_CHANGE } from '../constants';
import { Currency } from '../constants/Currency';
import { CurrencyAction } from '../types/types';

export interface CurrencyState {
  baseCurrency: Currency;
  targetCurrency: Currency;
}

const initialState: CurrencyState = {
  baseCurrency: Currency.USD,
  targetCurrency: Currency.EUR
};

const currency = (state: CurrencyState = initialState, action: CurrencyAction) => {
  switch (action.type) {
    case BASE_CURRENCY_CHANGE:
      return {
        ...state,
        baseCurrency: action.currency,
        rates: null
      };
    case TARGET_CURRENCY_CHANGE:
      return {
        ...state,
        targetCurrency: action.currency
      };
  }

  return state;
};

export default currency;
