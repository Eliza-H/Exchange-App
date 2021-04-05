import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AnyAction } from 'redux';
import { Balance } from '../../types/types';
import { Currency } from '../../constants/Currency';
import { UPDATE_BALANCE } from '../../constants';
import { loadBalance, updateBalance } from '../wallet';
import * as serverMock from '../../mock/serverMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('wallet actions', () => {
  const balance: Balance = {
    [Currency.GBP]: 20,
    [Currency.PLN]: 0,
    [Currency.USD]: 100,
    [Currency.EUR]: 200
  };

  it('should create an action to update balance', () => {
    const expectedAction = {
      type: UPDATE_BALANCE,
      balance
    };
    expect(updateBalance(balance)).toEqual(expectedAction);
  });

  it('should dispatch an action to update balance', () => {
    const expectedAction = {
      type: UPDATE_BALANCE,
      balance
    };
    const spy = jest.spyOn(serverMock, 'getBalance');
    spy.mockReturnValue(Promise.resolve(balance));
    const store = mockStore({ balance: {} });
    return store.dispatch((loadBalance() as unknown) as AnyAction).then(() => {
      expect(store.getActions()).toEqual([expectedAction]);
    });
  });
});
