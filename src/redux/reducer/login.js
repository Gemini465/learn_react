import store from "../../util/storeUtils";
import {LOGIN_USER_INFO, LOG_OUT} from "../constant";

const user = store.get('user_key') || {}
export default function loginReducer(preState = user, action) {
   const {type, data} = action
   switch (type) {
      case LOGIN_USER_INFO:
         return data
      case LOG_OUT:
         return {}
      default:
         return preState
   }
}