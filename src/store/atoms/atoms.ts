import { atom } from 'recoil';

export type Card = {
  key: number;
  title: string;
  desc: string;
};

export const card = atom<Card[]>({
  key: 'card',
  default: [],
});
