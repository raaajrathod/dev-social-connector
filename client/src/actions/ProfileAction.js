import {
  LOAD_PROFILE,
  PROFILE_ERROR,
  CREATE_PROFILE,
  ADD_EDUCATION,
  ADD_EXPERIANCE,
  EDUCATION_ERROR,
  EXPERIANCE_ERROR,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  DELETE_PROFILE,
  CLEAR_TOKEN,
  LOAD_ALL_PROFILE,
  GET_REPOS,
  CLEAR_PROFILE
} from "./Types";
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

//  Get All Profiles
export const getAllProfile = () => async dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
  try {
    const res = await axios.get("/api/profile/get-all");

    dispatch({
      type: LOAD_ALL_PROFILE,
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

//  Get All Profiles
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/find-by-user-id/${userId}`);

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

//  Get Github Repo
export const getGithubRepos = userName => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/get-github-repos/${userName}`);

    dispatch({
      type: GET_REPOS,
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

export const addEducation = (
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
    const res = await axios.put("api/profile/add-education", body, config);

    dispatch({
      type: ADD_EDUCATION,
      payload: res.data
    });

    dispatch(
      setAlert(edit ? "Education Updated" : "Education Added", "success")
    );

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: EDUCATION_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

export const addExperiance = (
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
    const res = await axios.put("api/profile/add-experiance", body, config);

    dispatch({
      type: ADD_EXPERIANCE,
      payload: res.data
    });

    dispatch(
      setAlert(edit ? "Experiance Updated" : "Experiance Added", "success")
    );

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: EXPERIANCE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    const token = localStorage.getItem("devConnectorToken");
    if (localStorage.devConnectorToken) {
      setAuthToken(token);
    }
    const res = await axios.delete(`api/profile/delete-experiance/${id}`);

    dispatch({
      type: DELETE_EXPERIENCE,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: EXPERIANCE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

export const deleteEducation = id => async dispatch => {
  try {
    const token = localStorage.getItem("devConnectorToken");
    if (localStorage.devConnectorToken) {
      setAuthToken(token);
    }
    const res = await axios.delete(`api/profile/delete-education/${id}`);

    dispatch({
      type: DELETE_EDUCATION,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: EXPERIANCE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

export const deleteProfile = history => async dispatch => {
  if (window.confirm("Are You Sure? This can Not be Undone!")) {
    try {
      const token = localStorage.getItem("devConnectorToken");
      if (localStorage.devConnectorToken) {
        setAuthToken(token);
      }
     await axios.delete(`api/profile/delete`);

      dispatch({
        type: DELETE_PROFILE
      });

      dispatch({
        type: CLEAR_TOKEN
      });

      history.push("/");
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
  }
};
