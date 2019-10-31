import React from "react";
import {Row, Col, List} from 'antd'
import "./calculator.css"

class Key extends React.Component {
    render() {
        return (<button className={this.props.buttonStyle} onClick={this.props.click}>
            {this.props.children}
        </button>);
    }
}


class KeyBoard extends React.Component {
    render() {
        return (<div className="key-board">
            <Row type={"flex"}>
                <Col span={6}><Key buttonStyle={"functionKey"} click={this.props.clearKeyClick}>AC</Key></Col>
                <Col span={6}><Key buttonStyle={"functionKey"}>DEL</Key></Col>
                <Col span={6}><Key buttonStyle={"functionKey"} click={() => this.props.clickOptKey("%")}>%</Key></Col>
                <Col span={6}><Key buttonStyle={"functionKey"} click={() => this.props.clickOptKey("/")}>/</Key></Col>
            </Row>
            <Row>
                <Col span={6}><Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("7")}>7</Key></Col>
                <Col span={6}><Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("8")}>8</Key></Col>
                <Col span={6}><Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("9")}>9</Key></Col>
                <Col span={6}><Key buttonStyle={"functionKey"} click={() => this.props.clickOptKey("*")}>X</Key></Col>
            </Row>
            <Row>
                <Col span={6}><Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("4")}>4</Key></Col>
                <Col span={6}><Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("5")}>5</Key></Col>
                <Col span={6}><Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("6")}>6</Key></Col>
                <Col span={6}><Key buttonStyle={"functionKey"} click={() => this.props.clickOptKey("-")}>-</Key></Col>
            </Row>
            <Row>
                <Col span={6}><Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("1")}>1</Key></Col>
                <Col span={6}><Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("2")}>2</Key></Col>
                <Col span={6}><Key buttonStyle={"numberKey"} click={() => this.props.numberKeyClick("3")}>3</Key></Col>
                <Col span={6}><Key buttonStyle={"functionKey"} click={() => this.props.clickOptKey("+")}>+</Key></Col>
            </Row>
            <Row>
                <Col span={6}><Key buttonStyle={"numberKey"}>&nbsp;&nbsp;</Key></Col>
                <Col span={6}><Key buttonStyle={"numberKey"}>0</Key></Col>
                <Col span={6}><Key buttonStyle={"numberKey"}>.</Key></Col>
                <Col span={6}><Key buttonStyle={"equalKey"} click={this.props.clickEqualKey}>=</Key></Col>
            </Row>
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