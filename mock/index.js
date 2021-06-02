import authMock from './auth';

const server = (app) => {
  authMock(app);
};

export default server;
