var DataMocker = require('json-schema-mock');
var JSONToSchema = require('json-to-schema');
var casual = require('casual');// Fake data generator,https://www.npmjs.com/package/casual

const mode = require('../mode/info_db');

const schema = JSONToSchema(mode);

module.exports = Array(5).fill().map((it, index) => {
    const item = DataMocker(schema);
    for (let i in item) {
        item[i] = casual[i] || item[i];
        item['id'] = '20203' + ((index < 10) ? `0${index}` : index);
        item['type'] = (index%3+1);
        item['content'] = casual.words(n = 200);
        item['date'] = casual.date(format = 'YYYY-MM-DD') +' '+ casual.time(format = 'HH:mm:ss');
    }
    if (index == 0) {
        item['title'] = '关于中华民族的传统节日的公告';
        item['content'] = '根据国务院关于法定节假日的规定和我公司工作实际情况，现将2018年清明节放假的有关事项通知如下： \n一、 公司放假时间为：2018年4月5日(星期四)——2018年4月7日(星期六)，共3天。2018年4月8日（星期日）调休上班。 \n二、 放假之前，请各位同事关好水电、锁好门窗等，做好安全防范工作。 \n三、 节假期间外出游玩请关注天气变化，注意安全，谨防上当受骗。'
    }
    if (index == 1) {
        item['title'] = '关于服务器的稳定和服务的公告';
        item['content'] = '尊敬的用户： 为了保证服务器的稳定和服务质量，本站于什么时候进行系统维护，预计维护时间为6个小时，请各位用户周知，并提前留意投注时间，以免造成不必要的损失。对于维护期间给您带来的不便，敬请见谅，感谢所有用户的支持和配合。'
    }
    if (index == 2) {
        item['title'] = '关于牵缘网举办北京相亲qq群聚会的公告';
        item['content'] = '深秋时节，为满足广大单身白领择偶需求， 牵缘网举办北京相亲qq群聚会，时间 20＊＊年＊月＊＊日早晨＊＊：＊＊香山 公园东门集合，牵缘网相亲旅游群：＊＊＊＊＊， 要求实名申请加入，入群后，修改为真名'
    }
    if (index == 3) {
        item['title'] = '关于集资修路的公告的公告';
        item['content'] = '关于集资修路的公告 各位村民： 大家好！为扎实推进社会主义新农村建设，开发交通运输渠道，提高经济的发展速度，村支两委班子经过会议讨论研究，决定在我村兴建马路，供村民日常使用，但由于村委会财政困难，尚存在xx元的资金缺口，特请求'
    }
    if (index == 4) {
        item['title'] = '关于高层管理的公告';
        item['content'] = '您好，能够为您解决问题十分荣幸。 卡布西游XXX（您的家族名）招人，本家族族员互相帮助十分团结，族长等高层管理也是起到良好的带头作用。'
    }
    return item;
});
