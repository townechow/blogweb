import React from "react";

import './style.less';



class Footer extends React.Component {
    constructor(props) {
        super(props);

    }


    componentDidMount() {
        console.log("Classify 挂载完毕！");

    }

    render() {
        return (
            <div className="footer-box">
                <div>© 2019 小_飞鸡</div>
            </div>
        );
    }
}


export default Footer;