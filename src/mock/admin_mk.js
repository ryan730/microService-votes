var DataMocker = require('json-schema-mock');
var JSONToSchema = require('json-to-schema');
var casual = require('casual');// Fake data generator,https://www.npmjs.com/package/casual

const mode = require('../mode/admin_db');

const schema = JSONToSchema(mode);

const names = ['zhuyan','zhuyan123'];
const passwords = [123456,123456];

module.exports = Array(2).fill().map((it, index) => {
    // const item = DataMocker(schema);
    // for (let i in item) {
    //     item[i] = casual[i] || item[i];
    //     item['id'] = '20203'+index;
    //     item['type'] = (index%3+1);
    //     item['date'] = casual.date(format = 'YYYY-MM-DD') +' '+ casual.time(format = 'HH:mm:ss');
    // }
    const item = DataMocker(schema);
    item['id'] = '20204'+index;
    item['name'] = names[index];
    item['password'] = passwords[index];
    return item;
});
