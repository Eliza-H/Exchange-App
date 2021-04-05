import { InputBaseProps, SelectProps as MaterialSelectProps } from '@material-ui/core';

export interface SelectProps extends MaterialSelectProps {
  options: { value: string; text: string }[];
}

export interface NumberInputProps extends Omit<InputBaseProps, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  maximumFractionDigits?: number;
  helperText?: string;
}
