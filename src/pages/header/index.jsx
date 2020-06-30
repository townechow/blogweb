import React from "react";

import './style.less';



class Header extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        console.log("Home 将要挂载！");
    }

    componentDidMount() {
        console.log("Home 挂载完毕！");

    }

    render() {
        return (
            <div className="header-box">
            </div>
        );
    }
}


export default Header;