import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {version, Button} from "antd";
import "antd/dist/antd.css";
import {Timeline} from 'antd';
import "./index.css";
import TimelineItem from "antd/es/timeline/TimelineItem";
import jsonData from "./json/json-loader"
// import "./index.css";// class Square extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return (
//             <button className="square" onClick={this.props.onClick}>
//                 {this.props.value}
//             </button>
//         );
//     }
//
// }

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )

}

class Board extends React.Component {
    renderSquare(i) {
        return (<Square value={this.props.squares[i]} key={i}
                        onClick={() => this.props.onClick(i)}/>);
    }

    renderRow(rowNumber) {
        let rowSqu = [];
        for (let squarInx = 0; squarInx < 3; squarInx++) {
            rowSqu.push(this.renderSquare(rowNumber * 3 + squarInx));
        }
        return rowSqu;
    }

    renderBorder() {
        let rowArray = [];
        for (let rowInx = 0; rowInx < 3; rowInx++) {
            rowArray.push(<div className="board-row"> {this.renderRow(rowInx)}</div>);
        }
        return rowArray;
    }

    render() {
        return (
            <div>
                {this.renderBorder()}
            </div>
        );
    }
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        }
    }

    componentDidMount() {
        this.timerId = setInterval(() => {
            this.setState({currentDate: new Date()});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        let currentDate = this.state.currentDate;
        return (<div className='clock'>current date is {currentDate.toLocaleTimeString()}</div>)
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{squares: Array(9).fill(null)}
            ],
            xNext: true,
            stepNumber: 0,
            currentStep: 0,
        }
    }

    handlePutChess(i) {
        if ((this.state.currentStep !== this.state.stepNumber)) {
            alert("look history can not click");
            return;
        }
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xNext ? 'X' : 'O';
        history.push({squares: squares});
        this.setState({
            // history: history.concat([{
            //     squares: squares,
            // }]),
            xNext: !this.state.xNext,
            stepNumber: history.length - 1,
            currentStep: history.length - 1
        });
    }

    showHistory(step) {
        console.log("show %d history", step);
        this.setState({
            stepNumber: step,
            xNext: (step % 2) === 0,
        })
    }


    render() {
        let history = this.state.history;
        let current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = "Winner is " + winner;
        } else {
            status = 'Next player: ' + (this.state.xNext ? "X" : "O");
        }

        let moves = history.map((his, idex) => {
            let desp = "第" + (idex + 1) + "步";
            return (<TimelineItem key={idex} onClick={() => this.showHistory(idex)}>{desp}</TimelineItem>);
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handlePutChess(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <Clock/>
                    {/*<ol className="history_ol">{moves}</ol>*/}
                    <Timeline pending={(this.state.xNext ? 'X' : 'O') + "思考中"}>{moves}</Timeline>
                </div>
                <div className="imageDiv"></div>
                <div className="game-info">{JSON.stringify(jsonData)}</div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Suspense fallback={<div>fallback</div>}>
        <Game/>
    </Suspense>
    ,
    document.getElementById('root')
);


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}