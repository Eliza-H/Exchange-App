import { ExchangeRates } from '../types';
import { Currency } from '../../constants/Currency';

export interface ExchangeApi {
  getLatest: (base: Currency) => Promise<ExchangeRates>;
}
