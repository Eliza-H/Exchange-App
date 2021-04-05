import React, { ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExchangeCard from './ExchangeCard';
import currencyList from '../../constants/Currency.json';
import { RootState } from '../../reducers';
import { Currency } from '../../constants/Currency';
import { currencyAction } from '../../actions';
import { ExchangeBaseCardProps } from './types';

const ExchangeBaseCard = ({ value, onChange, error }: ExchangeBaseCardProps) => {
  const { baseCurrency, targetCurrency } = useSelector((state: RootState) => state.currency);
  const { balance } = useSelector((state: RootState) => state.wallet);
  const dispatch = useDispatch();

  const handleBaseCurrencyChange = useCallback(
    (event: ChangeEvent<{ name?: string; value: unknown }>) => {
      const currency = event.target.value as Currency;
      if (currency === targetCurrency) {
        dispatch(currencyAction.changeTargetCurrency(baseCurrency));
        dispatch(currencyAction.changeBaseCurrency(currency));
      } else {
        dispatch(currencyAction.changeBaseCurrency(currency));
      }

      onChange('');
    },
    [dispatch, onChange, baseCurrency, targetCurrency]
  );

  return (
    <ExchangeCard
      selectedCurrency={baseCurrency}
      onSelectCurrency={handleBaseCurrencyChange}
      balance={`${currencyList[baseCurrency].symbol}${balance[baseCurrency]}`}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
};

export default ExchangeBaseCard;
