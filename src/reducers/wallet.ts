import { UPDATE_BALANCE } from '../constants';
import { Currency } from '../constants/Currency';
import { Balance, WalletAction } from '../types/types';

const initialWallet: Balance = {
  [Currency.USD]: 0,
  [Currency.EUR]: 0,
  [Currency.GBP]: 0,
  [Currency.PLN]: 0
};

export interface WalletState {
  balance: Balance;
  currencies: Currency[];
  isFetching: boolean;
}

const initialState: WalletState = {
  balance: initialWallet,
  currencies: [Currency.USD, Currency.EUR, Currency.GBP, Currency.PLN],
  isFetching: true
};

const wallet = (state: WalletState = initialState, action: WalletAction) => {
  switch (action.type) {
    case UPDATE_BALANCE:
      return {
        ...state,
        balance: action.balance,
        isFetching: false
      };
  }

  return state;
};

export default wallet;
