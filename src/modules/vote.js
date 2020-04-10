const $module = 'module:vote';
const logger = require('../utils/Logger');
const mock = require('../mock/votes_mk');
const mode = require('../mode/vote_db');

const mock_users = require('../mock/users_mk');
const mock_results = require('../mock/results_mk');

const REST_Routes = [{
    prefix: '/vote',
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
        },

    }
}]

const db = {
    votes: mock
};

const dbObj = (params) => {
    const bj = {};
    db.votes.map((it) => {
        bj[it.id] = it;
    })
    return bj;
}


/**
 * 同步user的投票id集合
 * @param {*} ownerid 
 * @param {*} voteid 
 */
function asyncUser(ownerid, voteid) {

    if (ownerid) {
        const user = mock_users.find((it) => {
            return it.id == ownerid;
        })
        if (user && voteid && user['votes']) {
            user['votes'].unshift(voteid);
        } else {
            console.log('votes.js 同步到 user_mk 不成功!')
        }
    }
    // 同步 result 的新建
    const newRes = mock_results[0];
    newRes['voteid'] = voteid;
    newRes['ownerid'] = ownerid;
    newRes['id'] = voteid;
    mock_results.unshift(newRes);
    
}

///console.log('====>', db);

function vote(options) {
    ///console.log('options=====:', options);
    this.add(`${$module},if:list`, (msg, done) => {
        ///console.log('list=====:', msg);
        logger.info('-------vote::list--------->>>>' + JSON.stringify(msg.args.params));
        done(null, db.votes)
    })

    this.add(`${$module},if:check`, (msg, done) => {
        logger.info('-------vote::check--------->>>>' + JSON.stringify(msg.args.params));
        const {
            id
        } = msg.args.params
        done(null, db.votes.find(v => Number(id) == v.id))
    })

    this.add(`${$module},if:search`, (msg, done) => {
        const body = JSON.parse(msg.args.body);
        // logger.info('-------vote::search--------->>>>' + JSON.stringify(msg.args.params));
        const {
            batch
        } = body;
        // console.log('search-body:', batch, JSON.parse(msg.args.body));
        if (batch) { // 批量处理
            const reqVotes = batch.split(',');
            const bj = dbObj();

            done(null, reqVotes.map((item) => {
                return bj[item];
            }))
        } else {
            done(null, db.votes.filter(v => {
                let bol = false;
                for (let i in body) {
                    if (v[i] && v[i] == body[i]) {
                        bol = true;
                        break;
                    }
                }
                return bol;
            }))
        }
    })

    this.add(`${$module},if:edit`, (msg, done) => {
        console.log('-------edit--------->>>>', msg.args.params);
        logger.info('-------vote::edit--------->>>>' + JSON.stringify(msg.args.params));
        let {
            id
        } = msg.args.params
        const body = JSON.parse(msg.args.body);
        let obj = db.votes.find(v => v.id == id);
        if (obj) {
            obj = Object.assign(obj, {
                id,
                ...obj,
                ...body
            })
            done(null, db.votes)
        } else {
            done(null, {
                success: false
            })
        }
    })
    this.add(`${$module},if:create`, (msg, done) => {
        logger.info('-------vote::create--------->>>>' + JSON.stringify(msg.args.params));
        const body = msg.args.body ? JSON.parse(msg.args.body) : {};
        let userCount = Math.min(Math.max(db.votes.length - 1, 0), db.votes.length - 1)
        userCount = ++userCount;
        userCount = '20202' + userCount;

        const newItem = {
            ...mode,
            ...body,
            id: userCount,
        }
        db.votes.unshift(newItem);

        asyncUser(body.ownerid, newItem.id);

        console.log('-------create--------->>>>', newItem);
        done(null, db.votes)
    })

    this.add(`${$module},if:delete`, (msg, done) => {
        logger.warn('-------vote::delete--------->>>>' + JSON.stringify(msg.args.params));
        console.log('-------delete--------->>>>', msg.args.params);
        let {
            id
        } = msg.args.params;
        id = +id;
        const index = db.votes.findIndex(v => v.id == id);
        if (index !== -1) {
            db.votes.splice(index, 1)
            done(null, db.votes)
        } else {
            done(null, {
                success: false
            })
        }
    })
}

module.exports = {
    init: vote,
    routes: REST_Routes
}