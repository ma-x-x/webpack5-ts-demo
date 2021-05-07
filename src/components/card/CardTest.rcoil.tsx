import React, { FC } from 'react';
import { Card, Button } from 'antd';
import { useRecoilValue } from 'recoil';
import { card, useAddItem, useRemoveItem } from '@/store';
import './index.css';

export interface Props {
  name: string;
}

const DefaultProps: Props = {
  name: '测试卡片',
};

const CardTest: FC<Props> = ({ name }: Props = DefaultProps) => {
  const cardList = useRecoilValue(card);
  const add = useAddItem();
  const remove = useRemoveItem();
  return (
    <>
      <div>{name}</div>
      <Card bordered={false}>
        <Button
          onClick={() =>
            add({
              key: Math.random(),
              title: `名称${cardList.length}`,
              desc: `描述${cardList.length}`,
            })
          }
        >
          Add
        </Button>
      </Card>
      <div className="site-card-wrapper">
        {cardList.map((item) => (
          <div key={item.key} className="card-item-wrapper">
            <Card title={item.title} bordered={false}>
              {item.desc}
            </Card>
            <Button onClick={() => remove(item.key)} className="delete-btn">
              Delete
            </Button>
          </div>
        ))}
        <div />
      </div>
    </>
  );
};
export default CardTest;
