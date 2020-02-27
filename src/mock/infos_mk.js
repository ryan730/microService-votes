var DataMocker = require('json-schema-mock');
var JSONToSchema = require('json-to-schema');
var casual = require('casual');// Fake data generator,https://www.npmjs.com/package/casual

const mode = require('../mode/info_db');

const schema = JSONToSchema(mode);

module.exports = Array(10).fill().map((it, index) => {
    const item = DataMocker(schema);
    for (let i in item) {
        item[i] = casual[i] || item[i];
        item['id'] = '20203'+index;
        item['type'] = (index%3+1);
        item['date'] = casual.date(format = 'YYYY-MM-DD') +' '+ casual.time(format = 'HH:mm:ss');
    }
    return item;
});
