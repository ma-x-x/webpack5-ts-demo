import React, { useState, useEffect } from 'react';
import { Layout, Affix } from 'antd';
import styled from 'styled-components';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { usePrevious } from 'ahooks';
import routes from '@/routes/config';
import { useSwitch } from '@/utils/hooks';
import SiderMenu from './SiderMenu';

const { Sider } = Layout;

const Wrapper = styled.div`
  background: #fff;
  box-shadow: 2px 0 3px -1px #cfcfcf;
  margin-right: 4px;
  position: relative;
  overflow: hidden;
  zoom: 1;
  display: flex;
  flex-shrink: 0;
  .left-wrapper {
    background: #fff;
  }
  .collapsed__wrapper {
    background: rgb(244, 244, 244);
    height: 30px;
    text-align: center;
    padding-top: 6px;
    cursor: pointer;
  }
`;

type SiderCustomProps = RouteComponentProps<any> & {
  popoverHide?: () => void;
};
interface IMenu {
  openKeys: string[];
  selectedKey: string;
}

const SiderCustom = (props: SiderCustomProps) => {
  const [firstHide, tFirstHide] = useSwitch();
  const [menu, setMenu] = useState<IMenu>({ openKeys: [''], selectedKey: '' });
  const [collapsed, setCollapsed] = useState<boolean>(false);

  function toggle() {
    setCollapsed(!collapsed);
  }

  // 异步菜单
  const { location } = props;
  const prePathname = usePrevious(location.pathname);

  useEffect(() => {
    const recombineOpenKeys = (openKeys: string[]) => {
      let i = 0;
      let strPlus = '';
      const tempKeys: string[] = [];
      // 多级菜单循环处理
      while (i < openKeys.length) {
        strPlus += openKeys[i];
        tempKeys.push(strPlus);
        i++;
      }
      return tempKeys;
    };
    const getOpenAndSelectKeys = () => ({
      openKeys: recombineOpenKeys(location.pathname.match(/\/(\w+)/gi) || []),
      selectedKey: location.pathname,
    });

    if (prePathname !== location.pathname) {
      setMenu(getOpenAndSelectKeys());
    }
  }, [prePathname, location.pathname, tFirstHide]);

  const menuClick = (e: any) => {
    setMenu((state) => ({ ...state, selectedKey: e.key }));
    props.popoverHide?.(); // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
  };

  const openMenu: any = (v: string[]) => {
    setMenu((state) => ({ ...state, openKeys: v }));
    tFirstHide.turnOff();
  };

  return (
    <Wrapper>
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsed={collapsed}
        collapsible
        style={{ overflowY: 'auto' }}
        className="sider-custom"
      >
        <Affix offsetTop={0}>
          <div onClick={toggle} className="collapsed__wrapper">
            {collapsed ? (
              <MenuUnfoldOutlined className="header__trigger custom-trigger" />
            ) : (
              <MenuFoldOutlined className="header__trigger custom-trigger" />
            )}
          </div>
          <SiderMenu
            menus={[...routes.menus]}
            onClick={menuClick}
            mode="inline"
            selectedKeys={[menu.selectedKey]}
            openKeys={firstHide ? [] : menu.openKeys}
            onOpenChange={openMenu}
          />
        </Affix>
      </Sider>
    </Wrapper>
  );
};

export default withRouter(SiderCustom);
