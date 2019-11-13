import React from "react";
import {Row, Col, List} from 'antd'
import "./calculator.css"

class Key extends React.Component {
    render() {
        return (<div className={this.props.buttonStyle} ><button className={"kbtn"} onClick={this.props.click}>
            {this.props.children}
        </button></div>);
    }
}


class KeyBoard extends React.Component {
    render() {
        return (<div className="key-board">
            <div className={"key-row"}>
                <Key buttonStyle={"functionKey"} click={this.props.clearKeyClick}>AC</Key>
                <Key buttonStyle={"functionKey"}>DEL</Key>
                <Key buttonStyle={"functionKey"} click={() => this.props.clickOptKey("%")}>%</Key>
                <Key buttonStyle={"functionKey"} click={() => this.props.clickOptKey("/")}>/</Key>
            </div>
            <div className={"key-row"}>
                <Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("7")}>7</Key>
                <Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("8")}>8</Key>
                <Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("9")}>9</Key>
                <Key buttonStyle={"functionKey"} click={() => this.props.clickOptKey("*")}>X</Key>
            </div>
            <div className={"key-row"}>
                <Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("4")}>4</Key>
                <Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("5")}>5</Key>
                <Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("6")}>6</Key>
                <Key buttonStyle={"functionKey"} click={() => this.props.clickOptKey("-")}>-</Key>
            </div>
            <div className={"key-row"}>
                <Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("1")}>1</Key>
                <Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("2")}>2</Key>
                <Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("3")}>3</Key>
                <Key buttonStyle={"functionKey"} click={() => this.props.clickOptKey("+")}>+</Key>
            </div>
            <div className={"key-row"}>
                <Key buttonStyle={"numberKey"}>&nbsp;&nbsp;</Key>
                <Key buttonStyle={"numberKey"}>0</Key>
                <Key buttonStyle={"numberKey"}>.</Key>
                <Key buttonStyle={"equalKey"} click={this.props.clickEqualKey}> = </Key>
            </div>
        </div>);
    }
}

class Screen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let preVal;
        if (this.props.preVal) {
            preVal = <div className={"pre-val"}>{this.props.preVal}</div>;
        }
        let list;
        if (this.props.calHistory) {
            list = (<List itemLayout={"horizontal"} dataSource={this.props.calHistory}
                          renderItem={item => (<List.Item className={"his-item"}>
                              {item}
                          </List.Item>)}/>);
        }
        return (
            <div className={"screen"}>
                {list}
                {preVal}
                <div className={"current-val"}>{this.props.currentVal}</div>
            </div>);
    }
}

class Calculater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preVal: "",
            currentVal: 0,
            calOpt: null,
            calHistory: [],
        }
        this.clickNumberKey = this.clickNumberKey.bind(this);
        this.clickClearKey = this.clickClearKey.bind(this);
        this.clickOptKey = this.clickOptKey.bind(this);
        this.clickEqualKey = this.clickEqualKey.bind(this);
    }

    clickNumberKey(keyNum) {
        this.setState((state, props) => {
            if (!state.calOpt) {
                return {
                    currentVal: Number(state.currentVal) === 0 ? keyNum : state.currentVal + keyNum
                };
            } else {
                return {
                    currentVal: Number(state.currentVal) === 0 ? keyNum : state.currentVal + keyNum
                }
            }
        })
    }

    clickOptKey(keyVal) {
        this.setState((state, props) => {
            return {
                calOpt: keyVal,
                preVal: state.currentVal,
                currentVal: 0
            };
        })
    }

    clickClearKey() {
        this.setState({
            currentVal: "0",
            calOpt: null,
            calHistory: [],
        })
    }

    clickEqualKey() {
        this.setState((state, props) => {
            let calExpress = state.preVal + state.calOpt + state.currentVal;
            return {
                currentVal: eval(calExpress),
                calOpt: null,
                calHistory: state.calHistory.concat(calExpress)
            }
        });
    }

    render() {
        return (<div className={"calculater"}>
            <Screen preVal={this.state.preVal} currentVal={this.state.currentVal} calHistory={this.state.calHistory}/>
            <KeyBoard numberKeyClick={this.clickNumberKey} clearKeyClick={this.clickClearKey}
                      clickOptKey={this.clickOptKey} clickEqualKey={this.clickEqualKey}/>
        </div>);
    }
}

export default Calculater;