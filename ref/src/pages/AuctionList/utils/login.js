function getEnv() {
    let env;
    let url = window.location.href;
    var reg = /(\.com\/=?)/;
    if (reg.test(url)) {
      env = 'online';
    } else {
      env = 'daily';
    }
    return env;
  }

const LOGIN_HOSTS = {
    daily: '//login.daily.taobao.net',
    online: '//login.taobao.com'
  };
  
export const env = getEnv();
export const LOGIN_HOST = LOGIN_HOSTS[env];

export default () => {
  location.href = `${LOGIN_HOST}/member/login.jhtml?redirectURL=${encodeURIComponent(location.href)}`;
};