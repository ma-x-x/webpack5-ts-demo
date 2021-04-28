import React, { useState, FC } from 'react';
import { Card, Col, Button } from 'antd';
import './index.css';

export interface Props {
  name: string;
}

const DefaultProps: Props = {
  name: '测试卡片',
};

type CardObj = {
  key: number;
  type: string;
  title: string;
  desc: string;
};

const CardTest: FC<Props> = ({ name }: Props = DefaultProps) => {
  const [cardList, setCardList] = useState<Array<CardObj>>([]);

  /** 增加卡片 */
  const handleAddCard = (): void => {
    const newCardList = [
      ...cardList,
      {
        key: Math.random(),
        type: 'card',
        title: `文本${cardList.length}`,
        desc: `文本描述${cardList.length}`,
      },
    ];
    setCardList(newCardList);
  };

  /** 删除卡片 */
  const handleDeleteCard = (key: number): void => {
    const newCardList = cardList.filter((item) => item.key !== key);
    setCardList(newCardList);
  };

  console.log(111, cardList);
  return (
    <>
      <div>{name}</div>
      <Card bordered={false}>
        <Button onClick={handleAddCard}>Add</Button>
      </Card>
      <div className="site-card-wrapper">
        {cardList.map((item) => (
          <div key={item.key} className="card-item-wrapper">
            <Col span={8}>
              <Card title="Card title" bordered={false}>
                Card content
              </Card>
              <Button onClick={() => handleDeleteCard(item.key)}>Delete</Button>
            </Col>
          </div>
        ))}
        <div />
      </div>
    </>
  );
};

export default CardTest;
