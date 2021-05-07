import { useRecoilState } from 'recoil';
import { card, Card } from '../atoms/atoms';

export const useAddItem = () => {
  const [items, setItems] = useRecoilState(card);
  return (newCard: Card) => {
    setItems([...items, newCard]);
  };
};

export const useRemoveItem = () => {
  const [items, setItems] = useRecoilState(card);
  return (key: number) => {
    setItems(items.filter((item: Card) => item.key !== key));
  };
};
