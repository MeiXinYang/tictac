import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {version, Button} from "antd";
import "antd/dist/antd.css";
import {Timeline} from 'antd';
import "./index.css";
import TimelineItem from "antd/es/timeline/TimelineItem";
import Game from "./js/game"
import Calculater from "./component/calculater"
import ToDo from "./component/todo";
// ========================================

ReactDOM.render(
    <Suspense fallback={<div>fallback</div>}>
        <div className={"main"}>
            <Game/>
            <Calculater/>
            <ToDo/>
        </div>
    </Suspense>
    ,
    document.getElementById('root')
);


