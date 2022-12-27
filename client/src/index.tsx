import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ChakraProvider, extendTheme  } from "@chakra-ui/react"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = extendTheme({});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
