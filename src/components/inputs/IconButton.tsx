import React from 'react';
import { Button as MaterialButton, ButtonProps } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const StyledIconButton = styled(MaterialButton)(
  ({ theme }) => css`
    color: ${theme.palette.brandPrimary};
    background-color: ${theme.palette.primaryBackground};
    border-radius: 50%;
    text-transform: none;
    outline: none;
    text-decoration: none;
    cursor: pointer;
    border: 0.2rem solid ${theme.palette.appBackground};
    padding: 0;
    width: ${theme.sizes.iconButton};
    min-width: ${theme.sizes.iconButton};
    height: ${theme.sizes.iconButton};
    min-height: ${theme.sizes.iconButton};
    &&:hover {
      background-color: ${darken(0.1, theme.palette.primaryBackground)};
    }
    svg {
      display: block;
      fill: currentColor;
      height: 1.125rem;
      width: 1.125rem;
      vertical-align: middle;
      margin: auto;
    }
  `
);

const IconButton = (props: ButtonProps) => <StyledIconButton {...props} />;

export default IconButton;
