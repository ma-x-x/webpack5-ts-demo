import React, { useState, FC } from 'react';
import { Card, Button } from 'antd';
import styled from 'styled-components';
import { Wrapper } from '@/styles/styles';
import './index.css';

const CustomWrapper = styled(Wrapper)`
  flex-direction: column;
`;

export interface Props {
  name: string;
}

const DefaultProps: Props = {
  name: '测试卡片',
};

export type CardObj = {
  key: number;
  title: string;
  desc: string;
};

const CardTest: FC<Props> = ({ name }: Props = DefaultProps) => {
  const [cardList, setCardList] = useState<CardObj[]>([]);

  /** 增加卡片 */
  const handleAddCard = (): void => {
    const newCard = {
      key: Math.random(),
      title: `名称${cardList.length}`,
      desc: `描述${cardList.length}`,
    };
    const newCardList = [...cardList, newCard];
    setCardList(newCardList);
  };

  /** 删除卡片 */
  const handleDeleteCard = (key: number): void => {
    const newCardList = cardList.filter((item) => item.key !== key);
    setCardList(newCardList);
  };

  return (
    <CustomWrapper>
      <div>{name}</div>
      <Card bordered={false}>
        <Button onClick={handleAddCard}>Add</Button>
      </Card>
      <div className="site-card-wrapper">
        {cardList.map((item) => (
          <div key={item.key} className="card-item-wrapper">
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
            <Button
              onClick={() => handleDeleteCard(item.key)}
              className="delete-btn"
            >
              Delete
            </Button>
          </div>
        ))}
        <div />
      </div>
    </CustomWrapper>
  );
};
export default CardTest;
