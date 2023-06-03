//Middleware จัดการและบันทึกการเปลี่ยนแปลงของสถานะ
import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootRecuder from "./rootReducer";

const middleware = [thunk];

if(process.env.NODE_ENV === "development") {
    middleware.push(logger);
}

export const store = createStore(rootRecuder, applyMiddleware(...middleware));