import { DefaultTheme } from 'styled-components';

const DefaultThemeColors = {
  white: '#ffffff',
  black: '#000000',
  gray: { extraLight: '#fafafa', light: '#f2f2f2', medium: '#cfcfcf', dark: '#3f3f3f' },
  slate: { extraLight: '#e9eef3', light: '#cbd4dc', medium: '#8397ab', dark: '#252c32' },
  red: { extraLight: '#ffdbde', light: '#f66f78', medium: '#d91c29', dark: '#570006' },
  green: { extraLight: '#d4f7d5', light: '#7ee791', medium: '#20aa50', dark: '#0b381a' },
  blue: { extraLight: '#e2f2ff', light: '#71c1ff', medium: '#0076d1', dark: '#005699' }
};

export const defaultTheme: DefaultTheme = {
  colors: DefaultThemeColors,
  palette: {
    appBackground: DefaultThemeColors.slate.extraLight,
    primaryBackground: DefaultThemeColors.white,
    secondaryBackground: DefaultThemeColors.gray.extraLight,
    foregroundColor: DefaultThemeColors.blue.dark,
    brandPrimary: DefaultThemeColors.blue.medium,
    info: DefaultThemeColors.gray.dark,
    error: DefaultThemeColors.red.medium
  },
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  fontSize: '0.875rem',
  fontWeight: {
    bold: 700,
    semiBold: 600,
    normal: 400
  },
  borderRadius: '0.5rem',
  disabledOpacity: 0.4,
  components: {
    card: {
      borderRadius: 0.5
    }
  },
  text: {
    primary: {
      fontSize: '1rem',
      fontWeight: 400
    },
    h1: {
      fontSize: '2rem',
      fontWeight: 600
    }
  },
  shadow: {
    focus: '0 0 0.25rem rgba(0, 120, 231, 0.95)'
  },
  spacing: {
    '1x': '0.5rem',
    '2x': '1rem'
  },
  sizes: {
    iconButton: '2rem',
    selectIcon: '1.2rem'
  }
};
