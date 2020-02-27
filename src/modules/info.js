const $module = 'module:info';
const logger = require('../utils/Logger');
const mock = require('../mock/infos_mk');
const mode = require('../mode/info_db');

const REST_Routes = [
    {
        prefix: '/info',
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
            delete: {
                POST: true,
                name: '',
                suffix: 'delete/:id'
            },
            edit: {
                POST: true,
                name: '',
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
                GET: true,
                name: '',
                ...mode,
                suffix: 'search'
            }
        }
    }
]

const db = { infos: mock };

console.log('====>', db);

function info(options) {
    console.log('options=====:', options);
    this.add(`${$module},if:list`, (msg, done) => {
        logger.info('-------info::list--------->>>>' + JSON.stringify(msg.args.params));
        done(null, db.infos)
    })
    this.add(`${$module},if:check`, (msg, done) => {
        logger.info('-------info::check--------->>>>' + JSON.stringify(msg.args.params));
        const { id } = msg.args.params
        done(null, db.infos.find(v => Number(id) == v.id))
    })
    this.add(`${$module},if:search`, (msg, done) => {
        const body = JSON.parse(msg.args.body);
        logger.info('-------info::search--------->>>>' + JSON.stringify(msg.args.params));
        console.log('search-body:', JSON.parse(msg.args.body));
        const { id } = msg.args.params
        done(null, db.infos.filter(v => {
            let bol = false;
            for (let i in body) {
                if (v[i] && v[i] == body[i]) {
                    bol = true;
                    break;
                }
            }
            return bol;
        }))
    })
    this.add(`${$module},if:edit`, (msg, done) => {
        console.log('-------edit--------->>>>', msg.args.params);
        logger.info('-------info::edit--------->>>>' + JSON.stringify(msg.args.params));
        let { id } = msg.args.params
        const body = JSON.parse(msg.args.body);
        let obj = db.infos.find(v => v.id == id);
        if (obj) {
            // db.infos.splice(obj.id, 1, {
            //     id,
            //     ...obj,
            //     ...body
            // })
            obj = Object.assign(obj,{
                id,
                ...obj,
                ...body
            })
            done(null, db.infos)
        } else {
            done(null, { success: false })
        }
    })
    this.add(`${$module},if:create`, (msg, done) => {
        logger.info('-------info::create--------->>>>' + JSON.stringify(msg.args.params));
        const body = msg.args.body ? JSON.parse(msg.args.body) : {};
        let userCount = Math.min(Math.max(db.infos.length - 1, 0), db.infos.length - 1)
        userCount = ++userCount;
        userCount = '20202' + userCount;
        console.log('-------create--------->>>>', userCount);
        db.infos.push({
            id: userCount,
            ...mode,
            ...body
        })
        done(null, db.infos)
    })
    this.add(`${$module},if:delete`, (msg, done) => {
        logger.warn('-------info::delete--------->>>>' + JSON.stringify(msg.args.params));
        console.log('-------delete--------->>>>', msg.args.params);
        let { id } = msg.args.params
        id = +id;
        const index = db.infos.findIndex(v => v.id == id)
        if (index !== -1) {
            db.infos.splice(index, 1)
            done(null, db.infos)
        } else {
            done(null, { success: false })
        }
    })
}

module.exports = {
    init: info,
    routes: REST_Routes
}