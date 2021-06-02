import { Application as AppType } from 'express';

let Mock = require('mockjs');

const authMock = (app: AppType) => {
  app.post('/oauth/token', (req, res) => {
    const mock = Mock.mock({
      data: { access_token: 'success token', userId: 'ma-xx' },
      code: 200,
      message: 'success',
    });

    res.json(mock);
  });
  app.get('/oauth/info', (req, res) => {
    const mock = Mock.mock({
      data: {
        userId: 'ma-xx',
        userName: '马兴祥',
        permissions: [
          '/app/home',
          '/subs4',
          '/app/auth',
          '/app/auth/basic',
          '/app/auth/routerEnter',
          '/sysmgr/user',
        ],
      },
      code: 200,
      message: 'success',
    });

    res.json(mock);
  });
};

export default authMock;
