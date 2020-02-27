'use strict';

import Base from './base';
import { API } from './const';
import RouteMap from '@ali/route-map-http';

export default class DatafrontRequest extends Base {
  _request() {
    const { enableCdnRecover, cdnRecoverAppName, backupUrl, myUrl } = this.config;
    const params = super.getReqParam();
    
    let urls = [];
    if (this.mode != 'validate') {
      urls.push({
        url: myUrl && myUrl.length > 0 ? myUrl : API.PC,
        data: params 
      });
    }

    if (backupUrl) {
      urls.push({
        url: backupUrl,
        data: this.config.variables
      });
    }

    if (enableCdnRecover) {
      const routeMap = new RouteMap({
        api: API.PC,
        data: params,
        dirName: cdnRecoverAppName
      });
      const cdnAddress = routeMap.getCDNAddress();
      const jsonpCallback = routeMap.getJSONPCallbak();
      urls.push({
        url: cdnAddress,
        jsonpCallback,
        beforeSend: function(xhr, config) {
          if (config && config.uri) {
            config.uri.pathname = decodeURIComponent(config.uri.pathname);
          }
          return true;
        }
      });
    }
    // 依次请求普通接口和容灾
    if (urls.length) {
      this._requestSequence(urls, super.resolve.bind(this), super.reject.bind(this));
    }
    return this.deferred && this.deferred.promise;
  }
  _requestSequence(urls, successCallback, errorCallback) {
    const IO = this.config.request;
    let idx = 0;

    const request = () => {
      const currentConfig = urls[idx];
      new IO({
        type: 'get',
        url: currentConfig.url,
        data: currentConfig.data,
        dataType: 'jsonp',
        jsonpCallback: currentConfig.jsonpCallback,
        beforeSend: currentConfig.beforeSend,
        success: (result) => {
          if (this.config.skipCheck) {
            return successCallback(result);
          }
          if (this.config.successCondition(result)) {
            successCallback(result);
          } else {
            const msg = result.msg || result.reason;
            const notLogin = this._checkLogin(msg);
            // 没有登录的错误排除在外
            if (notLogin) {
              return;
            }
            if (idx == urls.length - 1) {
              errorCallback(result);
            } else {
              idx++;
              request();
            }
          }
        },
        error: (err, textStatus) => {
          if (idx == urls.length - 1) {
            errorCallback(err, textStatus);
          } else {
            idx++;
            request();
          }
        }
      });
    };

    request();
  }

}