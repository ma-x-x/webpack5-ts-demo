import React, { useState } from 'react';
import { Layout } from 'antd';
import SiderCustom from '@/containers/main/SiderCustom';
import HeaderCustom from '@/containers/main/HeaderCustom';
import { Copyright, BreadcrumbCustom } from '@/components/widget';
import Routes from '@/routes';
import { checkLogin } from '@/utils';
import { AppWrapper } from './styled';

// const CardTest = React.lazy(() => import('@/components/card/CardTest')); // Lazy-loaded

const { Content, Footer } = Layout;

function App() {
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
    <AppWrapper>
      <Layout className="app_layout_container">
        <HeaderCustom user={auth || {}} />
        <Layout className="app_layout">
          {checkLogin(auth.permissions) && <SiderCustom />}
          <Layout>
            <Content className="app_layout_content">
              <BreadcrumbCustom breads={['测试管理', '卡片演示']} />
              <div className="app-main__wrapper">
                <Routes auth={auth} />
              </div>
            </Content>
            <Footer className="app_layout_foot">
              <Copyright />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
      {/* <div className="App">
        <Suspense fallback={<Spin />}>
          <CardTest name="test" />
        </Suspense>
      </div> */}
    </AppWrapper>
  );
}

export default App;
