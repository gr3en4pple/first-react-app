import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContextProvider from './ContextAPI';
import AuthProvider from './AuthContext';
import { StylesProvider } from '@material-ui/styles';


ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <AuthProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </AuthProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
