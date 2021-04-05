import BigNumber from 'bignumber.js';
import { ExchangeOperation } from '../constants/ExchangeOperation';
import currencyList from '../constants/Currency.json';
import { Currency } from '../constants/Currency';
import { exchangeApi } from '../api/exchange/exchange';
import { Balance, Rates } from '../types/types';

let serverBalance: Balance = {
  [Currency.USD]: 1000.5,
  [Currency.EUR]: 250,
  [Currency.GBP]: 350,
  [Currency.PLN]: 950
};

export function getBalance(): Promise<Balance> {
  return Promise.resolve(serverBalance);
}

export async function exchangeMockAPI(
  operation: ExchangeOperation,
  amount: BigNumber,
  base: Currency,
  target: Currency
) {
  const { rates } = await exchangeApi.getLatest(base);

  switch (operation) {
    case ExchangeOperation.Buy:
      serverBalance = buy(amount, { base, target }, rates, serverBalance);
      break;
    case ExchangeOperation.Sell:
      serverBalance = sell(amount, { base, target }, rates, serverBalance);
      break;
    default:
      throw new TypeError(`wrong exchange operation ${operation}`);
  }
}

type CurrencyPair = { base: Currency; target: Currency };

export function buy(amount: BigNumber, currencyPair: CurrencyPair, rates: Rates, balance: Balance) {
  const exchangedAmount = amount.multipliedBy(rates[currencyPair.target]);
  return {
    ...balance,
    [currencyPair.base]: new BigNumber(balance[currencyPair.base])
      .plus(amount)
      .decimalPlaces(currencyList[currencyPair.base].decimalPlaces, BigNumber.ROUND_FLOOR)
      .toNumber(),
    [currencyPair.target]: new BigNumber(balance[currencyPair.target])
      .minus(exchangedAmount)
      .decimalPlaces(currencyList[currencyPair.target].decimalPlaces, BigNumber.ROUND_FLOOR)
      .toNumber()
  };
}

export function sell(
  amount: BigNumber,
  currencyPair: CurrencyPair,
  rates: Rates,
  balance: Balance
) {
  const exchangedAmount = amount.multipliedBy(rates[currencyPair.target]);
  return {
    ...balance,
    [currencyPair.base]: new BigNumber(balance[currencyPair.base])
      .minus(amount)
      .decimalPlaces(currencyList[currencyPair.base].decimalPlaces, BigNumber.ROUND_FLOOR)
      .toNumber(),
    [currencyPair.target]: new BigNumber(balance[currencyPair.target])
      .plus(exchangedAmount)
      .decimalPlaces(currencyList[currencyPair.target].decimalPlaces, BigNumber.ROUND_FLOOR)
      .toNumber()
  };
}
