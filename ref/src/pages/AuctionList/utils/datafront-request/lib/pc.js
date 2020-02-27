'use strict'; //eslint-disable-line
 //eslint-disable-line
Object.defineProperty(exports, "__esModule", { //eslint-disable-line
  value: true //eslint-disable-line
}); //eslint-disable-line
 //eslint-disable-line
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //eslint-disable-line
 //eslint-disable-line
var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }; //eslint-disable-line
 //eslint-disable-line
var _base = require('./base'); //eslint-disable-line
 //eslint-disable-line
var _base2 = _interopRequireDefault(_base); //eslint-disable-line
 //eslint-disable-line
var _const = require('./const'); //eslint-disable-line
 //eslint-disable-line
var _routeMapHttp = require('@ali/route-map-http'); //eslint-disable-line
 //eslint-disable-line
var _routeMapHttp2 = _interopRequireDefault(_routeMapHttp); //eslint-disable-line
 //eslint-disable-line
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } //eslint-disable-line
 //eslint-disable-line
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } //eslint-disable-line
 //eslint-disable-line
function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; } //eslint-disable-line
 //eslint-disable-line
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //eslint-disable-line
 //eslint-disable-line
var DatafrontRequest = function (_Base) { //eslint-disable-line
  _inherits(DatafrontRequest, _Base); //eslint-disable-line
 //eslint-disable-line
  function DatafrontRequest() { //eslint-disable-line
    _classCallCheck(this, DatafrontRequest); //eslint-disable-line
 //eslint-disable-line
    return _possibleConstructorReturn(this, (DatafrontRequest.__proto__ || Object.getPrototypeOf(DatafrontRequest)).apply(this, arguments)); //eslint-disable-line
  } //eslint-disable-line
 //eslint-disable-line
  _createClass(DatafrontRequest, [{ //eslint-disable-line
    key: '_request', //eslint-disable-line
    value: function _request() { //eslint-disable-line
      var _config = this.config, //eslint-disable-line
          enableCdnRecover = _config.enableCdnRecover, //eslint-disable-line
          cdnRecoverAppName = _config.cdnRecoverAppName, //eslint-disable-line
          backupUrl = _config.backupUrl, //eslint-disable-line
          myUrl = _config.myUrl;
 //eslint-disable-line
      var params = _get(DatafrontRequest.prototype.__proto__ || Object.getPrototypeOf(DatafrontRequest.prototype), 'getReqParam', this).call(this); //eslint-disable-line
 //eslint-disable-line
      var urls = []; //eslint-disable-line
      if (this.mode != 'validate') { //eslint-disable-line
        urls.push({ //eslint-disable-line
          url: myUrl && myUrl.length > 0 ? myUrl : _const.API.PC, //eslint-disable-line
          data: params //eslint-disable-line
        }); //eslint-disable-line
      } //eslint-disable-line
 //eslint-disable-line
      if (backupUrl) { //eslint-disable-line
        urls.push({ //eslint-disable-line
          url: backupUrl, //eslint-disable-line
          data: this.config.variables //eslint-disable-line
        }); //eslint-disable-line
      } //eslint-disable-line
 //eslint-disable-line
      if (enableCdnRecover) { //eslint-disable-line
        var routeMap = new _routeMapHttp2.default({ //eslint-disable-line
          api: _const.API.PC, //eslint-disable-line
          data: params, //eslint-disable-line
          dirName: cdnRecoverAppName //eslint-disable-line
        }); //eslint-disable-line
        var cdnAddress = routeMap.getCDNAddress(); //eslint-disable-line
        var jsonpCallback = routeMap.getJSONPCallbak(); //eslint-disable-line
        urls.push({ //eslint-disable-line
          url: cdnAddress, //eslint-disable-line
          jsonpCallback: jsonpCallback, //eslint-disable-line
          beforeSend: function beforeSend(xhr, config) { //eslint-disable-line
            if (config && config.uri) { //eslint-disable-line
              config.uri.pathname = decodeURIComponent(config.uri.pathname); //eslint-disable-line
            } //eslint-disable-line
            return true; //eslint-disable-line
          } //eslint-disable-line
        }); //eslint-disable-line
      } //eslint-disable-line
      // 依次请求普通接口和容灾 //eslint-disable-line
      if (urls.length) { //eslint-disable-line
        console.info('this.configthis.config:',urls);
        this._requestSequence(urls, _get(DatafrontRequest.prototype.__proto__ || Object.getPrototypeOf(DatafrontRequest.prototype), 'resolve', this).bind(this), _get(DatafrontRequest.prototype.__proto__ || Object.getPrototypeOf(DatafrontRequest.prototype), 'reject', this).bind(this)); //eslint-disable-line
      } //eslint-disable-line
      return this.deferred && this.deferred.promise; //eslint-disable-line
    } //eslint-disable-line
  }, { //eslint-disable-line
    key: '_requestSequence', //eslint-disable-line
    value: function _requestSequence(urls, successCallback, errorCallback) { //eslint-disable-line
      var _this2 = this; //eslint-disable-line
 //eslint-disable-line
      var IO = this.config.request; //eslint-disable-line
      var idx = 0; //eslint-disable-line
 //eslint-disable-line
      var request = function request() { //eslint-disable-line
        var currentConfig = urls[idx]; //eslint-disable-line
        new IO({ //eslint-disable-line
          type: 'get', //eslint-disable-line
          url: currentConfig.url, //eslint-disable-line
          data: currentConfig.data, //eslint-disable-line
          dataType: 'jsonp', //eslint-disable-line
          jsonpCallback: currentConfig.jsonpCallback, //eslint-disable-line
          beforeSend: currentConfig.beforeSend, //eslint-disable-line
          success: function success(result) { //eslint-disable-line
            if (_this2.config.skipCheck) { //eslint-disable-line
              return successCallback(result); //eslint-disable-line
            } //eslint-disable-line
            if (_this2.config.successCondition(result)) { //eslint-disable-line
              successCallback(result); //eslint-disable-line
            } else { //eslint-disable-line
              var msg = result.msg || result.reason; //eslint-disable-line
              var notLogin = _this2._checkLogin(msg); //eslint-disable-line
              // 没有登录的错误排除在外 //eslint-disable-line
              if (notLogin) { //eslint-disable-line
                return; //eslint-disable-line
              } //eslint-disable-line
              if (idx == urls.length - 1) { //eslint-disable-line
                errorCallback(result); //eslint-disable-line
              } else { //eslint-disable-line
                idx++; //eslint-disable-line
                request(); //eslint-disable-line
              } //eslint-disable-line
            } //eslint-disable-line
          }, //eslint-disable-line
          error: function error(err, textStatus) { //eslint-disable-line
            if (idx == urls.length - 1) { //eslint-disable-line
              errorCallback(err, textStatus); //eslint-disable-line
            } else { //eslint-disable-line
              idx++; //eslint-disable-line
              request(); //eslint-disable-line
            } //eslint-disable-line
          } //eslint-disable-line
        }); //eslint-disable-line
      }; //eslint-disable-line
 //eslint-disable-line
      request(); //eslint-disable-line
    } //eslint-disable-line
  }]); //eslint-disable-line
 //eslint-disable-line
  return DatafrontRequest; //eslint-disable-line
}(_base2.default); //eslint-disable-line
 //eslint-disable-line
exports.default = DatafrontRequest; //eslint-disable-line
