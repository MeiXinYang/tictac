let defState = {
    todoList: [],
    todoMsg: "请输入"
}
let todoReducer = (
    (state = defState, action) => {
        let newState = {}
        switch (action.type) {
            case "ADD_TODO":
                let newTodoList = Array.from(state.todoList);
                newTodoList.push({...action.msg});
                newState =Object.assign({},state,{todoList:newTodoList}) ;
                break
            case "UPDATE_MSG":
                state.todoMsg = action.msg;
                newState = {...state};
                break;
            case "FINISH_TODO":
                let copyOfTodoList = Array.from(state.todoList);
                copyOfTodoList.splice(action.msg,1);
                newState =Object.assign({},state,{todoList:copyOfTodoList}) ;
                break;
            case "UPDATE_TODO":
                let updateToDOList = Array.from(state.todoList);
                updateToDOList[action.index] = action.todoObj
                newState =Object.assign({},state,{todoList:updateToDOList}) ;
                break;
            default:
                return state;
        }
        console.log("### newState ###");
        console.log(newState);
        console.log("### newState ###");
        return newState;
    }
);
export default todoReducer;