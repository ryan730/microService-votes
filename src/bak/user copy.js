const $module = 'module:user';
const logger = require('../utils/Logger');

let userCount = 3
 
const REST_Routes = [
  {
    prefix: '/user',
    pin: `${$module},if:*`,
    map: {
      list: {
        GET: true,
        name: ''
      },
      load: {
        GET: true,
        name: '',
        suffix: '/:id'
      },
      edit: {
        PUT: true,
        POST: true,
        name: '',
        suffix: '/:id'
      },
      create: {
        POST: true,
        name: ''
      },
      delete: {
        DELETE: true,
        name: '',
        suffix: '/:id'
      }
    }
  }
]
 
const db = {
  users: [{
    id: 1,
    name: '甲'
  }, {
    id: 2,
    name: '乙'
  }, {
    id: 3,
    name: '丙'
  }]
}
 
function user(options) {
  this.add(`${$module},if:list`, (msg, done) => {
    logger.info('-------list--------->>>>'+msg.args.params);
    done(null, db.users)
  })
  this.add(`${$module},if:load`, (msg, done) => {
    logger.info('-------load--------->>>>',msg.args.params);
    const { id } = msg.args.params
    done(null, db.users.find(v => Number(id) === v.id))
  })
  this.add(`${$module},if:edit`, (msg, done) => {
    logger.info('-------edit--------->>>>',msg.args.params);
    let { id } = msg.args.params
    id = +id
    //const { name } = msg.args.body
    const name = JSON.parse(msg.args.body).name;
    const index = db.users.findIndex(v => v.id === id)
    if (index !== -1) {
    logger.info('-------edit--------->>>>',db.users,name,JSON.parse(msg.args.body).name);
      db.users.splice(index, 1, {
        id,
        name
      })
      done(null, db.users)
    } else {
      done(null, { success: false })
    }
  })
  this.add(`${$module},if:create`, (msg, done) => {
    logger.info('-------create--------->>>>',msg.args.params,msg.args.body);
    //const { name } = msg.args.body
    const name = JSON.parse(msg.args.body).name;
    db.users.push({
      id: ++userCount,
      name
    })
    done(null, db.users)
  })
  this.add(`${$module},if:delete`, (msg, done) => {
    logger.warn('-------delete--------->>>>',msg.args.params);
    let { id } = msg.args.params
    id = +id
    const index = db.users.findIndex(v => v.id === id)
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