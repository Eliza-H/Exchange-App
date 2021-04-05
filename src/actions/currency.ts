import { BASE_CURRENCY_CHANGE, TARGET_CURRENCY_CHANGE } from '../constants';
import { Currency } from '../constants/Currency';

export function changeBaseCurrency(currency: Currency) {
  return {
    type: BASE_CURRENCY_CHANGE,
    currency
  };
}

export function changeTargetCurrency(currency: Currency) {
  return {
    type: TARGET_CURRENCY_CHANGE,
    currency
  };
}
