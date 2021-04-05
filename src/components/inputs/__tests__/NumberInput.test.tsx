import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { NumberInput } from '../NumberInput';
import { withTheme } from '../../../utils/testUtils';
import { NumberInputProps } from '../types';

function setup(props: NumberInputProps) {
  const testId = 'number-input';
  const testIdProps = { 'data-testid': testId };

  render(withTheme(<NumberInput inputProps={testIdProps} {...props} />));

  return {
    input: screen.getByTestId(testId)
  };
}

it('should handle value change', () => {
  const inputChange = jest.fn();
  const value = '2';
  const { input } = setup({ onChange: inputChange });

  fireEvent.change(input, { target: { value } });

  expect(inputChange).toBeCalledWith(value);
});

it('should handle value change with cleaned up value', () => {
  const inputChange = jest.fn();
  const value = '2';
  const { input } = setup({ onChange: inputChange });

  fireEvent.change(input, { target: { value: `+-${value}` } });

  expect(inputChange).toBeCalledWith(value);
});

it('should not call callback with not valid value', () => {
  const inputChange = jest.fn();
  const value = '2.99999999999';
  const { input } = setup({ onChange: inputChange, maximumFractionDigits: 2 });

  fireEvent.change(input, { target: { value } });

  expect(inputChange).not.toBeCalled();
});

it('should pass to callback formatted value', () => {
  const inputChange = jest.fn();
  const value = '.1';
  const { input } = setup({ onChange: inputChange });

  fireEvent.change(input, { target: { value } });

  expect(inputChange).toBeCalledWith('0.1');
});
