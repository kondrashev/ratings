// @ts-nocheck
import { UPLOAD_FILE_DATA_SUCCESS } from "./action";

export const uploadFileReducer = (state = [], action) => {
  switch (action.type) {
    case UPLOAD_FILE_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
