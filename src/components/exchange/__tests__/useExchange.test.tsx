import thunk from 'redux-thunk';
import BigNumber from 'bignumber.js';
import React, { ComponentType, ReactNode } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { act, renderHook } from '@testing-library/react-hooks';
import { Store } from 'redux';
import useExchange from '../useExchange';
import { Currency } from '../../../constants/Currency';
import { ExchangeOperation } from '../../../constants/ExchangeOperation';

const mockStore = configureStore([thunk]);

const eurRate = 0.85;
function createStore(operation = ExchangeOperation.Sell) {
  return mockStore({
    currency: {
      baseCurrency: Currency.USD,
      targetCurrency: Currency.EUR
    },
    exchange: {
      rates: {
        [Currency.EUR]: eurRate
      },
      operation
    },
    wallet: {
      currencies: [Currency.USD, Currency.EUR, Currency.GBP, Currency.PLN],
      balance: {
        [Currency.USD]: 0,
        [Currency.EUR]: 0,
        [Currency.GBP]: 0,
        [Currency.PLN]: 0
      }
    }
  });
}

function wrapper(store: Store): ComponentType<{ children: ReactNode }> {
  return ({ children }) => <Provider store={store}>{children}</Provider>;
}

it('should handle base value change', () => {
  const { result } = renderHook(() => useExchange(), { wrapper: wrapper(createStore()) });
  const value = '11.0';

  act(() => {
    result.current.handleBaseValueChange(value);
  });

  expect(result.current.baseValue).toBe(value);
});

it('should handle target value change', () => {
  const { result } = renderHook(() => useExchange(), { wrapper: wrapper(createStore()) });
  const value = '11.15';

  act(() => {
    result.current.handleTargetValueChange(value);
  });

  expect(result.current.targetValue).toBe(value);
});

it('should clear values', () => {
  const { result } = renderHook(() => useExchange(), { wrapper: wrapper(createStore()) });
  const value = '11.0';

  act(() => {
    result.current.handleBaseValueChange(value);
    result.current.handleTargetValueChange(value);
    result.current.clearValues();
  });

  expect(result.current.baseValue).toBe('');
  expect(result.current.targetValue).toBe('');
});

it('should exchange target value when operation sell', () => {
  const { result } = renderHook(() => useExchange(), { wrapper: wrapper(createStore()) });
  const amount = '11.0';

  act(() => {
    result.current.handleBaseValueChange(amount);
  });

  expect(result.current.targetValue).toBe(
    new BigNumber(amount)
      .multipliedBy(eurRate)
      .decimalPlaces(2, BigNumber.ROUND_HALF_EVEN)
      .toString()
  );
});

it('should exchange target value when operation buy', () => {
  const { result } = renderHook(() => useExchange(), {
    wrapper: wrapper(createStore(ExchangeOperation.Buy))
  });
  const amount = '11.0';

  act(() => {
    result.current.handleTargetValueChange(amount);
  });

  expect(result.current.baseValue).toBe(
    new BigNumber(amount).dividedBy(eurRate).decimalPlaces(2, BigNumber.ROUND_HALF_EVEN).toString()
  );
});
