import styled, { css } from 'styled-components';
import { MenuItem, Select as MaterialSelect } from '@material-ui/core';
import React from 'react';
import { SelectProps } from './types';
import { ReactComponent as CaretDownIcon } from '../../icons/caret-down.svg';

const StyledSelect = styled(MaterialSelect)(
  ({ theme }) => css`
    font-weight: ${theme.fontWeight.semiBold};
    padding-top: 0;
    padding-bottom: 0;
    && svg {
      width: ${theme.sizes.selectIcon};
      height: ${theme.sizes.selectIcon};
    }
    &&:after,
    &&:before {
      display: none;
    }
  `
);

const Select = ({ options, ...restProps }: SelectProps) => (
  <StyledSelect IconComponent={CaretDownIcon} {...restProps}>
    {options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.text}
      </MenuItem>
    ))}
  </StyledSelect>
);

export default Select;
