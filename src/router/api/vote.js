const express = require(`express`)
const router = express.Router()
const utils = require('../utils');

const {
    post,
    get
} = utils;

router.get('/', function (req, res) {
    get('http://127.0.0.1:7788/vote', {}).then((response) => {
        if (response && response.body instanceof Array) {
            console.log('response成功', typeof (response.body));
            res.json({
                status: 'SUCCESS',
                data: response.body,
                ret_code: 1,
                api: 'api.list',
                total: response.body.length,
                ret_msg: response.body.length > 0 ? '获取成功' : '空数组'
            })
        } else {
            res.json({
                status: 'FAILED',
                ret_code: 0,
                api: 'api.list'
            })
        }
    });
});

router.post('/create', function (req, res) {
    post('http://127.0.0.1:7788/vote/create/', {
        ...req.body
    }).then((response) => {
        if (response instanceof Array) {
            /////console.log('response成功', response);
            res.json({
                status: 'SUCCESS',
                data: response,
                ret_code: 1,
                api: 'api.create',
                total: response.length,
                ret_msg: response.length > 0 ? '创建成功' : '空数组'
            })
        } else {
            res.json({
                status: 'FAILED',
                ret_code: 0,
                ret_msg: '创建失败',
                api: 'api.create'
            })
        }
    })
});

router.post('/edit', function (req, res) {
    if (!req.body.id) {
        res.json({
            status: 'FAILED',
            ret_code: 0,
            ret_msg: '缺少必要参数id',
            api: 'api.edit'
        })
        return;
    }
    post('http://127.0.0.1:7788/vote/edit/' + req.body.id, {
        ...req.body
    }).then((response) => {
        if (response instanceof Array) {
            console.log('response成功', response);
            res.json({
                status: 'SUCCESS',
                data: response,
                ret_code: 1,
                api: 'api.edit',
                total: response.length,
                ret_msg: response.length > 0 ? '编辑成功' : '空数组'
            })
        } else {
            res.json({
                status: 'FAILED',
                ret_code: 0,
                ret_msg: 'id不匹配:' + req.body.id,
                api: 'api.edit'
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
            api: 'api.delete'
        })
        return;
    }
    post('http://127.0.0.1:7788/vote/delete/' + req.body.id, {
        ...req.body
    }).then((response) => {
        if (response instanceof Array) {
            console.log('response成功', response);
            res.json({
                status: 'SUCCESS',
                data: response,
                ret_code: 1,
                api: 'api.delete',
                total: response.length,
                ret_msg: response.length > 0 ? '获取成功' : '空数组'
            })
        } else {
            res.json({
                status: 'FAILED',
                ret_code: 0,
                ret_msg: 'id不匹配:' + req.body.id,
                api: 'api.delete'
            })
        }
    })
});

router.get('/search', function (req, res) {
    if (!req.query.id && !req.query.batch) {
        res.json({
            status: 'FAILED',
            ret_code: 0,
            ret_msg: '缺少必要参数id或者batch',
            api: 'api.search'
        })
        return;
    }
    get('http://127.0.0.1:7788/vote/search/', {
        batch: req.query.batch
    }).then((response) => {
        if (response.body && response.body instanceof Array) {
            ////console.log('response成功', response);
            res.json({
                status: 'SUCCESS',
                data: response.body,
                ret_code: 1,
                api: 'api.search',
                total: response.body.length,
                ret_msg: response.body.length > 0 ? '获取成功' : '空数组'
            })
        } else {
            res.json({
                status: 'FAILED',
                ret_code: 0,
                ret_msg: 'id不匹配:' + req.query.id,
                api: 'api.search'
            })
        }
    })
});

module.exports = router