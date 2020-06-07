import {
    combineReducers
} from "redux";

import homeReducer from "../pages/home/redux/reducer.js";
// import livingReducer from "../containers/Living/reducer";
// import messageReducer from "../containers/Message/reducer";


const rootReducer = combineReducers({
    homeReducer,
    // livingReducer,
    // messageReducer
});

export default rootReducer;