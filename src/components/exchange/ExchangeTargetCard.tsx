import { useDispatch, useSelector } from 'react-redux';
import React, { ChangeEvent, useCallback } from 'react';
import { ExchangeTargetCardProps } from './types';
import { RootState } from '../../reducers';
import { Currency } from '../../constants/Currency';
import { currencyAction } from '../../actions';
import ExchangeCard from './ExchangeCard';
import currencyList from '../../constants/Currency.json';

const ExchangeTargetCard = ({ value, onChange, error }: ExchangeTargetCardProps) => {
  const { baseCurrency, targetCurrency } = useSelector((state: RootState) => state.currency);
  const { balance } = useSelector((state: RootState) => state.wallet);
  const dispatch = useDispatch();

  const handleTargetCurrencyChange = useCallback(
    (event: ChangeEvent<{ name?: string; value: unknown }>) => {
      const currency = event.target.value as Currency;
      if (currency === baseCurrency) {
        dispatch(currencyAction.changeBaseCurrency(targetCurrency));
        dispatch(currencyAction.changeTargetCurrency(currency));
      } else {
        dispatch(currencyAction.changeTargetCurrency(currency));
      }

      onChange('');
    },
    [dispatch, onChange, baseCurrency, targetCurrency]
  );

  return (
    <ExchangeCard
      selectedCurrency={targetCurrency}
      onSelectCurrency={handleTargetCurrencyChange}
      balance={`${currencyList[targetCurrency].symbol}${balance[targetCurrency]}`}
      value={value}
      onChange={onChange}
      error={error}
    />
  );
};

export default ExchangeTargetCard;
