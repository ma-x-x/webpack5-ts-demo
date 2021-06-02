import axios from 'axios';
import { notification, Modal } from 'antd';
import NProgress from 'nprogress';
import { getToken } from './auth';
import 'nprogress/nprogress.css';

NProgress.configure({
  showSpinner: true,
  easing: 'ease',
  speed: 500,
});

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: '/api',
  timeout: 15000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    NProgress.done();
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code !== 200) {
      notification.error({
        key: 'SYSTEM_ERROR',
        message: '系统错误',
        description: res.message,
      });

      // 401:未登录;
      if (res.code === 401) {
        handleLoginTimeout();
      }
      return Promise.reject('error');
    }
    return response.data;
  },
  (error) => {
    NProgress.done();
    console.log(`err${error}`); // for debug
    notification.error({
      key: 'SYSTEM_ERROR',
      message: '系统错误',
      description: error.message,
    });

    return Promise.reject(error);
  }
);

/**
 * 处理登录超时/授权失败
 */
const handleLoginTimeout = (errorMsg = '登录超时') => {
  let secondsToGo = 5;
  const modal = Modal.warn({
    title: errorMsg,
    content: `系统${errorMsg},${secondsToGo} 秒后自动跳转至登录页面！`,
    okText: '立即跳转至登录页面',
    onOk: () => {
      clearInterval(timer);
      modal.destroy();
      window.location.reload();
    },
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
    if (modal.update) {
      modal.update({
        content: `${errorMsg},${secondsToGo} 秒后自动跳转至登录页面！`,
      });
    }
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
    window.location.reload();
  }, secondsToGo * 1000);
  return modal;
};

export default service;
