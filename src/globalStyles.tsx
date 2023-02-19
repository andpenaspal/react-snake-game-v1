import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
    background-color: ${({
      theme: {
        palette: { general },
      },
    }) => general.backgroundColor.neutral};
}
`;

export default GlobalStyle;
