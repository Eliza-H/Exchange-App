import { ExchangeOperation } from '../constants/ExchangeOperation';
import { Currency } from '../constants/Currency';

export type Rates = { [key: string]: number };

export type Balance = {
  [key in Currency]: number;
};

export type ExchangeAction = {
  type: string;
  operation: ExchangeOperation;
  rates: Rates | null;
  error: string | null;
};

export type CurrencyAction = {
  type: string;
  currency: Currency;
};

export type WalletAction = {
  type: string;
  balance: Balance;
};
