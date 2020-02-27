var Seneca = require("seneca");
var Express = require("express");
const SenecaWeb = require('seneca-web');
var Adapter = require('seneca-web-adapter-express');
const userModule = require('./modules/user.js')

var seneca = Seneca();
var server = Express();

// var config = {
// 		routes:{
// 			prefix:"/my-api",
// 			pin:"role:api,cmd:*",
// 			map:{
// 				bazinga:{
// 					GET:true
//                 },
//                 login:{
//                     GET:true
//                 }
// 			}
// 		}
// }

//seneca.use(Web,{adapter:"express",context:server})

// seneca.use(Web, {
//   context: server,
//   adapter: Adapter
// })

// seneca.act("role:web",config);

// seneca.add("role:api,cmd:bazinga",(args,done) =>{
// 	done(null,{
// 		bar:"Barzinga!"
// 	});
// });

// seneca.add('role:api,cmd:login', (msg, done) => {
//     const { query } = msg.args;
//     const { username, pass } = query;
// 	if (username === 'asd' && pass === '123') {
// 		return done(null, { code: 1000 })
// 	}
// 	return done(null, { code: 2100 })
// })


seneca.use(userModule.init);
//server.use(Express.json());

seneca.use(SenecaWeb, {
	adapter: Adapter,
	context: server,
	routes: [...userModule.routes],
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