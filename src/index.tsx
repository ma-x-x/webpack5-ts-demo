import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import Page from './Page';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Page />
    </RecoilRoot>
  </React.StrictMode>,
  document.querySelector('#root')
);
