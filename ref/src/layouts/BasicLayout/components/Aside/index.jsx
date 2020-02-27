import React from 'react';
import { Nav } from '@alifd/next';
import Icon from '@icedesign/foundation-symbol';
import { withRouter, Link } from 'react-router-dom';
import { asideMenuConfig } from '@/menuConfig';
import styles from './index.module.scss';

const { Item } = Nav;

function BasicLayout(props) {
  const { location: { pathname } } = props;
  return (
    <div className={styles.iceAsideCustom}>
      <div className={styles.iceAsideLogo}>
        <div className={styles.logoLimit}>
          <img src="https://img.alicdn.com/tfs/TB1wxCfBkvoK1RjSZFwXXciCFXa-192-28.png" 
          width="192" height="28"/>
        </div>
        <div className={styles.logoTitle}>拍品管理系统</div>
      </div>
      <Nav className={styles.iceNav} selectedKeys={[pathname]}>
        {Array.isArray(asideMenuConfig)
          && asideMenuConfig.length > 0
          && asideMenuConfig.map((nav) => {
            return (
              <Item key={nav.path}>
                <Link to={nav.path}>
                  {nav.icon ? <Icon size="small" type={nav.icon} /> : null}
                  <span className={styles.iceMenuLinkText}>
                    {nav.name}
                  </span>
                </Link>
              </Item>
            );
          })}
      </Nav>
    </div>
  );
}

export default withRouter(BasicLayout);
