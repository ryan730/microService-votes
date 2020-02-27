import React from 'react';
import Layout from '@icedesign/layout';
import cx from 'classnames';
import Logo from '../Logo';
import styles from './index.module.scss';

export default function Footer(props) {
  const { className, style } = props;
  return (
    <Layout.Footer
      className={cx(styles.iceLayoutFooter, className)}
      style={{
        ...style,
        lineHeight: '36px',
      }}
    >
      <div className={styles.iceDesignLayoutFooterBody}>
        <div style={{ filter: 'grayscale(100%)', opacity: 0.3 }}>
          <Logo className={{ color: '#666' }} />
        </div>
        <div className={styles.copyright}>
          © 2019 Theme designed by
          {' '}
          <a
            href="http://paiui.dockerlab.alipay.net/"
            target="_blank"
            className={styles.copyrightLink}
            rel="noopener noreferrer"
          >
            PAI UI PRO
          </a>
        </div>
      </div>
    </Layout.Footer>
  );
}
