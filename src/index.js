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