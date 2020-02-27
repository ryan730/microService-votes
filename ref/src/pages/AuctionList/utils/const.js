export const global = {
    setVisible:null,
    loading:null
}

export const keyMean = {
    empId:{
        describe:'员工ID',
        value:'0',
        require:'1',
        detail:`
        `
    },
    name:{
        describe:'场景名称',
        value:'0',
        require:'1',
        detail:`
        `
    },
    pic:{
        describe:'图片',
        value:'0',
        require:'0',
        detail:`
            用户行为标记:最近看过,需要取访问拍品数<br>
            动态标记:VR/直播/视频<br>
            图片:图片地址,图片尺寸
        `
    },
    price:{
        describe:'价格',
        value:'0',
        require:'true',
        detail:`
            降价拍预展：起降<br>
            其它：当前价<br>
            附加说明：<br>
            增价拍：出价次数<br>
            降价拍预展：底价<br>
            降价拍正在进行：底价
        `
    },
    title:{
        describe:'标题',
        value:'0',
        require:'true',
        detail:`
            标题前标签：二拍/变卖/降价拍，520/双11
        `
    },
    time:{
        describe:'时间',
        value:'0',
        require:'true',
        detail:`
            正常-预估结束时间，开拍后N内拍卖结束，预估结束时间<br>
            预展：预计...开拍<br>
            增价拍正在进行：预计xxx结束<br>
            降低拍正在进行：今天10点降至100元<br>
            变卖未出价：出价即进入倒计时<br>
        `
    },
    prop:{
        describe:'属性',
        value:'0',
        require:'true',
        detail:`
            距离：车房，距离，地理位置<br>
            核心属性：珍品宝石路属性，司法规则映射	　
        `
    },
    tag:{
        describe:'标签',
        value:'0',
        require:'true',
        detail:`
            标签：走标签系统
        `
    },
    org:{
        describe:'机构',
        value:'0',
        require:'true',
        detail:`
            店铺名称：简写/送拍机构名称<br>
            店铺地址：珍品/大众进店铺，司法资产进机构主页，大众是店铺名、珍品/司法/资产是机构名称
        `
    },
    heat:{
        describe:'热度',
        value:'0',
        require:'true',
        detail:`
        围观次数：预展中展示<br>
        出价＞0时，出价次数<br>
        出价=0时，围观次数<br>
        `
    },
    accuracy:{
        describe:'高精度',
        value:'0',
        require:'true',
        detail:`
            价格高精度
        `
    },
    inventory:{
        describe:'库存',
        value:'0',
        require:'true',
        detail:`
            降价拍预展：限量N件<br>
            降价拍正在进行：仅剩N件<br>
            降价拍已结束：无<br>
            其它：店铺名称<br>
        `
    },
    video:{
        describe:'视频',
        value:'0',
        require:'true',
        detail:`
            动态标记，固定排序
        `
    },
    distance:{
        describe:'展示公里数',
        value:'0',
        require:'true',
        detail:`
            动态标记，固定排序
        `
    },
    videoAutoPlay:{
        describe:'wifi下自动播放视频',
        value:'0',
        require:'true',
        detail:`
            动态标记，固定排序
        `
    },
}


// 'distance':0,//是否展示距离
// 'videoAutoPlay':0,//是否自动播放视频

// 'locationSchema':0,//地理位置展示方案
// 'placeholdSchema':0,//占位方案
// 'lowerRightCornerDisplay':0,//右下角显示内容

// 'tagPageCode':'',//标签PAGECODE
// 'tagAreaCodeBeforeTitle':'',//标签标题区-区块code
// 'tagAreaCodeAtInfo':'',//标签-信息区-区块CODE
// 'tagAreaCodeAtPic':'',//标签-信息区-区块CODE