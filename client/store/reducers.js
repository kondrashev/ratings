// @ts-nocheck
import { combineReducers } from "redux";
import { checkUserReducer } from "./authorization/reducer";
import { itemReducer } from "./items/reducer_get";
import { uploadFileReducer } from "./upload_csv/reducer";
import { studentReducer } from "./students/reducer_get";

export default combineReducers({
  checkUserReducer,
  itemReducer,
  uploadFileReducer,
  studentReducer,
});
