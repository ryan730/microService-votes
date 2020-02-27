import {getPaimaiPCHost} from '@ali/pmutil/biz/env';

export const API = {
  PC: `//${getPaimaiPCHost(true)}/api/datafront`,
  Mobile: 'mtop.taobao.datafront.invoke'
};

export const NeedLoginReg = /API_B_NOT_LOGIN/;
export const MtopNotLoginedReg = /FAIL_SYS_SESSION_EXPIRED|ERR_SID_INVALID/;