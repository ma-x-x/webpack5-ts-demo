import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import NotFound from '@/containers/pages/NotFound';
import Login from '@/containers/pages/Login';
import App from '@/containers/App';
import { GlobalStyle } from '@/styles/global';
import 'antd/dist/antd.css';

export default () => (
  <Router>
    <GlobalStyle />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app/home" push />} />
      <Route path="/app" component={App} />
      <Route path="/404" component={NotFound} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
