import React from 'react';
import styled, { css } from 'styled-components';
import { Container } from '@material-ui/core';
import ExchangeHeader from './ExchangeHeader';
import ExchangeMain from './ExchangeMain';

const StyledExchangeContainer = styled(Container)(
  ({ theme }) => css`
    height: 100%;
    min-height: 30rem;
    min-width: 20rem;
    background-color: ${theme.palette.appBackground};
    font-family: ${theme.fontFamily};
    padding: ${theme.spacing['2x']};
    display: flex;
    flex-flow: column;
  `
);

const Exchange = () => (
  <StyledExchangeContainer maxWidth='sm'>
    <ExchangeHeader />
    <ExchangeMain />
  </StyledExchangeContainer>
);

export default Exchange;
