import BigNumber from 'bignumber.js';
import { buy, sell } from '../serverMock';
import { Currency } from '../../constants/Currency';
import { Balance } from '../../types/types';

it('should buy and return new updated balance', () => {
  const rate = 0.81;
  const amount = new BigNumber(5);
  const usdBalance = new BigNumber(100);
  const eurBalance = new BigNumber(100);
  const balance: Balance = {
    [Currency.USD]: usdBalance.toNumber(),
    [Currency.EUR]: eurBalance.toNumber(),
    [Currency.PLN]: 100,
    [Currency.GBP]: 100
  };
  const rates = { [Currency.EUR]: rate };
  const pair = { base: Currency.USD, target: Currency.EUR };

  const result = buy(amount, pair, rates, balance);

  const exchanged = amount
    .multipliedBy(rate)
    .decimalPlaces(2, BigNumber.ROUND_FLOOR);

  expect(result).toEqual({
    ...balance,
    [Currency.USD]: usdBalance.plus(amount).toNumber(),
    [Currency.EUR]: eurBalance.minus(exchanged).toNumber()
  });
});

it('should sell and return new updated balance', () => {
  const amount = new BigNumber(5);
  const rate = 0.81;
  const usdBalance = new BigNumber(100);
  const eurBalance = new BigNumber(100);
  const balance: Balance = {
    [Currency.USD]: usdBalance.toNumber(),
    [Currency.EUR]: eurBalance.toNumber(),
    [Currency.PLN]: 100,
    [Currency.GBP]: 100
  };
  const rates = { [Currency.EUR]: rate };
  const pair = { base: Currency.USD, target: Currency.EUR };

  const result = sell(amount, pair, rates, balance);

  const exchanged = amount
    .multipliedBy(rate)
    .decimalPlaces(2, BigNumber.ROUND_FLOOR);

  expect(result).toEqual({
    ...balance,
    [Currency.USD]: usdBalance.minus(amount).toNumber(),
    [Currency.EUR]: eurBalance.plus(exchanged).toNumber()
  });
});
