import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {version, Button, Skeleton} from "antd";
import "antd/dist/antd.css";
import {Timeline} from 'antd';
import "./index.css";
import TimelineItem from "antd/es/timeline/TimelineItem";
const Game = React.lazy(() => import('./js/game'));
const Calculater = React.lazy(() => import('./component/calculater'));
const ToDo = React.lazy(() => import('./component/todo'));
// ========================================

ReactDOM.render(
    <Suspense fallback={<Skeleton active={true}/>}>
        <div className={"main"}>
            <Game/>
            <Calculater/>
            <ToDo/>
        </div>
    </Suspense>
    ,
    document.getElementById('root')
);


