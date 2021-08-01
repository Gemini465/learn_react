import {combineReducers} from 'redux'
import countReducer from "./count";
import personReducer from "./person";

// count和personArr为传入到connect中的state的属性名
export default combineReducers({
    count: countReducer,
    personArr: personReducer
})