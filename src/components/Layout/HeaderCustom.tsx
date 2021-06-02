import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import AvatarDropdown from '../GlobalHeader/AvatarDropdown';

const Wrapper = styled.div`
  header {
    padding: 0 50px 0 16px;
    display: flex;
  }
  .logo__wrapper {
    width: 200px;
  }
  .logo {
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }
  .header-menu__container {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
  }
`;

const { Header } = Layout;

type HeaderCustomProps = {
  user?: any;
};

const HeaderCustom = (props: HeaderCustomProps) => (
  <Wrapper>
    <Header className="custom-theme header">
      <div className="logo__wrapper">
        <div className="logo" />
      </div>
      <div className="header-menu__container">
        <HeaderMenu />
        <AvatarDropdown currentUser={props.user} />
      </div>
    </Header>
  </Wrapper>
);

export default HeaderCustom;
