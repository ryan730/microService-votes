import {NeedLoginReg, MtopNotLoginedReg} from './const';
import { getQueryString } from '@ali/pmutil/common/url';
import { getMsgFromMtop } from '@ali/pmutil/biz/mtop';
import { createTrackParams } from '@ali/universal-pm-track';

const Promise = window.Promise;
if (Promise && !Promise.defer) {
  function Deferred() {
    this.resolve = null;
    this.reject = null;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  Promise.defer = function() {
    return new Deferred();
  };
}

function defaultSuccessCondition(result) {
  return result && result.status == 200;
}

export default class Base {
  constructor(config = {}) {
    config.name = config.name || config.api || '';
    config.variables = config.variables || config.params;
    config.app = config.app || config.domain || config.name.split('.')[0];

    if (config.track !== false) {
      config.variables = Object.assign({}, config.variables, createTrackParams({ spmc: config.spmc }));
    }
    if (!config.name) {
      throw new Error('datafront interface name is required!');
    }
    if (!config.request) {
      throw new Error('Must provide an request object!');
    }
    config.successCondition = config.successCondition || defaultSuccessCondition;
    config.cdnRecoverAppName = config.cdnRecoverAppName || 'data-front';
    this.config = config;
    this.deferred = Promise && Promise.defer();
    // 保持跟 truthy-mtop 一致
    this.mode = getQueryString('apiMode') == 'validate' ? 'validate' : 'normal';
    return this._request();
  }
  resolve(result) {
    if (result.data) {
      result = result.data;
    }
    if (this.config.onSuccess) {
      this.config.onSuccess(result, result && result.serverTime);
    } else if (this.deferred) {
      this.deferred.resolve([result, result && result.serverTime]);
    }
  }
  reject(reason, result) {
    if (this.config.onError) {
      this.config.onError(reason, result);
    } else if (this.deferred) {
      this.deferred.reject([reason, result]);
    }
  }
  getReqParam() {
    return {
      dfApp: this.config.app || this.config.domain,
      dfApiName: this.config.name,
      dfVariables: JSON.stringify(this.config.variables || {})
    };
  }
  _request() {

  }
  _checkLogin(msg) {
    const notLogin = NeedLoginReg.test(msg) || MtopNotLoginedReg.test(msg);
    if (this.config.loginCallback && notLogin) {
      this.config.loginCallback();
    }
    return notLogin;
  }
  _handleMtopError(result) {
    const notLogin = this._checkLogin(result.ret.toString());
    // 未登录的情况不做处理
    if (notLogin) return;
    // 可以根据实际情况进行展示，比如弹窗或者显示toast等
    return this.reject(getMsgFromMtop(result), result);
  }
}
