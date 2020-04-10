const express = require(`express`)
const router = express.Router()
const utils = require('../utils');

const {
    post,
    get
} = utils;

router.get('/', function (req, res) {
    get('http://127.0.0.1:7788/info', {
    }).then((response) => {
        if (response && response.body instanceof Array) {
            console.log('response成功', typeof(response.body));
            res.json({
                status: 'SUCCESS',
                data: response.body,
                ret_code: 1,
                api: 'api.info',
                total: response.body.length,
                ret_msg: response.body.length > 0 ? '获取成功' : '空数组'
            })
        } else {
            res.json({
                status: 'FAILED',
                ret_code: 0,
                api: 'api.info'
            })
        }
    });
});

router.post('/edit', function (req, res) {
    if (!req.body.id){
        res.json({
            status: 'FAILED',
            ret_code: 0,
            ret_msg: '缺少必要参数id',
            api: 'api.info.edit'
        })
        return;
    }
    post('http://127.0.0.1:7788/info/edit/' + req.body.id, {
            ...req.body
    }).then((response) => {
        if (response instanceof Array) {
            console.log('response成功', response);
            res.json({
                status: 'SUCCESS',
                data: response,
                ret_code: 1,
                api: 'api.info.edit',
                total: response.length,
                ret_msg: response.length > 0 ? '获取成功' : '空数组'
            })
        } else {
            res.json({
                status: 'FAILED',
                ret_code: 0,
                ret_msg: 'id不匹配:' + req.body.id,
                api: 'api.info.edit'
            })
        }
    })
});

router.post('/delete', function (req, res) {
    if (!req.body.id) {
        res.json({
            status: 'FAILED',
            ret_code: 0,
            ret_msg: '缺少必要参数id',
            api: 'api.info.edit'
        })
        return;
    }
    post('http://127.0.0.1:7788/info/delete/' + req.body.id, {
        ...req.body
    }).then((response) => {
        console.log('opopopoppo---->>',response);
        if (response instanceof Array) {
            console.log('response成功', response);
            res.json({
                status: 'SUCCESS',
                data: response,
                ret_code: 1,
                api: 'api.info.delete',
                total: response.length,
                ret_msg: response.length > 0 ? '获取成功' : '空数组'
        
            })
        } else {
            res.json({
                status: 'FAILED',
                ret_code: 0,
                ret_msg: 'id不匹配:' + req.body.id,
                api: 'api.info.delete'
            })
        }
    })
});

module.exports = router