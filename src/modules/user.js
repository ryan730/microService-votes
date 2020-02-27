const $module = 'module:user';
const logger = require('../utils/Logger');
const mock = require('../mock/users_mk');
const mode = require('../mode/user_db');

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
                ...mode,
                suffix: 'create'
            },
            delete: {
                POST: true,
                name: '',
                suffix: 'delete/:id'
            },
            edit: {
                POST: true,
                ...mode,
                suffix: 'edit/:id'
            },
            check: {
                GET: true,
                name: '',
                ...mode,
                suffix: 'check/:id'
            },
            search: {
                POST: true,
                name: '',
                ...mode,
                suffix: 'search'
            }
        }
    }
]

const db = { users: mock };

console.log('====>', db);

function user(options) {
    console.log('options=====:', options);
    this.add(`${$module},if:list`, (msg, done) => {
        logger.info('-------user::list--------->>>>' + JSON.stringify(msg.args.params));
        done(null, db.users)
    })
    this.add(`${$module},if:check`, (msg, done) => {
        logger.info('-------user::check--------->>>>' + JSON.stringify(msg.args.params));
        const { id } = msg.args.params
        done(null, db.users.find(v => Number(id) == v.id))
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
        if(body.username && body.password && rq[0] && body.username == rq[0].username && body.password == rq[0].password){   
        }else{
            rq = [];
        }
        console.log('search-body:', JSON.parse(msg.args.body), rq);
        done(null, rq)
    })
    this.add(`${$module},if:edit`, (msg, done) => {
        logger.info('-------user::edit--------->>>>' + JSON.stringify(msg.args.params));
        let { id } = msg.args.params
        const body = JSON.parse(msg.args.body);
        let obj = db.users.find(v => v.id == id);
        if (obj) {
            // db.users.splice(obj.id, 1, {
            //     id,
            //     ...obj,
            //     ...body
            // })
            obj = Object.assign(obj, {
                id,
                ...obj,
                ...body
            })
            done(null, db.users)
        } else {
            done(null, { success: false })
        }
    })
    this.add(`${$module},if:create`, (msg, done) => {
        logger.info('-------user::create--------->>>>' + JSON.stringify(msg.args.params));
        const body = msg.args.body ? JSON.parse(msg.args.body) : {};
        let userCount = Math.min(Math.max(db.users.length - 1, 0), db.users.length - 1)
        db.users.push({
            id: ++userCount,
            ...mode,
            ...body
        })
        done(null, db.users)
    })
    this.add(`${$module},if:delete`, (msg, done) => {
        logger.warn('-------user::delete--------->>>>' + JSON.stringify(msg.args.params));
        console.log('-------delete--------->>>>', msg.args.params);
        let { id } = msg.args.params
        id = +id;
        const index = db.users.findIndex(v => v.id == id)
        if (index !== -1) {
            db.users.splice(index, 1)
            done(null, db.users)
        } else {
            done(null, { success: false })
        }
    })
}

module.exports = {
    init: user,
    routes: REST_Routes
}