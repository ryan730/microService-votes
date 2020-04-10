const $module = 'module:admin';
const logger = require('../utils/Logger');
const mock = require('../mock/admin_mk');
const mode = require('../mode/admin_db');
const utils = require('../utils');
const {
    hiddenKeyword
} = utils;

const REST_Routes = [
    {
        prefix: '/admin',
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
                name: '',
                ...mode,
                suffix: 'create'
            },
            // delete: {
            //     POST: true,
            //     name: '',
            //     suffix: 'delete/:id'
            // },
            // edit: {
            //     POST: true,
            //     name: '',
            //     ...mode,
            //     suffix: 'edit/:id'
            // },
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

const db = { admins: mock };

/////console.log('====>', db);

function admin(options) {
    /// console.log('options=====:', options);
    this.add(`${$module},if:list`, (msg, done) => {
        logger.info('-------admin::list--------->>>>' + JSON.stringify(msg.args.params));
        done(null, db.admins)
    })
    this.add(`${$module},if:check`, (msg, done) => {
        logger.info('-------admin::check--------->>>>' + JSON.stringify(msg.args.params));
        const { id } = msg.args.params;
        done(null, db.admins.find(v => Number(id) == v.id))
    })

    this.add(`${$module},if:search`, (msg, done) => {
        const body = msg.args.body ? JSON.parse(msg.args.body) : {};
        logger.info('-------user::search--------->>>>' + JSON.stringify(msg.args.params));
        console.log('search-body-query:', msg.args.body);
        const {
            id
        } = msg.args.params;
        let rq = db.admins.filter(v => {
            let bol = false;
            for (let i in body) {
                if (v[i] && v[i] == body[i]) {
                    bol = true;
                    break;
                }
            }
            return bol;
        })
        if (body.username && body.password && rq[0] && body.username == rq[0].username && body.password == rq[0].password) {} else {
            rq = [];
        }
        console.log('search-body:', JSON.parse(msg.args.body), rq);
        done(null, hiddenKeyword(rq, ['password']));
    })

    // this.add(`${$module},if:edit`, (msg, done) => {
    //     console.log('-------edit--------->>>>', msg.args.params);
    //     logger.info('-------admin::edit--------->>>>' + JSON.stringify(msg.args.params));
    //     let { id } = msg.args.params
    //     const body = JSON.parse(msg.args.body);
    //     let obj = db.admins.find(v => v.id == id);
    //     if (obj) {
    //         // db.admins.splice(obj.id, 1, {
    //         //     id,
    //         //     ...obj,
    //         //     ...body
    //         // })
    //         obj = Object.assign(obj,{
    //             id,
    //             ...obj,
    //             ...body
    //         })
    //         done(null, db.admins)
    //     } else {
    //         done(null, { success: false })
    //     }
    // })
    this.add(`${$module},if:create`, (msg, done) => {
        console.log('-------create--------->>>>', msg.args.params);
        logger.info('-------admin::create--------->>>>' + JSON.stringify(msg.args.params));
        const body = msg.args.body ? JSON.parse(msg.args.body) : {};
        let userCount = Math.min(Math.max(db.admins.length - 1, 0), db.admins.length - 1)
        userCount = ++userCount;
        userCount = '20204' + userCount;
        console.log('-------create--------->>>>', userCount);
        db.admins.unshift({
            id: userCount,
            ...mode,
            ...body
        })
        done(null, db.admins)
    })
    // this.add(`${$module},if:delete`, (msg, done) => {
    //     logger.warn('-------admin::delete--------->>>>' + JSON.stringify(msg.args.params));
    //     console.log('-------delete--------->>>>', msg.args.params);
    //     let { id } = msg.args.params
    //     id = +id;
    //     const index = db.admins.findIndex(v => v.id == id)
    //     if (index !== -1) {
    //         db.admins.splice(index, 1)
    //         done(null, db.admins)
    //     } else {
    //         done(null, { success: false })
    //     }
    // })
}

module.exports = {
    init: admin,
    routes: REST_Routes
}