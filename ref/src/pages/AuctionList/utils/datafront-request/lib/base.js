'use strict'; //eslint-disable-line
 //eslint-disable-line
Object.defineProperty(exports, "__esModule", { //eslint-disable-line
  value: true //eslint-disable-line
}); //eslint-disable-line
 //eslint-disable-line
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //eslint-disable-line
 //eslint-disable-line
var _const = require('./const'); //eslint-disable-line
 //eslint-disable-line
var _url = require('@ali/pmutil/common/url'); //eslint-disable-line
 //eslint-disable-line
var _mtop = require('@ali/pmutil/biz/mtop'); //eslint-disable-line
 //eslint-disable-line
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } //eslint-disable-line
 //eslint-disable-line
var Promise = window.Promise; //eslint-disable-line
if (Promise && !Promise.defer) { //eslint-disable-line
  var Deferred = function Deferred() { //eslint-disable-line
    var _this = this; //eslint-disable-line
 //eslint-disable-line
    this.resolve = null; //eslint-disable-line
    this.reject = null; //eslint-disable-line
    this.promise = new Promise(function (resolve, reject) { //eslint-disable-line
      _this.resolve = resolve; //eslint-disable-line
      _this.reject = reject; //eslint-disable-line
    }); //eslint-disable-line
  }; //eslint-disable-line
 //eslint-disable-line
  Promise.defer = function () { //eslint-disable-line
    return new Deferred(); //eslint-disable-line
  }; //eslint-disable-line
} //eslint-disable-line
 //eslint-disable-line
function defaultSuccessCondition(result) { //eslint-disable-line
  return result && result.status == 200; //eslint-disable-line
} //eslint-disable-line
 //eslint-disable-line
var Base = function () { //eslint-disable-line
  function Base() { //eslint-disable-line
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}; //eslint-disable-line
 //eslint-disable-line
    _classCallCheck(this, Base); //eslint-disable-line
 //eslint-disable-line
    if (!config.name) { //eslint-disable-line
      throw new Error('datafront interface name is required!'); //eslint-disable-line
    } //eslint-disable-line
    if (!config.request) { //eslint-disable-line
      throw new Error('Must provide an request object!'); //eslint-disable-line
    } //eslint-disable-line
    config.successCondition = config.successCondition || defaultSuccessCondition; //eslint-disable-line
    config.cdnRecoverAppName = config.cdnRecoverAppName || 'data-front'; //eslint-disable-line
    this.config = config; //eslint-disable-line
    this.deferred = Promise && Promise.defer(); //eslint-disable-line
    // 保持跟 truthy-mtop 一致 //eslint-disable-line
    this.mode = (0, _url.getQueryString)('apiMode') == 'validate' ? 'validate' : 'normal'; //eslint-disable-line
    return this._request(); //eslint-disable-line
  } //eslint-disable-line
 //eslint-disable-line
  _createClass(Base, [{ //eslint-disable-line
    key: 'resolve', //eslint-disable-line
    value: function resolve(result) { //eslint-disable-line
      if (result.data) { //eslint-disable-line
        result = result.data; //eslint-disable-line
      } //eslint-disable-line
      if (this.config.onSuccess) { //eslint-disable-line
        this.config.onSuccess(result, result && result.serverTime); //eslint-disable-line
      } else if (this.deferred) { //eslint-disable-line
        this.deferred.resolve([result, result && result.serverTime]); //eslint-disable-line
      } //eslint-disable-line
    } //eslint-disable-line
  }, { //eslint-disable-line
    key: 'reject', //eslint-disable-line
    value: function reject(reason, result) { //eslint-disable-line
      if (this.config.onError) { //eslint-disable-line
        this.config.onError(reason, result); //eslint-disable-line
      } else if (this.deferred) { //eslint-disable-line
        this.deferred.reject([reason, result]); //eslint-disable-line
      } //eslint-disable-line
    } //eslint-disable-line
  }, { //eslint-disable-line
    key: 'getReqParam', //eslint-disable-line
    value: function getReqParam() { //eslint-disable-line
      return { //eslint-disable-line
        dfApp: this.config.app || this.config.domain, //eslint-disable-line
        dfApiName: this.config.name, //eslint-disable-line
        dfVariables: JSON.stringify(this.config.variables || {}) //eslint-disable-line
      }; //eslint-disable-line
    } //eslint-disable-line
  }, { //eslint-disable-line
    key: '_request', //eslint-disable-line
    value: function _request() {} //eslint-disable-line
  }, { //eslint-disable-line
    key: '_checkLogin', //eslint-disable-line
    value: function _checkLogin(msg) { //eslint-disable-line
      var notLogin = _const.NeedLoginReg.test(msg) || _const.MtopNotLoginedReg.test(msg); //eslint-disable-line
      if (this.config.loginCallback && notLogin) { //eslint-disable-line
        this.config.loginCallback(); //eslint-disable-line
      } //eslint-disable-line
      return notLogin; //eslint-disable-line
    } //eslint-disable-line
  }, { //eslint-disable-line
    key: '_handleMtopError', //eslint-disable-line
    value: function _handleMtopError(result) { //eslint-disable-line
      var notLogin = this._checkLogin(result.ret.toString()); //eslint-disable-line
      // 未登录的情况不做处理 //eslint-disable-line
      if (notLogin) return; //eslint-disable-line
      // 可以根据实际情况进行展示，比如弹窗或者显示toast等 //eslint-disable-line
      return this.reject((0, _mtop.getMsgFromMtop)(result), result); //eslint-disable-line
    } //eslint-disable-line
  }]); //eslint-disable-line
 //eslint-disable-line
  return Base; //eslint-disable-line
}(); //eslint-disable-line
 //eslint-disable-line
exports.default = Base; //eslint-disable-line
