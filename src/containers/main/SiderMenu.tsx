import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { MenuProps } from 'antd/lib/menu';
import { IFMenu } from '@/routes/config';

const Wrapper = styled.div`
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    height: 12px;
    -webkit-box-shadow: none;
    background-color: #555;
  }
`;

const renderMenuItem = (
  item: IFMenu // item.route 菜单单独跳转的路由
) => (
  <Menu.Item key={item.key} icon={<UserOutlined />}>
    <Link to={(item.route || item.key) + (item.query || '')}>
      {/* {item.icon && <Icon type={item.icon} />} */}
      <span className="nav-text">{item.title}</span>
    </Link>
  </Menu.Item>
);

const renderSubMenu = (item: IFMenu) => (
  <Menu.SubMenu
    key={item.key}
    icon={<UserOutlined />}
    title={
      <span>
        {/* {item.icon && <Icon type={item.icon} />} */}
        <span className="nav-text">{item.title}</span>
      </span>
    }
  >
    {item.subs!.map((sub) =>
      sub.subs ? renderSubMenu(sub) : renderMenuItem(sub)
    )}
  </Menu.SubMenu>
);

type SiderMenuProps = MenuProps & {
  menus: any;
  onClick: (e: any) => void;
  selectedKeys: string[];
  openKeys?: string[];
  onOpenChange: (v: string[]) => void;
};

const SiderMenu = ({ menus, ...props }: SiderMenuProps) => {
  const [dragItems, setDragItems] = useState<any>([]);

  useEffect(() => {
    setDragItems(menus);
  }, [menus]);

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const _items = reorder(
      dragItems,
      result.source.index,
      result.destination.index
    );
    setDragItems(_items);
  };

  /** 菜单滚动区域高度 */
  const getMenu2LeftTop = () => {
    let leftTop = 60;
    let { scrollTop } = document.documentElement;
    if (scrollTop < 40) {
      leftTop = 60 - scrollTop;
    } else if (scrollTop > 40) {
      leftTop = 20;
    }
    return leftTop + 40;
  };

  let leftTop = getMenu2LeftTop();

  return (
    <Wrapper
      style={{
        height: document.documentElement.clientHeight - leftTop,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {dragItems.map((item: IFMenu, index: number) => (
                <Draggable key={item.key} draggableId={item.key} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onDragStart={(e: React.DragEvent<any>) =>
                        provided.dragHandleProps &&
                        provided.dragHandleProps.onDragStart(e as any)
                      }
                    >
                      <Menu {...props}>
                        {item.subs!
                          ? renderSubMenu(item)
                          : renderMenuItem(item)}
                      </Menu>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
};

export default React.memo(SiderMenu);
