import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, useLocation, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "../store/index.js";
import { hot } from "react-hot-loader";
import './style.less';

const Home = lazy(() => import("./home/index.jsx"));

const App = () => (
    <Provider store={store()}>
        <Suspense fallback={<div>页面组件错误</div>}>
            <Router>
                <Switch>
                    <Route path={'/home'} component={Home} />
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        </Suspense>
    </Provider>
);
function NoMatch() {
    let location = useLocation();
    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}
export default hot(module)(App);

