import React from "react";

import './style.less';



class Detail extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log(" Detail 挂载完毕！");

    }

    render() {
        return (
            <div className="detail-box">
                详情
            </div>
        );
    }
}


export default Detail;