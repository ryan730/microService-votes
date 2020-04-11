const $module = 'module:user';
const logger = require('../utils/logger');
const mock = require('../mock/users_mk');
const mode = require('../mode/user_db');
const utils = require('../utils');
const {
    hiddenKeyword
} = utils;

const REST_Routes = [
    {
        prefix: '/user',
        pin: `${$module},if:*`,
        map: {
            list: {
                GET: true,
                POST: true,
                name: '',
                //suffix: '/:id'
            },
            create: {
                POST: true,
                suffix: 'create',
                ...mode,
            },
            delete: {
                POST: true,
                name: '',
                suffix: 'delete/:id'
            },
            edit: {
                POST: true,
                suffix: 'edit/:id',
                ...mode,

            },
            check: {
                GET: true,
                name: '',
                suffix: 'check/:id',
                 ...mode,
            },
            search: {
                POST: true,
                name: '',
                suffix: 'search',
                ...mode,
            }
        }
    }
]

const db = { users: mock };

///console.log('====>', db);

function user(options) {
    ///console.log('options=====:', options);
    this.add(`${$module},if:list`, (msg, done) => {
        logger.info('-------user::list--------->>>>' + JSON.stringify(msg.args.params));
       done(null, hiddenKeyword([...db.users],['password']));
    })
    this.add(`${$module},if:check`, (msg, done) => {
        logger.info('-------user::check--------->>>>' + JSON.stringify(msg.args.params));
        const { id } = msg.args.params;
        const result = hiddenKeyword([...db.users].find(v => Number(id) == v.id), ['password'])
        done(null, [result])
    })
    this.add(`${$module},if:search`, (msg, done) => {
        const body = msg.args.body ? JSON.parse(msg.args.body) : {};
        logger.info('-------user::search--------->>>>' + JSON.stringify(msg.args.params));
        //console.log('search-body:', msg.args);
        const { id } = msg.args.params;
        let rq = db.users.filter(v => {
            let bol = false;
            for (let i in body) {
                if (v[i] && v[i] == body[i]) {
                    bol = true;
                    break;
                }
            }
            return bol;
        })
        console.log('body.username, body.password:', body.username, body.password);
        console.log('rq[0]:', rq[0]);
        if(body.username && body.password && rq[0] && body.username == rq[0].username && body.password == rq[0].password){   
        }else{
            rq = [];
        }
        console.log('search-body:', JSON.parse(msg.args.body), rq);
        done(null, hiddenKeyword(rq, ['password']));
    })
    this.add(`${$module},if:edit`, (msg, done) => {
        logger.info('-------user::edit--------->>>>' + JSON.stringify(msg.args.params));
        let { id } = msg.args.params
        const body = JSON.parse(msg.args.body);
        let obj = db.users.find(v => v.id == id);
        if (obj) {
            Object.assign(obj, {
                id,
                ...obj,
                ...body
            })
            done(null, hiddenKeyword([...db.users], ['password']))
        } else {
            done(null, { success: false })
        }
    })
    this.add(`${$module},if:create`, (msg, done) => {
        logger.info('-------user::create--------->>>>' + JSON.stringify(msg.args.params));
        const body = msg.args.body ? JSON.parse(msg.args.body) : {};
        let userCount = Math.min(Math.max(db.users.length - 1, 0), db.users.length - 1)
        db.users.unshift({
            id: ++userCount,
            ...mode,
            ...body
        })
        done(null, hiddenKeyword(db.users, ['password']))
    })
    this.add(`${$module},if:delete`, (msg, done) => {
        logger.warn('-------user::delete--------->>>>' + JSON.stringify(msg.args.params));
        console.log('-------delete--------->>>>', msg.args.params);
        let { id } = msg.args.params
        id = +id;
        const index = db.users.findIndex(v => v.id == id)
        if (index !== -1) {
            db.users.splice(index, 1)
            done(null, hiddenKeyword([...db.users], ['password']))
        } else {
            done(null, { success: false })
        }
    })
}

module.exports = {
    init: user,
    routes: REST_Routes
}