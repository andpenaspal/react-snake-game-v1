import 'styled-components';

interface IPalette {
  main: string;
  contrastText: string;
}

interface IColors {
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
}
export type Colors = keyof IColors;

interface ICommonColors {
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
}
export type CommonColors = keyof ICommonColors;

export type Palette = Colors & CommonColors;

interface IBackgroundColors {
  neutral: string;
  light: string;
  dark: string;
}

export type BackgroundColors = keyof IBackgroundColors;

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: IColors & {
      common: ICommonColors;
      general: {
        backgroundColor: IBackgroundColors;
      };
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
