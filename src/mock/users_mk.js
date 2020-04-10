var DataMocker = require('json-schema-mock');
var JSONToSchema = require('json-to-schema');
var casual = require('casual'); // Fake data generator,https://www.npmjs.com/package/casual

const mode = require('../mode/user_db');
const allVote = require('./votes_mk');

const schema = JSONToSchema(mode);

module.exports = Array(50).fill().map((it, index) => {
    const item = DataMocker(schema);
    for (let i in item) {
        item[i] = casual[i] || item[i];
        item['id'] = '20201' + ((index < 10) ? `0${index}` : index);
        item['age'] = parseInt(Math.random()*80)+16;
        item['tel'] = Math.random() * 10 - 5 > 0 ? '13500000000' : '13600000000';
        item['sex'] = Math.random() * 10 - 5 > 0 ? 'Female' : 'Male';
        item['date'] = casual.date(format = 'YYYY-MM-DD') + ' ' + casual.time(format = 'HH:mm:ss');
    }
    if (index == 0) {
        //item['votes'] = allVote[parseInt(Math.random() * allVote.length)].id;
        item['votes'] = allVote.map((it,num)=>{
            if (num<10){
                it['ownerid'] = item['id']; // 发起人改成当前投票
                return it.id;
            }
        }).filter((t)=>t)
        item['username'] = '123';
        item['password'] = '123';
    }
    return item;
});