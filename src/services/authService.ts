import request from '@/utils/request';
import qs from 'qs';

const gitOauthToken = (code: string) =>
  request({
    url: `/oauth/token?code=${code}`,
    method: 'get',
  });

const gitOauthInfo = (token: string) =>
  request({
    url: `/oauth/info?token=${token}`,
    method: 'get',
  });

const loginBasicAuth = ({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) =>
  request({
    url: '/oauth/token',
    method: 'post',
    headers: {
      Authorization: 'Basic Y2xpZW50X3Bvc3RtYW5fcHc6c2VjcmV0',
      'Content-Type': 'application/x-www-form-urlencoded',
    }, // 设置header文字信息
    data: qs.stringify({
      grant_type: 'password',
      username: userId,
      password,
      scope: 'all',
    }),
  });

const logout = ({ token }: { token: string }) =>
  request({
    url: `/aiSquare/openApi/uc/oauth/logout?token=${token}`,
    method: 'get',
  });

export { gitOauthToken, gitOauthInfo, loginBasicAuth, logout };
