import userApi from '../../api/user';
import { message } from 'antd';
import { LOGIN_USER_INFO, LOG_OUT } from '../constant';
import store from '../../util/storeUtils';

export const getUserInfo = data => {
  return async dispatch => {
    const res = await userApi.login(data);
    if (res.status === 0) {
      message.success('LOGIN SUCCESSFUL');
      dispatch({
        type: LOGIN_USER_INFO,
        data: res.data
      });
    }
    store.set('user_key', res.data);
    store.set('token', res.token);
  };
};

export const logOut = () => { 
  return async dispatch => {
    dispatch({
      type: LOG_OUT,
      data: 'logout'
    })
  }
}
