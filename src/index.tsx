import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './store';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme/theme';
import AuthContextProvider from './context/auth';
import ErrorBoundary from './utils/ErrorBoundary';
import './styles/App.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <AuthContextProvider>
          <ChakraProvider theme={theme} resetCSS>
            <Router>
              <ColorModeScript
                initialColorMode={theme.config.initialColorMode}
              />
              <App />
            </Router>
          </ChakraProvider>
        </AuthContextProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
