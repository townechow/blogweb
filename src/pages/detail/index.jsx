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
                console.error(error);
            });
    }

    render() {
        console.log("detail props==", this.props);
        const { articleInfo = {} } = this.state;
        return (
            !articleInfo.title ?
                <div className="detail-box loading"> Loading...</div>
                :
                <div className="detail-box">
                    <h1 className="article-head">{articleInfo.title}</h1>
                    <div className="article-info">
                        <div className="tag-list">
                            <span className="tag">{articleInfo.keyword}</span>
                        </div>
                    </div>
                    <div className="article-content"
                        dangerouslySetInnerHTML={{
                            __html: `${articleInfo.content && articleInfo.content.replace(/(\r\n)|(\n)/g, '<br/>')}`,
                        }}
                    />
                    <div className="page-nav"></div>
                </div>
        );
    }
}


export default withRouter(Detail);