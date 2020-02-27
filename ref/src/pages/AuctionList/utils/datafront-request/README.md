## 综述

datafront-request 用于封装datafront相关接口的调用

有两种调用方式，
1. 通过回调的方法，传入 `onSuccess` 和 `onError`
2. 通过 Promise 链式调用

没有 index.js，请根据环境引用 `datafront-request/pc` 或者 `datafront-request/mobile`<br>
注意：`datafront-request/lib/pc`和`datafront-request/lib/mobile`没有链路跟踪的功能

## 初始化组件
    

## API说明

### 属性

|名称|类型|默认值|描述|
|:---------------|:--------|:----|:----------|
|app|String|paimai|应用名|
|name|String|''|接口名称|
|variables|Object|{}|接口参数|
|ecode|Number|0|mtop的Ecode值|
|onSuccess|Func|null|成功的回调|
|onError|Func|null|错误信息回调|
|request|Object|null|用于发送请求的对象|
|backupUrl|String|''|备份接口，仅PC端有(目前仅用于TMS大促)|
|loginCallback|Func|null|当设置了登录检查，且用户未登录时，触发此回调|

如果需要容灾功能，需增加三项：

|名称|类型|默认值|描述|
|:---------------|:--------|:----|:----------|
|successCondition|Func|result.status==200|调用是否成功的判断|
|enableCdnRecover|Boolean|false|是否请求容灾接口(请和datafront上的保持一致)|
|cdnRecoverAppName|String|data-front|cdn容灾所属应用(请和datafront上的保持一致)|

**Note**:
根据环境引入不同的脚本(pc.js 和 mobile.js)，且 `config.request` 为必填，请根据实际情况传入对象：

|类型|框架|示例|
|:------|:-----|:----------|
|PC|kissy|`@ali/kissy-io`|
|mobile|kimi|`@ali/lib-mtop`,`@ali/km-mtop`|
|mobile|rax|`@ali/universal-mtop`|
|mobile|kimi+容灾|`@ali/df-km-truthy-mtop`|
|mobile|rax+容灾|`@ali/universal-df-truthy-mtop`|
