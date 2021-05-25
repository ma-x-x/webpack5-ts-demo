export interface IFMenuBase {
  key: string;
  title: string;
  icon?: string;
  component?: string;
  query?: string;
  requireAuth?: string;
  route?: string;
  /** 是否登录校验，true不进行校验（访客） */
  login?: boolean;
}

export interface IFMenu extends IFMenuBase {
  subs?: IFMenu[];
}

const menus: {
  menus: IFMenu[];
  others: IFMenu[] | [];
  [index: string]: any;
} = {
  menus: [
    // 菜单相关路由
    { key: '/app/home', title: '首页', icon: 'mobile', component: 'CardTest' },
    {
      key: '/subs4',
      title: '页面',
      icon: 'switcher',
      subs: [
        { key: '/login', title: '登录' },
        { key: '/404', title: '404' },
      ],
    },
    {
      key: '/app/auth',
      title: '权限管理',
      icon: 'safety',
      subs: [
        { key: '/app/auth/basic', title: '基础演示', component: 'AuthBasic' },
        {
          key: '/app/auth/routerEnter',
          title: '路由拦截',
          component: 'RouterEnter',
          requireAuth: 'auth/testPage',
        },
      ],
    },
    {
      key: '/app/test',
      title: '测试管理',
      icon: 'safety',
      subs: [
        { key: '/app/test/card', title: '卡片演示', component: 'CardTest' },
      ],
    },
  ],
  others: [], // 非菜单相关路由
};

export default menus;
