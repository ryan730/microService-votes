var Seneca = require("seneca");
var Express = require("express");
const SenecaWeb = require('seneca-web');
var Adapter = require('seneca-web-adapter-express');
const userModule = require('./modules/user.js');
const voteModule = require('./modules/vote.js');
const infoModule = require('./modules/info.js');
const resultModule = require('./modules/result.js');
const adminModule = require('./modules/admin.js');

var seneca = Seneca();
var server = Express();

server.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

seneca.use(userModule.init);
seneca.use(voteModule.init);
seneca.use(infoModule.init);
seneca.use(resultModule.init);
seneca.use(adminModule.init);

seneca.use(SenecaWeb, {
	adapter: Adapter,
	context: server,
	routes: [
		...userModule.routes, 
		...voteModule.routes, 
		...infoModule.routes,
		...resultModule.routes,
		...adminModule.routes,
	],
	options: {
		parseBody: true,
		includeRequest: true,
		includeResponse: true
	}
})

seneca.ready(() => {
	const app = seneca.export('web/context')();
	app.listen(7788)
})


// http://localhost:7788/my-api/bazinga

var router = require('./router');