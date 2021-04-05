import BigNumber from 'bignumber.js';
import { buy, isNotEmpty, sell } from '../utils';
import { Currency } from '../../constants/Currency';

describe('Test for isNotEmpty', () => {
  it('should return false if value is empty', () => {
    const result = isNotEmpty('');
    expect(result).toBeFalsy();
  });

  it('should return true if value is not empty', () => {
    const result = isNotEmpty('value');
    expect(result).toBeTruthy();
  });
});

describe('Test for buy', () => {
  it('should return new amount with decimal places isSell equals true', () => {
    const rate = 1.333;
    const amount = new BigNumber(50);
    const isSell = true;

    const result = buy(amount, Currency.USD, rate, isSell);

    expect(result).toEqual(amount.multipliedBy(rate).decimalPlaces(2, BigNumber.ROUND_FLOOR));
  });

  it('should return new amount with decimal places isSell equals false', () => {
    const rate = 1.333;
    const amount = new BigNumber(50);
    const isSell = false;

    const result = buy(amount, Currency.USD, rate, isSell);

    expect(result).toEqual(amount.multipliedBy(rate).decimalPlaces(2, BigNumber.ROUND_CEIL));
  });

  it('should not be equal when decimal places is wrong', () => {
    const rate = 1.3333;
    const amount = new BigNumber(50.1);
    const isSell = true;

    const result = buy(amount, Currency.USD, rate, isSell);

    expect(result.toNumber()).not.toEqual(
      amount.multipliedBy(rate).decimalPlaces(4, BigNumber.ROUND_FLOOR).toNumber()
    );
  });
});

describe('Test for sell', () => {
  it('should return new amount with decimal places isSell equals true', () => {
    const rate = 1.333;
    const amount = new BigNumber(50);
    const isSell = true;

    const result = sell(amount, Currency.USD, rate, isSell);

    expect(result).toEqual(amount.dividedBy(rate).decimalPlaces(2, BigNumber.ROUND_CEIL));
  });

  it('should return new amount with decimal places isSell equals false', () => {
    const rate = 1.333;
    const amount = new BigNumber(50);
    const isSell = false;

    const result = sell(amount, Currency.USD, rate, isSell);

    expect(result).toEqual(amount.dividedBy(rate).decimalPlaces(2, BigNumber.ROUND_FLOOR));
  });

  it('should not be equal when decimal places is wrong', () => {
    const rate = 1.333;
    const amount = new BigNumber(50);
    const isSell = true;

    const result = sell(amount, Currency.USD, rate, isSell);

    expect(result).not.toEqual(amount.dividedBy(rate).decimalPlaces(4, BigNumber.ROUND_CEIL));
  });
});
