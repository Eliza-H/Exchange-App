import { formatToNumber, isNumberValid, numberToFormat } from '../utils';

describe('Test for numberToFormat', () => {
  it('should keep value formatting and does not remove trailing dot', () => {
    const result = numberToFormat('12.');

    expect(result).toEqual('12.');
  });

  it('should keep value formatting and does not remove trailing zero', () => {
    const result = numberToFormat('12.0');

    expect(result).toEqual('12.0');
  });

  it('should remove unnecessary zero', () => {
    const result = numberToFormat('00011.2');

    expect(result).toBe('11.2');
  });

  it('should add prefix', () => {
    const result = numberToFormat('0.3', '+');

    expect(result).toBe('+0.3');
  });

  it('should add prefix empty prefix by default', () => {
    const result = numberToFormat('0.3');

    expect(result).toBe('0.3');
  });
});

describe('Test for formatToNumber', () => {
  it.each`
    number   | expected
    ${'+1'}  | ${'1'}
    ${'#1'}  | ${'1'}
    ${'123'} | ${'123'}
  `('should remove not number from $number', ({ number, expected }) => {
    const result = formatToNumber(number);

    expect(result).toEqual(expected);
  });

  it('should add 0 if starting from dot', () => {
    const result = formatToNumber('.3');

    expect(result).toBe('0.3');
  });
});

describe('Test for isNumberValid', () => {
  it.each`
    number   | expected
    ${'+1'}  | ${false}
    ${'#1'}  | ${false}
    ${'123'} | ${true}
  `('should validate string $number', ({ number, expected }) => {
    const result = isNumberValid(number, 2);

    expect(result).toEqual(expected);
  });

  it('should return false if string not valid', () => {
    const result = isNumberValid('#12.3', 2);

    expect(result).toBeFalsy();
  });

  it('should return false if count of fraction digits more than set', () => {
    const result = isNumberValid('12.333', 2);

    expect(result).toBeFalsy();
  });

  it('should return true if count of fraction digits correct', () => {
    const result = isNumberValid('12.3', 2);

    expect(result).toBeTruthy();
  });
});
