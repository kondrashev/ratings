// @ts-nocheck
import { CHECK_USER_DATA_SUCCESS } from "./action";

export const checkUserReducer = (state = "", action) => {
  switch (action.type) {
    case CHECK_USER_DATA_SUCCESS:
      return action.user;
    default:
      return state;
  }
};
