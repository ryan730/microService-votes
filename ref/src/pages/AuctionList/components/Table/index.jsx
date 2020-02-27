import React, { useState, useEffect } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Dialog, Button, ConfigProvider, Pagination, Tag } from '@alifd/next';
import { withRouter } from 'react-router-dom';
import ContainerTitle from '@/components/ContainerTitle';
import { Overlay } from '@alifd/next';
import IcePanel from '@icedesign/panel';
import { Icon } from '@alifd/next';
import { createConfig, findConfigs, deleteConfig, updateConfig } from '../../utils/requestApi';
import { keyMean } from '../../utils/const';
import DateFormat from 'date-format';
import WidgetPanel from '../WidgetPanel';
import styles from './index.module.scss';

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const AVATARS = [
  'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
  'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
  'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
  'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
];

const {Group: TagGroup} = Tag;

let sourceData = [];
let prevData = {};
let pageIndex = 1;
let total = 0;
let widgetPanel;
let initLoad = false;

function parseKeyWord(item) {
  let arr = [];
  for (let i in item) {
    if (String(item[i]) === '1') {
      const km = keyMean[i];
      km && arr.push(km.describe);
    }
  }
  ///return arr && arr.length > 0 ? arr.join(' , ') : '全不展示';
  return arr && arr.length > 0 ? arr : ['全不展示'];
}

function parseSelectp(item){
  let arr = [];
  // 'locationSchema':0,//地理位置展示方案
// 'placeholdSchema':0,//占位方案
// 'lowerRightCornerDisplay':0,//右下角显示内容

// 'tagPageCode':'',//标签PAGECODE
// 'tagAreaCodeBeforeTitle':'',//标签标题区-区块code
// 'tagAreaCodeAtInfo':'',//标签-信息区-区块CODE
  return [
    {
      key:'locationSchema',
      name:'地理位置展示方案',
      value:['不展示','市-县','区/县']
    },
    {
      key:'placeholdSchema',
      name:'占位方案',
      value:['标签+属性不占位','属性不占位','标签不占位','标签+属性都占位']
    },
    {
      key:'lowerRightCornerDisplay',
      name:'右下角显示内容',
      value:['不显示','机构名','相识拍品']
    },
    {
      key:'tagPageCode',
      name:'标签PAGECODE',
      value:''
    },
    {
      key:'tagAreaCodeBeforeTitle',
      name:'标签标题区',
      value:''
    },
    {
      key:'tagAreaCodeAtInfo',
      name:'标签-信息区-区块',
      value:''
    },
    ,
    {
      key:'tagAreaCodeAtPic',
      name:'标签-图片区-区块',
      value:''
    }
  ]
}

