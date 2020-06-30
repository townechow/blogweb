const initState = {
    classifyList: [],
    articleList: {},


}
const classifyReducer = (state = initState, action) => {
    switch (action.type) {
        case "CLASSIFY_LIST":
            return {
                ...state,
                classifyList: action.data,
            };
        case "ARTICLE_LIST":
            return {
                ...state,
                articleList: action.data,
            };

        default:
            return state;
    }
}

export default classifyReducer;