'use strict'

var seneca = require('seneca')();
var Web = require("seneca-web");
var Express= require('express')
var server = Express();
var Adapter = require('seneca-web-adapter-express');

seneca.use(Web, {
    context: server,
    adapter: Adapter
})

seneca.add({area: "book", action: "fetch", criteria: "byAuthor"}, function(args, done){
    var books = this.make("books");
    books.list$({author: args.author}, done)
});

seneca.act('role: web', {
    routes: {
        prefix: '/mybook',
        pin: {area: 'book', action:'*'},
        map:{
        fetch: {GET: true},
        edit: {PUT: true},
        delete: {GET: false, DELETE: true}
        }
    }
});



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


///app.use(require("body-parser").json())


seneca.ready(() => {
    const seneca = seneca.export('web/context')();
    app.listen(3000);
})


// // GET method route
// app.get('/', function (req, res) {
//     res.send('GET request to the homepage')
//   })
  
// // POST method route
// app.post('/', function (req, res) {
// res.send('POST request to the homepage')
// })