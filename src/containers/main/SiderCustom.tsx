import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { usePrevious } from 'ahooks';
import routes from '@/routes/config';
import { useSwitch } from '@/utils/hooks';
import SiderMenu from './SiderMenu';

const { Sider } = Layout;

interface WrapperProps {
  readonly collapsed: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  #nprogress .spinner {
    left: ${(props: { collapsed: boolean }) =>
      props.collapsed ? '70px' : '206px'};
    right: 0 !important;
  }
  .logo {
    height: 32px;
    background: #ffffff;
    border-radius: 6px;
    margin: 16px;
  }
  .header__trigger {
    color: #ffffff;
  }
`;

type SiderCustomProps = RouteComponentProps<any> & {
  popoverHide?: () => void;
  collapsed?: boolean;
  smenus?: any;
};
interface IMenu {
  openKeys: string[];
  selectedKey: string;
}

const SiderCustom = (props: SiderCustomProps) => {
  const [collapsed, tCollapsed] = useSwitch();
  const [firstHide, tFirstHide] = useSwitch();
  const [menu, setMenu] = useState<IMenu>({ openKeys: [''], selectedKey: '' });
  // 异步菜单
  const { location, collapsed: pCollapsed } = props;
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

    if (pCollapsed !== collapsed) {
      setMenu(getOpenAndSelectKeys());
      tCollapsed.setSwitcher(!!pCollapsed);
      tFirstHide.setSwitcher(!!pCollapsed);
    }

    if (prePathname !== location.pathname) {
      setMenu(getOpenAndSelectKeys());
    }
  }, [
    prePathname,
    location.pathname,
    collapsed,
    tFirstHide,
    tCollapsed,
    pCollapsed,
  ]);

  const menuClick = (e: any) => {
    setMenu((state) => ({ ...state, selectedKey: e.key }));
    props.popoverHide?.(); // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
  };

  const openMenu: any = (v: string[]) => {
    setMenu((state) => ({ ...state, openKeys: v }));
    tFirstHide.turnOff();
  };

  return (
    <Wrapper collapsed={collapsed}>
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsed={collapsed}
        collapsible
        style={{ overflowY: 'auto' }}
        className="sider-custom"
      >
        <div className="logo" />
        <SiderMenu
          menus={[...routes.menus]}
          onClick={menuClick}
          mode="inline"
          selectedKeys={[menu.selectedKey]}
          openKeys={firstHide ? [] : menu.openKeys}
          onOpenChange={openMenu}
        />
      </Sider>
    </Wrapper>
  );
};

export default withRouter(SiderCustom);
