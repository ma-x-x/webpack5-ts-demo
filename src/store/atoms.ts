import { atom } from 'recoil';

export type Cart = {
  id: number;
  price: number;
  qty: number;
};

export const cart = atom<Cart[]>({
  key: 'cart',
  default: [],
});
