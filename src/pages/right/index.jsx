import React from "react";

import './style.less';



class RightInfo extends React.Component {
    constructor(props) {
        super(props);

    }


    componentDidMount() {
        console.log("RightInfo 挂载完毕！");

    }

    render() {
        return (
            <div className="classify-box">
                分类
            </div>
        );
    }
}


export default RightInfo;