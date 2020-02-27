import { isWeb, isNode, isMiniApp, isReactNative } from '..';

describe('environment value', (): void => {
  it('web environment value is true', (): void => {
    expect(isWeb).toBeTruthy();
  });

  it('node environment value is boolean', (): void => {
    expect(typeof isNode).toEqual('boolean');
  });

  it('react native environment value is boolean', (): void => {
    expect(typeof isReactNative).toEqual('boolean');
  });

  it('mini app environment value is boolean', (): void => {
    expect(typeof isMiniApp).toEqual('boolean');
  });
});
