export default function sideMenuReducer(preState = {}, action) { 
  const { type, data } = action;
  switch (type) { 
    case "refresh":
      return { ...preState, ...data };
    case "reload": 
      return { ...preState, ...data };
    default:
      return preState;
  }
}