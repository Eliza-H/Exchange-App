import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import styled, { css } from 'styled-components';
import { Alert } from '@material-ui/core';
import { StyledCard } from './ExchangeCard';
import IconButton, { StyledIconButton } from '../inputs/IconButton';
import { ReactComponent as ArrowDownIcon } from '../../icons/arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from '../../icons/arrow-up.svg';
import Button, { StyledButton } from '../inputs/Button';
import { RootState } from '../../reducers';
import { changeOperation, loadRates } from '../../actions/exchange';
import { ExchangeOperation } from '../../constants/ExchangeOperation';
import { exchange, loadBalance } from '../../actions/wallet';
import useExchange from './useExchange';
import ExchangeBaseCard from './ExchangeBaseCard';
import ExchangeTargetCard from './ExchangeTargetCard';
import { numberToFormat } from '../inputs/utils';
import { isSellOperation } from './utils';
import { MINUS, PLUS } from '../../constants';

const StyledExchangeMain = styled.main(
  ({ theme }) => css`
    position: relative;
    flex: 1;
    && ${StyledCard} {
      margin-bottom: ${theme.spacing['2x']};
    }
    && ${StyledIconButton} {
      position: absolute;
      z-index: 1;
      margin-top: calc((${theme.sizes.iconButton} + ${theme.spacing['2x']}) / -2);
      left: 50%;
      transform: translate(-50%, 0);
    }
    && ${StyledButton} {
      position: absolute;
      bottom: 0;
    }
    && div[role='alert'] {
      margin-bottom: ${theme.spacing['2x']};
    }
  `
);

const buttonTitle = {
  [ExchangeOperation.Sell]: 'sellButton',
  [ExchangeOperation.Buy]: 'buyButton'
};

const REFRESH_TIME = 10 * 1000;

const ExchangeMain = () => {
  const { baseCurrency, targetCurrency } = useSelector((state: RootState) => state.currency);
  const { operation, error } = useSelector((state: RootState) => state.exchange);
  const { balance } = useSelector((state: RootState) => state.wallet);

  const dispatch = useDispatch();
  const [t] = useTranslation();
  const isSell = isSellOperation(operation);
  const {
    baseValue,
    targetValue,
    handleBaseValueChange,
    handleTargetValueChange,
    clearValues
  } = useExchange();

  useEffect(() => {
    dispatch(loadBalance());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadRates(baseCurrency));
    const intervalId = setInterval(() => {
      dispatch(loadRates(baseCurrency));
    }, REFRESH_TIME);
    return () => clearInterval(intervalId);
  }, [dispatch, baseCurrency]);

  const handleOperationChange = useCallback(() => {
    const toggleOperation =
      operation === ExchangeOperation.Sell ? ExchangeOperation.Buy : ExchangeOperation.Sell;
    dispatch(changeOperation(toggleOperation));
  }, [dispatch, operation]);

  const handleSubmit = useCallback(() => {
    dispatch(exchange(operation, new BigNumber(baseValue), baseCurrency, targetCurrency));
    clearValues();
  }, [dispatch, operation, baseValue, baseCurrency, clearValues, targetCurrency]);

  const exceededBalance = isSell
    ? Number(baseValue) > balance[baseCurrency]
    : Number(targetValue) > balance[targetCurrency];

  return (
    <StyledExchangeMain>
      {error && <Alert severity='error'>{error}</Alert>}
      <ExchangeBaseCard
        value={numberToFormat(baseValue, isSell ? MINUS : PLUS)}
        onChange={handleBaseValueChange}
        error={isSell && exceededBalance}
      />
      <IconButton data-testid='change-operation' onClick={handleOperationChange}>
        {isSell ? <ArrowDownIcon /> : <ArrowUpIcon />}
      </IconButton>
      <ExchangeTargetCard
        value={numberToFormat(targetValue, isSell ? PLUS : MINUS)}
        onChange={handleTargetValueChange}
        error={!isSell && exceededBalance}
      />
      <Button
        data-testid='exchange-button'
        onClick={handleSubmit}
        disabled={!Number(baseValue) || !Number(targetValue) || exceededBalance}
      >
        {t(buttonTitle[operation], { base: baseCurrency, target: targetCurrency })}
      </Button>
    </StyledExchangeMain>
  );
};
export default ExchangeMain;
