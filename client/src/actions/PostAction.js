import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST
} from "./Types";
import axios from "axios";
import {setAlert} from "./AlertAction";
import setAuthToken from "../util/setAuthToken";

// Get Posts

export const getPost = () => async dispatch => {
  const token = localStorage.getItem("devConnectorToken");
  if (localStorage.devConnectorToken) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get("/api/post/get-all");

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Add Like
export const addLike = postid => async dispatch => {
  const token = localStorage.getItem("devConnectorToken");
  if (localStorage.devConnectorToken) {
    setAuthToken(token);
  }
  try {
    const res = await axios.put(`/api/post/like/${postid}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {likes: res.data, postid}
    });
  } catch (error) {
    // const errors = error.response.data.errors;

    // if (errors) {
    //   errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    // }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Add Like
export const removeLike = postid => async dispatch => {
  const token = localStorage.getItem("devConnectorToken");
  if (localStorage.devConnectorToken) {
    setAuthToken(token);
  }
  try {
    const res = await axios.put(`/api/post/unlike/${postid}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: {likes: res.data, postid}
    });
  } catch (error) {
    // const errors = error.response.data.errors;

    // if (errors) {
    //   errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    // }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Delete Post
export const deletePost = postid => async dispatch => {
  const token = localStorage.getItem("devConnectorToken");
  if (localStorage.devConnectorToken) {
    setAuthToken(token);
  }
  try {
    await axios.delete(`/api/post/delete/${postid}`);

    dispatch({
      type: DELETE_POST,
      payload: postid
    });
  } catch (error) {
    // const errors = error.response.data.errors;

    // if (errors) {
    //   errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    // }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Add Post
export const addPost = text => async dispatch => {
  const token = localStorage.getItem("devConnectorToken");
  if (localStorage.devConnectorToken) {
    setAuthToken(token);
  }
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = {
      text
    };

    const res = await axios.post(`/api/post/add`, body, config);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });
  } catch (error) {
    // const errors = error.response.data.errors;

    // if (errors) {
    //   errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
    // }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};
