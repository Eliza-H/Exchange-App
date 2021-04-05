import React from 'react';
import { Button as MaterialButton, ButtonProps } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const StyledButton = styled(MaterialButton)(
  ({ theme }) => css`
    text-transform: none;
    border-radius: ${theme.borderRadius};
    color: ${theme.palette.primaryBackground};
    background-color: ${theme.palette.brandPrimary};
    font-weight: ${theme.fontWeight.semiBold};
    &&:hover {
      background-color: ${darken(0.1, theme.palette.brandPrimary)};
    }
    &&:disabled,
    &&[disabled] {
      opacity: ${theme.disabledOpacity};
      cursor: not-allowed;
      pointer-events: none;
      background-color: ${theme.palette.brandPrimary};
      color: ${theme.palette.primaryBackground};
    }
    &&:enabled:focus,
    &&:not([disabled]):focus {
      box-shadow: ${theme.shadow.focus};
    }
  `
);

const Button = (props: ButtonProps) => <StyledButton variant='contained' fullWidth {...props} />;

export default Button;
