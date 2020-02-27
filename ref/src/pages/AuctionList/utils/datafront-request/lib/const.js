'use strict'; //eslint-disable-line
 //eslint-disable-line
Object.defineProperty(exports, "__esModule", { //eslint-disable-line
  value: true //eslint-disable-line
}); //eslint-disable-line
exports.MtopNotLoginedReg = exports.NeedLoginReg = exports.API = undefined; //eslint-disable-line
 //eslint-disable-line
var _env = require('@ali/pmutil/biz/env'); //eslint-disable-line
 //eslint-disable-line
var API = exports.API = { //eslint-disable-line
  PC: '//' + (0, _env.getPaimaiPCHost)(true) + '/api/datafront', //eslint-disable-line
  Mobile: 'mtop.taobao.datafront.invoke' //eslint-disable-line
}; //eslint-disable-line
 //eslint-disable-line
var NeedLoginReg = exports.NeedLoginReg = /API_B_NOT_LOGIN/; //eslint-disable-line
var MtopNotLoginedReg = exports.MtopNotLoginedReg = /FAIL_SYS_SESSION_EXPIRED|ERR_SID_INVALID/; //eslint-disable-line
