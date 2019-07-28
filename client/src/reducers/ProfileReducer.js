import axios from "axios";
import {
  LOAD_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  CREATE_PROFILE
} from "../actions/Types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case LOAD_PROFILE:
    case CREATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: [],
        repos: [],
        loading: true,
        error: {}
      };
    default:
      return state;
  }
};
