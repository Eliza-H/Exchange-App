import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import '../../../i18n';
import ExchangeMain from '../ExchangeMain';
import { Currency } from '../../../constants/Currency';
import { ExchangeOperation } from '../../../constants/ExchangeOperation';
import { withTheme } from '../../../utils/testUtils';
import { UPDATE_OPERATION_TYPE } from '../../../constants';

jest.mock('../../../api/exchange/exchange', () => ({
  exchangeApi: {
    getLatest: () =>
      Promise.resolve({
        EUR: 0.81
      })
  }
}));

const mockStore = configureStore([thunk]);

function createStore(operation = ExchangeOperation.Sell) {
  return mockStore({
    currency: {
      baseCurrency: Currency.USD,
      targetCurrency: Currency.EUR
    },
    exchange: {
      rates: {
        [Currency.EUR]: 0.85
      },
      operation
    },
    wallet: {
      currencies: [Currency.USD, Currency.EUR, Currency.GBP, Currency.PLN],
      balance: {
        [Currency.USD]: 99,
        [Currency.EUR]: 99,
        [Currency.GBP]: 99,
        [Currency.PLN]: 99
      }
    }
  });
}

it('should disabled button if no value', () => {
  const store = createStore(ExchangeOperation.Sell);
  render(
    withTheme(
      <Provider store={store}>
        <ExchangeMain />
      </Provider>
    )
  );

  expect(screen.getByTestId('exchange-button').closest('button')).toBeDisabled();
});

it.each`
  operation                 | expected
  ${ExchangeOperation.Buy}  | ${ExchangeOperation.Sell}
  ${ExchangeOperation.Sell} | ${ExchangeOperation.Buy}
`('should change operation from $operation to $expected', ({ operation, expected }) => {
  const store = createStore(operation);
  render(
    withTheme(
      <Provider store={store}>
        <ExchangeMain />
      </Provider>
    )
  );

  fireEvent.click(screen.getByTestId('change-operation'));

  const actions = store.getActions().filter(({ type }) => type === UPDATE_OPERATION_TYPE);
  expect(actions).toEqual([{ type: UPDATE_OPERATION_TYPE, operation: expected }]);
});
