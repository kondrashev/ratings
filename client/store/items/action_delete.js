// @ts-nocheck
import {
  updateDisciplineFetchDataSuccess,
  updateGroupFetchDataSuccess,
} from "./action_add";
import { updateStudentFetchDataSuccess } from "../students/action_add";

export const deleteItemsFetchData = (data) => async (dispatch) => {
  const { url, values, setValues, listId, setSelected } = data;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: localStorage.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ listId }),
  });
  if (response.status === 200) {
    response = await response.json();
    setValues({
      ...values,
      showIconDeleteItems: false,
    });
    dispatch(
      !values.getGroups && !values.showListStudents
        ? updateDisciplineFetchDataSuccess(response)
        : values.getGroups && !values.showListStudents
        ? updateGroupFetchDataSuccess(response)
        : !values.getGroups && values.showListStudents
        ? updateStudentFetchDataSuccess(response)
        : null
    );
    setSelected([]);
  } else {
    setValues({
      ...values,
      errorForm: true,
      errorMessage: `Error from server №${response.status} ${response.statusText}!!!`,
    });
  }
};
