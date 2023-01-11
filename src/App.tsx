import Theme from 'Definitions/theme';
import GlobalStyle from 'globalStyles';
import SnakeGamePage from 'Pages/SnakeGame';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';

const App = () => (
  <ThemeProvider theme={Theme}>
    <GlobalStyle />
    <SnakeGamePage />
  </ThemeProvider>
);

export default App;
