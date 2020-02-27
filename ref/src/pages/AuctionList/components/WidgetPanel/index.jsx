import React from 'react';
import { Form, Input, Checkbox, Grid, Collapse, Balloon, Select, Radio} from '@alifd/next';
import styles from './index.module.scss';
import { Message, Button } from '@alifd/next';
import { createConfig, findConfigs, updateConfig } from '../../utils/requestApi';
import { keyMean } from '../../utils/const';


const { Row, Col } = Grid;

const FormItem = Form.Item;
const Panel = Collapse.Panel;
const Tooltip = Balloon.Tooltip;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {
        fixedSpan: 10
    },
    wrapperCol: {
        span: 14
    }
};
const style={
    rowFormat:{
        display: 'flex',
        alignItems: 'center',
        marginBottom:0
    }
}

// const WidgetPanel = () => {
class WidgetPanel extends React.Component {

    state = {
        code: '',
        second: 60
    }

    //function handleSubmit(values,errors) {
    handleSubmit1 = (result, errors) => {
        console.log('提交结果：',result)
 
        const { onParentRefresh, type, dataSource } = this.props;
        let values = {};
        for (let i in result) {
            if (i !== 'name' && typeof result[i] === 'boolean') {
                values[i] = !isNaN(result[i]) && Boolean(result[i]) ? 1 : 0;
            } else {
                values[i] = result[i];
            }

        }
        if (errors) {
            return;
        }
        if (type === 'create') {
            let newData = Object.assign({}, dataSource, values);
            console.log('create提交结果：',newData);
            createConfig({
                ...newData
            }).then(res => {
                //console.log('Get form service:', res);
                if (!res || !res.result || !res.result.model || !res.result.model.data) {
                    Message.warning('创建新页面失败:数据返回错误!');
                } else {
                    console.log('创建新页面成功:' + JSON.stringify(res.result.model.data));
                    Message.success('创建新页面成功!');
                    onParentRefresh();
                }
            }, (err) => {
                Message.error('创建新页面失败:' + JSON.stringify(err));
            });
        } else if (type === 'update') {
            let newData = Object.assign({}, dataSource, values);
            console.log('update提交结果：',newData);
            ///return;
            updateConfig({
                ...newData
            }).then(res => {
                //console.log('Get form service:', res);
                if (!res || !res.result || !res.result.model || !res.result.model.data) {
                    Message.warning('更新新页面失败:数据返回错误!');
                } else {
                    console.log('更新页面成功:' + JSON.stringify(res.result.model.data));
                    Message.success('更新页面成功!');
                    onParentRefresh();
                }
            }, (err) => {
                Message.error('更新页面失败:' + JSON.stringify(err));
            });
        }

        console.log('Get form value:', this.props);
    };

    handleSubmit2 = ()=>{
        this.props.onHandleClose();
    }

    isChecked(name) {
        let { dataSource } = this.props;
        if (!dataSource) return false;
        let context = dataSource[name];
        console.log('========>>>', context, name, dataSource,);
        return Boolean(Number(context));
    }

    renderBalloon(value, name) {
        return null;// 2019,12月30日 取消
        let detail = keyMean[name]['detail'];
        console.warn('keyMeankeyMean:',detail,value)
        const right = <span style={{ margin: '5px', color: 'red' }} id="right" className="btrigger">{value}</span>;
        return (
            <Balloon type="normal" autoFocus trigger={right} closable={false} triggerType="hover" align="r">
                <div style={{fontSize:'11px'}} dangerouslySetInnerHTML={{__html: detail}}></div>
            </Balloon>
        )
    }

    onChange(value) {
        console.log(value);
    };
    onBlur(e) {
        console.log(/onblur/,e);
    };
    onToggleHighlightItem(item, type) {
        console.log(item, type);
    };
    renderSelect(name,label,list){
        let { dataSource } = this.props;
        if (!dataSource) return false;
        const deVal = dataSource[name] || list[0].value;
        return(
            <FormItem
            style={{width:'350px',...style.rowFormat}}
            >
                <span id={name} style={{marginRight:'10px'}}>{label}: </span>
                <Select 
                style={{width:'200px'}}
                name={name} 
                defaultValue={deVal}
                aria-labelledby={name} onChange={this.onChange} onBlur={this.onBlur} onToggleHighlightItem={this.onToggleHighlightItem}>
                    {list.map((item,i)=>{
                        return <Option key={item.name+i} value={item.value}>{item.name}</Option>
                    })}
                </Select>
            </FormItem>
        )
    };
    renderRadio(){
        let { dataSource } = this.props;
        if (!dataSource) return false;
        let context = dataSource['lowerRightCornerDisplay'] || 0;
        console.log('renderRadio===>>>',context)
        return (<FormItem
            label="右下角区域展示:"
            hasFeedback
            style={{width:'400px',...style.rowFormat}}
        >
            <RadioGroup name="lowerRightCornerDisplay" defaultValue={['0','1','2'][context]}>
                <Radio value="0">不显示</Radio>
                <Radio value="1">机构名</Radio>
                <Radio value="2">相似拍品</Radio>
            </RadioGroup>
        </FormItem>)
    }

