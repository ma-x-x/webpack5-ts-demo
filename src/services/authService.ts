import request from '@/utils/request';

export type loginType = {
  userName: string;
  password: string;
};

const login = async (data: loginType) => {
  const response = await request({
    url: '/oauth/token',
    method: 'post',
    data,
  });
  return response;
};

const getLoginUserInfo = async () => {
  const data = await request({
    url: '/oauth/info',
    method: 'get',
  });
  return data;
};

const logout = () =>
  request({
    url: '/user/logout',
    method: 'get',
  });

export { login, getLoginUserInfo, logout };
