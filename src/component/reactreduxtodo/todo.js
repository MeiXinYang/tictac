import React from "react";
import ReactDom from "react-dom";
import {Button, Input, List, message, notification, Switch, Tag} from "antd";
import "./todo.css";
import {connect, useSelector} from "react-redux";
import store from "../../store/store";

class ReactReduxToDo extends React.Component {
    constructor(props) {
        super(props);
        this.getCurrentDate = this.getCurrentDate.bind(this);
        this.addTodoFun = this.addTodoFun.bind(this);
    }


    getCurrentDate() {
        // 添加创建日期
        let dt = new Date()
        let year = dt.getFullYear();
        let month = dt.getMonth();
        let day = dt.getDate();
        let hour = dt.getHours();
        let minute = dt.getMinutes();
        let second = dt.getSeconds();
        // 将月份加1
        month = month + 1;
        if (month <= 9) {
            month = "0" + month;
        }
        if (day <= 9) {
            day = "0" + day;
        }
        if (hour <= 9) {
            hour = "0" + hour;
        }
        if (minute <= 9) {
            minute = "0" + minute;
        }
        if (second <= 9) {
            second = "0" + second;
        }
        let creteData = year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒";
        return creteData

    }

    render() {
        let {toDoMshUpdate, addToDo, finishTodo, todoList, todoMsg, updateTodo} = this.props;
        return (
            <div className={"todo"}>
                <div className={"todoInput"}>
                    <Input className={"todo-text-input"} onChange={toDoMshUpdate} placeholder={"请输入"}
                           onPressEnter={() => {
                               console.log("### add todo enter");
                               this.addTodoFun(todoMsg, addToDo);
                           }}  value={todoMsg}/>
                    <Button className={"add-todo"} type="primary" onClick={() => {
                        this.addTodoFun(todoMsg, addToDo);
                    }}> 添加 </Button>
                </div>

                <List className={"todo-list"} itemLayout={"vertical"} locale={{emptyText: '暂无数据'}} dataSource={todoList}
                      renderItem={((item, index) => {
                          return <List.Item key={index}>
                              <Switch style={{marginRight: 20}} onChange={() => {
                                  let newItem = Object.assign({}, item, {checked: !item.checked})
                                  updateTodo(index, newItem);
                              }} checked={item.checked ? false : true}/>
                              <Tag color="orange" style={{position: "absolute", right: 0}}>创建日期: {item.createDate}</Tag>
                              {/*<div  style={{cursor:"pointer",paddingLeft:"2rem"}}>*/}
                              {item.checked ? <span onClick={() => finishTodo(index)}
                                                    style={{textDecoration: "line-through"}}>{item.todoMsg}</span> :
                                  <span>{item.todoMsg}</span>}
                              {/*</div>*/}
                          </List.Item>
                      })}>
                </List>
            </div>
        )
    }

    addTodoFun(todoMsg, addToDo) {
        if (!todoMsg) {
            message.open({
                content: "todo msg is null",
                duration: 1
            })
            return;
        }
        let todoObj = {todoMsg, createDate: this.getCurrentDate()}
        addToDo(todoObj);
    }
}

let mapStateToProps = (state) => {
    return {...state.todoReducer}
}

let mapDispatchToProps = (dispatch) => {
    return {
        toDoMshUpdate: (event) => {
            dispatch(store.createAction("UPDATE_MSG", event.target.value, "todo"));
        },
        addToDo: (todoMsg) => {
            dispatch(store.createAction("ADD_TODO", todoMsg));
        },
        finishTodo: (index) => {
            console.log(index);
            dispatch(store.createAction("FINISH_TODO", index));
        },
        updateTodo: (index, todoObj) => {
            dispatch({"type": "UPDATE_TODO", index, todoObj});

        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxToDo);