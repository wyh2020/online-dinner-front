import React, { PureComponent } from 'react';
import { Balloon, Icon, Feedback, Badge } from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import cx from 'classnames';
import { Link } from 'react-router';
import { headerNavs } from '../navs';
import Logo from './Logo';
import CommonInfo from '../util/CommonInfo';
import CallApi from '../util/Api';

export default class Header extends PureComponent {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(CommonInfo.getODUserInfo()) || {},
      sum: CommonInfo.getODCartSum() || 0,
    };
  }

  componentDidMount() {
    // 每隔1s取
    setInterval(() => {
      this.setState({
        sum: CommonInfo.getODCartSum() || 0,
      });
    }, 1000);
  }

  toLoginOut = () => {
    CallApi('/od/auth/loginout', { }, 'POST', true).then((res) => {
      if (res.result === 'fail') {
        Feedback.toast.error(res.msg);
      } else {
        CommonInfo.removeToken();
        CommonInfo.removeODUserInfo();
      }
    }).catch((err) => {
      Feedback.toast.error(err);
    });
  }

  render() {
    const { width, theme, isMobile, className, style, ...others } = this.props;
    console.log('userInof====', this.state.userInfo)
    return (
      <Layout.Header
        {...others}
        theme={theme}
        className={cx('ice-design-layout-header', className)}
        style={{ ...style, width }}
      >
        <Logo />
        <div
          className="ice-design-layout-header-menu"
          style={{ display: 'flex' }}
        >
          {/* Header 菜单项 begin */}
          {headerNavs && headerNavs.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerNavs.map((nav, idx) => {
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
                  <Menu.Item key={idx}>
                    <Badge count={this.state.sum} overflowCount={99}>
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        {!isMobile ? nav.text : null}
                      </Link>
                    </Badge>
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}

          <Balloon
            trigger={
              <div
                className="ice-design-header-userpannel"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <IceImg
                  height={40}
                  width={40}
                  src="https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png"
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name" style={{ fontSize: '13px' }}>
                    {this.state.userInfo.name}
                  </span>
                  <br />
                  <span
                    className="user-department"
                    style={{ fontSize: '12px' }}
                  >
                    {this.state.userInfo.phone}
                  </span>
                </div>
                <Icon
                  type="arrow-down-filling"
                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li className="user-profile-menu-item">
                <Link to="/my-info">
                  <FoundationSymbol type="person" size="small" />我的主页
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/login" onClick={this.toLoginOut}>
                  <FoundationSymbol type="compass" size="small" />退出
                </Link>
              </li>
            </ul>
          </Balloon>
        </div>
      </Layout.Header>
    );
  }
}
