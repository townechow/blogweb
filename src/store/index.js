import reducers from "./reducers.js";

import {
  createStore,
  combineReducers,
  applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import {
  createLogger
} from "redux-logger";

function store(initialState) {
  
  let createStoreWithMiddleware;
  console.log(process.env.NODE_ENV, "process.env.NODE_ENV")
  if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == undefined) {
    createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  } else {
    createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(
      createStore
    );
  }
  const store = createStoreWithMiddleware(reducers, initialState);
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept("./reducers.js", () => {
  //     const nextRootReducer = require("./reducers.js/");
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }

  return store;
}

export default store;