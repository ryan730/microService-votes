import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Balloon, Icon, Message, Nav } from '@alifd/next';
import IceImg from '@icedesign/img';
import { headerMenuConfig } from '@/menuConfig';
import Logo from '../Logo';
import styles from './index.module.scss';

const { Item } = Nav;

function Header(props) {
  /**
   * 默认重定向到主页
   */
  function handleClick(selectedKeys) {
    const { history } = props;
    if (selectedKeys.key !== '/') {
      Message.success('可以使用 Iceworks 按需添加页面');
      history.push('/');
    }
  }

  const { location: { pathname } } = props;
  return (
    <div className={styles.headerContainer} style={{ 'background': 'linear-gradient(to right, rgb(250, 41, 47), rgb(124, 114, 250))' }}>
      <Logo/>
      <div className={styles.headerNavbar}>
        <Nav
          className={styles.headerNavbarMenu}
          selectedKeys={[pathname]}
          defaultSelectedKeys={[pathname]}
          direction="hoz"
          type="secondary"
          onClick={handleClick}
          style={{backgroundColor:'rgba(0,0,0,0)'}}
        >
          {headerMenuConfig
            && headerMenuConfig.length > 0
            && headerMenuConfig.map((nav, index) => {
              if (nav.children && nav.children.length > 0) {
                return (
                  <Item
                    style={{backgroundColor:'rgba(0,0,0,0)'}}
                    triggerType="click"
                    key={index}
                    title={(
                      <span>
                        {nav.icon ? (
                          <Icon size="small" type={nav.icon} />
                        ) : null}
                        <span>{nav.name}</span>
                      </span>
                    )}
                  >
                    {nav.children.map((item) => {
                      const linkProps = {};
                      if (item.external) {
                        if (item.newWindow) {
                          linkProps.target = '_blank';
                        }

                        linkProps.href = item.path;
                        return (
                          <Item key={item.path}
                            style={{backgroundColor:'rgba(0,0,0,0)'}}
                          >
                            <a {...linkProps}>
                              <span>{item.name}</span>
                            </a>
                          </Item>
                        );
                      }
                      linkProps.to = item.path;
                      return (
                        <Item key={item.path}
                          style={{backgroundColor:'rgba(0,0,0,0)'}}
                        >
                          <Link {...linkProps}>
                            <span>{item.name}</span>
                          </Link>
                        </Item>
                      );
                    })}
                  </Item>
                );
              }
              const linkProps = {};
              if (nav.external) {
                if (nav.newWindow) {
                  linkProps.target = '_blank';
                }
                linkProps.href = nav.path;
                return (
                  <Item key={nav.path}
                  style={{backgroundColor:'rgba(0,0,0,0)'}}
                  >
                    <a {...linkProps}>
                      <span>
                        {nav.icon ? (
                          <Icon size="small" type={nav.icon} />
                        ) : null}
                        {nav.name}
                      </span>
                    </a>
                  </Item>
                );
              }
              linkProps.to = nav.path;
              return (
                <Item key={nav.path}
                style={{backgroundColor:'rgba(0,0,0,0)'}}
                >
                  <Link {...linkProps}>
                    <span>
                      {nav.icon ? (
                        <Icon size="small" type={nav.icon} />
                      ) : null}
                      {nav.name}
                    </span>
                  </Link>
                </Item>
              );
            })}
        </Nav>
        <div>
          {/* triggerType="hover" */}
          {/* trigger={( */}
            <a href={window.global.user.htmlUrl} target="_blank" rel="noopener noreferrer">
              <div
              className={styles.iceHeaderUserpannel}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 12,
              }}
            >
              <IceImg
                height={40}
                width={40}
                src={window.global.user.avatarUrl}
                className={styles.userAvatar}
              />
              <div className={styles.userProfile}>
                <span className={styles.userName} style={{ fontSize: '13px' }}>
                  {window.global.user.name}
                </span>
                <br />
                <span className={styles.userDepartment}>{window.global.user.dep.split('-')[2]}</span>
              </div>
              {/* <Icon
                type="arrow-down"
                size="xxs"
                className={styles.iconDown}
              /> */}
            </div>
            </a>
          {/* )} */}
          {/* closable={false}
          className={styles.userProfileMenu} */}
        {/* > */}
          {/* <ul>
            <li className={styles.userProfileMenuItem}>
              <Link to="/user/login">
                <Icon type="compass" size="small" />
                退出
              </Link>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);
