/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import Menu, { SubMenu, Item as MenuItem } from '@icedesign/menu';
import { Icon } from '@icedesign/base';
import { Link } from 'react-router';
import FoundationSymbol from 'foundation-symbol';
import { enquire } from 'enquire-js';
import Header from './../../components/Header';
import Footer from './../../components/Footer';
import Logo from './../../components/Logo';
import './scss/light.scss';
import './scss/dark.scss';
import CommonInfo from '../../util/CommonInfo';

// 设置默认的皮肤配置，支持 dark 和 light 两套皮肤配置
const theme = typeof THEME === 'undefined' ? 'dark' : THEME;
export default class HeaderAsideFooterResponsiveLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false,
      isScreen: undefined,
      userInfo: JSON.parse(CommonInfo.getODUserInfo()) || {},
      customAsideNavs: [],
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
    this.toGetNavs();
  }

  toGetNavs = () => {
    const userInfo = this.state.userInfo;
    let customAsideNavs = [
      {
        text: '首页',
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
          text: '首页',
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
          text: '分类管理',
          to: '/class/list',
          icon: 'directory',
          children: [
            {
              text: '分类列表',
              to: '/class/list',
            },
            {
              text: '新增分类',
              to: '/class/add',
            },
          ],
        },
      ];
    } else if (userInfo.type === 2) {
      customAsideNavs = [
        {
          text: '首页',
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
          text: '首页',
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
    this.setState({
      customAsideNavs,
    });
  }

  /**
   * 注册监听屏幕的变化，可根据不同分辨率做对应的处理
   */
  enquireScreenRegister = () => {
    const isMobile = 'screen and (max-width: 720px)';
    const isTablet = 'screen and (min-width: 721px) and (max-width: 1199px)';
    const isDesktop = 'screen and (min-width: 1200px)';

    enquire.register(isMobile, this.enquireScreenHandle('isMobile'));
    enquire.register(isTablet, this.enquireScreenHandle('isTablet'));
    enquire.register(isDesktop, this.enquireScreenHandle('isDesktop'));
  };

  enquireScreenHandle = (type) => {
    let collapse;
    if (type === 'isMobile') {
      collapse = false;
    } else if (type === 'isTablet') {
      collapse = true;
    } else {
      collapse = this.state.collapse;
    }

    const handler = {
      match: () => {
        this.setState({
          isScreen: type,
          collapse,
        });
      },
      unmatch: () => {
        // handler unmatched
      },
    };

    return handler;
  };

  /**
   * 响应式通过抽屉形式切换菜单
   */
  toggleMenu = () => {
    const { openDrawer } = this.state;
    this.setState({
      openDrawer: !openDrawer,
    });
  };

  /**
   * 左侧菜单收缩切换
   */
  onMenuClick = () => {
    this.toggleMenu();
  };

  /**
   * 当前展开的菜单项
   */
  getOpenKeys = () => {
    const { routes } = this.props;
    const matched = routes[0].path;
    let openKeys = '';
    const customAsideNavs = this.state.customAsideNavs;

    customAsideNavs &&
    customAsideNavs.length > 0 &&
    customAsideNavs.map((item, index) => {
      if (item.to === matched) {
        openKeys = index;
      }
    });

    return openKeys;
  };

  render() {
    const { location: { pathname } } = this.props;
    const { customAsideNavs } = this.state;

    return (
      <Layout
        style={{ minHeight: '100vh' }}
        className={cx(`ice-design-header-aside-footer-layout-${theme}`, {
          'ice-design-layout': true,
        })}
      >
        <Header theme={theme} isMobile={this.state.isScreen !== 'isDesktop'} />
        <Layout.Section className="ice-design-layout-body">
          {this.state.isScreen !== 'isDesktop' && (
            <a className="menu-btn" onClick={this.toggleMenu}>
              <Icon type="category" size="small" />
            </a>
          )}

          {this.state.openDrawer && (
            <div className="open-drawer-bg" onClick={this.toggleMenu} />
          )}

          <Layout.Aside
            width="auto"
            theme={theme}
            className={cx('ice-design-layout-aside', {
              'open-drawer': this.state.openDrawer,
            })}
          >
            {this.state.isScreen !== 'isDesktop' && <Logo />}
            <Menu
              style={{ width: 200 }}
              onClick={this.onMenuClick}
              selectedKeys={[pathname]}
              defaultSelectedKeys={[pathname]}
              defaultOpenKeys={[`${this.getOpenKeys()}`]}
              mode="inline"
            >
              {customAsideNavs &&
              customAsideNavs.length > 0 &&
              customAsideNavs.map((nav, index) => {
                  if (nav.children && nav.children.length > 0) {
                    return (
                      <SubMenu
                        key={index}
                        title={
                          <span>
                            {nav.icon ? (
                              <FoundationSymbol size="small" type={nav.icon} />
                            ) : null}
                            <span className="ice-menu-collapse-hide">
                              {nav.text}
                            </span>
                          </span>
                        }
                      >
                        {nav.children.map((item) => {
                          const linkProps = {};
                          if (item.newWindow) {
                            linkProps.href = item.to;
                            linkProps.target = '_blank';
                          } else if (item.external) {
                            linkProps.href = item.to;
                          } else {
                            linkProps.to = item.to;
                          }
                          return (
                            <MenuItem key={item.to}>
                              <Link {...linkProps}>{item.text}</Link>
                            </MenuItem>
                          );
                        })}
                      </SubMenu>
                    );
                  }
                  const linkProps = {};
                  if (nav.newWindow) {
                    linkProps.href = nav.to;
                    linkProps.target = '_blank';
                  } else if (nav.external) {
                    linkProps.href = nav.to;
                  } else {
                    linkProps.to = nav.to;
                  }
                  return (
                    <MenuItem key={nav.to}>
                      <Link {...linkProps}>
                        <span>
                          {nav.icon ? (
                            <FoundationSymbol size="small" type={nav.icon} />
                          ) : null}
                          <span className="ice-menu-collapse-hide">
                            {nav.text}
                          </span>
                        </span>
                      </Link>
                    </MenuItem>
                  );
                })}
            </Menu>
            {/* 侧边菜单项 end */}
          </Layout.Aside>
          {/* 主体内容 */}
          <Layout.Main>{this.props.children}</Layout.Main>
        </Layout.Section>
        <Footer />
      </Layout>
    );
  }
}
