import React, { useState, FC } from 'react';
import { Card, Col, Button } from 'antd';

export interface Props {
  name: string;
}

const DefaultProps: Props = {
  name: '测试卡片',
};

const CardTest: FC<Props> = ({ name }: Props = DefaultProps) => {
  const [cardList, setCardList] = useState([
    { key: Math.random(), type: 'addBtn', title: '添加', desc: '' },
  ]);

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
    <div className="site-card-wrapper">
      <div>{name}</div>
      {cardList.map((item) => (
        <Col span={8} key={item.key}>
          <Card title="Card title" bordered={false}>
            Card content
          </Card>
          {item.type !== 'addBtn' && (
            <Button onClick={() => handleDeleteCard(item.key)}>Delete</Button>
          )}
        </Col>
      ))}
      <div>
        <Button onClick={handleAddCard}>Add</Button>
      </div>
    </div>
  );
};

export default CardTest;
