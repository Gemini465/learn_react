import { SET_HEADER_TITLE } from '../constant';

export const setHeaderTitle = title => {
  return dispatch => {
    dispatch({
      type: SET_HEADER_TITLE,
      data: title
    });
  };
};

export const refreshSideMenu = data => { 
  return dispatch => {
    dispatch({
      type: 'refresh',
      data: data
    });
  }
}
