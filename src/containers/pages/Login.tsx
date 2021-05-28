import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { RouteComponentProps } from 'react-router';
import { FormProps } from 'antd/lib/form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useUpdateEffect } from 'ahooks';
import { LoginWrapper } from './styled';

const FormItem = Form.Item;

type LoginProps = {
  auth?: any;
} & RouteComponentProps &
  FormProps;

type authType = {
  uid?: string;
  funcName?: string;
};

const Login = (props: LoginProps) => {
  const { history } = props;
  const [auth, setAuth] = useState<authType>();

  useEffect(() => {
    setAuth({ uid: '' });
  }, [setAuth]);

  useUpdateEffect(() => {
    if (auth && auth.uid) {
      // 判断是否登陆
      localStorage.setItem('user', JSON.stringify(auth));
      history.push('/');
    }
  }, [history, auth]);

  const handleSubmit = (values: any) => {
    if (checkUser(values)) {
      setAuth({ funcName: values.userName });
    }
  };
  const checkUser = (values: any) => {
    const users = [
      ['admin', 'admin'],
      ['guest', 'guest'],
    ];
    return users.some(
      (user) => user[0] === values.userName && user[1] === values.password
    );
  };

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
