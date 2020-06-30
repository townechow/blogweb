import React from "react";

import './style.less';
import axios from 'axios';
import { withRouter } from "react-router-dom"


const baseUrl = "http://zhouzhongyang.club/api/v1";



class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleInfo: {}
        }
    }

    componentDidMount() {
        console.log(" Detail 挂载完毕！");
        const id = this.props.match.params.id;
        this.getArticleDetail(id);
    }
    getArticleDetail = (id) => {
        const _this = this;
        axios.get(`${baseUrl}/article/${id}`)
            .then(function (response) {
                if (response.status == 200) {
                    if (response.data.code == 200) {
                        _this.setState({
                            articleInfo: response.data.data
                        })
                    } else {
                        throw new Error(response.data.msg)
                    }
                    console.log(response);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        console.log("detail props==", this.props);
        const { articleInfo = {} } = this.state;
        return (
            <div className="detail-box">
                <head className="article-head">{articleInfo.title}</head>
                <div className="article-info">{articleInfo.keyword}</div>
                <div className="article-content"
                    dangerouslySetInnerHTML={{
                        __html: `${articleInfo.content&&articleInfo.content.replace(/(\r\n)|(\n)/g, '<br/>')}`,
                    }}
                />
                <div className="page-nav"></div>
            </div>
        );
    }
}


export default withRouter(Detail);