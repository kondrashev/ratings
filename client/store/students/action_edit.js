// @ts-nocheck
import { updateStudentFetchDataSuccess } from "./action_add";

export const updateStudentFetchData = (data) => async (dispatch) => {
  const { url, studentId, item, valueItem, values, setValues } = data;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: localStorage.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentId, item, valueItem }),
  });
  if (response.status === 200) {
    response = await response.json();
    dispatch(updateStudentFetchDataSuccess(response));
  } else {
    setValues({
      ...values,
      errorForm: true,
      errorMessage: `Error from server №${response.status} ${response.statusText}!!!`,
    });
  }
};
