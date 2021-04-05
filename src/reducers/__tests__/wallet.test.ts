import { UPDATE_BALANCE } from '../../constants';
import { Currency } from '../../constants/Currency';
import wallet from '../wallet';

describe('wallet reducer', () => {
  const initialState = {
    balance: {
      [Currency.USD]: 0,
      [Currency.EUR]: 0,
      [Currency.GBP]: 0,
      [Currency.PLN]: 0
    },
    currencies: [Currency.USD, Currency.EUR, Currency.GBP, Currency.PLN],
    isFetching: true
  };
  const balance = {
    [Currency.USD]: 10,
    [Currency.EUR]: 20,
    [Currency.GBP]: 30,
    [Currency.PLN]: 40
  };

  it('should return the initial state', () => {
    expect(wallet(undefined, { type: '', balance })).toEqual(initialState);
  });

  it('should handle UPDATE_BALANCE', () => {
    expect(
      wallet(initialState, {
        type: UPDATE_BALANCE,
        balance
      })
    ).toEqual({
      ...initialState,
      isFetching: false,
      balance
    });
  });
});
