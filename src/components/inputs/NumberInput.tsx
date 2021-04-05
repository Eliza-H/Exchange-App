import styled, { css } from 'styled-components';
import { InputBase } from '@material-ui/core';
import React, { ChangeEvent, useCallback } from 'react';
import { NumberInputProps } from './types';
import { formatToNumber, isNumberValid } from './utils';

const StyledNumberInput = styled.div<{ error?: boolean }>(
  ({ theme, error }) => css`
    padding-right: ${theme.spacing['1x']};

    && input {
      text-align: end;
      caret-color: ${theme.palette.brandPrimary};
    }
    & p {
      text-align: right;
      margin: 0;
      font-size: ${theme.text.primary.fontSize};
      color: ${theme.palette.info};
    }
    ${error &&
    css`
      & p {
        color: ${theme.palette.error};
      }
    `}
  `
);

export const NumberInput = ({
  onChange,
  maximumFractionDigits = 20,
  error,
  helperText,
  ...restProps
}: NumberInputProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = formatToNumber(e.target.value);
      if (isNumberValid(inputValue, maximumFractionDigits)) {
        onChange?.(inputValue);
      }
    },
    [maximumFractionDigits, onChange]
  );

  return (
    <StyledNumberInput error={error}>
      <InputBase placeholder='0' fullWidth onChange={handleChange} {...restProps} />
      {helperText && <p>{helperText}</p>}
    </StyledNumberInput>
  );
};
