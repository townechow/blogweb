import React, { Component } from 'react';
import './style.less';
import { connect } from 'react-redux';
import { getArticleList } from './redux/actions.js';
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

class ArticleList extends Component {
    constructor(prosp) {
        super(prosp);

    }
    componentDidMount() {
        this.props.getArticleList()
    }
    toArticleDetail = (id) => {
        this.props.history.replace({
            pathname: `/home/article/${id}`,
        })
    }

    render() {
        console.log("this.props=article-list=", this.props);
        const { data = [] } = this.props.articleList
        return (
            <div className="article-list">
                {data.map((item, index) => {
                    return (
                        <div
                            key={item.id}
                            className="article-item"
                            onClick={() => this.toArticleDetail(item.id)}
                        >
                            {item.title}
                        </div>
                    )
                })}
            </div>
        )
    }
}
const mapState = (state) => {
    return {
        articleList: state.classifyReducer.articleList,
    }
}
const mapDispath = (dispatch) => {
    return {
        getArticleList: bindActionCreators(getArticleList, dispatch),

    }
}
export default connect(mapState, mapDispath)(withRouter(ArticleList));