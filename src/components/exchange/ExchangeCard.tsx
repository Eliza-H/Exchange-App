import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Card as MaterialCard, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Select from '../inputs/Select';
import { ExchangeCardProps } from './types';
import { RootState } from '../../reducers';
import { NumberInput } from '../inputs/NumberInput';

export const StyledCard = styled(MaterialCard)(
  ({ theme }) => css`
    border-radius: ${theme.borderRadius};
    background-color: ${theme.palette.primaryBackground};
    padding: ${theme.spacing['2x']};
    box-shadow: none;
  `
);

const StyledText = styled.p(
  ({ theme }) => css`
    font-size: ${theme.text.primary.fontSize};
    color: ${theme.palette.info};
    font-weight: ${theme.text.primary.fontWeight};
    margin: 0;
  `
);

const ExchangeCard = ({
  selectedCurrency,
  onSelectCurrency,
  balance,
  value,
  onChange,
  error
}: ExchangeCardProps) => {
  const [t] = useTranslation();
  const { currencies } = useSelector((state: RootState) => state.wallet);

  const options = useMemo(() => currencies.map(key => ({ value: key, text: key })), [currencies]);

  return (
    <StyledCard>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={4}>
          <Select value={selectedCurrency} onChange={onSelectCurrency} options={options} />
          <StyledText>{`${t('balance')} ${balance}`}</StyledText>
        </Grid>
        <Grid item xs={6} sm={8}>
          <NumberInput
            onChange={onChange}
            value={value}
            error={error}
            helperText={error ? t('exceedBalance') : ''}
            maximumFractionDigits={2}
          />
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default ExchangeCard;
