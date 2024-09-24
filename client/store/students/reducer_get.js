// @ts-nocheck
import { LOAD_STUDENTS_DATA_SUCCESS, SEARCH_STUDENT_DATA_SUCCESS } from './action_get';
import { SEARCH_STUDENTS_DATA_SUCCESS } from './action_search_students';
import { SEARCH_GROUPS_DATA_SUCCESS } from './action_search_groups';
import { UPDATE_STUDENT_DATA_SUCCESS } from './action_add';
import { LOAD_DATES_DATA_SUCCESS, UPDATE_DATES_DATA_SUCCESS } from './action_dates';

const initialState = {
  students: [],
  search: [],
  searchStudents: [],
  searchGroups: [],
  updateStudent: {},
  dates: {},
  updateDate: {},
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STUDENTS_DATA_SUCCESS:
      return { ...state, students: action.students };
    case SEARCH_STUDENT_DATA_SUCCESS || SEARCH_STUDENTS_DATA_SUCCESS:
      return { ...state, search: action.search };
    case SEARCH_STUDENTS_DATA_SUCCESS:
      return { ...state, searchStudents: action.search };
    case SEARCH_GROUPS_DATA_SUCCESS:
      return { ...state, searchGroups: action.search };
    case UPDATE_STUDENT_DATA_SUCCESS:
      return { ...state, updateStudent: action.student };
    case LOAD_DATES_DATA_SUCCESS:
      return { ...state, dates: action.dates };
    case UPDATE_DATES_DATA_SUCCESS:
      return { ...state, updateDate: action.dates };
    default:
      return state;
  }
};
