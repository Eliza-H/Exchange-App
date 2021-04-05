import BigNumber from 'bignumber.js';
import currencyList from '../constants/Currency.json';
import { Currency } from '../constants/Currency';

export function isNotEmpty(str: string) {
  return str.length !== 0;
}

export function buy(amount: BigNumber, currency: Currency, rate: number, isSell: boolean) {
  const rounding = isSell ? BigNumber.ROUND_FLOOR : BigNumber.ROUND_CEIL;
  return amount.multipliedBy(rate).decimalPlaces(currencyList[currency].decimalPlaces, rounding);
}

export function sell(amount: BigNumber, currency: Currency, rate: number, isSell: boolean) {
  const rounding = isSell ? BigNumber.ROUND_CEIL : BigNumber.ROUND_FLOOR;
  return amount.dividedBy(rate).decimalPlaces(currencyList[currency].decimalPlaces, rounding);
}
