import React from 'react';
import { Layout } from 'antd';
import { useRecoilValueLoadable } from 'recoil';
import SiderCustom from '@/components/Layout/SiderCustom';
import HeaderCustom from '@/components/Layout/HeaderCustom';
import { Copyright, BreadcrumbCustom } from '@/components/widget';
import Routes from '@/routes';
import { checkLogin } from '@/utils';
import { getUserInfo } from '@/store/selectors/userSelector';
import { AppWrapper } from './styled';

const { Content, Footer } = Layout;

function App() {
  const userLoadable = useRecoilValueLoadable(getUserInfo);
  return (
    <AppWrapper>
      <Layout className="app_layout_container">
        <HeaderCustom user={userLoadable.contents} />
        <Layout className="app_layout">
          {userLoadable.state === 'hasValue' &&
            checkLogin(userLoadable.contents?.permissions) && <SiderCustom />}
          <Layout>
            <Content className="app_layout_content">
              <BreadcrumbCustom breads={['测试管理', '卡片演示']} />
              <div className="app-main__wrapper">
                {userLoadable.state === 'hasValue' && (
                  <Routes auth={userLoadable.contents} />
                )}
              </div>
            </Content>
            <Footer className="app_layout_foot">
              <Copyright />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </AppWrapper>
  );
}

export default App;
