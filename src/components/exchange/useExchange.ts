import { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useSelector } from 'react-redux';
import { buy, isNotEmpty, sell } from '../../utils/utils';
import { RootState } from '../../reducers';
import { isSellOperation } from './utils';

enum LastActive {
  BASE = 'base',
  TARGET = 'target'
}

const useExchange = () => {
  const { baseCurrency, targetCurrency } = useSelector((state: RootState) => state.currency);
  const { rates, operation } = useSelector((state: RootState) => state.exchange);
  const isSell = isSellOperation(operation);

  const [baseValue, setBaseValue] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [lastActive, setLastActive] = useState(LastActive.BASE);

  useEffect(() => {
    if (rates) {
      if (lastActive === LastActive.BASE && isNotEmpty(baseValue)) {
        setTargetValue(
          buy(new BigNumber(baseValue), targetCurrency, rates[targetCurrency], isSell).toString()
        );
      } else if (isNotEmpty(targetValue)) {
        setBaseValue(
          sell(new BigNumber(targetValue), baseCurrency, rates[targetCurrency], isSell).toString()
        );
      }
    }
  }, [rates, isSell, baseValue, baseCurrency, lastActive, targetValue, targetCurrency]);

  const clearValues = useCallback(() => {
    setBaseValue('');
    setTargetValue('');
  }, []);

  const handleBaseValueChange = useCallback(
    (inputValue: string) => {
      setBaseValue(inputValue);
      setLastActive(LastActive.BASE);
      if (isNotEmpty(inputValue) && rates?.[targetCurrency]) {
        setTargetValue(
          buy(new BigNumber(inputValue), targetCurrency, rates[targetCurrency], isSell).toString()
        );
      } else {
        setTargetValue('');
      }
    },
    [rates, targetCurrency, isSell]
  );

  const handleTargetValueChange = useCallback(
    (inputValue: string) => {
      setTargetValue(inputValue);
      setLastActive(LastActive.TARGET);
      if (isNotEmpty(inputValue) && rates?.[targetCurrency]) {
        setBaseValue(
          sell(new BigNumber(inputValue), baseCurrency, rates[targetCurrency], isSell).toString()
        );
      } else {
        setBaseValue('');
      }
    },
    [rates, baseCurrency, targetCurrency, isSell]
  );

  return {
    baseValue,
    targetValue,
    handleBaseValueChange,
    handleTargetValueChange,
    clearValues
  };
};

export default useExchange;
