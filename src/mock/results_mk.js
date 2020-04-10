var DataMocker = require('json-schema-mock');
var JSONToSchema = require('json-to-schema');
var casual = require('casual'); // Fake data generator,https://www.npmjs.com/package/casual

const mode = require('../mode/result_db');
//const allUser = require('./users_mk');
const allVote = require('./votes_mk');

const schema = JSONToSchema(mode);

///console.log('------->>>',allUser);

// module.exports = Array(50).fill().map((it, index) => {
//     const item = DataMocker(schema);
//     for (let i in item) {
//         item[i] = casual[i] || item[i];
//         item['id'] = '20204'+((index < 10) ? `0${index}` : index);
//         item['analysis'] = ((Math.random()*100/100)*100).toFixed(1)+'%';
//         item['date'] = casual.date(format = 'YYYY-MM-DD') +' '+ casual.time(format = 'HH:mm:ss');
//         item['ownerid'] = allUser[parseInt(Math.random()*allUser.length)].id;
//         item['voteid'] = allVote[parseInt(Math.random()*allVote.length)].id;
//     }
//     return item;
// });

module.exports = allVote.map((it, index) => {
    const item = DataMocker(schema);
    item[index] = casual[index] || item[index];
    //item['id'] = '20204' + ((index < 10) ? `0${index}` : index);
    item['id'] = it.id;
    //item['analysis'] = ((Math.random() * 100 / 100) * 100).toFixed(1) + '%';
    item['analysis'] = [{
        1: 1,
        2: 2,
        3: 4,
        total:7
    }, {
        1: 1,
        2: 1,
        3: 1,
        total: 3
    }, {
        1: 2,
        2: 2,
        3: 2,
        total: 6
    }];
    item['date'] = casual.date(format = 'YYYY-MM-DD') + ' ' + casual.time(format = 'HH:mm:ss');
    item['playersid'] = it.playersid;
    item['num'] = it.count;
    item['ownerid'] = it.ownerid;
    item['voteid'] = it.id;
    item['option'] = [];

    return item;
})



// "id": 1,
// "voteid": 1,
// "ownerid": 1,
// "playerid": [1,2],
// "num": 1,
// "result": 1,
// "analysis": 1,