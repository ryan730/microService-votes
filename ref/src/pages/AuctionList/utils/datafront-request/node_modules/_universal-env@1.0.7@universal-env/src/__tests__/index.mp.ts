// eslint-disable-next-line
(global as any).my = {
  getSystemInfo: () => {},
  getSystemInfoSync: () => {
    return {
      platform: 'android'
    };
  }
};

describe('Mni app environment', (): void => {
  it('mini app environment value', (): void => {
    // eslint-disable-next-line
    const { isMiniApp } = require('../index');
    expect(isMiniApp).toBeTruthy();
  });

  it('Is android mini app environment', (): void => {
    // eslint-disable-next-line
    const { isAndroid } = require('../index');
    expect(isAndroid).toBeTruthy();
  });

  it('Is not iOS mini app environment', (): void => {
    // eslint-disable-next-line
    const { isIOS } = require('../index');
    expect(isIOS).toBe(false);
  });
});
