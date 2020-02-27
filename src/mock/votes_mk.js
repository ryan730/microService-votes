var DataMocker = require('json-schema-mock');
var JSONToSchema = require('json-to-schema');
var casual = require('casual');// Fake data generator,https://www.npmjs.com/package/casual

const mode = require('../mode/vote_db');
const allUser = require('./users_mk');

const schema = JSONToSchema(mode);

console.log('------->>>',allUser);

module.exports = Array(50).fill().map((it, index) => {
    const item = DataMocker(schema);
    for (let i in item) {
        item[i] = casual[i] || item[i];
        item['id'] = '20202'+index;
        item['status'] = (index%3+1);
        item['date'] = casual.date(format = 'YYYY-MM-DD') +' '+ casual.time(format = 'HH:mm:ss');
        item['ownerid'] = allUser[parseInt(Math.random()*allUser.length)].id;
    }
    return item;
});
