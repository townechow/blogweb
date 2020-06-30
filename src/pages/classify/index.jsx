import React from "react";
import './style.less';
import { connect } from 'react-redux';
import { getClassifyList, getArticleList } from './redux/actions.js';
import { bindActionCreators } from "redux";




class Classify extends React.Component {
    constructor(props) {
        super(props);

    }


    componentDidMount() {
        console.log("Classify 挂载完毕！");
        this.props.getClassifyList();

    }
    getArticleList = (id) => {
        this.props.getArticleList({ category_id: id })

    }

    render() {
        console.log("this.props==", this.props);
        const { classifyList = [] } = this.props;

        return (
            <div className="classify-box">
                {
                    classifyList.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className="classify-list-item"
                                onClick={() => this.getArticleList(item.id)}
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

export default connect(mapState, mapDispath)(Classify);