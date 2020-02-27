var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyparser = require('body-parser');
var path = require("path");
var request = require('request');

// 下面三行设置渲染的引擎模板
app.set('views', __dirname); //设置模板的目录
app.set('view engine', 'html'); // 设置解析模板文件类型：这里为html文件
app.engine('html', require('ejs').__express); // 使用ejs引擎解析html文件中ejs语法

app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({ extended: true }));
// cookie及签名处理
app.use(cookieParser());


// 使用 session 中间件
// app.use(session({
//     secret :  'secret', // 对session id 相关的cookie 进行签名
//     resave : true,
//     saveUninitialized: false, // 是否保存未初始化的会话
//     cookie : {
//         maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
//     },
// }));

(function () {
    var keys = [];
    for (var i = 0; i < 100000; i++) {
        keys[i] = 'secret' + Math.random();
    };
    app.use(cookieSession({
        name: 'session_id',
        keys: keys,
        maxAge: 20 * 60 * 1000
    }));
})();

//应用视图文件夹设置为
app.set('views', path.join(__dirname, '../views'));

// 获取登录页面
app.get('/login', function (req, res) {
    //res.sendFile(path.resolve(__dirname + '../../view/login.html'));
    res.render('login');
});
console.log('===router');

// 用户登录
app.post('/login', function (req, res) {
    console.log('login---->>',req.body.username,req.body.pwd);
    post('http://127.0.0.1:7788/user/search', {
        username: req.body.username,
        password: req.body.pwd
    }).then((response) => {
        ///res.json(response);
        if(response && response.length>0){
            req.session.userName = req.body.username; // 登录成功，设置 session
            console.log('登录成功');
            res.redirect('/');
        }
        else{
            //res.json({ret_code : 1, ret_msg : '账号或密码错误'});// 若登录失败，重定向到登录页面
            res.render('login', { result: '账号或密码错误'});
        }
    });
});

// 获取主页
app.get('/', function (req, res) {
    if (req.session.userName) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        //res.render(path.resolve(__dirname + '../../view/home.html'),{username : req.session.userName});
        res.render('home', { username: req.session.userName });
    } else {
        res.redirect('login');
    }
})

// 退出
app.get('/logout', function (req, res) {
    req.session.userName = null; // 删除session
    res.redirect('login');
});

app.listen(8000, function () {
    console.log('http://127.0.0.1:8000')
})

//---

function post(url, requestData) {
    return new Promise(function (reslove, reject) {
        request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: requestData
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                reslove(body);
            } else {
                reject('失败');
            }
        }, function () {
            reject('失败');
        });
    })
}

function get(url, requestData) {
    return new Promise(function (reslove, reject) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body) // Show the HTML for the baidu homepage.
                reslove(response);
            } else {
                reject('失败');
            }
        }, function () {
            reject('失败');
        })
    })
}