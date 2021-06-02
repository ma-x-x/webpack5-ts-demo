import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Page from './Page';
import DebugObserver from './components/widget/devTools';

let locale = 'zh';
moment.locale(locale);

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <DebugObserver />
      <ConfigProvider locale={zhCN}>
        <Page />
      </ConfigProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.querySelector('#root')
);
