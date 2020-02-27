var DataMocker = require('json-schema-mock');
var JSONToSchema = require('json-to-schema');
var casual = require('casual');// Fake data generator,https://www.npmjs.com/package/casual

const mode = require('../mode/result_db');
const allUser = require('./users_mk');
const allVote = require('./votes_mk');

const schema = JSONToSchema(mode);

console.log('------->>>',allUser);

module.exports = Array(50).fill().map((it, index) => {
    const item = DataMocker(schema);
    for (let i in item) {
        item[i] = casual[i] || item[i];
        item['id'] = '20204'+index;
        item['analysis'] = ((Math.random()*100/100)*100).toFixed(1)+'%';
        item['date'] = casual.date(format = 'YYYY-MM-DD') +' '+ casual.time(format = 'HH:mm:ss');
        item['ownerid'] = allUser[parseInt(Math.random()*allUser.length)].id;
        item['voteid'] = allVote[parseInt(Math.random()*allVote.length)].id;
    }
    return item;
});
// "id": 1,
// "voteid": 1,
// "ownerid": 1,
// "playerid": [1,2],
// "num": 1,
// "result": 1,
// "analysis": 1,