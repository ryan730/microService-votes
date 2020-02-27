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
      var _this2 = this; //eslint-disable-line
 //eslint-disable-line
      var enableCdnRecover = !!this.config.enableCdnRecover; //eslint-disable-line
      var Mtop = this.config.request; //eslint-disable-line
      var requestArgs = [{ //eslint-disable-line
        api: _const.API.Mobile, //eslint-disable-line
        v: '1.0', //eslint-disable-line
        data: _get(DatafrontRequest.prototype.__proto__ || Object.getPrototypeOf(DatafrontRequest.prototype), 'getReqParam', this).call(this), //eslint-disable-line
        ecode: this.config.ecode || 0 //eslint-disable-line
      }]; //eslint-disable-line
      // http://web.npm.alibaba-inc.com/package/@ali/universal-truthy-mtop //eslint-disable-line
      if (enableCdnRecover) { //eslint-disable-line
        requestArgs.push({ //eslint-disable-line
          open: true, //eslint-disable-line
          dirName: this.config.cdnRecoverAppName, //eslint-disable-line
          validate: { //eslint-disable-line
            open: true //eslint-disable-line
          } //eslint-disable-line
        }); //eslint-disable-line
      } //eslint-disable-line
      requestArgs = requestArgs.concat([function (result) { //eslint-disable-line
        if (_this2.config.skipCheck) { //eslint-disable-line
          return _get(DatafrontRequest.prototype.__proto__ || Object.getPrototypeOf(DatafrontRequest.prototype), 'resolve', _this2).call(_this2, result); //eslint-disable-line
        } //eslint-disable-line
        if (result && result.ret && result.ret.toString() == 'SUCCESS::调用成功') { //eslint-disable-line
          // 不是mtop返回的错误 //eslint-disable-line
          if (!_this2.config.successCondition(result.data)) { //eslint-disable-line
            var notLogin = _get(DatafrontRequest.prototype.__proto__ || Object.getPrototypeOf(DatafrontRequest.prototype), '_checkLogin', _this2).call(_this2, result.data.msg); //eslint-disable-line
            // 未登录不做处理 //eslint-disable-line
            if (notLogin) return; //eslint-disable-line
            _get(DatafrontRequest.prototype.__proto__ || Object.getPrototypeOf(DatafrontRequest.prototype), 'reject', _this2).call(_this2, result.data.msg, result); //eslint-disable-line
          } else { //eslint-disable-line
            _get(DatafrontRequest.prototype.__proto__ || Object.getPrototypeOf(DatafrontRequest.prototype), 'resolve', _this2).call(_this2, result); //eslint-disable-line
          } //eslint-disable-line
        } else { //eslint-disable-line
          _get(DatafrontRequest.prototype.__proto__ || Object.getPrototypeOf(DatafrontRequest.prototype), '_handleMtopError', _this2).call(_this2, result); //eslint-disable-line
        } //eslint-disable-line
      }, function (error) { //eslint-disable-line
        if (_this2.config.skipCheck) { //eslint-disable-line
          return _get(DatafrontRequest.prototype.__proto__ || Object.getPrototypeOf(DatafrontRequest.prototype), 'reject', _this2).call(_this2, error); //eslint-disable-line
        } //eslint-disable-line
        _get(DatafrontRequest.prototype.__proto__ || Object.getPrototypeOf(DatafrontRequest.prototype), '_handleMtopError', _this2).call(_this2, error); //eslint-disable-line
      }, this.config.options]); //eslint-disable-line
      Mtop.request.apply(Mtop, requestArgs); //eslint-disable-line
 //eslint-disable-line
      return this.deferred && this.deferred.promise; //eslint-disable-line
    } //eslint-disable-line
  }]); //eslint-disable-line
 //eslint-disable-line
  return DatafrontRequest; //eslint-disable-line
}(_base2.default); //eslint-disable-line
 //eslint-disable-line
exports.default = DatafrontRequest; //eslint-disable-line
