import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../theme/theme';

export function withTheme(component: React.ReactNode) {
  return <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>;
}
