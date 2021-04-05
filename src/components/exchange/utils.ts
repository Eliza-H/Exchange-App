import { ExchangeOperation } from '../../constants/ExchangeOperation';

export function isSellOperation(operation: ExchangeOperation): boolean {
  return operation === ExchangeOperation.Sell;
}
