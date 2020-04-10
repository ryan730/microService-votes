var DataMocker = require('json-schema-mock');
var JSONToSchema = require('json-to-schema');
var casual = require('casual');// Fake data generator,https://www.npmjs.com/package/casual

const mode = require('../mode/vote_db');
/////const allUser = require('./users_mk');

const schema = JSONToSchema(mode);

//////console.log('------->>>',allUser);

module.exports = Array(50).fill().map((it, index) => {
    const item = DataMocker(schema);
    for (let i in item) {
        item[i] = casual[i] || item[i];
        item['id'] = '20202' + ((index < 10) ? `0${index}` : index);
        item['status'] = (index%3+1);
        item['date'] = casual.date(format = 'YYYY-MM-DD') +' '+ casual.time(format = 'HH:mm:ss');
        item['type'] = Math.floor(Math.random()*8+1);
        // item['content'] = '[{"title":"1. 题目1","content":[{"value":1,"label":"选项1"},{"value":2,"label":"选项2"},{"value":3,"label":"选项3"}],"type":"single"},{"title":"2.题目2[多选题]","content":[{"value":1,"label":"选项4"},{"value":2,"label":"选项5"},{"value":3,"label":"选项6"}],"type":"multiple"},{"title":"3.题目2[多选题]","content":[{"value":1,"label":"选项4"},{"value":2,"label":"选项5"},{"value":3,"label":"选项6"}],"type":"multiple"}]';
        item['content'] = '[{"title":"1.你的年龄阶段","content":[{"value":1,"label":"少年（14岁及以下）"},{"value":2,"label":"青年（15 - 44岁）"},{"value":3,"label":"中年（45 - 59岁）"}],"type":"single"},{"title":"2.您使用过下面哪些无人零售形式？[多选题]","content":[{"value":1,"label":"自动售货机"},{"value":2,"label":"无人货架"},{"value":3,"label":"无人便利店"},{"value":4,"label":"其他"}],"type":"multiple"},{"title":"3.为什么选择无人零售？","content":[{"value":1,"label":"新鲜好奇"},{"value":2,"label":"方便快捷"},{"value":3,"label":"喜欢自助的选购方式"},{"value":4,"label":"物美价廉"},{"value":5,"label":"品种完备"},{"value":6,"label":"其他"}],"type":"single"}]';
        ///item['ownerid'] = allUser[parseInt(Math.random()*allUser.length)].id;
    }
    return item;
});
