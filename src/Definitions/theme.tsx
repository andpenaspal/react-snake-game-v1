import { DefaultTheme } from 'styled-components';

const spacingFunc = (
  units?: number,
  units2?: number | string,
  units3?: number | string,
  units4?: number | string,
  small: boolean = false,
): string => {
  const calc = (unit: number) => `${small ? 4 : 8 * unit}px`;

  return [units, units2, units3, units4]
    .reduce(
      (pre, cur) => {
        if (!cur) return pre;
        if (typeof cur === 'string') return pre.concat([cur]);
        return pre.concat([calc(cur)]);
      },
      [''],
    )
    .join(' ');
};

const Theme: DefaultTheme = {
  palette: {
    general: {
      typography: {
        primaryText: 'Black',
        secondaryText: 'Gray',
      },
      backgroundColor: {
        neutral: 'Snow',
        light: 'WhiteSmoke',
        dark: 'Silver',
        overlay: 'rgba(149, 165, 166, 0.8)',
      },
    },
    common: {
      black: 'Black',
      white: 'White',
      grey100: 'Gainsboro',
      grey200: 'LightGray',
      grey300: 'Silver',
      grey400: 'DarkGray',
      grey500: 'Gray',
      grey600: 'DimGray',
      grey800: 'LightSlateGray',
      grey900: 'SlateGray',
    },
    primary: {
      main: 'red',
      contrastText: 'white',
    },
    secondary: {
      main: 'blue',
      contrastText: 'white',
    },
    tertiary: {
      main: 'green',
      contrastText: 'white',
    },
    error100: {
      main: 'LightCoral',
      contrastText: 'white',
    },
    error200: {
      main: 'red',
      contrastText: 'white',
    },
    warning100: {
      main: 'Orange',
      contrastText: 'white',
    },
    warning200: {
      main: 'green',
      contrastText: 'white',
    },
    info100: {
      main: 'LightSkyBlue',
      contrastText: 'white',
    },
    info200: {
      main: 'DeepSkyBlue',
      contrastText: 'white',
    },
    success100: {
      main: 'LightGreen',
      contrastText: 'white',
    },
    success200: {
      main: 'Chartreuse',
      contrastText: 'white',
    },
  },
  typography: {
    fontSize: {
      extraLarge: '3rem',
      large: '2rem',
      mediumLarge: '1.5rem',
      medium: '1rem',
      smallMedium: '0.8rem',
      small: '0.7rem',
    },
    fontWeight: {
      extraHeavy: '900',
      heavy: '700',
      normalHeavy: '500',
      normal: '400',
      lightNormal: '300',
      light: '100',
    },
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  spacing: {
    space: (
      units?: number,
      units2?: number | string,
      units3?: number | string,
      units4?: number | string,
    ) => spacingFunc(units, units2, units3, units4),
    tinySpace: (
      units?: number,
      units2?: number | string,
      units3?: number | string,
      units4?: number | string,
    ) => spacingFunc(units, units2, units3, units4, true),
  },
};

export default Theme;
