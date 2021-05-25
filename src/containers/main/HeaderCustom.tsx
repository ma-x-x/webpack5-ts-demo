import React, { useEffect, useState } from 'react';
import { Menu, Layout, Badge } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { parseQuery } from '@/utils';
import { gitOauthToken, gitOauthInfo } from '@/services/authService';
import styled from 'styled-components';

const Wrapper = styled.div`
  .header__trigger {
    color: #ffffff;
  }
  .ant-layout-sider-collapsed {
    .anticon {
      font-size: 16px;
      // margin-left: 8px;
    }
    .nav-text {
      display: none;
    }
    .ant-menu-submenu-vertical > .ant-menu-submenu-title:after {
      display: none;
    }
    .ant-menu-dark:not(.ant-menu-inline) .ant-menu-submenu-open {
      color: inherit;
    }
  }
`;

const { Header } = Layout;
const { SubMenu } = Menu;

type HeaderCustomProps = {
  toggle: () => void;
  collapsed: boolean;
  user: any;
};

const HeaderCustom = (props: HeaderCustomProps) => {
  const [user, setUser] = useState<any>();
  const history = useHistory();

  useEffect(() => {
    const query = parseQuery();
    const storageUser = localStorage.getItem('user');

    if (!storageUser && query.code) {
      gitOauthToken(query.code as string).then((res: any) => {
        gitOauthInfo(res.access_token).then((info: any) => {
          setUser({
            user: info,
          });
          localStorage.setItem('user', info);
        });
      });
    } else {
      setUser({
        user: storageUser,
      });
    }
  }, []);

  const menuClick = (e: any) => {
    e.key === 'logout' && logout();
  };
  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };
  return (
    <Wrapper>
      <Header className="custom-theme header">
        {props.collapsed ? (
          <MenuUnfoldOutlined
            className="header__trigger custom-trigger"
            onClick={props.toggle}
          />
        ) : (
          <MenuFoldOutlined
            className="header__trigger custom-trigger"
            onClick={props.toggle}
          />
        )}
        <Menu
          mode="horizontal"
          style={{ lineHeight: '64px', float: 'right' }}
          onClick={menuClick}
        >
          <Menu.Item key="1">
            <Badge count={25} overflowCount={10} style={{ marginLeft: 10 }}>
              <NotificationOutlined />
            </Badge>
          </Menu.Item>
          <SubMenu
            title={
              <span className="avatar">
                <i className="on bottom b-white" />
              </span>
            }
          >
            <Menu.ItemGroup title="用户中心">
              <Menu.Item key="setting:1">你好 - {user?.userName}</Menu.Item>
              <Menu.Item key="setting:2">个人信息</Menu.Item>
              <Menu.Item key="logout">
                <span onClick={logout}>退出登录</span>
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="设置中心">
              <Menu.Item key="setting:3">个人设置</Menu.Item>
              <Menu.Item key="setting:4">系统设置</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </Header>
    </Wrapper>
  );
};

export default HeaderCustom;
