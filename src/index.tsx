import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
);

function getComponent(): Promise<HTMLDivElement> {
  // Lodash, now imported by this script
  return import('lodash').then(({ default: _ }) => {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  });
}

getComponent()
  .then((component) => {
    document.body.append(component);
  })
  .catch((error) => {
    throw error;
  });
