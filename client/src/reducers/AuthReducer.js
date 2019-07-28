import {
  REGISTER,
  REGISTER_FAIL,
  LOGIN,
  LOGIN_ERROR,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_TOKEN
} from "../actions/Types";

const initialState = {
  token: localStorage.getItem("devConnectorToken"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER:
    case LOGIN:
      localStorage.setItem("devConnectorToken", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_ERROR:
    case LOGOUT:
      localStorage.removeItem("devConnectorToken");
      return {
        ...state,
        isAuthenticated: false,
        loading: false
      };
    case CLEAR_TOKEN:
      localStorage.removeItem("devConnectorToken");
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: true,
        user: null
      };

    default:
      return state;
  }
};
