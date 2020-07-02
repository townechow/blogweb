import React from "react";
import './style.less';
import { connect } from 'react-redux';
import { getClassifyList, getArticleList } from './redux/actions.js';
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";



class Classify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeId: 0,
        }

    }


    componentDidMount() {
        this.props.getClassifyList();

    }

    getArticleList = (id) => {
        this.setState({
            activeId: id
        })
        this.props.getArticleList({ category_id: id })
        this.props.history.replace({
            pathname: `/home/`,
        })
    }

    render() {
        console.log("this.props==", this.props);
        const { classifyList = [] } = this.props;
        const { activeId = "" } = this.state;
        return (
            <div className="classify-box">
                <div
                    className={!activeId ? "active classify-list-item" : "classify-list-item"}
                    onClick={() => this.getArticleList("")}
                >
                    <div >全部</div>
                </div>
                {
                    classifyList.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className="classify-list-item"
                                onClick={() => this.getArticleList(item.id)}
                                className={activeId == item.id ? "active classify-list-item" : "classify-list-item"}
                            >
                                <div >{item.name}</div>
                            </div>
                        )
                    })
                }


            </div>
        );
    }
}
const mapState = (state) => {
    return {
        classifyList: state.classifyReducer.classifyList,
        articleList: state.classifyReducer.articleList,

    }
}
const mapDispath = (dispatch) => {
    return {
        getClassifyList: bindActionCreators(getClassifyList, dispatch),
        getArticleList: bindActionCreators(getArticleList, dispatch),

    }
}

export default connect(mapState, mapDispath)(withRouter(Classify));