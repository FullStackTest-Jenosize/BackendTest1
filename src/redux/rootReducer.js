//จัดเก็บสถานะของ user
import { combineReducers } from "redux";
import userReducer from "./reducer";

const rootRecuder = combineReducers({
    user: userReducer,
})

export default rootRecuder;

