import { atom } from 'recoil';

export type User = {
  userId: string;
  userName: string;
  password: string;
  phone: string;
  email: string;
  sex: string;
  permissions: string[];
};

export const tokenState = atom({
  key: 'token',
  default: 'token',
});

export const userState = atom({
  key: 'userState',
  default: null,
});
