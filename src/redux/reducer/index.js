import {combineReducers} from 'redux'
import login from './login'

// count和personArr为传入到connect中的state的属性名
export default combineReducers({
    login
})