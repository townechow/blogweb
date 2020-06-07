
const initState = {
    signBeforeData: {},
    

}
const homeReducer = (state=initState,action)=>{
    switch(action.type){
        case "PLAYCARD_BEFORE":
            return Object.assign({},state,{signBeforeData:action.data});
        default:
            return state;
    }
}

export default  homeReducer;