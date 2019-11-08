import React from "react";
import ReactDom from "react-dom";
import Store from "../store/store"
import {Button, Input, List, message, notification} from "antd";
import "./todo.css";

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.addToDo.bind(this);
        this.toDoMsgUpdate.bind(this);
        this.state = {
            todoList: []
        }
    }


    componentDidMount() {
        this.setState(Store.getState().todoReducer);
        this.setState({reduxSubscribe: Store.subscribe(() => {
                console.log("#### store.state is " + JSON.stringify(Store.getState()));
                this.setState(Store.getState().todoReducer);
                console.log("#### todo component state is " + JSON.stringify(this.state));
            })});
    }

    componentWillUnmount() {
        this.state.reduxSubscribe();
    }

    addToDo() {
        if (!this.state.todoMsg) {
            notification.open({
                message: 'ToDo msssage is null'
            });
            message.warn("todo message is null");
            return;
        }
        // let todoAction = this.genAction("", );
        Store.dispatch(Store.createAction("ADD_TODO",this.state.todoMsg,"todo"))
        // Store.dispatch(todoAction);
    }

    toDoMsgUpdate(event) {
        Store.dispatch(Store.createAction("UPDATE_MSG",event.target.value,"todo"));
    }

    render() {
        return (
            <div className={"todo"}>
                <List itemLayout={"vertical"} dataSource={this.state.todoList} renderItem={((item, index) => {
                    return <List.Item key={index}>{index+1 + " " + item}</List.Item>
                })}>
                </List>
                <Input onChange={this.toDoMsgUpdate} value={this.state.todoMsg}/>
                <Button type="primary" onClick={this.addToDo.bind(this)}> 添加 </Button>
            </div>
        )
    }

}

export default ToDo;