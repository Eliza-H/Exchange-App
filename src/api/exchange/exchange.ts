import axios from 'axios';
import { ExchangeApi } from './ExchangeApi';
import { ExchangeRates } from '../types';
import { Currency } from '../../constants/Currency';

const basePath = 'https://api.ratesapi.io/api/';

export const exchangeApi: ExchangeApi = {
  getLatest: async (base: Currency) => {
    const url = `${basePath}latest?&base=${base}&timestamp=${new Date().getTime()}`;
    const response = await axios.get<ExchangeRates>(url);
    return response.data;
  }
};
