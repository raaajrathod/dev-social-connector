import {
  REGISTER,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_TOKEN
} from "./Types";
import axios from "axios";
import {setAlert} from "./AlertAction";
import setAuthToken from "../util/setAuthToken";

export const loadUser = () => async dispatch => {
  const token = localStorage.getItem("devConnectorToken");
  if (localStorage.devConnectorToken) {
    setAuthToken(token);
  } else {
    dispatch({
      type: AUTH_ERROR
    });
    return false;
  }
  try {
    const res = await axios.get("/api/auth/get-user-details");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Login
export const login = ({email, password}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({email, password});

  try {
    const res = await axios.post("/api/auth/login", body, config);

    dispatch({
      type: LOGIN,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: LOGIN_ERROR
    });

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

// REgister User
export const registerUser = ({name, email, password}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({name, email, password});

  try {
    const res = await axios.post("/api/users/register", body, config);

    dispatch({
      type: REGISTER,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    dispatch({
      type: REGISTER_FAIL
    });
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
  dispatch({
    type: CLEAR_PROFILE
  });
  dispatch({
    type: CLEAR_TOKEN
  });
};
