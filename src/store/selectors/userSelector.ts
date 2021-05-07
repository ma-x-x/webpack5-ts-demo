import { selector } from 'recoil';
import { username, User } from '../atoms/userAtom';

// 异步获取数据。
export const githubUser = selector({
  key: 'githubUser',
  get: async ({ get }) => {
    const ghUsername = get(username);

    if (!ghUsername) {
      return null;
    }

    const response = await fetch(`https://api.github.com/users/${ghUsername}`);
    const user: User = await response.json();

    return user;
  },
});
