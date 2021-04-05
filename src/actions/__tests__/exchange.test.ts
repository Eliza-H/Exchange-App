import { UPDATE_OPERATION_TYPE, UPDATE_RATES } from '../../constants';
import { ExchangeOperation } from '../../constants/ExchangeOperation';
import { changeOperation, updateRates } from '../exchange';

describe('exchange actions', () => {
  it('should create an action to update rates', () => {
    const rates = { USD: 1, PLN: 2 };
    const expectedAction = {
      type: UPDATE_RATES,
      rates
    };
    expect(updateRates(rates)).toEqual(expectedAction);
  });

  it('should create an action to update operation type', () => {
    const operation: ExchangeOperation = ExchangeOperation.Buy;
    const expectedAction = {
      type: UPDATE_OPERATION_TYPE,
      operation
    };
    expect(changeOperation(operation)).toEqual(expectedAction);
  });
});
