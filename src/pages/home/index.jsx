import React from "react";


// import  style from './style.less';
import   './style.less';
// import   './style.css';



class Home extends React.Component {
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
            <div className="home-body">
                <div>导航</div>
                <div>分类</div>
                <div>列表</div>
            </div>
        );
    }
}


export default Home;