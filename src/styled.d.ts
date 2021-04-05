import 'styled-components';

interface IPalette {
  extraLight: string;
  light: string;
  medium: string;
  dark: string;
}

interface IText {
  fontSize: string;
  fontWeight: number;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;
      gray: IPalette;
      slate: IPalette;
      red: IPalette;
      green: IPalette;
      blue: IPalette;
    };
    palette: {
      appBackground: string;
      primaryBackground: string;
      secondaryBackground: string;
      foregroundColor: string;
      brandPrimary: string;
      info: string;
      error: string;
    };
    fontFamily: string;
    fontSize: string;
    fontWeight: {
      bold: number;
      semiBold: number;
      normal: number;
    };
    borderRadius: string;
    disabledOpacity: number;
    components: {
      card: {
        borderRadius: number;
      };
    };
    text: {
      primary: IText;
      h1: IText;
    };
    shadow: {
      focus: string;
    };
    spacing: {
      '1x': string;
      '2x': string;
    };
    sizes: {
      iconButton: string;
      selectIcon: string;
    };
  }
}
