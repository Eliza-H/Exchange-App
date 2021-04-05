import React from 'react';

export interface ExchangeHeaderProps {
  title: string;
  subtitle: string;
}

export interface ExchangeBaseCardProps {
  value: string;
  onChange: (value: string) => void;
  error: boolean;
}

export interface ExchangeTargetCardProps {
  value: string;
  onChange: (value: string) => void;
  error: boolean;
}

export interface ExchangeCardProps {
  selectedCurrency: string;
  onSelectCurrency: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  balance: string;
  value: string;
  onChange: (value: string) => void;
  error: boolean;
}
