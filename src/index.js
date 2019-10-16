import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components/macro';

import App from './components/App';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalStyles from './components/GlobalStyles';
import defaultTheme from './themes';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ThemeProvider theme={defaultTheme}>
    <>
      <Header />
      <App />
      <Footer />
      <GlobalStyles />
    </>
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