function TableList(props) {
  const [dataSource, setDataSource] = useState(sourceData);
  const [visible, setVisible] = useState(false);
  const [panelTitle, setPanelTitle] = useState('编辑拍品页面');

  /*
  获取所有list数据
  */
  function getData(arg) {
    if (sourceData.length > 0 && !arg.beSend) {
      return;
    }
    findConfigs({ pageNo: arg.pageNo }).then(res => {
      if (!res || !res.result || !res.result.data || !res.result.data.data) {
        // 报错
        sourceData = [];
      } else {
        const data = res.result.data.data;
        // accuracy: 0
        // code: "201908156HPKYCNU"
        // createrId: "123"
        // deleteFlag: 0
        // gmtCreate: 1565869632000
        // gmtModified: 1565939338000
        // heat: 0
        // id: 1
        // inventory: 0
        // modifierId: "123"
        // name: "测试01"
        // org: 0
        // pic: 1
        // price: 1
        // prop: 0
        // tag: 0
        // time: 0
        // title: 1
        // video: 0
        sourceData = data.map((item) => {
          return {
            id: item.id,
            code: item.code,
            avatar: (item.modifierId? 'https://work.alibaba-inc.com/photo/'+item.modifierId+'.220x220.jpg':'') || AVATARS[random(0, 3)],
            name: item.name,
            joinTime: DateFormat.asString('yyyy-MM-dd hh:mm:ss', new Date(item.gmtModified)),
            keyword: parseKeyWord(item),
            selectp: parseSelectp(item),
            modifierId: item.modifierId,
            source:item
          };
        });
        if (!res || !res.result || !res.result.data || !res.result.data.page) {
        }else {
          total = res.result.data.page.totalCount;
        }
      }
      const data = [...sourceData];
      if(data.length>0){
        setDataSource(data)
      };
    });
  }

  /*
  创建新的条目
 */
  function handleCreate() {
    prevData = {
      'name': '',
      'pic': 1,
      'price': 1,
      'title': 1,
      'time': 0,
      'prop': 0,
      //'tag': 0,
      'org': 0,
      'heat': 0,
      'accuracy': 0,
      'inventory': 0,
      'video': 0,
      //========// 新数据类型
      'locationSchema':0,//地理位置展示方案
      'distance':0,//是否展示距离
      'videoAutoPlay':0,//是否自动播放视频
      'placeholdSchema':0,//占位方案
      'lowerRightCornerDisplay':0,//右下角显示内容
      'tagPageCode':'',//标签PAGECODE
      'tagAreaCodeBeforeTitle':'',//标签标题区-区块code
      'tagAreaCodeAtInfo':'',//标签-信息区-区块CODE
      'tagAreaCodeAtPic':'',//标签-图片区-区块CODE
    };
    setPanelTitle('新建拍品页面');
    setVisible(true);
  }

  /*
  更新的条目
*/
  function handleUpdate(record) {
    try {
      Dialog.confirm({
        title: '提醒',
        content: '⚠️编辑已有页面,会覆盖线上效果,请谨慎修改!!!',
        onOk: () => {
          console.log('record:::',record);
          prevData = record;
          setPanelTitle('编辑拍品页面');
          setVisible(true);
        },
        ///onCancel: () => console.log('onCancel')
      });
    } catch (e) { }
  }

  /* 
   关闭弹窗
  */
  function handleClose() {
    setVisible(false);
  }

  /* 
   删除条目
  */
  function handleDelete(id) {
    try {
      Dialog.confirm({
        title: '提示',
        content: '⚠️删除已有页面,会影响线上效果,同时操作不可回退,请谨慎!!!',
        onOk: () => {
          console.log('要删除的id:', id);
          deleteConfig({ id: id }).then(() => {
            handleParentRefresh();
          });
        },
        ///onCancel: () => console.log('id:', id)
      });
    } catch (e) { }
  }

  /* 
   页面名称渲染
  */
  function renderProfile(value, index, record) {
    return (
      <div className={styles.profile}>
        <img src={record.avatar} alt="" className={styles.avatar} />
        <span className={styles.name}>{record.name}</span>
      </div>
    );
  }

  /* 
   list页面重新渲染
  */
  function handleParentRefresh() {
    console.warn('pageIndex====>',pageIndex);
    getData({ pageNo: pageIndex, beSend: true });
    setVisible(false);
  }

  function getPrevData(){
    return prevData;
  }

  /* 
   弹框渲染
  */
  function renderPanel() {
    let type = (panelTitle === '编辑拍品页面') ? 'update' : 'create';
    return (
      <div style={{ width: '700px' }}>
        <IcePanel status="info" style={{ marginBottom: '10px' }}>
          <IcePanel.Header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            backgroundColor: '#3080FE',
            color: 'white'
          }}>
            {panelTitle}
            <Button type="primary" onClick={() => handleClose()}><Icon type="close" /></Button>
          </IcePanel.Header>
          <IcePanel.Body>
            <div style={{ fontSize: '15px', margin: 0, lineHeight: 1.5, color: '#333' ,maxHeight: '600px',overflowY: 'auto'}}>
              <WidgetPanel ref={(d)=>{
                if(d){
                  widgetPanel = d;
                }
              }} 
              onParentRefresh={handleParentRefresh} 
              type = {type} 
              dataSource={getPrevData(type)} 
              visible={visible}
              onHandleClose={handleClose}
              />
            </div>
          </IcePanel.Body>
        </IcePanel>
      </div>);
  }

  /* 
   编辑和删除渲染
  */
  function renderOper(value, id, record) {
    ///console.log('record:',record);
    return (
      <div>
        <Button
          type="primary"
          onClick={handleUpdate.bind(this,record.source)}
          className={styles.btn}
        >
          编辑
        </Button>
        <Button onClick={() => handleDelete(record.id)} type="normal" warning>
          删除
        </Button>
      </div>
    );
  }

  /*
  渲染员工信息栏
  */
  function renderModifier(value, id, record) {
    return(
      <a style={{textDecoration:'underline'}} href={'https://work.alibaba-inc.com/work/u/'+value} target='_blank'>{value}</a>
    );
  }

  /*
  渲染标签栏
  */
  function renderkeyword (value, id, record) {
    return(
      <TagGroup>
        {
          value.map((it,num)=>
           <Tag key={num} type="normal" size="small">{it}</Tag>
          )
        }
      </TagGroup>
    );
  }

  /*
  渲染标签栏
  */
 function renderSelectp (value, id, record) {
   
  return(
    <TagGroup>
      {
        value.map((it,num)=>{
          let val = record.source[it.key];
          if(it.value instanceof Array){
             val = it.value[record.source[it.key]];
          }
          return val?<Tag key={num} type="normal" size="small">{it.name+'：'+val}</Tag>:null
        })
      }
    </TagGroup>
  );
}

  /* 
   pageination变化
  */
  function handleChange(page) {
    console.log('page-->', page);
    pageIndex = page;
    getData({ pageNo: page, beSend: true });
  }

  useEffect(() => {
    if(!initLoad) {
      getData({ pageNo: 1 });
      initLoad = true;
    }
  })


  return (
    <IceContainer className={styles.container}>
      <ContainerTitle
        title="场景页面列表"
        buttonText="添加新场景页面"
        className={styles.title}
        onClick={handleCreate}
      />
      <Table dataSource={dataSource} hasBorder={false} className={styles.table}>
        <Table.Column
          width={150}
          dataIndex="name"
          title="场景页面名称"
          cell={renderProfile}
        />
        <Table.Column width={120} dataIndex="code" title="ID" align="center" />
        <Table.Column dataIndex="keyword" title="展示字段" align="left" cell={renderkeyword}/>
        <Table.Column dataIndex="selectp" title="选择项" align="left" cell={renderSelectp}/>
        <Table.Column width={110} dataIndex="modifierId" title="最后操作者" align="center" cell={renderModifier}/>
        <Table.Column width={110} dataIndex="joinTime" title="修改时间" align="center" />
        <Table.Column width={150} dataIndex="id" title="操作" cell={renderOper} />
      </Table>
      <Overlay visible={visible}
        /// safeNode={() => btn}
        align="cc cc"
        hasMask
        disableScroll
      /// onRequestClose={handleClose}
      >
        {renderPanel()}
      </Overlay>
      <Pagination size="small" className="custom-pagination" pageSize={10} onChange={handleChange} total={total} totalRender={total => `Total: ${total}`} />
    </IceContainer>
  );
}

export default withRouter(TableList);
