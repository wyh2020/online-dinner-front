/**
 * 定义应用路由
 */
import React from 'react';
import {
  Router,
  // browserHistory,
  hashHistory,
} from 'react-router';

// 路由配置规则参考： https://github.com/ReactTraining/react-router/blob/v3/docs/guides/RouteConfiguration.md#configuration-with-plain-routes
// 一下部分是由 ICE 相关工具自动生成的路由，请勿随意改变，否则可能会出现一些异常情况
// <!-- auto generated routes start -->
import HeaderAsideFooterLayout from './layouts/HeaderAsideFooterLayout';
import BlankLayout from './layouts/BlankLayout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Pwd from './pages/Pwd';
import MyInfo from './pages/MyInfo';
import MyCart from './pages/MyCart';
import ShopList from './pages/ShopList';
import ShopAdd from './pages/ShopAdd';
import UserList from './pages/UserList';
import UserAdd from './pages/UserAdd';
import GoodList from './pages/GoodList';
import GoodAdd from './pages/GoodAdd';
import SelectGood from './pages/SelectGood';
import TradeList from './pages/TradeList';
import ClassList from './pages/ClasssList';
import ClassAdd from './pages/ClasssAdd';

const autoGeneratedRoutes = [{
  path: '/login',
  component: BlankLayout,
  indexRoute: {
    component: Login,
  },
}, {
  path: '/reg',
  component: BlankLayout,
  indexRoute: {
    component: Register,
  },
}, {
  path: '/pwd',
  component: BlankLayout,
  indexRoute: {
    component: Pwd,
  },
}, {
  path: '/my-info',
  component: HeaderAsideFooterLayout,
  indexRoute: {
    component: MyInfo,
  },
}, {
  path: '/my-cart',
  component: HeaderAsideFooterLayout,
  indexRoute: {
    component: MyCart,
  },
}, {
  path: '/shop',
  childRoutes: [{
    path: 'list',
    childRoutes: [],
    component: ShopList,
  }, {
    path: 'add',
    childRoutes: [],
    component: ShopAdd,
  }],
  component: HeaderAsideFooterLayout,
  indexRoute: {
    component: ShopList,
  },
}, {
  path: '/user',
  childRoutes: [{
    path: 'list',
    childRoutes: [],
    component: UserList,
  }, {
    path: 'add',
    childRoutes: [],
    component: UserAdd,
  }],
  component: HeaderAsideFooterLayout,
  indexRoute: {
    component: UserList,
  },
}, {
  path: '/good',
  childRoutes: [{
    path: 'list',
    childRoutes: [],
    component: GoodList,
  }, {
    path: 'add',
    childRoutes: [],
    component: GoodAdd,
  }],
  component: HeaderAsideFooterLayout,
  indexRoute: {
    component: GoodList,
  },
}, {
  path: '/good/select',
  component: HeaderAsideFooterLayout,
  indexRoute: {
    component: SelectGood,
  },
}, {
  path: '/trade/list',
  component: HeaderAsideFooterLayout,
  indexRoute: {
    component: TradeList,
  },
}, {
  path: '/class',
  childRoutes: [{
    path: 'list',
    childRoutes: [],
    component: ClassList,
  }, {
    path: 'add',
    childRoutes: [],
    component: ClassAdd,
  }],
  component: HeaderAsideFooterLayout,
  indexRoute: {
    component: ClassList,
  },
}, {
  path: '/',
  childRoutes: [],
  component: HeaderAsideFooterLayout,
  indexRoute: {
    component: Dashboard,
  },
}];
// <!-- auto generated routes end -->

// 自定义路由，如果 path 相同则会覆盖自动生成部分的路由配置
const customRoutes = [];

export default (
  <Router
    history={hashHistory}
    routes={[...autoGeneratedRoutes, ...customRoutes]}
  />
);
