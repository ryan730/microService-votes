const express = require(`express`)
const router = express.Router()
const utils = require('../utils');

const {
    post,
    get
} = utils;

// 获取登录页面
router.get('/login', function (req, res) {
    //res.sendFile(path.resolve(__dirname + '../../view/login.html'));
    res.render('login');
});

// 用户登录
router.post('/login', function (req, res) {
    console.log('login---->>', req.body.username, req.body.pwd);
    post('http://127.0.0.1:7788/user/search', {
        username: req.body.username,
        password: req.body.pwd
    }).then((response) => {
        if (response && response.length > 0) {
            req.session.userName = req.body.username; // 登录成功，设置 session
            console.log('登录成功');
            res.redirect('/');
        } else {
            //res.json({ret_code : 1, ret_msg : '账号或密码错误'});// 若登录失败，重定向到登录页面
            res.render('login', {
                result: '账号或密码错误',
            });
        }
    });
});

router.post('/admin/login', function (req, res) {
    if (req.body.username == '' || req.body.password == '') {
        res.json({
            status: 'SUCCESS',
            ret_code: 0,
            ret_msg: '用户或密码不能为空!',
            api: 'api.admin.login'
        })
        return;
    }
    post('http://127.0.0.1:7788/admin/search', {
        username: req.body.username,
        password: req.body.password
    }).then((response) => {
        if (response instanceof Array) {
            req.session.userName = req.body.username; // 登录成功，设置 session
            console.log('response成功', response);
            res.json({
                status: 'SUCCESS',
                data: response,
                ret_code: 1,
                api: 'api.admin.login',
                ret_msg: response.length > 0 ? '获取成功' : '账户或密码错误'
            })
        } else {
            res.json({
                status: 'FAILED',
                ret_code: 0,
                ret_msg: '服务器错误',
                api: 'api.admin.login'
            })
        }
    })
});

router.post('/user/login', function (req, res) {
    if (req.body.username == '' || req.body.password == '') {
        res.json({
            status: 'SUCCESS',
            ret_code: 0,
            ret_msg: '用户或密码不能为空!',
            api: 'api.user.login'
        })
        return;
    }
    post('http://127.0.0.1:7788/user/search', {
        username: req.body.username,
        password: req.body.password
    }).then((response) => {
        if (response instanceof Array) {
            req.session.userName = req.body.username; // 登录成功，设置 session
            console.log('response成功', response);
            res.json({
                status: 'SUCCESS',
                data: response,
                ret_code: 1,
                api: 'api.user.login',
                ret_msg: response.length > 0 ? '获取成功' : '账户或密码错误'
            })
        } else {
            res.json({
                status: 'FAILED',
                ret_code: 0,
                ret_msg: '服务器错误',
                api: 'api.user.login'
            })
        }
    })
});

// 获取主页
router.get('/', function (req, res) {
    console.log('session.userName=====>', req.session.userName);
    if (req.session.userName) { //判断session 状态，如果有效，则返回主页，否则转到登录页面
        //res.render(path.resolve(__dirname + '../../view/home.html'),{username : req.session.userName});
        res.render('home', {
            username: req.session.userName
        });
    } else {
        res.redirect('login');
    }
})

// 退出
router.get('/logout', function (req, res) {
    req.session.userName = null; // 删除session
    res.redirect('login');
});

module.exports = router