    renderInput(label,placeholder,key){
        let { dataSource } = this.props;
        if (!dataSource) return false;
        const dVal = dataSource[key] || '';
        return (<FormItem
            style={{width:'400px',...style.rowFormat}}
        >
           <span id="select-a11y" style={{marginRight:'10px'}}>{placeholder}: </span>
           <Input name={key} style={{ width: 200 }} trim placeholder={placeholder} defaultValue={dVal} />
        </FormItem>)
    }

    render() {
        const { visible, dataSource } = this.props;
        console.log('========>>>', this.props);
        if (!visible) {
            return null;
        }
        return (
            [
                <Collapse key={'Collapse'} style={{
                    margin: '0px 20px 10px 20px'
                }}
                    rtl={false}>
                    <Panel title="展开查看对应布局信息">
                        <div style={{
                            overflowX: 'auto',
                            pointerEvents: 'none'
                        }}>
                            <img src='https://img.alicdn.com/tfs/TB1utaIdG61gK0jSZFlXXXDKFXa-886-419.jpg'></img>
                        </div>
                    </Panel>
                </Collapse>,
                <Form key={'Form'} style={{ width: '60%', padding: '0 20px' }} {...formItemLayout} labelTextAlign="left" size="medium" >
                    <FormItem label="页面名称(必填项):" required asterisk={true} requiredMessage='页面名称不能为空'>
                        <Input name="name" style={{ width: 280 }} trim placeholder="命名规则:{业务类型}-{自定义名称}" defaultValue={dataSource['name']} />
                    </FormItem>
                    <FormItem label="功能选择(不可修改):">
                        <Checkbox name="pic" disabled checked>图片区 {this.renderBalloon('①',"pic")}</Checkbox><br></br>
                        <Checkbox name="price" disabled checked>价格区 {this.renderBalloon('⑦',"price")}</Checkbox><br></br>
                        <Checkbox name="title" disabled checked>标题区 {this.renderBalloon('④',"title")}</Checkbox><br></br>
                        <Checkbox name="time" disabled checked>时间区 {this.renderBalloon('⑧',"time")}</Checkbox><br></br>
                    </FormItem>

                    <FormItem label="功能选择(可修改):">
                        <Checkbox name="prop" defaultChecked={this.isChecked("prop")}>属性区 {this.renderBalloon('⑤',"prop")}</Checkbox><br></br>
                        {/* <Checkbox name="tag" defaultChecked={this.isChecked("tag")}>标签区 {this.renderBalloon('⑥',"tag")}</Checkbox><br></br> */}
                        <Checkbox name="distance" defaultChecked={this.isChecked("distance")}>展示公里数 {this.renderBalloon('⑨',"distance")}</Checkbox><br></br>
                        {this.renderSelect("locationSchema",'房产属性',
                        [
                            {name:'不展示',value:0},
                            {name:'显示市-县',value:1},
                            {name:'显示区/县',value:2},
                            
                        ])}
                        <Checkbox name="org" defaultChecked={this.isChecked("org")}>机构区 {this.renderBalloon('⑨',"org")}</Checkbox><br></br>
                        <Checkbox name="heat" defaultChecked={this.isChecked("heat")}>拍品热度 {this.renderBalloon('⑧',"heat")}</Checkbox><br></br>
                        <Checkbox name="accuracy" defaultChecked={this.isChecked("accuracy")}>价格高精度 {this.renderBalloon('⑦',"accuracy")}</Checkbox><br></br>
                        <Checkbox name="inventory" defaultChecked={this.isChecked("inventory")}>库存 {this.renderBalloon('⑨',"inventory")}</Checkbox><br></br>
                        <Checkbox name="video" defaultChecked={this.isChecked("video")}>VR/直播/视频 {this.renderBalloon('②',"video")}</Checkbox><br></br>
                        <Checkbox name="videoAutoPlay" defaultChecked={this.isChecked("videoAutoPlay")}>wifi下自动播放视频 {this.renderBalloon('②',"videoAutoPlay")}</Checkbox><br></br>
                        {this.renderSelect('placeholdSchema','占位方案',
                        [
                            {name:'标签+属性都不占位',value:0},
                            {name:'属性不占位',value:1},
                            {name:'标签不占位',value:2},
                            {name:'标签+属性都占位',value:3},
                            
                        ])}
                        <div style={{
                            width: '300px',
                            fontSize: '11px',
                            color: 'red'
                            }}>* 不占位:禁用于通用1X1区块,非瀑布流1X2</div>
                    </FormItem>

                    <FormItem label="功能选择与填写:">
                        {this.renderRadio()}
                        {this.renderInput("tagPageCode","填写标签区",'tagPageCode')}
                        {this.renderInput("tagAreaCodeBeforeTitle","标题前标签",'tagAreaCodeBeforeTitle')}
                        {this.renderInput("tagAreaCodeAtInfo","信息区标签",'tagAreaCodeAtInfo')}
                        {this.renderInput("tagAreaCodeAtPic","图片区标签",'tagAreaCodeAtPic')}
                    </FormItem>

                    <FormItem label=" ">
                        <Form.Submit type="primary" validate onClick={this.handleSubmit1}>保存</Form.Submit>
                        <Form.Submit type="primary" style={{marginLeft:'50px'}} validate onClick={this.handleSubmit2}>取消</Form.Submit>
                    </FormItem>
                </Form>]
        );
    }
}

export default WidgetPanel;