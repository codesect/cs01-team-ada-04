import React from 'react';
import { ThemeProvider } from 'styled-components/macro';

import defaultTheme from '../themes';

const withTheme = (WrappedComponent, theme = defaultTheme) => props => (
  <ThemeProvider theme={theme}>
    <WrappedComponent {...props} />
  </ThemeProvider>
);

export default withTheme;
