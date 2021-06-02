import { selector } from 'recoil';
import { getLoginUserInfo } from '@/services/authService';
import { tokenState, userState, User } from '../atoms/userAtom';

export const getAuthToken = selector({
  key: 'getAuthToken',
  get: ({ get }) => {
    const token = get(tokenState);
    return token;
  },
});

// 异步获取数据。
export const getUserInfo = selector({
  key: 'getUserInfo',
  get: async ({ get }) => {
    const userInfo = get(userState);

    if (userInfo) {
      return userInfo;
    }

    const response = await getLoginUserInfo();
    const user: User = response.data;

    return user;
  },
});
