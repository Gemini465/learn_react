import userApi from '../../api/user'
import {message} from "antd";
import {LOGIN_USER_INFO} from "../constant";
import store from "../../util/storeUtils";

export const getUserInfo = data => {
   console.log('action data', data)
   return async dispatch => {
      const res = await userApi.login(data)
      console.log('aaaaaaaaaaa', res)
      if (res.status === 0) {
         message.success('LOGIN SUCCESSFUL')
         dispatch({
            type: LOGIN_USER_INFO,
            data: res.data
         })
      }
      store.set('user_key', res.data)
      store.set('token', res.token)
   }
}