import React from 'react';
import { Overlay, Loading } from '@alifd/next';

class WidgetPanel extends React.Component {
    state = {
        visible:false
    }
    render() {
        //const { visible } = this.props;
        const { visible } = this.state;
        if (!visible) {
            return null;
        }
        return (
            <Overlay 
                visible={visible}
                align="cc cc"
                hasMask
                disableScroll
                >
            <Loading style={{width:'200px'}} tip="加载中..." >
                {/* <div className="demo">test</div> */}
            </Loading>
            </Overlay>
        );
    }
}

export default WidgetPanel;