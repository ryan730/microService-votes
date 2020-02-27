'use strict';

import Base from './base';
import { API } from './const';

export default class DatafrontRequest extends Base {
  _request() {
    const enableCdnRecover = !!this.config.enableCdnRecover;
    const Mtop = this.config.request;
    let requestArgs = [{
      api: API.Mobile,
      v: '1.0',
      data: super.getReqParam(),
      ecode: this.config.ecode || 0
    }];
    // http://web.npm.alibaba-inc.com/package/@ali/universal-truthy-mtop
    if (enableCdnRecover) {
      requestArgs.push({
        open: true,
        dirName: this.config.cdnRecoverAppName,
        validate: {
          open: true
        }
      });
    }
    requestArgs = requestArgs.concat([
      (result) => {
        if (this.config.skipCheck) {
          return super.resolve(result);
        }
        if (result && result.ret && result.ret.toString() == 'SUCCESS::调用成功') {
          // 不是mtop返回的错误
          if (!this.config.successCondition(result.data)) {
            const notLogin = super._checkLogin(result.data.msg);
            // 未登录不做处理
            if (notLogin) return;
            super.reject(result.data.msg, result);
          } else {
            super.resolve(result);
          }
        } else {
          super._handleMtopError(result);
        }
      },
      (error) => {
        if (this.config.skipCheck) {
          return super.reject(error);
        }
        super._handleMtopError(error);
      },
      this.config.options
    ]);
    Mtop.request.apply(Mtop, requestArgs);

    return this.deferred && this.deferred.promise;
  }
}