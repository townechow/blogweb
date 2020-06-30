import { Route, Switch, withRouter } from "react-router-dom";

import React from "react";
import Header from '../header/index.jsx';
import Detail from '../detail/index.jsx';
import Classify from '../classify/index.jsx';
import ArticleList from '../classify/articleList.jsx';

import Footer from '../footer/index.jsx';
import Right from '../right/index.jsx';

// import  style from './style.less';
import './style.less';
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
                <Header />
                <div className="main">
                    <Classify />
                    <Switch>
                        <Route
                            exact
                            path={`${this.props.match.url}/article/:id`}
                            component={Detail}
                        />
                        <Route
                            exact
                            path={`${this.props.match.url}`}
                            component={ArticleList}
                        />
                    </Switch>
                    <Right />
                </div>
                <Footer />
            </div>
        );
    }
}


export default Home;