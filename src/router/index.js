var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyparser = require('body-parser');
var path = require("path");

const loginRouter = require('./api/login') //  引入路由
const userRouter = require('./api/user') //  引入路由
const voteRouter = require('./api/vote') //  引入路由
const infoRouter = require('./api/info') //  引入路由
const analyseRouter = require('./api/result') //  引入路由

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    ///res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// 下面三行设置渲染的引擎模板
app.set('views', __dirname); //设置模板的目录
app.set('view engine', 'html'); // 设置解析模板文件类型：这里为html文件
app.engine('html', require('ejs').__express); // 使用ejs引擎解析html文件中ejs语法

app.use(bodyparser.json()); // 使用bodyparder中间件，
app.use(bodyparser.urlencoded({
    extended: true
}));
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
        //maxAge: 20 * 60 * 1000
        maxAge: 20 * 1000
    }));
})();

//应用视图文件夹设置为
app.set('views', path.join(__dirname, '../views'));
///console.log('===router');


//  使用路由 /index 是路由指向名称
app.use(`/`, loginRouter);
app.use(`/api/user`, userRouter);
app.use(`/api/vote`, voteRouter);
app.use(`/api/info`, infoRouter);
app.use(`/api/analyse`, analyseRouter);

app.listen(8000, function () {
    console.log('http://127.0.0.1:8000')
});
