import 'styled-components';

interface IPalette {
  main: string;
  contrastText: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    general: {
      borderRadius: string;
      backgroundColor: {
        neutral: string;
        light: string;
        dark: string;
      };
    };
    palette: {
      common: {
        black: string;
        white: string;
        grey100: string;
        grey200: string;
        grey300: string;
        grey400: string;
        grey500: string;
        grey600: string;
        grey800: string;
        grey900: string;
      };
      primary: IPalette;
      secondary: IPalette;
      tertiary: IPalette;
      error100: IPalette;
      error200: IPalette;
      warning100: IPalette;
      warning200: IPalette;
      info100: IPalette;
      info200: IPalette;
      success100: IPalette;
      success200: IPalette;
    };
    typography: {
      primaryText: string;
      secondaryText: string;
      fontFamily: string;
    };
    spacing: {
      space: (
        units?: number,
        units2?: number | string,
        units3?: number | string,
        units4?: number | string,
      ) => string;
      tinySpace: (
        units?: number,
        units2?: number | string,
        units3?: number | string,
        units4?: number | string,
      ) => string;
    };
  }
}
