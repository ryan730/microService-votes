///import DatafrontRequest from '@ali/datafront-request/lib/pc';
import DatafrontRequest from './datafront-request/lib/pc';
//import ajax from '@ali/ice-ajax';
import IO from '@ali/kissy-io';
import requestLogger from '../utils/requestLogger';
import login from '../utils/login';
import { Message } from '@alifd/next';
import { global } from '../utils/const';

export const getQueryStringByName = (name) =>{
  var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
  if(result == null || result.length < 1){
      return "";
  }
  return result[1];
}

export const getUser = ()=> {
  let user = {
    empId: getQueryStringByName('empId'),
    prot:getQueryStringByName('prot')
  };
  // const global = window.global;
  // if(global && global.user){
  //   user = global.user;
  //   if(user.htmlUrl){
  //     user.empId = user.htmlUrl.replace('https://work.alibaba-inc.com/work/u/','');
  //   }
  // }
  return user;
} 

const getPaimaiPCHost = (migrated)=> {
  var HOST = window.location.host;
  var envFlag = 'online';
  var envFrom = 'pc';

  if (HOST.indexOf('.taobao.com') != -1) {
  envFrom = 'h5';
  }
  if (HOST.indexOf('daily.taobao.net') != -1 || HOST.indexOf('waptest.taobao.com') != -1) {
  envFlag = 'daily';
  } else if (HOST.indexOf('wapa.taobao.com') != -1) {
  envFlag = 'pre';
  }

  if(HOST.indexOf('dev.g.alicdn.com') != -1 || HOST.indexOf('localhost') != -1 ) {
    envFlag = 'daily';
  } else if (HOST.indexOf('g.alicdn.com') != -1) {
    envFlag = 'pre';
  }

  var hostPrefix = migrated ? 'item-paimai' : 'paimai';
  if (envFlag == 'daily') {
    // if(getUser().prot == 'http'){
    //   return 'http://'+hostPrefix+ '.daily.taobao.net'; // 预发情况下，必须走http协议+host绑定
    // }else {
    //   return '//'+hostPrefix + '.daily.taobao.net';
    // }
    if(getUser().prot == 'http'){
      return 'http://'+hostPrefix + '.taobao.com'; // 预发情况下，必须走http协议+host绑定
    }else {
      return '//'+hostPrefix + '.taobao.com';
    }
  }else {
    if(getUser().prot == 'http'){
      return 'http://'+hostPrefix + '.taobao.com'; // 预发情况下，必须走http协议+host绑定
    }else {
      return '//'+hostPrefix + '.taobao.com';
    }
  }
};

export default function fetch(type, options) {
  console.log('fetch -->', type, options,`${getPaimaiPCHost(true)}/api/datafront`);
    if(!options.variables || !options.variables.empId){
      Message.error('员工工号不能为空!');
      return Promise.reject('员工工号不能为空!');
    }
    global.loading.setState({visible:true});
    return new Promise((resolve, reject) => {
      new DatafrontRequest({
        myUrl:`${getPaimaiPCHost(true)}/api/datafront`,
        name: options.name,
        domain: 'console',
        request: IO,
        variables: options.variables,
        onSuccess: (result) => {
          global.loading.setState({visible:false});
          requestLogger({
            api: options.name,
            type: 'datafront',
            data: result,
          });
          console.log('result:',result);
          if (result.status === 200 && result.success ) {
              if(result.result && result.result.data && result.result.data.message && String(result.result.data.message)=='员工工号不能为空!'){
                reject('员工工号不能为空!');
                Message.error(JSON.stringify('员工工号不能为空!'));
              }else {
                resolve(result);
              }
          } else {
            const message = result.message || result.msg || 'Datafront 接口调用失败!';
            //reject(new Error(message));
            reject(message);
            Message.error(JSON.stringify(message));
          }
        },
        onError: (message) => {
          global.loading.setState({visible:false});
          if (message === 'API_B_NOT_LOGIN::用户未登录') {
            message = '您未登录';
          } else if (message === 'script error') {
            message = '网络故障, 请稍后重试';
          }
          //reject(new Error(message));
          reject(message);
          Message.error(JSON.stringify(message));
        },
        loginCallback: login,
      });
    });
  }

export const createConfig = (params={}) => {
    const variables = {
        'empId': getUser().empId,
        'name': params.name || '未命名场景',
        'pic': 0,
        'price': 0,
        'title': 0,
        'time': 0,
        'prop': 0,
        //'tag': 0,
        'org': 0,
        'heat': 0,
        'accuracy': 0,
        'inventory': 0,
        'video': 0,
        //========// 新数据类型
        'locationSchema':0,//地理位置展示方案
        'distance':0,//是否展示距离
        'videoAutoPlay':0,//是否自动播放视频
        'placeholdSchema':0,//占位方案
        'lowerRightCornerDisplay':0,//右下角显示内容
        'tagPageCode':'',//标签PAGECODE
        'tagAreaCodeBeforeTitle':'',//标签标题区-区块code
        'tagAreaCodeAtInfo':'',//标签-信息区-区块CODE
        'tagAreaCodeAtPic':'',//标签-图片区-区块CODE
    }
    const requestParams = {
        app: 'console',
        name: 'console.gui.createConfig',
        variables:Object.assign(variables, params || {})
      };
    return fetch('createConfig::',requestParams);
}

export const findConfigs = (params={}) => {
    const variables = {
        empId: getUser().empId,
        //name: '测试场景001',
        //code:'1',
        // id:'1',
        pageNo: 1,
        pageSize:10
    }
    const requestParams = {
        app: 'console',
        name: 'console.gui.findConfigs',
        variables:Object.assign(variables,params)
      };
    return fetch('findConfigs::',requestParams);
}

export const updateConfig = (params={}) => {
  const variables = {
    'empId': getUser().empId,
    'id': '',
    'code':'0',
    'name': '未命名场景',
    'pic': 0,
    'price': 0,
    'title': 0,
    'time': 0,
    'prop': 0,
    //'tag': 0,
    'org': 0,
    'heat': 0,
    'accuracy': 0,
    'inventory': 0,
    'video': 0,
    //========// 新数据类型
    'locationSchema':0,//地理位置展示方案
    'distance':0,//是否展示距离
    'videoAutoPlay':0,//是否自动播放视频
    'placeholdSchema':0,//占位方案
    'lowerRightCornerDisplay':0,//右下角显示内容
    'tagPageCode':'',//标签PAGECODE
    'tagAreaCodeBeforeTitle':'',//标签标题区-区块code
    'tagAreaCodeAtInfo':'',//标签-信息区-区块CODE
    'tagAreaCodeAtPic':'',//标签-图片区-区块CODE
  }
  const filterParams = {};
  for(let key in variables){
    if(key!='empId'){
      filterParams[key] = params[key]
    }
  }
  const requestParams = {
      app: 'console',
      name: 'console.gui.updateConfig',
      variables:Object.assign(variables,filterParams)
    };
  return fetch('updateConfig::',requestParams);
}

export const deleteConfig = (params={}) => {
  const variables = {
      empId: getUser().empId,
      id:''
  }
  const requestParams = {
      app: 'console',
      name: 'console.gui.deleteConfig',
      variables:Object.assign(variables,params)
    };
  return fetch('deleteConfig::',requestParams);
}