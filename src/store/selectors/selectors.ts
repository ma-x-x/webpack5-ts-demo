import { selector } from 'recoil';
import { card } from '../atoms/atoms';

export const cardState = selector({
  key: 'cardState',
  get: ({ get }) => {
    const list = get(card);
    return list;
  },
});
