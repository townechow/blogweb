import {
    combineReducers
} from "redux";

import homeReducer from "../pages/home/redux/reducer.js";
import classifyReducer from "../pages/classify/redux/reducer.js";

// import livingReducer from "../containers/Living/reducer";
// import messageReducer from "../containers/Message/reducer";


const rootReducer = combineReducers({
    homeReducer,
    classifyReducer,
    // livingReducer,
    // messageReducer
});

export default rootReducer;