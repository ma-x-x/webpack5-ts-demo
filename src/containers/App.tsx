import React, { useState } from 'react';
import { Layout } from 'antd';
import SiderCustom from '@/containers/main/SiderCustom';
import HeaderCustom from '@/containers/main/HeaderCustom';
import { Copyright } from '@/components/widget';
import Routes from '@/routes';
import { checkLogin } from '@/utils';

// const CardTest = React.lazy(() => import('@/components/card/CardTest')); // Lazy-loaded

const { Content, Footer } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  function toggle() {
    setCollapsed(!collapsed);
  }
  const auth = {
    permissions: [
      '/app/home',
      '/subs4',
      '/app/auth',
      '/app/auth/basic',
      '/app/auth/routerEnter',
    ],
  };
  return (
    <>
      <Layout className="app_layout_container">
        {checkLogin(auth.permissions) && <SiderCustom collapsed={collapsed} />}
        <Layout className="app_layout">
          <HeaderCustom
            toggle={toggle}
            collapsed={collapsed}
            user={auth || {}}
          />
          <Content className="app_layout_content">
            <Routes auth={auth} />
          </Content>
          <Footer className="app_layout_foot">
            <Copyright />
          </Footer>
        </Layout>
      </Layout>
      {/* <div className="App">
        <Suspense fallback={<Spin />}>
          <CardTest name="test" />
        </Suspense>
      </div> */}
    </>
  );
}

export default App;
