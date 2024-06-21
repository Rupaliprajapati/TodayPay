import React from 'react';
import Calculator from './components/Calculator';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f0f0f0;
  }
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const App = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <Calculator />
    </AppContainer>
  );
};

export default App;
