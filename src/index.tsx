import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './loadGlobalLib';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
);
