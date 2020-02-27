var DataMocker = require('json-schema-mock');
var JSONToSchema = require('json-to-schema');
var casual = require('casual');// Fake data generator,https://www.npmjs.com/package/casual

const mode = require('../mode/user_db');

const schema = JSONToSchema(mode);

module.exports = Array(50).fill().map((it, index) => {
    const item = DataMocker(schema);
    for (let i in item) {
        item[i] = casual[i] || item[i];
        item['id'] = '20201'+index;
        item['tel'] = Math.random() * 10 - 5 > 0 ? '13500000000' : '13600000000';
        item['sex'] = Math.random() * 10 - 5 > 0 ? 'Female' : 'Male';
    }
    if(index == 0 ){
        item['username'] = '123';
        item['password'] = '123';
    }
    return item;
});
