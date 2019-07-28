import {LOAD_PROFILE, PROFILE_ERROR, CREATE_PROFILE} from "./Types";
import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import {setAlert} from "./AlertAction";

export const loadProfile = () => async dispatch => {
  const token = localStorage.getItem("devConnectorToken");
  if (localStorage.devConnectorToken) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get("/api/profile/get-me");

    dispatch({
      type: LOAD_PROFILE,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  const token = localStorage.getItem("devConnectorToken");
  if (localStorage.devConnectorToken) {
    setAuthToken(token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify(formData);

  try {
    const res = await axios.post("api/profile/add", body, config);

    dispatch({
      type: CREATE_PROFILE,
      payload: res.data.profile
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
