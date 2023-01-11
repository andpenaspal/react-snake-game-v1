import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
    background-color: ${({
      theme: {
        general: { backgroundColor },
      },
    }) => backgroundColor.neutral};
}
`;

export default GlobalStyle;
