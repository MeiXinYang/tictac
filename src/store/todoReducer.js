let todoReducer = (
    (state = {}, action) => {
        switch (action.type) {
            case "ADD_TODO":
                let todoList = state.todoList || [];
                todoList.push(action.msg);
                state.todoList = todoList;
                state.todoMsg = null;
                return Object.assign({},state);
            case "UPDATE_MSG":
                state.todoMsg = action.msg;
                return {...state};
            default:
                return state;
        }
    }
);
export default todoReducer;