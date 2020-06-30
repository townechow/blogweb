import axios from 'axios';

const baseUrl = "http://zhouzhongyang.club/api/v1";

export const getClassifyList = () => {
    return dispatch => {
        axios.get(`${baseUrl}/category`)
            .then(function (response) {
                if (response.status == 200) {
                    if (response.data.code == 200) {
                        dispatch({
                            type: 'CLASSIFY_LIST',
                            data: response.data.data
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
}
export const getArticleList = (params) => {
    return dispatch => {
        axios.get(`${baseUrl}/article`, {
                params: params,
            })
            .then(function (response) {
                if (response.status == 200) {
                    if (response.data.code == 200) {
                        dispatch({
                            type: 'ARTICLE_LIST',
                            data: response.data.data
                        })
                    } else {
                        throw new Error(response.data.msg)
                    }

                    // console.log(response);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}