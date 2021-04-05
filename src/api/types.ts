import { Rates } from '../types/types';

export interface ExchangeRates {
  base: string;
  date: string;
  rates: Rates;
}
