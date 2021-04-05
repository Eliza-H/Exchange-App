import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import currencyList from '../../constants/Currency.json';
import { RootState } from '../../reducers';
import { ExchangeOperation } from '../../constants/ExchangeOperation';
import { Rates } from '../../types/types';
import { Currency } from '../../constants/Currency';

const StyledExchangeHeader = styled.header`
  & > h1 {
    font-size: ${props => props.theme.text.h1.fontSize};
    margin: 0;
  }
  & > p {
    font-size: ${props => props.theme.text.primary.fontSize};
    color: ${props => props.theme.palette.info};
  }
`;

const headerTitle = {
  [ExchangeOperation.Sell]: 'sellTitle',
  [ExchangeOperation.Buy]: 'buyTitle'
};

function formatRate(rates: Rates | null, currency: Currency): String {
  const formattedRates = rates?.[currency]?.toFixed(4);
  const { symbol } = currencyList[currency];

  return formattedRates ? `${symbol}${formattedRates}` : '∞';
}

const ExchangeHeader = () => {
  const [t] = useTranslation();
  const { baseCurrency, targetCurrency } = useSelector((state: RootState) => state.currency);
  const { rates, operation } = useSelector((state: RootState) => state.exchange);

  return (
    <StyledExchangeHeader>
      <h1>{t(headerTitle[operation], { currency: baseCurrency })}</h1>
      <p>
        {t('marketOrderAt', {
          base: `${currencyList[baseCurrency].symbol}1`,
          target: `${formatRate(rates, targetCurrency)}`
        })}
      </p>
    </StyledExchangeHeader>
  );
};

export default ExchangeHeader;
