const $module = 'module:result';
const logger = require('../utils/Logger');
const mock = require('../mock/results_mk');
const mode = require('../mode/result_db');

const REST_Routes = [{
    prefix: '/result',
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
}]

const db = {
    results: mock
};

// const dbObj = {};
// db.results.map((it) => {
//     dbObj[it.voteid] = it;
// })

const dbObj = (params) => {
    const bj = {};
    db.results.map((it) => {
        bj[it.voteid] = it;
    })
    return bj;
}

const analyserData = (arg) => {
    let arr = arg;
    if (typeof (arg) == 'number') {
        arr = [arg];
    } else if (typeof (arg) == 'string') {
        arr = arg.split(',');
    }
    
    return arr.reduce((pre, cur) => {
        if (cur in pre) {
            pre[cur]++
        } else {
            pre[cur] = 1
        }
        return pre
    }, {})
}

// 数据统计的算法，统计各索引值
// analysis: [{
//     '3': 1,
//     total: 1
// },
// {
//     '2': 1,
//     total: 1
// },
// {
//     '1': 1,
//     '2': 1,
//     '3': 1,
//     total: 3
// }
// ],
// option: [3, [2],[1, 3, 2]],
const parseAnalyser = (result) => {

    const newItem = result[0];

    newItem.option.map((n, k) => {
        let anal = analyserData(n);
        anal.total = Object.values(anal).reduce((total, num) => {
            return total + num;
        })
        newItem.analysis[k] = anal;
        return n;
    })
    console.log('====>', newItem);
    return result
}


///console.log('====>', db);

function result(options) {
    ///console.log('options=====:', options);
    this.add(`${$module},if:list`, (msg, done) => {
        logger.info('-------result::list--------->>>>' + JSON.stringify(msg.args.params));
        done(null, db.results)
    })

    this.add(`${$module},if:check`, (msg, done) => {
        logger.info('-------result::check--------->>>>' + JSON.stringify(msg.args.params));
        const {
            id
        } = msg.args.params
        done(null, db.results.find(v => Number(id) == v.id))
    })

    this.add(`${$module},if:search`, (msg, done) => {
        const body = JSON.parse(msg.args.body);
        logger.info('-------vote::search--------->>>>' + JSON.stringify(msg.args.params));
        const {
            batch
        } = body;
        console.log('search-body:', batch, JSON.parse(msg.args.body));
        if (batch) { // 批量处理
            const reqs = batch.split(',');
            const bj = dbObj();
            done(null, reqs.map((item) => {
                return bj[item];
            }).filter(it => it));
        } else {
            done(null, db.results.filter(v => {
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

        logger.info('-------result::edit--------->>>>' + JSON.stringify(msg.args.params));
        let {
            id
        } = msg.args.params
        const body = JSON.parse(msg.args.body);
        let obj = db.results.find(v => v.id == id);
        if (obj) {
            obj = Object.assign(obj, {
                ...obj,
                ...body,
                id,
            })
            db.results = parseAnalyser(db.results);
            ////console.log('-------edit--------->>>>', db.results);
            done(null, db.results)
        } else {
            done(null, {
                success: false
            })
        }
    })

    this.add(`${$module},if:create`, (msg, done) => {
        logger.info('-------result::create--------->>>>' + JSON.stringify(msg.args.params));
        const body = msg.args.body ? JSON.parse(msg.args.body) : {};
        let userCount = Math.min(Math.max(db.results.length - 1, 0), db.results.length - 1)
        userCount = ++userCount;
        userCount = '20204' + userCount;
        console.log('-------create--------->>>>', userCount);
        db.results.unshift({
            id: userCount,
            ...mode,
            ...body
        })
        done(null, db.results)
    })
    this.add(`${$module},if:delete`, (msg, done) => {
        logger.warn('-------result::delete--------->>>>' + JSON.stringify(msg.args.params));
        console.log('-------delete--------->>>>', msg.args.params);
        let {
            id
        } = msg.args.params
        id = +id;
        const index = db.results.findIndex(v => v.id == id)
        if (index !== -1) {
            db.results.splice(index, 1)
            done(null, db.results)
        } else {
            done(null, {
                success: false
            })
        }
    })
}

module.exports = {
    init: result,
    routes: REST_Routes
}