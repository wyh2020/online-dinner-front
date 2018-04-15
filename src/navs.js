// <!-- auto generated navs start -->
import CommonInfo from './util/CommonInfo';

const autoGenHeaderNavs = [];
const autoGenAsideNavs = [];
// <!-- auto generated navs end -->

const userInfo = JSON.parse(CommonInfo.getODUserInfo()) || {};

const customHeaderNavs = [
  {
    text: '购物车',
    to: 'my-cart',
    external: false,
    newWindow: false,
    icon: 'shopcar',
  },
];
let customAsideNavs = [
  {
    text: 'Dashboard',
    to: '/',
    icon: 'home2',
  },
  {
    text: '店铺管理',
    to: '/shop/list',
    icon: 'shop',
    children: [
      {
        text: '店铺列表',
        to: '/shop/list',
      },
      {
        text: '新增店铺',
        to: '/shop/add',
      },
    ],
  },
  {
    text: '用户管理',
    to: '/user/list',
    icon: 'person',
    children: [
      {
        text: '用户列表',
        to: '/user/list',
      },
      {
        text: '新增用户',
        to: '/user/add',
      },
    ],
  },
  {
    text: '菜品管理',
    to: '/good/list',
    icon: 'directory',
    children: [
      {
        text: '菜品列表',
        to: '/good/list',
      },
      {
        text: '新增菜品',
        to: '/good/add',
      },
    ],
  },
  {
    text: '订单管理',
    to: '/trade/list',
    icon: 'cascades',
    children: [
      {
        text: '订单列表',
        to: '/trade/list',
      },
    ],
  },
];
// 管理员
if (userInfo.type === 1) {
  customAsideNavs = [
    {
      text: 'Dashboard',
      to: '/',
      icon: 'home2',
    },
    {
      text: '店铺管理',
      to: '/shop/list',
      icon: 'shop',
      children: [
        {
          text: '店铺列表',
          to: '/shop/list',
        },
        {
          text: '新增店铺',
          to: '/shop/add',
        },
      ],
    },
    {
      text: '用户管理',
      to: '/user/list',
      icon: 'person',
      children: [
        {
          text: '用户列表',
          to: '/user/list',
        },
        {
          text: '新增用户',
          to: '/user/add',
        },
      ],
    },
    {
      text: '菜品管理',
      to: '/good/list',
      icon: 'directory',
      children: [
        {
          text: '菜品列表',
          to: '/good/list',
        },
      ],
    },
    {
      text: '订单管理',
      to: '/trade/list',
      icon: 'cascades',
      children: [
        {
          text: '订单列表',
          to: '/trade/list',
        },
      ],
    },
  ];
} else if (userInfo.type === 2) {
  customAsideNavs = [
    {
      text: 'Dashboard',
      to: '/',
      icon: 'home2',
    },
    {
      text: '菜品管理',
      to: '/good/list',
      icon: 'directory',
      children: [
        {
          text: '菜品列表',
          to: '/good/list',
        },
        {
          text: '新增菜品',
          to: '/good/add',
        },
      ],
    },
    {
      text: '订单管理',
      to: '/trade/list',
      icon: 'cascades',
      children: [
        {
          text: '订单列表',
          to: '/trade/list',
        },
      ],
    },
  ];
} else if (userInfo.type === 3) {
  customAsideNavs = [
    {
      text: 'Dashboard',
      to: '/',
      icon: 'home2',
    },
    {
      text: '我的订单',
      to: '/trade/list',
      icon: 'cascades',
      children: [
        {
          text: '订单列表',
          to: '/trade/list',
        },
      ],
    },
  ];
}


function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...autoGenAsideNavs, ...customAsideNavs]);
