import { isSellOperation } from '../utils';
import { ExchangeOperation } from '../../../constants/ExchangeOperation';

describe('Test for isSellOperation', () => {
  it('should return false for operation buy', () => {
    expect(isSellOperation(ExchangeOperation.Buy)).toEqual(false);
  });

  it('should return true for operation sell', () => {
    expect(isSellOperation(ExchangeOperation.Sell)).toEqual(true);
  });
});
