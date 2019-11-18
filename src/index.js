import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {version, Button, Skeleton} from "antd";
import "antd/dist/antd.css";
import {Timeline} from 'antd';
import "./index.css";
import TimelineItem from "antd/es/timeline/TimelineItem";
import {Route, Router, hashHistory, Switch} from "react-router";
import LayOut from "./component/layout/layout";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store"

// ========================================

ReactDOM.render(
    <Provider store={store}><HashRouter>
        <Switch>
            <Route path="/app" component={LayOut}/>
            <Route path="**" render={(props) => {
                return (<div>main page not found</div>);
            }}/>
        </Switch>

    </HashRouter></Provider>

    ,
    document.getElementById('root')
);


