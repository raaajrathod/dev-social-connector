import {combineReducers} from "redux";
import AlertReducer from "./AlertReducer";
import AuthReducer from "./AuthReducer";
import ProfileReducer from "./ProfileReducer";
import PostReducer from "./PostReducer";

export default combineReducers({AlertReducer, AuthReducer,ProfileReducer,PostReducer});
