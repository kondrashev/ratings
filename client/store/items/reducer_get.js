// @ts-nocheck
import {
  LOAD_DISCIPLINES_DATA_SUCCESS,
  LOAD_GROUPS_DATA_SUCCESS,
} from "./action_get";

import {
  UPDATE_DISCIPLINES_DATA_SUCCESS,
  UPDATE_GROUPS_DATA_SUCCESS,
} from "./action_add";

const initialState = {
  disciplines: [],
  groups: [],
  updateDiscipline: {},
  updateGroup: {},
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DISCIPLINES_DATA_SUCCESS:
      return { ...state, disciplines: action.disciplines };
    case UPDATE_DISCIPLINES_DATA_SUCCESS:
      return { ...state, updateDiscipline: action.discipline };
    case LOAD_GROUPS_DATA_SUCCESS:
      return { ...state, groups: action.groups };
    case UPDATE_GROUPS_DATA_SUCCESS:
      return { ...state, updateGroup: action.group };
    default:
      return state;
  }
};
