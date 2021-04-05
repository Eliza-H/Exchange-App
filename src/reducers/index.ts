import { combineReducers } from 'redux';
import wallet, { WalletState } from './wallet';
import currency, { CurrencyState } from './currency';
import exchange, { ExchangeState } from './exchange';

export interface RootState {
  wallet: WalletState;
  currency: CurrencyState;
  exchange: ExchangeState;
}

export default combineReducers<RootState>({ wallet, currency, exchange });
