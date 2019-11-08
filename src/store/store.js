import {combineReducers, createStore} from "redux";
import todoReducer from "./todoReducer";


let reducer = combineReducers({todoReducer})
let store = createStore(reducer);
store.createAction = function (type, msg, componentName) {
    return {type, msg, component: "todo"};
}
export default store;