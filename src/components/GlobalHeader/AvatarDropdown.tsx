import React from 'react';
import { Avatar, Menu, Spin, Dropdown } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { CurrentUser } from '@/models/user';
import { AvatarWrapper } from './styled';

export type GlobalHeaderRightProps = {
  currentUser?: CurrentUser;
  menu?: boolean;
};

interface MenuClickEventHandler {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

const AvatarDropdown = (props: GlobalHeaderRightProps) => {
  const history = useHistory();
  const onMenuClick = (event: MenuClickEventHandler) => {
    const { key } = event;

    history.push(`/account/${key}`);
  };

  const {
    currentUser = {
      avatar: '',
      userName: '',
    },
  } = props;
  const menuHeaderDropdown = (
    <Menu
      className="user-menu__wrapper"
      selectedKeys={[]}
      onClick={onMenuClick}
    >
      <Menu.Item key="center">
        <UserOutlined />
        {currentUser.userName}
      </Menu.Item>

      <Menu.Item key="settings">
        <SettingOutlined />
        修改密码
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <AvatarWrapper>
      {currentUser && currentUser.userName ? (
        <Dropdown overlay={menuHeaderDropdown}>
          <span className="avatar__container">
            <Avatar
              size="small"
              className="avatar__wrapper"
              src={currentUser.avatar}
              alt="avatar"
            />
            <span className="username__wrapper">{currentUser.userName}</span>
          </span>
        </Dropdown>
      ) : (
        <span className="no-user__wrapper">
          <Spin
            size="small"
            style={{
              marginLeft: 8,
              marginRight: 8,
            }}
          />
        </span>
      )}
    </AvatarWrapper>
  );
};

export default AvatarDropdown;
