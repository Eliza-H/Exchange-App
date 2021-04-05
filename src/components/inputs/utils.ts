import BigNumber from 'bignumber.js';

export function numberToFormat(value: string, prefix: string = ''): string {
  if (!value) return value;

  const dot = value.includes('.') ? '.' : '';
  const [significant, fraction = ''] = value.split('.');
  const format = {
    prefix
  };

  return `${new BigNumber(significant).toFormat(format)}${dot}${fraction}`;
}

const NUMBERS_AND_DOT_REGEXP = new RegExp(`[^\\d.]`, 'g');

export function formatToNumber(value: string): string {
  const number = value.replace(NUMBERS_AND_DOT_REGEXP, '');
  if (number.startsWith('.')) {
    return `0${number}`;
  }
  return number;
}

export function isNumberValid(value: string, maximumFractionDigits: number): boolean {
  const regex = new RegExp(`^\\d*\\.?(?:\\d{1,${maximumFractionDigits}})?$`, 'g');

  return regex.test(value);
}
