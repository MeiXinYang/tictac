import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {version, Button} from "antd";
import "antd/dist/antd.css";
import {Timeline} from 'antd';
import "./index.css";
import TimelineItem from "antd/es/timeline/TimelineItem";
import Game from "./js/game"
import Calculater from "./component/calculater"
// ========================================

ReactDOM.render(
    <Suspense fallback={<div>fallback</div>}>
        <div>
            {/*<Game/>*/}
        </div>
        <Calculater/>
    </Suspense>
    ,
    document.getElementById('root')
);


