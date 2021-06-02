import React from 'react';
import { useRecoilState } from 'recoil';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { tokenState } from '@/store/atoms/userAtom';
import { login, loginType } from '@/services/authService';
import { Redirect } from 'react-router-dom';
import { LoginWrapper } from './styled';

const FormItem = Form.Item;

const Login = () => {
  const [token, setToken] = useRecoilState(tokenState);

  const handleLogin = async (values: loginType) => {
    const response = await login(values);
    const { access_token } = response.data;
    localStorage.setItem('ai-token', access_token);
    setToken(access_token);
  }; 

  const handleSubmit = (values: loginType) => {
    handleLogin(values);
  };

  if (token === 'success token') {
    return <Redirect to="/app/home" />;
  }

  return (
    <LoginWrapper>
      <div className="login-form">
        <div className="login-logo">
          <span>欢迎登录</span>
        </div>
        <Form onFinish={handleSubmit} style={{ maxWidth: '300px' }}>
          <FormItem
            name="userName"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined size={13} />}
              placeholder="请输入用户名"
            />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined size={13} />}
              type="password"
              placeholder="请输入密码"
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: '100%' }}
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </LoginWrapper>
  );
};

export default Login;
